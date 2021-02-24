<template>
  <div class="flex flex-col lg:flex-row">
    <div class="order-2 lg:order-none w-full lg:w-3/4 py-4">
      <div class="bg-ui-01 border shadow rounded lg:py-8">
        <article class="content lg:px-8">
          <nuxt-content :document="page" />
        </article>
      </div>
      <!-- <PageEdit :document="page" /> -->
      <LazyPagePrevNext
        :prev="prev"
        :next="next"
        :section="section"
      />
    </div>
    <div class="order-1 lg:order-none w-full lg:w-1/4 lg:pl-4 py-4 lg:py-8">
      <PageToc v-if="page.toc && page.toc.length" :toc="page.toc" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slug',
  scrollToTop: true,
  async asyncData ({ $content, app, params, error }) {
    const path = `${app.i18n.locale}/${params.section}/${params.category}`
    let page, next, prev

    try {
      page = await $content(path, params.slug).fetch()
    } catch (e) {
      return error({ statusCode: 404, message: 'Page not found' })
    }

    try {
      [prev, next] = await $content(path)
        .only(['title', 'slug', 'dir', 'menu'])
        .sortBy('position')
        .sortBy('title')
        .sortBy('menu')
        .surround(params.slug, { before: 1, after: 1 })
        .fetch()
    } catch (e) {}

    return {
      page,
      prev,
      next,
      section: params.section,
      folder: params.category,
      slug: params.slug
    }
  }
}
</script>
