<template>
  <button 
    class="v-button" 
    :class="[`v-button--${type}`, `v-button--${size}`]" 
    :type="htmlType" 
    @click="increment"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'VButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'md' // [xs, s, md, lg]
    },
    htmlType: {
      type: String,
      default: 'button'
    }
  },
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    increment() {
      this.counter = this.counter + 1;
    }
  }
}
</script>

<style lang="postcss">
.v-button {
 @apply text-base rounded;
}

.v-button--default {
  @apply bg-gray-300;
}
.v-button--default:hover {
  @apply bg-gray-400;
}

.v-button--primary {
  @apply bg-blue-500 text-white;
}
.v-button--primary:hover {
  @apply bg-blue-600;
}

.v-button--md {
  @apply h-10 px-4;
}
.v-button--lg {
  @apply h-12 px-6;
}
</style>