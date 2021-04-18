<template>
  <div class="flex flex-col items-center">
    <img
      v-if="filePreview"
      :src="filePreview"
      alt="fileName"
      style="max-height: 256px"
    />
    <FileComponent @file-updated="captureFile($event)"></FileComponent>
  </div>
</template>
<script>
import FileComponent from './FileInputExample'
export default {
  components: { FileComponent },
  data() {
    return {
      // Add two new data properties here to capture the emitted file properties we need
      filePreview: '',
      fileName: '',
    }
  },
  methods: {
    captureFile($event) {
      this.filePreview = $event.previewBase64
      this.fileName = $event.name
    },
  },
}
</script>
