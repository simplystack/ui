<template>
  <li
    class="tab-header"
    role="tab"
    :aria-controls="id"
    :aria-selected="active ? 'true' : null"
    :tabindex="active ? 0 : -1"
    :class="[active ? '' : '']"
  >
    <a @click="onClick" href="#" class="tab-header__link" :class="classes">
      {{ title }}
    </a>
    <div
      v-if="active"
      class="tab-header__indicator"
      style="bottom: -2px;"
    ></div>
  </li>
</template>

<script>
export default {
  name: 'UITabHeader',
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return [
        { 'tab-header__link--active': this.active },
        { 'tab-header__link--disabled': this.disabled },
      ];
    },
  },
  methods: {
    onClick(e) {
      e.preventDefault();
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="postcss">
.tab-header {
  @apply relative py-2 mr-6;
}
.tab-header__indicator {
  @apply absolute left-0 border-b-2 border-brand w-full;
}
.tab-header__link {
  @apply font-semibold text-secondary;
}
.tab-header__link--active {
  @apply text-primary;
}
.tab-header__link--disabled {
  @apply opacity-50;
}
</style>
