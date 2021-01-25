<template>
  <div class="flex flex-col lg:flex-row">
    <div class="order-2 lg:order-none w-full lg:w-3/4 border-ui-border lg:border-r lg:border-l py-4 lg:py-8">
      <article class="content lg:px-8">
        <nuxt-content :document="page" />
      </article>
      <!-- <PageEdit :document="page" />
      <LazyPagePrevNext
        :prev="prev"
        :next="next"
        section="api"
      /> -->
    </div>
    <div class="order-1 lg:order-none w-full lg:w-1/4 lg:pl-4 py-4 lg:py-8">
      <!-- <PageToc v-if="page.toc && page.toc.length" :toc="page.toc" /> -->
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

    return {
      page,
      prev,
      next,
      section: params.section,
      fodler: params.category,
      slug: params.slug
    }
  }
}
</script>
