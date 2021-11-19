<template>
  <div class="mx-auto">
    <h1 class="sr-only">Blog</h1>
    <div class="md:mt-8">
      <ul class="flex flex-col space-y-10">
        <li
          v-for="article of articles"
          :key="article.slug"
          class="pb-10 border-b border-gray-200 dark:border-gray-600"
        >
          <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }">
            <div class="max-w-prose">
              <div class="text-sm dark:text-gray-200 uppercase tracking-wide">
                {{ formatDate(article.createdAt) }}
              </div>
              <h2 class="text-xl font-bold mt-2">{{ article.title }}</h2>
              <p
                v-if="article.description"
                class="mt-2 leading-7 dark:text-gray-100"
              >
                {{ article.description }}
              </p>
              <div
                class="mt-4 uppercase tracking-wide text-sm font-semibold text-gray-500 dark:text-gray-100 flex items-center"
              >
                Read more
                <svg
                  class="w-4 h-4 ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .where({ draft: { $ne: true } })
      .only(['title', 'description', 'slug', 'createdAt', 'updatedAt'])
      .sortBy('createdAt', 'desc')
      .fetch()

    return {
      articles,
    }
  },
  head() {
    return {
      title: 'Carson Bain - Blog',
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>
