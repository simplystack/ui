<template>
  <label
    :tabindex="tabindex"
    class="group outline-none inline-flex items-center space-x-2"
    :class="[disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
    @keydown.space.prevent="$refs.input.click()"
    :for="id"
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
      hidden
      @blur="onBlur"
      @focus="onFocus"
      @change="onChange"
    />
    <div
      class="w-4 h-4 border rounded-sm"
      :class="[
        disabled
          ? 'bg-control-disabled border-control-disabled'
          : isChecked
            // eslint-disable-next-line max-len
            ? 'bg-control-primary border-control-primary group-focus:border-control-focus group-focus:ring-2 group-focus:ring-primary/50'
            // eslint-disable-next-line max-len
            : 'bg-control-default border-control-default group-hover:border-control-hover group-focus:border-control-focus group-focus:ring-2 group-focus:ring-primary/50'

      ]"
    >
      <svg
        v-if="!disabled && isChecked"
        viewBox="0 0 16 16"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5
          9.086l4.293-4.293a1 1 0 011.414 0z"
        />
      </svg>
    </div>
    <span class="font-medium text-sm" :class="[{ 'text-secondary': disabled }]">{{ label }}</span>
  </label>
</template>

<script>
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
export function isObject(obj) {
  return obj === Object(obj);
}
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
export function looseEqual(a, b) {
  // eslint-disable-next-line eqeqeq
  return a == b || (
    isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false
  );
}

export default {
  name: 'UiCheckbox',
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
      required: false,
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
    tabindex: {
      type: [String, Number],
      default: 0,
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
    onFocus(e) {
      this.$emit('focus', e);
    },
    onBlur(e) {
      this.$emit('blur', e);
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
    focus() {
      this.$refs.input.focus();
    },
  },
  watch: {
    modelValue() {
      this.isChecked = looseEqual(this.modelValue, this.trueValue);
    },
  },
};
</script>
