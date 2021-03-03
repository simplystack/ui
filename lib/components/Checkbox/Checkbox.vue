<template>
  <label :for="id" class="flex items-center" :class="{ 'checkbox--indeterminate' : indeterminate }">
    <input
      :id="id"
      :name="name"
      :disabled="disabled"
      :checked.prop="isChecked"
      :value="submittedValue"
      :tabindex="tabindex"

      ref="input"
      type="checkbox"
      class="checkbox__input"

      @blur="onBlur"
      @focus="onFocus"
      @change="onChange"
    />
    <div class="checkbox__squad"></div>
    <span class="checkbox__text">{{ label }}</span>
  </label>
</template>

<script>
import { looseEqual } from '../../util';

export default {
  name: 'VCheckbox',
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

      this.$emit('input', isChecked ? this.trueValue : this.falseValue, e);

      if (isCheckedPrevious !== isChecked) {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue, e);
      }
    },
    focus() {
      this.$refs.input.focus();
    },
  },
  watch: {
    value() {
      this.isChecked = looseEqual(this.value, this.trueValue);
    },
  },
};
</script>

<style lang="postcss">
.checkbox__squad {
  @apply relative h-5 w-5 border rounded mr-2 bg-base;
}

.checkbox__input {
  @apply absolute appearance-none;
}
.checkbox__input:checked + .checkbox__squad {
  @apply border-brand bg-brand;
}
.checkbox__input:checked + .checkbox__squad:after {
  border-bottom: 2px solid #fff;
  border-right: 2px solid #fff;
  bottom: 5px;
  content: "";
  display: block;
  height: 10px;
  left: 7px;
  opacity: 0;
  position: absolute;
  transform: rotate(45deg);
  transition: all 200ms ease;
  width: 5px;
}
.checkbox__input:checked + .checkbox__squad:after {
  opacity: 1;
}
.checkbox__input:focus + .checkbox__squad {
 @apply shadow;
}
.checkbox__input:disabled + .checkbox__squad {
  @apply bg-control-disabled;
}
.checkbox__input[disabled]:checked + .checkbox__squad {
  @apply bg-gray-500 border-gray-500;
}

.checkbox__text {
  @apply font-semibold;
}
</style>
