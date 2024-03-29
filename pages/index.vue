<template>
  <div class="flex flex-col space-y-16">
    <div class="text-lg md:text-xl flex flex-wrap justify-between items-center">
      <div class="text-gray-800 dark:text-gray-200">
        <h1 class="leading-normal mb-5">
          Front end developer from Victoria, BC, currently living in Toronto, ON
          📍.
        </h1>
        <p class="leading-normal mb-5">
          Right now, I'm working at
          <a
            target="_blank"
            class="underline font-semibold"
            href="https://www.felixforyou.ca"
            >Felix</a
          >
          building solutions for the growing telehealth market. In my spare
          time, I love to take
          <a
            class="underline font-semibold"
            target="_blank"
            href="https://www.carsonbain.com"
            >photographs.</a
          >
        </p>
        <p class="leading-normal">
          Follow me on
          <a
            class="underline font-semibold"
            target="_blank"
            href="https://github.com/CarsonBain"
            >GitHub</a
          >,
          <a
            class="underline font-semibold"
            target="_blank"
            href="https://twitter.com/carsonjbain"
            >Twitter</a
          >,
          <a
            class="underline font-semibold"
            target="_blank"
            href="http://instagram.com/carsonbain"
            >Instagram</a
          >, or
          <a class="underline font-semibold" href="mailto:carsonbain@gmail.com"
            >email me</a
          >.
        </p>
      </div>
    </div>
    <div>
      <div class="flex items-center justify-between">
        <h2 class="text-lg md:text-xl font-bold">Recent posts</h2>
        <NuxtLink
          class="
            border-b border-solid border-gray-900
            dark:border-gray-100
            flex
            items-center
            space-x-1
          "
          to="/blog"
          ><span>See all</span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-gray-900 dark:text-gray-100"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            /></svg
        ></NuxtLink>
      </div>
      <ul class="flex flex-col space-y-10 mt-6">
        <li
          v-for="article of articles"
          :key="article.slug"
          class="pb-10 border-b border-gray-200 dark:border-gray-600"
        >
          <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }">
            <div class="max-w-prose">
              <div class="text-sm dark:text-gray-200">
                {{ formatDate(article.createdAt) }}
              </div>
              <h2 class="text-lg md:text-xl font-bold mt-2">
                {{ article.title }}
              </h2>
              <p
                v-if="article.description"
                class="mt-2 leading-7 dark:text-gray-100"
              >
                {{ article.description }}
              </p>
              <div
                class="
                  mt-4
                  text-sm
                  dark:text-gray-100
                  inline-flex
                  items-center
                  border-b border-gray-900
                  dark:border-gray-100
                "
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
      .limit(3)
      .fetch()

    return {
      articles,
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
