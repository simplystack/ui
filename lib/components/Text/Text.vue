<template>
  <component :is="tag" :class="[{'text-gray-600': secondary}]">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'UIText',
  props: {
    tag: {
      type: String,
      default: 'p',
    },
    secondary: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
