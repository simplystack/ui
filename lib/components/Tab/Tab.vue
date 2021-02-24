<template>
  <div
    class="outline-none"
    role="tabpanel"

    :id="id"
    :aria-hidden="isActive? null: 'true'"
    :tabindex="isActive ? '0' : null"
    :class="[isActive ? 'block' : 'hidden', { 'tab--disabled': disabled }]"
  >
    <slot></slot>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import { nanoid } from 'nanoid';

export default {
  name: 'VTab',
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
      isActive: false,
    };
  },
  created() {
    this.$parent.addTab(this);
  },
  beforeDestroy() {
    this.$parent.removeTab(this);
  },
  methods: {
    activate() {
      this.isActive = true;
      this.$emit('select', this.id);
    },
    deactivate() {
      this.isActive = false;
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
