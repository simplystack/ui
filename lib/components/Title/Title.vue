<template>
  <component
    class="font-bold"
    :is="tag"
    :class="[
      {'text-6xl': this.level === 1},
      {'text-4xl': this.level === 2},
      {'text-3xl': this.level === 3},
      {'text-lg': this.level === 4}
    ]"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'UITitle',
  props: {
    level: {
      type: [String, Number],
      default: 1,
    },
  },
  computed: {
    tag() {
      if (this.level === 2) {
        return 'h2';
      }
      if (this.level === 3) {
        return 'h3';
      }
      if (this.level === 4) {
        return 'h4';
      }
      return 'h1';
    },
  },
};
</script>
