<template>
  <label
    :for="id"
    class="toggle"
    :class="[{'toggle--disabled': disabled}]"
  >
    <input
      :id="id"
      :name="name"
      :disabled="disabled"
      :checked.prop="isChecked"
      :value="submittedValue"
      :tabindex="tabindex"

      ref="input"
      type="checkbox"
      class="toggle__input"

      @blur="onBlur"
      @focus="onFocus"
      @change="onChange"
    >
    <span v-if="label" class="toggle__label">{{ label }}</span>
  </label>
</template>

<script>
import { looseEqual } from '../../util';

export default {
  name: 'UIToggle',
  emits: ['update:modelValue', 'focus', 'blur', 'change'],
  props: {
    id: {
      type: [String, Number],
    },
    name: {
      type: String,
    },
    label: {
      type: [String, Number],
    },
    modelValue: {
      required: true,
    },
    submittedValue: {
      type: String,
      default: 'on', // HTML default
    },
    checked: {
      type: Boolean,
      default: false,
    },
    trueValue: {
      default: true,
    },
    falseValue: {
      default: false,
    },
    indeterminate: {
      type: Boolean,
      default: false,
    },
    tabindex: [String, Number],
    vertical: {
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
      isChecked: looseEqual(this.modelValue, this.trueValue) || this.checked,
    };
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
    onChange(e) {
      const isCheckedPrevious = this.isChecked;
      const isChecked = e.target.checked;
      const value = isChecked ? this.trueValue : this.falseValue;

      this.$emit('update:modelValue', value, e);

      if (isCheckedPrevious !== isChecked) {
        this.$emit('change', value, e);
      }
    },
    onFocus(e) {
      this.$emit('focus', e);
    },
    onBlur(e) {
      this.$emit('blur', e);
    },
  },
  watch: {
    modelValue() {
      this.isChecked = looseEqual(this.modelValue, this.trueValue);
    },
  },
};
</script>

<style lang="postcss">
.toggle {
  @apply inline-flex items-center relative cursor-pointer;
}
.toggle--disabled {
  @apply cursor-not-allowed;
}
.toggle--disabled .toggle__label {
  @apply text-control-disabled;
}

.toggle:not(.toggle--disabled):hover .toggle__input:not(:checked) {
  --border-color: var(--color-control-border-hover);
  --background-color: var(--color-control-bg-default);
  --content-color: var(--color-control-border-hover);
}
.toggle:not(.toggle--disabled):hover .toggle__input:checked {
  --border-color: var(--color-control-bg-primary-hover);
  --background-color: var(--color-control-bg-primary-hover);
  --content-color: var(--color-control-typo-primary);
}

.toggle__input:not(:checked) {
  --border-color: var(--color-control-border-default);
  --background-color: var(--color-control-bg-default);
  --content-color: var(--color-control-border-default);
}
.toggle__input:checked {
  --border-color: var(--color-control-bg-primary);
  --background-color: var(--color-control-bg-primary);
  --content-color: var(--color-control-typo-primary);
}

.toggle__input:not(:checked):disabled {
  --border-color: var(--color-control-border-disabled);
  --background-color: var(--color-control-bg-disabled);
  --content-color: var(--color-control-typo-disabled);
}
.toggle__input:checked:disabled {
  --border-color: var(--color-control-border-disabled);
  --background-color: var(--color-control-bg-disabled);
  --content-color: var(--color-control-typo-disabled);
}

.toggle__input:checked::before {
  @apply translate-x-6;
}
.toggle__input {
  @apply border-control;
  border-color: var(--border-color);
  background-color: var(--background-color);
  @apply appearance-none relative inline-block flex-shrink-0 h-6 w-12 rounded-full;
}
.toggle__input::before {
  content: '';
  background-color: var(--content-color);
  @apply block h-6 w-6 absolute z-10 transform scale-75 rounded-full;
  @apply transition-transform ease-in-out duration-200;
  top: calc(var(--control-border-width) * -1);
}

.toggle__label {
  @apply font-semibold ml-2;
}
</style>
