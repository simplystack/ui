<template>
  <button
    class="button"
    :class="classes"
    :disabled="disabled || loading"
    :type="type"
    v-on="$listeners"
  >
    <div class="button__content">
      <slot />
    </div>
    <div class="button__icon" v-if="$slots.icon">
      <slot name="icon" />
    </div>
    <div class="button__loader" v-if="loading">
      <v-spinner
        :color="inverted ? 'white' : 'secondary'"
        :size="spinnerSize.size"
        :stroke="spinnerSize.stroke"
      />
    </div>
  </button>
</template>

<script>
import VSpinner from '../Spinner';

export default {
  name: 'VButton',
  props: {
    type: {
      type: String,
      default: 'button',
    },
    appearance: {
      type: String,
      default: 'default',
      validator(appearance) {
        return (
          [
            'default',
            'primary',
            'subtle',
            'danger',
          ].indexOf(appearance) > -1
        );
      },
    },
    size: {
      type: String,
      default: 'xl',
      validator(appearance) {
        return ['xs', 'sm', 'md', 'lg', 'xl'].indexOf(appearance) > -1;
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    iconFirst: {
      type: Boolean,
      default: false,
    },
    inverted: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return [
        `button--${this.appearance}`,
        `button--size-${this.size}`,
        { 'button--loading': this.loading },
        { 'button--icon-only': !this.$slots.default },
        { 'button--icon-first': this.iconFirst },
        { 'button--inverted': this.inverted },
      ];
    },
    spinnerSize() {
      switch (this.size) {
        case 'sm':
          return { size: 16, stroke: 5 };
        case 'md':
          return { size: 18, stroke: 5 };
        case 'lg':
          return { size: 20, stroke: 5 };
        default:
          return { size: 24, stroke: 5 };
      }
    },
  },
  components: { VSpinner },
};
</script>

<style lang="postcss">
.button {
  @apply inline-flex items-center text-base font-semibold;
  appearance: none;
  background-color: transparent;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  height: 48px;
  justify-content: center;
  margin: 0;
  outline: 0;
  padding: 0 24px;
  position: relative;
  text-decoration: none;
  vertical-align: middle;
  white-space: nowrap;
  &[disabled] {
    background-color: var(--color-background-button-disabled);
    color: var(--color-text-button-disabled);
    cursor: not-allowed;
  }
}

.button__icon {
  display: flex;
  margin-left: 4px;
}

.button--size-xs {
  font-size: 14px;
  height: auto;
  padding: 0;
}
.button--size-sm {
  border-radius: 3px;
  font-size: 14px;
  height: 24px;
  padding: 0 4px;
}
.button--size-md {
  border-radius: 3px;
  height: 32px;
  padding: 0 8px;
}
.button--size-lg {
  height: 40px;
  padding: 0 16px;
}
.button--size-xl {
  height: 48px;
  padding: 0 24px;
}

.button--default {
  background-color: var(--ui-02);
  color: var(--text-01);
  &:focus {
    box-shadow: 0 0 0 2px var(--color-background-button-default-focus);
  }
  &:hover:not([disabled]) {
    background-color: var(--color-background-button-default-hover);
  }
  &:active:not([disabled]) {
    background-color: var(--color-background-button-default-active);
  }
  &.button--inverted {
    background-color: var(--color-background-button-default-inverted);
    color: white;
    &:focus {
      box-shadow: 0 0 0 3px hsla(0, 0%, 100%, 0.4);
    }
    &[disabled] {
      background-color: var(
        --color-background-button-default-inverted-disabled
      );
      color: var(--color-button-default-inverted-disabled);
    }
    &:hover:not([disabled]) {
      background-color: var(--color-background-button-default-inverted-hover);
    }
    &:active:not([disabled]) {
      background-color: var(--color-background-button-default-inverted-active);
    }
  }
}

.button--subtle {
  background-color: var(--color-background-button-subtle);
  color: var(--color-text-button-subtle);
  &:focus {
    box-shadow: 0 0 0 2px var(--color-background-button-subtle-focus);
  }
  &:hover:not([disabled]) {
    background-color: var(--color-background-button-subtle-hover);
  }
  &:active:not([disabled]) {
    background-color: var(--color-background-button-subtle-active);
  }
  &.button--inverted {
    color: white;
    &:focus {
      box-shadow: 0 0 0 2px hsla(0, 0%, 100%, 0.4);
    }
    &[disabled] {
      background-color: var(--button-subtle-bg-color-inverted-disabled);
      color: var(--button-subtle-color-inverted-disabled);
    }
    &:hover:not([disabled]) {
      background-color: var(--button-subtle-bg-color-inverted-hover);
    }
    &:active:not([disabled]) {
      background-color: var(--button-subtle-bg-color-inverted-active);
    }
  }
}

.button--primary {
  @apply bg-interactive-01 text-white;
  &:focus {
    box-shadow: 0 0 0 2px var(--color-background-button-primary-focus);
  }
  &:hover:not([disabled]) {
    background-color: var(--color-background-button-primary-hover);
  }
  &:active:not([disabled]) {
    background-color: var(--color-background-button-primary-active);
  }
  &.button--inverted {
    &[disabled] {
      background-color: var(--button-primary-bg-color-inverted-disabled);
      color: var(--gray-300);
    }
  }
}

.button--danger {
  background-color: var(--color-background-button-danger);
  color: var(--text-color-button-danger);
  &:focus {
    box-shadow: 0 0 0 2px var(--red-300);
  }
  &:hover:not([disabled]) {
    background-color: var(--color-background-button-danger-hover);
  }
  &:active:not([disabled]) {
    background-color: var(--color-background-button-danger-active);
  }
  &.button--inverted {
    &[disabled] {
      background-color: var(--button-danger-bg-color-inverted-disabed);
      color: var(--gray-400);
    }
  }
}

.button[disabled].button--loading .button__content {
  visibility: hidden;
  opacity: 0;
}

.button__loader {
  position: absolute;
}

.button--icon-first {
  flex-direction: row-reverse;
  .button__icon {
    margin-left: 0;
    margin-right: 4px;
  }
}

.button--icon-only {
  padding: 0;
  width: 48px;

  .button__icon {
    margin-left: 0;
    margin-right: 0;
  }

  &.button--size-sm {
    border-radius: 3px;
    width: 24px;
  }
  &.button--size-md {
    border-radius: 3px;
    width: 32px;
  }
  &.button--size-lg {
    width: 40px;
  }
  &.button--size-xl {
    width: 48px;
  }
}
</style>
