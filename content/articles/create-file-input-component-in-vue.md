---
title: Creating a reusable file input component in Vue.js
description: Sometimes it's nice to build components from scratch and not have to rely on component libraries so heavily. Let's walk through creating a reusable, accessible file input component that you can use in your own projects.
createdAt: 2021-10-21
---

<div class="prose">

# Creating a reusable file input component in Vue.js

The HTML `<input type="file">` element is a special exception in Vue with regards to using [`v-model`](https://vuejs.org/v2/guide/forms.html) in that `v-model` is actually not supported on `file` type `inputs`. This makes some sense when you think about it, as you can't really _set_ a value on a file input. If we want to make a file input in to a reusable Vue component, we have to approach it a bit differently.

By the end of this post, you'll have a reusable component that will let the user upload an image file and display a preview.

It should look and function like the example below:

<div class="bg-gray-100 flex items-center justify-center py-10 rounded-lg">

<FilePreviewExample></FilePreviewExample>

</div>

[I don't care about the details, take me to the code!](#final-result)

## Creating the component markup

Let's first create a [single file component](https://vuejs.org/v2/guide/single-file-components.html) and give it some basic markdown and styles.

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
input[type='file']:focus + .file-label {
  box-shadow: 0 0 0 4px #bae6fd;
}
</style>
```

**You'll see we have a few things going on here:**

- We set the `accept` property on the `<input>` element to be `'image/*'`. This will show the user only image type file options in their finder when they try to upload a file.
  - _Note that it is technically possible for the user to bypass this and upload other file types, so beware if you're submitting this file to a server. Make sure to add some server side validation, and/or use something like [vee validate](https://vee-validate.logaretm.com/v4/) to add some additional client side validation._
- We're tracking the `@change` event on the `<input>` element, and triggering our own method `onFileChange()` whenever `@change` is fired. This will allow us to capture the file that's passed to the input, and then do something with it.
- We have an `.hide-file-input` class on the `<input>` element and have added some styles for it in the `<styles>` block. This will allow us to customize the appearance of the file input, since as long as we have an `id` and `for` pairing between the `<label>` and `<input>`, clicking on the `<label>` will trigger the `<input>`.

## Emit a custom event with the uploaded file

Now that we have the basic structure in place, let's create a [custom event](https://vuejs.org/v2/guide/components-custom-events.html) that emits the uploaded file. This will allow a parent component that consumes the `FileComponent` to listen for the event, and then do something with the file.

Update the `onFileChange()` method to look like this:

```vue[FileComponent.vue]
<script>
...
methods: {
  onFileChange($event) {
    const file = $event.target.files[0];
    // Check to see if there has been a file actually uploaded
    if (file) {
      this.$emit('file-updated', file);
      }
    }
  }
...
</script>
```

Now we're grabbing the first file from the uploaded file list (since we're not supporting multiple files for this example), and emitting it with a custom event called `file-updated`. This means that the parent component can now listen for the `file-updated` event, capture the file emitted, and do something with it like send it to an API endpoint or store it somewhere.

Let's make a parent component file, add the new `FileComponent` we made, and create a method called `captureFile()` that listens for the `file-updated` event:

```vue[ParentComponent.vue]
<template>
  <FileComponent @file-updated="captureFile($event)"></FileComponent>
</template>
<script>
import FileComponent from "./FileComponent"
export default {
  components: { FileComponent },
  methods: {
    captureFile($event) {
      // do something with the file here, we'll log to the console for now
      console.log($event);
    }
  }
}
</script>
```

## Display a preview of the file

Assume that we want to continue on with the idea that this input is for `image` type files only. Maybe we want to go a step further and show the user a preview of their uploaded image. To do this, let's go back to our `FileComponent` and make some changes to the `onFileChange()` method.

In order to display a preview of the file to the user, we'll need to convert the uploaded file to base64 using the [`FileReader`](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) class and then add the base64 preview to the `File` object we emit in the `file-updated` event.

```vue[FileComponent.vue]
<script>
...
methods: {
  onFileChange($event) {
    const file = $event.target.files[0];
    const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          // Set a new property on the captured `file` and set it to the converted base64 image
          file.previewBase64 = reader.result;
          // Emit the file with the new previewBase64 property on it
          this.$emit('file-updated', file);
        };
        reader.onerror = (error) => {
          console.log("Error ", error);
        };
      }
    }
  }
  ...
}
</script>
```

Now when the parent component listens for the `file-updated` event in `captureFile()`, the emitted file will also contain the base64 version of the uploaded file which we can then display to the user by setting it as the `src` of an `<img>` tag:

```vue[ParentComponent.vue]
<template>
<div>
  <img v-if="filePreview" :src="filePreview" alt="fileName" style="max-height: 256px">
  <FileComponent @file-updated="captureFile($event)"></FileComponent>
</div>
</template>
<script>
import FileComponent from "./FileComponent"
export default {
  components: { FileComponent },
  data() {
    return {
      // Add two new data properties here to capture the emitted file properties we need
      filePreview: '',
      fileName: ''
    }
  },
  methods: {
    captureFile($event) {
      this.filePreview = $event.previewBase64;
      this.fileName = $event.name;
    }
  }
}
</script>
```

## Final result

What you should end up with is the component from the [beginning of this post](#creating-a-reusable-file-input-component-in-vuejs). Give it a try for yourself, and check out the final code below! 🎉

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
    <label class="file-label" for="file-input"> Upload a file </label>
  </div>
</template>
<script>
export default {
  methods: {
    onFileChange($event) {
      const file = $event.target.files[0]
      const reader = new FileReader()
      if (file) {
        reader.readAsDataURL(file)
        reader.onload = () => {
          // Set a new property on the captured `file` and set it to the converted base64 image
          file.previewBase64 = reader.result
          // Emit the file with the new previewBase64 property on it
          this.$emit('file-updated', file)
        }
        reader.onerror = (error) => {
          console.log('Error ', error)
        }
      }
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
  background-color: #3730a3;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}
input[type='file']:focus + .file-label {
  box-shadow: 0 0 0 4px #bae6fd;
}
</style>
```

```vue[ParentComponent.vue]
<template>
<div>
  <img v-if="filePreview" :src="filePreview" alt="fileName" style="max-height: 256px">
  <FileComponent @file-updated="captureFile($event)"></FileComponent>
</div>
</template>
<script>
import FileComponent from "./FileComponent"
export default {
  components: { FileComponent },
  data() {
    return {
      // Add two new data properties here to capture the emitted file properties we need
      filePreview: '',
      fileName: ''
    }
  },
  methods: {
    captureFile($event) {
      this.filePreview = $event.previewBase64;
      this.fileName = $event.name;
    }
  }
}
</script>
```

<!-- Things you can do to make more reusable : accepted prop, label slots, validation with vee-validate -->
</div>
