<template>
  <div>
    <input
      id="file-input"
      class="sr-only"
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
.file-label {
  color: #fff;
  background-color: #3730A3;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
