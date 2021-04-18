<template>
  <div class="flex flex-col space-y-10">
    <div
      class="text-xl md:text-2xl flex flex-wrap justify-between items-center"
    >
      <div class="md:w-1/2 text-gray-800 dark:text-gray-200">
        <h1 class="leading-normal mb-5">
          Front end developer from Victoria, BC, currently living in Toronto,
          ON.
        </h1>
        <p class="leading-normal mb-5">
          Right now, I'm working at
          <a
            target="_blank"
            class="underline font-semibold"
            href="https://www.felixforyou.ca"
            >Felix</a
          >
          building new user facing solutions for the growing telehealth market.
          In my spare time, I love to take
          <a
            class="underline font-semibold"
            target="_blank"
            href="https://www.carsonbain.com"
            >photographs</a
          >
          and explore new technology.
        </p>
        <p class="leading-normal mb-5">
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
      <div class="md:w-1/2 md:max-w-md">
        <img
          alt="black and white illustration of Carson Bain"
          src="/profile-pic.jpg"
        />
      </div>
    </div>
    <div>
      <div class="flex items-center justify-between">
        <h2 class="text-xl md:text-2xl font-bold">Recent posts</h2>
        <NuxtLink
          class="border-b border-solid border-gray-800 flex items-center space-x-1"
          to="/blog"
          ><span>See all</span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-gray-700"
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
      <ul class="flex flex-col space-y-10 mt-8">
        <li
          v-for="article of articles"
          :key="article.slug"
          class="pb-10 border-b border-gray-200"
        >
          <NuxtLink :to="{ name: 'blog-slug', params: { slug: article.slug } }">
            <div class="max-w-prose">
              <div class="text-xs dark:text-gray-200 uppercase tracking-wide">
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
                class="mt-4 uppercase tracking-wide text-xs font-semibold text-gray-500 dark:text-gray-300 flex items-center"
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
      .limit(1)
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
