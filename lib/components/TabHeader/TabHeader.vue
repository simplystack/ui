<template>
  <li
    class="relative py-2 mr-6"
    role="tab"
    :aria-controls="id"
    :aria-selected="active ? 'true' : null"
    :tabindex="active ? 0 : -1"
    :class="[active ? '' : '']"
  >
    <a @click="onClick" href="#" class="tabs__link" :class="classes">
      <div class="font-semibold">{{ title }}</div>
    </a>
    <div
      v-if="active"
      class="absolute left-0 border-b-2 border-primary w-full"
      style="bottom: -2px;"
    ></div>
  </li>
</template>

<script>
export default {
  name: 'VTabHeader',
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
        this.active ? '' : 'text-secondary',
        { 'tabs__link--active': this.active },
        { 'tabs__link--disabled': this.disabled },
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
