<template>
  <aside
    class="
      sidebar
      transform
      transition-transform
      ease-in-out
      duration-200
      bg-ui-background
      z-20
      fixed
      lg:sticky
      top-0
      overflow-y-auto
      py-8
      pr-4
      pl-4
      lg:translate-x-0
      lg:shadow-none
      w-64
      lg:w-auto
    "
    :class="[opened ? 'translate-x-0 shadow-lg' : '-translate-x-full']"
  >
    <ul class="space-y-1 mb-8">
      <li class="text-gray-700">
        <NuxtLink
          to="/"
          active-class="font-semibold text-ui-primary"
          class="block text-gray-600 transition-transform ease-in-out duration-300 transform hover:translate-x-1"
        >
          Guidelines
        </NuxtLink>
      </li>
      <li class="text-gray-700">
        Components
      </li>
      <li class="text-gray-700">
        Resources
      </li>
    </ul>
    <div v-for="(sublinks, group) in sortedLinks" :key="`links-${group}`" class="mb-8">
      <h3 class="uppercase tracking-wide font-bold text-sm lg:text-xs text-gray-700 mb-2">
        {{ $t(`content.${$route.params.section}.${group}`) }}
      </h3>

      <ul class="space-y-1">
        <li v-for="(link, index) in sublinks" :key="index" class="pl-2">
          <NuxtLink
            :to="toLink(group, link)"
            active-class="font-semibold text-ui-primary"
            class="block text-gray-600 transition-transform ease-in-out duration-300 transform hover:translate-x-1"
          >
            {{ link.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import sortBy from 'lodash.sortby'

export default {
  name: 'Sidebar',
  props: {
    links: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories[this.$i18n.locale]
    },
    options () {
      return this.$store.state.options
    },
    section () {
      return '/' + this.$route.params.section
    },
    opened () {
      return this.$store.state.sidebar.opened
    },
    sortedLinks () {
      const links = {}
      sortBy(Object.keys(this.links), (link) => {
        return Object.keys(this.$i18n.t(`content.${this.$route.params.section}`)).indexOf(link)
      }).forEach((key) => {
        links[key] = this.links[key]
      })
      return links
    }
  },
  methods: {
    toLink (group, link) {
      return this.localePath({
        name: 'section-category-slug',
        params: { section: this.$route.params.section, category: group, slug: link.slug }
      })
    },
    isOptionGroup (option) {
      return !!option.title
    }
    // handleClickOutside () {
    //   if (this.opened) {
    //     this.$store.dispatch('sidebar/close')
    //   }
    // }
  }
}
</script>

<style lang="postcss">
.sidebar {
  top: 0;
  left: 0;
  bottom: 0;

  @screen lg {
    height: calc(100vh - theme('height.16'));
    top: theme('height.16');
  }
}
</style>
