<template>
  <div :class="{ dark: darkModeEnabled }" class="h-full">
    <div class="text-gray-900 h-full dark:text-white">
      <nav
        class="flex justify-between items-center max-w-screen-lg mx-auto px-8 py-6 border-b border-solid border-gray-200 dark:border-gray-600"
      >
        <NuxtLink class="uppercase font-bold tracking-wider text-2xl" to="/"
          >Carson Bain</NuxtLink
        >
        <div class="flex space-x-4">
          <NuxtLink
            class="px-3 py-1 text-lg font-semibold bg-blue-50 text-blue-900 rounded"
            to="/blog"
            >Blog</NuxtLink
          >
          <!-- TODO: add back dark mode -->
          <!-- <button @click="darkModeEnabled = !darkModeEnabled">
            <svg
              v-if="darkModeEnabled"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <svg
              v-else
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button> -->
        </div>
      </nav>
      <main
        class="max-w-screen-lg mx-auto px-8 py-12 dark:bg-black dark:text-white"
      >
        <Nuxt />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      darkModeEnabled: false,
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: 'bg-white dark:bg-black dark:text-white',
      },
      htmlAttrs: {
        class: this.darkModeEnabled ? 'dark' : '',
      },
    }
  },
}
</script>
