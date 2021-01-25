<template>
  <main class="container">
    <div class="lg:flex flex-1 flex-wrap">
      <Sidebar :links="links" class="lg:w-1/5" />
      <nuxt-child class="lg:w-4/5" />
    </div>
  </main>
</template>

<script>
import groupBy from 'lodash.groupby'

export default {
  name: 'Section',
  async asyncData ({ app, $content, store, route }) {
    let links = []

    try {
      links = await $content(app.i18n.locale, route.params.section, { deep: true })
        .only(['slug', 'title', 'menu', 'category', 'position'])
        .sortBy('position')
        .sortBy('title')
        .sortBy('menu')
        .fetch()
    } catch (e) {}

    return { links: groupBy(links, 'category') }
  }
}
</script>
