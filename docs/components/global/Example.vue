<template>
  <div>
    <lazy-select-example v-if="name === 'select'" />
    <lazy-button-example v-if="name === 'button'" />
    <lazy-textbox-example v-if="name === 'textbox'" />
    <lazy-toggle-example v-if="name === 'toggle'" />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'default'
    }
  }
}
</script>
