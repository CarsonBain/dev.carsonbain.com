---
title: Creating a reusable file input component in Vue.js
description: Creating a reusable file input component in Vue.js
createdAt: 2021-04-18
---

<div class="prose">

# Creating a reusable file input component in Vue.js

The HTML `<input="file">` element is a special exception in Vue with regards to using [`v-model`](https://vuejs.org/v2/guide/forms.html) in that you can't use it! This makes some sense when you think about it, as you can't really *set* a value on a file input. If we want to make a file input in to a reusable Vue component, we have to approach it a bit differently. 

## Creating the component markup

Let's set first set up the [single file component](https://vuejs.org/v2/guide/single-file-components.html) and give it some basic markdown and styles.

```vue[FileComponent.vue]
<template>
  <div>
    <input
      id="file-input"
      class="hide-file-input"
      type="file"
      accept="image/*"
      @change="onFileChange($event)"
    />
    <label class="file-label" for="file-input"> Upload file </label>
  </div>
</template>
<script>
export default {
  methods: {
    onFileChange(event) {
      console.log(event)
    },
  },
}
</script>
<style scoped>
.hide-file-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.file-label {
  color: #fff;
  background-color: #3730A3;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
```

**You'll see we have a few things going on here:**
<!-- - We have a `<slot>` inside of the `<label>` element. This will allow us to render whatever text we want to the label allowing the component to be more flexible to different use cases. For more on slots, read the [Vue documentation](https://vuejs.org/v2/guide/components-slots.html). -->
- We're tracking the `@change` event on the `<input>` element, and triggering our own method `onFileChange()` whenever `@change` is fired. This will allow us to capture the file that's passed to the input, and then do something with it.
- We have an `.sr-only` class on the `<input>` element and have added some styles for it in the `<styles>` block. This will allow us to customize the appearance of the file input, since as long as we have an `id` and `for` pairing between the `<label>` and `<input>`, clicking on the `<label>` will trigger the `<input>`.

With this markup, you should now have a component that when you click, opens the file browser, and allows you to upload an image. If you open up the devtools and check the console, you'll also see the event emitted when you select a file. Try it below:

<div class="bg-gray-100 flex items-center justify-center py-10 rounded-lg">

<FileInputExample></FileInputExample>

</div>

## Emit the 

</div>