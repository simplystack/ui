<template>
  <div
    class="outline-none"
    role="tabpanel"

    :id="id"
    :aria-hidden="active? null: 'true'"
    :tabindex="active ? '0' : null"
    :class="[active ? 'block' : 'hidden']"
  >
    <slot></slot>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import { nanoid } from 'nanoid';

export default {
  name: 'VTab',
  emits: ['select', 'deselect'],
  props: {
    id: {
      type: String,
      default() {
        return `tab-${nanoid()}`;
      },
    },
    title: String,
    selected: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  created() {
    this.$parent.addTab(this);
  },
  beforeUnmount() {
    this.$parent.removeTab(this);
  },
  methods: {
    activate() {
      this.active = true;
      this.$emit('select', this.id);
    },
    deactivate() {
      this.active = false;
      this.$emit('deselect', this.id);
    },
  },
  watch: {
    disabled() {
      this.$parent.onTabDisabledChange(this);
    },
  },
};
</script>
