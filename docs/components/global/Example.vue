<template>
  <div>
    <lazy-select-example v-if="name === 'select'" />
    <lazy-button-example v-if="name === 'button'" />
    <lazy-textbox-example v-if="name === 'textbox'" />
    <lazy-toggle-example v-if="name === 'toggle'" />
    <lazy-spinner-example v-if="name === 'spinner'" />
    <lazy-tabs-example v-if="name === 'tabs'" />
    <lazy-notification-example v-if="name === 'notification'" />
    <lazy-checkbox-example v-if="name === 'checkbox'" />
    <lazy-radio-example v-if="name === 'radio'" />
    <lazy-dropdown-example v-if="name === 'dropdown'" />
    <lazy-progress-example v-if="name === 'progress'" />
    <lazy-modal-example v-if="name === 'modal'" />
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
