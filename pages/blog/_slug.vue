<template>
  <div>
    <NuxtLink
      to="/blog"
      class="uppercase tracking-wide text-sm font-semibold text-gray-600 flex items-center mb-8 md:mb-12"
    >
      <svg
        class="w-4 h-4 mr-1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
          clip-rule="evenodd"
        />
      </svg>
      Back to blog</NuxtLink
    >
    <article>
      <nuxt-content class="max-w-prose mx-auto" :document="article" />
    </article>
    <NuxtLink
      to="/blog"
      class="uppercase tracking-wide text-sm font-semibold text-gray-600 flex items-center my-12"
    >
      <svg
        class="w-4 h-4 mr-1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
          clip-rule="evenodd"
        />
      </svg>
      Back to blog</NuxtLink
    >
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.article.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.article.description,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://dev.carsonbain.com/blog/${this.$route.params.slug}`,
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: `https://dev.carsonbain.com/blog/${this.$route.params.slug}`,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.article.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.article.description,
        },
        {
          property: 'article:published_time',
          content: this.article.createdAt,
        },
        {
          property: 'article:modified_time',
          content: this.article.updatedAt,
        },
        { name: 'twitter:label1', content: 'Written by' },
        { name: 'twitter:data1', content: 'Carson Bain' },
      ],
    }
  },
}
</script>

<style lang="scss">
.nuxt-content {
  & .nuxt-content-highlight {
    @apply relative;

    /* Style filename span added by @nuxt/content */
    & > .filename {
      @apply absolute;
      @apply right-0;
      @apply top-0;
      @apply text-blue-600;
      @apply z-10;
      @apply font-mono;
      @apply text-xs;
      @apply bg-blue-200;
      @apply p-1;
      @apply rounded;
      @apply tracking-tight;
      @apply leading-none;
      @apply mr-4;
      @apply mt-3;
    }

    /* Add top padding to code blocks with filename */
    & > .filename + pre[class*='language-'] {
      @apply pt-8;
    }
  }
}
</style>
