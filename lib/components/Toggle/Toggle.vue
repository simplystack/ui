<template>
  <label
    :for="id"
    class="relative cursor-pointer"
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
      class="sr-only"

      @blur="onBlur"
      @focus="onFocus"
      @change="onChange"
    >
    <span v-if="label" class="font-bold">{{ label }}</span>
    <span class="relative block h-6 w-12 rounded-full" :class="containerClasses">
      <span
        class="
        scale-75
        block
        absolute
        z-10
        transform
        h-6
        w-6
        bg-white
        rounded-full
        transition
        ease-in-out
        duration-200
      "
        :class="circleClasses"
      ></span>
    </span>
  </label>
</template>

<script>
import { looseEqual } from '../../util';

export default {
  name: 'VToggle',
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
    value: {
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
      isChecked: looseEqual(this.value, this.trueValue) || this.checked,
    };
  },
  created() {
    this.$emit('input', this.isChecked ? this.trueValue : this.falseValue);
  },
  computed: {
    circleClasses() {
      return [{ 'translate-x-6': this.isChecked }];
    },
    containerClasses() {
      return [this.isChecked ? 'bg-green-500' : 'bg-alt-3'];
    },
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
    onChange(e) {
      const isCheckedPrevious = this.isChecked;
      const isChecked = e.target.checked;
      this.$emit('input', isChecked ? this.trueValue : this.falseValue, e);
      if (isCheckedPrevious !== isChecked) {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue, e);
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
    value() {
      this.isChecked = looseEqual(this.value, this.trueValue);
    },
  },
};
</script>
