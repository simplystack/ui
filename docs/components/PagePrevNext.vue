<template>
  <div class="flex justify-between items-center p-4">
    <NuxtLink
      v-if="prev"
      :to="toLink(prev)"
      class="text-ui-primary font-semibold flex items-center p-2 pl-0"
    >
      <ArrowNarrowLeftIcon class="w-4 h-4 mr-1" />
      {{ prev.title }}
    </NuxtLink>
    <span v-else>&nbsp;</span>
    <NuxtLink
      v-if="next"
      :to="toLink(next)"
      class="text-ui-primary font-semibold flex items-center p-2 pr-0"
    >
      {{ next.title }}
      <ArrowNarrowRightIcon class="w-4 h-4 ml-1" />
    </NuxtLink>
    <span v-else>&nbsp;</span>
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null
    },
    next: {
      type: Object,
      default: () => null
    },
    section: {
      type: String,
      default: ''
    }
  },
  methods: {
    toLink (link) {
      return this.localePath({
        name: 'section-category-slug',
        params: { section: this.$route.params.section, category: this.$route.params.category, slug: link.slug }
      })
    }
  }
}
</script>
