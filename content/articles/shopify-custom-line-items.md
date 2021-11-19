---
title: Adding line item properties for personalization to your Shopify site
description: Let's add custom line item properties to a new product page template, as well as make the names of these new properties customizable by adding them as Theme Settings in the Shopify Admin.
createdAt: 2019-05-28
---

<div class="prose dark:prose-light">

# Adding line item properties for personalization to your Shopify site

For some products in your store, you may want to capture other form-like information from the customer such as custom monogram/engraving text or a choice of colour in which inventory doesn't need to be kept. These fields are called line item properties and can be used to allow customers to make choices or add information about a product.

This post will take you through how to add line item properties to a new product page template, as well as how to make the names of these new properties customizable by adding them as [Theme Settings](https://help.shopify.com/en/manual/using-themes/change-the-layout/theme-settings). By the end of this post, you will have a product page with custom required inputs for colour and an optional monogram that will look something like this:

![](https://s3-us-west-2.amazonaws.com/carsons-assets/images/shopify-personalize-products-screen.png)

## Creating an alternate product page template

First, let's create a new product page template that includes our new line item properties. Once created, you'll be able to apply the new template to any products you'd like these custom options to appear on.

From your **desktop** device:

1. From your Shopify admin, go to **Online Store > Themes**.
   Find the theme you want to edit, and then click Actions > Edit code.

2. In the **Templates** directory, click **Add a new template**.

3. Choose product from the drop-down menu, and name the template `personalize`:

4. Click **Create template**. This creates a copy of your product.liquid template called `product.personalize.liquid`. The new file will open in the code editor.

5. Find the following line of code:

```liquid
{% section 'product-template' %}
```

Replace it with:

```liquid
{% section 'product-personalize-template' %}
```

6. Click **Save**.

7. In the **Sections directory**, click Add a new section.

8. Name your new section file `product-pesonalize-template`. Click **Create section**. Your new file will open in the code editor.

9. Delete all of the default code so that the file is empty. Copy all of the content from your `product-template.liquid` file (in the Sections directory), and paste it into your new product-customizable-template file.

10. Click **Save**.

## Adding custom form fields to your template

We'll be adding two fields in this example: the first is a dropdown menu for the user to pick from different required colour options and the second is an optional field which we will use to capture a custom 3 letter monogram if the user wants. The reason we're not just using a [variant](https://help.shopify.com/en/manual/products/variants) to display the colour selection here, is that we don't need to track inventory on each individual colour in this scenario. In the end, both required and optional fields will be customizable to be whatever values you would like but for this example we'll stick to colour values and monograms.

_Note that you can create whatever custom fields you'd like using [Shopify UI Elements Generator](https://ui-elements-generator.myshopify.com/pages/line-item-property), however this example will walk through creating the specific fields outlined above._

1. From your Shopify admin, go to **Online Store > Themes**.
   Find the theme you want to edit, and then click **Actions > Edit code**.

2. In the **Sections** directory, click `product-personalize-template.liquid`.

3. Go [here](https://gist.githubusercontent.com/CarsonBain/87bd092cd1ba898e257152bd96bb4b28/raw/50e6dc1b7e93c1a437b365edb22a57f5968c1b3d/product-personalize-fields.liquid) and copy the code to your clipboard.

4. This next part can be a little tricky as everyone's product templates are structured a little differently. In our case, we want to put both of these custom fields directly above the main quantity input box. Find the code `id="Quantity"` in the template file and place the form code you copied in step 3 on a new line above the block of code that contains the quantity box. Note in the diagram below, the code beside the pink vertical line is our new form fields, and the code beside the green line is the quantity box code block:

![](https://s3-us-west-2.amazonaws.com/carsons-assets/images/shopify-personalize-templatecode1.png)

If you don't have the same quantity input as the example above, a good bet is to place it above the add to cart button which can be found by searching for the code `type="submit"`.

5. Click **Save**

## Apply your new template to a product

We now want to apply our new template to one of our products.

1. From your Shopify admin, go to **Products**.

2. Click the name of the product that will use your new template.

3. In the **Theme templates** section, choose `product.personalize` from the **Product template** menu.

4. Click **Save**.

5. You'll note that it doesn't quite look right on the front end and fields are blank. We still need to set up the Theme Settings so that we can allow the user to populate these values easily without having to dig into the code themselves evertime they want to make changes.

## Adding theme settings for the names of the custom inputs

Let's add some settings **specifically** for the `product-personalize-template.liquid` that will appear in Theme Settings so our user can modify the title of the dropdown, the name of each dropdown option, and the title for our monogram option. Our goal is to get some settings that look like this:

![](https://s3-us-west-2.amazonaws.com/carsons-assets/images/shopify-personalize-theme-settings1.png)

1. Still viewing `product-personalize-template.liquid` in the code editor, scroll down until you hit a tag called `{% schema %}`.

2. Go [here](https://gist.githubusercontent.com/CarsonBain/2395937c9eb8bb3750c4ab67315cab5f/raw/5043e9d8be3a7838794ae55009d6e9b25edd2c45/product-personalize-theme-settings-partial.schema) and copy the code to your clipboard.

3. Under the `{% schema %}` tag, find the `settings` array. It should look something like this:

```json
"settings": [
{
  ...
}
]
```

4. Within that array, find the first `{` and paste the code copied in Step 2 above it.

```json
"settings": [
{
"type": "header",
"content": {
"en": "Personalization Options"
}
},
{
"type": "text",
"id": "dropdown_name",
"label": "Dropdown Label"
},
...
{
...
}
]
```

5. Click **Save**

6. Navigate back to **Online Store > Themes**, and click **Customize** on the theme you want to edit.

7. Within the website preview on the right hand side of the window, navigate to the product you applied the personalization template to. _Remember our new theme settings will only show up when the personalization template is being used due to the fact that we applied the schema settings directly to that template instead of globally._

8. Once on the product page, under **Sections** click on the **Product Pages** label

![](https://s3-us-west-2.amazonaws.com/carsons-assets/images/shopify-personalize-theme-settings2.png)

9. You should now see your settings near the top of the list in the sidebar. You can give the dropdown a label, type in dropdown options separated by commas, and label the monogram option.

10. Click **Save**

![](https://s3-us-west-2.amazonaws.com/carsons-assets/images/shopify-personalize-theme-settings1.png)

### Enjoy! 🎉

_We only briefly touched on Theme Settings in this post. If you want to learn more about Theme Settings and how they are configured, the [Shopify Documentation](https://help.shopify.com/en/themes/development/theme-editor/settings-schema) is a great resource for that_

</div>
