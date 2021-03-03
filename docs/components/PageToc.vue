<template>
  <div class="article-toc lg:sticky top-0 overflow-y-auto overflow-x-hidden lg:pl-4 lg:pb-8">
    <div>
      <h3
        class="mb-3 lg:mb-2 uppercase tracking-wide font-bold text-sm lg:text-xs"
      >
        {{ $t('toc.title') }}
      </h3>
      <nav>
        <scrollactive highlight-first-item active-class="text-brand" :offset="0" tag="ul">
          <li
            v-for="link of toc"
            :key="link.id"
            class="text-secondary"
            :class="{
              'border-t border-dashed first:border-t-0 font-semibold': link.depth === 2
            }"
          >
            <a
              :href="`#${link.id}`"
              class="block text-sm scrollactive-item transition-transform ease-in-out duration-300 transform hover:translate-x-1"
              :class="{
                'py-2': link.depth === 2,
                'ml-2 pb-2': link.depth === 3
              }"
            >{{ link.text }}</a>
          </li>
        </scrollactive>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toc: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="postcss">
.article-toc {
  top: theme('height.24');
}
</style>
