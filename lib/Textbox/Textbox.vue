<template>
  <div 
    class="v-textbox"
    :class="[`v-textbox--${size}`]"
  >
    <input class="v-textbox__input" :type="type" :placeholder="placeholder" v-model="value" />
  </div>
</template>

<script>
export default {
  name: 'VButton',
  props: {
    value: {},
    placeholder: {
      type: String,
      default: 'placeholder'
    },
    size: {
      type: String,
      default: 'md' // [xs, s, md, lg]
    },
    type: {
      type: String,
      default: 'text'
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
.v-textbox__input {
  @apply border rounded
}

.v-button--md > .v-textbox__input {
  @apply h-10 px-4;
}
.v-button--lg > .v-textbox__input {
  @apply h-12 px-6;
}
</style>