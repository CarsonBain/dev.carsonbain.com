---
title: Building a Quick Order Form with the Shopify AJAX API
description: This post will take you through the steps to add a quick order form page on your Shopify store. The form we will be adding allows users to quickly select quantities of items they would like to purchase, and then add all selected items to cart with one click.
createdAt: 2019-05-28
---

<div class="prose dark:prose-light">

# Building a Quick Order Form with the Shopify AJAX API

This post will take you through the steps to add a quick order form page on your Shopify store. The form we will be adding allows users to quickly select quantities of items they would like to purchase, and then add all selected items to cart with one click.

Using the [AJAX API](https://help.shopify.com/en/themes/development/getting-started/using-ajax-api) for this type of task will give us a large amount of flexibility in how we can add items to the cart.

---

## Creating a new page template

_This section will be largely a repeat from [this article](https://help.shopify.com/en/themes/customization/forms/add-order-form), however the code used there does not utilize the AJAX API, and there are some slight differences to pay attention to._

Let's first create a new page template file that we can apply to the page we want our order form to live on.

1. From your Shopify admin, go to Online Store > Themes.
2. Find the theme you want to edit, and then click Actions > Edit code.
3. On the left side, under Templates, click Add a new template. Create a new template for `page` called `order-form`
4. Replace the content of your new `page.order-form.liquid` template with [this code](https://gist.githubusercontent.com/CarsonBain/996d054123f3bb3c80b8fd5761c953e5/raw/dae8ba71ce6654f8f57d3340e8923b5030437782/page.order-form.liquid). If you're interested, we'll go over this code in more detail in the next section.
5. Create a product collection with handle `quick-order` as per [these instructions](https://help.shopify.com/en/themes/customization/collections/change-catalog-page). The form will loop over every product in this collection and display it as it's own line in the form. Note that each variant will be on it's own line.
6. Create a new page under Pages.
7. After you created your page, scroll all the way down to the Template section, and select `page.order-form` in the drop-down. Then save your page.
8. Go check out this page on the front end of your website and see it in action!

## Cool, that works. But how?

Let's dig into some of the Javascript from the template code to understand how things are working.

### Setting up the queue and watching for changes

First, we'll set `Shopify.queue` equal to an array where we can keep track of our items that are going to be added to the cart:

```javascript
Shopify.queue = []
```

We want to make sure that we're updating the items in the queue everytime that the user updates the quantity of any product on the form. Lets declare an event function that will run every time the user makes a change in the quantity input box:

```javascript
    $('.quantity input').on('input',function() {
      ...
    });
```

Inside that function, we're going to declare some variables to grab some of the values that we'll be needing to track and update:

```javascript
//Set an initial flag for a new item
var newItem = true
//Declare product property variables
var price = $(this).attr('data-variant-price')
var quantity = parseInt($(this).val(), 10) || 0
var variant = $(this).attr('data-variant')
var totalQuantity = $('.product-total-amount')
var totalPrice = $('.order-total-amount span')
```

Now that we're watching for updates in the quantity field, and we've got some variables declared, let's take a look at pushing item requests into the queue.

### Adding Items into the queue

We're going to set up some if statements that run each time the user updates the quantity input box to conditionally check the items and quantities in the queue, updating them as needed.

First we will check to see if the queue is completely empty -- if it is, then we know this is the first item to be added and we can push the item into the array without worrying. We're going to push a new product request with key-value pairs for `variant`, `quantity` and `price`. Note we're only pushing `price` to calculate subtotals and totals on the form page as a visual reference for the user -- this will not be pushed to the cart as it's already automatically calculated for you on add:

```javascript
if (Shopify.queue.length <= 0) {
  Shopify.queue.push({
    variantId: variant,
    quantity: quantity,
    price: price,
  })
  updateTotals($(this), price, quantity)
}
```

_Don't worry about the `updateTotals()` function for the moment, we'll discuss that in the next section_

If the queue _does_ already contain items, then we'll first want to loop over each product object that is currently there, and check to see if the product that the user is updating is equal to a product that's in the queue. If they're equal, then we will overwrite the quantity value with the new user updated value:

```javascript
else if (Shopify.queue.length > 0) {
  for (var index in Shopify.queue) {
    if(parseInt(Shopify.queue[index].variantId) == variant) {
      Shopify.queue[index].quantity = quantity;
      newItem = false;
      updateTotals($(this), price, quantity);
      return;
    }
  }
```

If the item doesn't exist in the queue which contains items, then we will push the new item as before:

```javascript
if (newItem == true) {
  Shopify.queue.push({
    variantId: variant,
    quantity: quantity,
    price: price,
  })
  updateTotals($(this), price, quantity)
}
```

Finally, back to that `updateTotals()` function referenced above. This is what will update each row's price subtotal, as well as the grand totals for quantity and price at the bottom of the form.

`updateTotals()` takes in the element reference (that's our quantity box), the product price, and the product quantity as parameters. It first multiplies price by quantity and inserts the value into the subtotal element for the product in the corresponding table row. After that it loops through the products currently in the queue and grabs the total prices and quantities of all items. It then sets the grand total quantity and price at the bottom of the form.

```javascript
var totalQuantityCount = 0
var totalPriceAmount = 0
function updateTotals($element, prc, qty) {
  var $subtotal = $($element).parent().siblings('.subtotal').find('span')
  $subtotal.html((price * quantity).toFixed(2))

  for (var index in Shopify.queue) {
    totalQuantityCount += Shopify.queue[index].quantity
    totalPriceAmount +=
      Shopify.queue[index].quantity * Shopify.queue[index].price
  }
  totalQuantity.html(totalQuantityCount)
  totalPrice.html(totalPriceAmount.toFixed(2))
}
```

We've got our queue of products generating and listening for changes on quantity, and we've got all of our line item subtotals and grand totals generating. Let's now look at how we can send our requests to the cart.

### Sending the item requests to the cart

Let's first declare our function `Shopify.addItem` that will send the requests to the cart.

```javascript
Shopify.addItem = function (variant, qty, callback) {
  var params = {
    quantity: qty,
    id: variant,
  }
  $.ajax({
    type: 'POST',
    url: '/cart/add.js',
    dataType: 'json',
    data: params,
    success: function () {
      if (typeof callback === 'function') {
        callback()
      }
    },
    error: function (request) {
      alert(request.responseJSON.description + ' Please try again')
      $('#add-items').val('Add to cart')
    },
  })
}
```

`Shopify.addItem` will take in `variant`, `qty` and a callback. The callback function will be a function called `Shopify.moveAlong` and will first check if there's items in the queue. If there are items in the cart, then remove a request from `Shopify.queue` and send its `id` and `quantity` to the `Shopify.addItem` function. Once the queue is empty, all of the requests should be posted and we can redirect to the cart page:

```javascript
Shopify.moveAlong = function ($element) {
  if (Shopify.queue.length) {
    var request = Shopify.queue.shift()
    Shopify.addItem(request.variantId, request.quantity, Shopify.moveAlong)
  } else {
    document.location.href = '/cart'
  }
}
```

Now all that's left to do is trigger these functions. We will listen to the button with the id `#add-to-cart` for a click, and once clicked, we will call the `Shopify.moveAlong` function:

```javascript
$('#add-items').click(function (e) {
  e.preventDefault()
  Shopify.moveAlong($(this))
  $(this).val('Adding items...')
})
```

### Enjoy!

_A special thanks to these posts for inspiring the code in this article:_

- https://community.shopify.com/c/Shopify-Design/Issue-with-Ajax-on-quick-order-form/td-p/365002
- https://community.shopify.com/c/Shopify-Design/Shopify-queue-addItem-and-line-item-properties/m-p/262461

</div>
