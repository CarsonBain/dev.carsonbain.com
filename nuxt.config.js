export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Carson Bain',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Carson Bain front end developer.',
      },
      { property: 'og:site_name', content: 'Carson Bain' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https:/dev.carsonbain.com',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Carson Bain',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Carson Bain front end developer.',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/home-image.jpg',
      },
      { property: 'og:image:width', content: '740' },
      { property: 'og:image:height', content: '300' },

      { name: 'twitter:site', content: '@carsonjbain' },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://dev.carsonbain.com',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Carson Bain',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'Carson Bain front end developer',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: '/home-image.jpg',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxt/content'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-coldark-cold.css',
      },
    },
  },
}
