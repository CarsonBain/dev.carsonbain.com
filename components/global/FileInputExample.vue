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
