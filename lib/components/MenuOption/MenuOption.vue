<template>
  <li
    class="menu-option"
    ref="menuOption"
    role="menuitem"
    :class="classes"
    :tabindex="isDivider || disabled ? null : '0'"
    v-bind="$attrs"
  >
    <slot v-if="!isDivider">
      <div class="menu-option__content">
        <div class="menu-option__text">{{ label }}</div>
      </div>
    </slot>
  </li>
</template>

<script>
export default {
  name: 'UIMenuOption',
  props: {
    type: String,
    label: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        'menu-option--divider': this.isDivider,
        'menu-option--disabled': this.disabled,
      };
    },
    isDivider() {
      return this.type === 'divider';
    },
  },
};
</script>

<style lang="postcss">
.menu-option {
  display: flex;
  position: relative;
  user-select: none;
  width: 100%;
}
.menu-option--divider {
  @apply bg-secondary;
  display: block;
  height: 1px;
  margin: 6px 0;
  padding: 0;
}
.menu-option:not(.menu-option--divider) {
  border-radius: 4px;
  cursor: pointer;
  font-weight: normal;
  min-height: 40px;
  outline: none;
}
.menu-option:hover:not(.menu-option--disabled):not(.menu-option--divider) {
  @apply bg-control-subtle-hover;
}
.menu-option:active:not(.menu-option--disabled):not(.menu-option--divider) {
  @apply bg-control-subtle-hover;
}
.menu-option:focus:not(.menu-option--disabled):not(.menu-option--divider) {
  @apply bg-control-subtle-hover;
}
.menu-option__content {
  align-items: center;
  display: flex;
  flex-grow: 1;
  min-height: 40px;
  padding: 0 16px;
}
.menu-option__text {
  @apply font-semibold;
  display: block;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.menu-option:not(.menu-option--divider).menu-option--disabled {
  @apply text-control-disabled;
  cursor: default;
}
</style>
