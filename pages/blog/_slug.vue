<template>
  <div>
    <NuxtLink
      to="/blog"
      class="uppercase tracking-wide text-sm font-semibold text-gray-600 flex items-center mb-8"
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
      <nuxt-content class="prose" :document="article" />
    </article>
    <NuxtLink
      to="/blog"
      class="uppercase tracking-wide text-sm font-semibold text-gray-600 flex items-center mt-12"
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
import getSiteMeta from '../../utils/getSiteMeta'

export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        ...this.meta,
        {
          property: 'article:published_time',
          content: this.article.createdAt,
        },
        {
          property: 'article:modified_time',
          content: this.article.updatedAt,
        },
        {
          property: 'article:tag',
          content: this.article.tags ? this.article.tags.toString() : '',
        },
        { name: 'twitter:label1', content: 'Written by' },
        { name: 'twitter:data1', content: 'Carson Bain' },
        { name: 'twitter:label2', content: 'Filed under' },
        {
          name: 'twitter:data2',
          content: this.article.tags ? this.article.tags.toString() : '',
        },
      ],
    }
  },
  computed: {
    meta() {
      const metaData = {
        type: 'article',
        title: this.article.title,
        description: this.article.description,
        url: `${this.$config.baseUrl}/articles/${this.$route.params.slug}`,
        mainImage: this.article.image,
      }
      return getSiteMeta(metaData)
    },
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
