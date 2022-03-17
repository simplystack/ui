<template>
  <label class="relative flex items-start flex-col" :for="id">
    <span
      class="text-secondary text-sm mb-1"
      :class="[
        { 'absolute left-4': floated },
        floated
          ? filled
            ? 'top-[6px] text-[11px]'
            : 'top-3.5'
          : ''
      ]"
    >
      {{ label }}
    </span>
    <input
      v-if="!multiline"
      ref="input"

      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @keydown="handleKeyDown"
      @change="handleChange"
      @paste="handlePaste"

      :id="id"
      :value="modelValue"
      :type="type"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"

      :min="min"
      :max="max"
      :step="step"

      class="
        appearance-none
        outline-none
        border
        w-full
        h-12
        rounded
        px-4
        text-sm
        focus:ring-1
      "
      :class="[
        { 'pt-[16px]': floated && filled },
        disabled
          ? 'bg-control-disabled cursor-not-allowed'
          : error
            ? 'bg-control-default border-control-danger focus:ring-danger shadow-sm '
            // eslint-disable-next-line max-len
            : 'bg-control-default border-control-default hover:border-control-hover focus:border-control-focus focus:ring-primary shadow-sm '
      ]"
    />
    <textarea
      v-else
      ref="textarea"

      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @keydown="handleKeyDown"

      :id="id"
      :readonly="readonly"
      :disabled="disabled"
      :required="required"
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"

      class="
        appearance-none
        outline-none
        border
        w-full
        rounded
        px-4
        pt-6
        text-sm
        focus:ring-1
      "
      :class="[
        disabled
          ? 'bg-control-disabled cursor-not-allowed'
          : error
            ? 'bg-control-default border-control-danger focus:ring-danger shadow-sm '
            // eslint-disable-next-line max-len
            : 'bg-control-default border-control-default hover:border-control-hover focus:border-control-focus focus:ring-primary shadow-sm '
      ]"
    />
    <span v-if="error" class="text-xs text-danger mt-1">{{ errorText }}</span>
  </label>
</template>

<script>
export default {
  name: 'UiTextbox',
  emits: ['update:modelValue', 'focus', 'blur', 'reset', 'keydown', 'change', 'paste'],
  props: {
    id: {
      type: [Number, String],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    multiline: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'lg',
    },
    rows: {
      type: Number,
      default: 4,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorText: {
      type: String,
    },
    floated: {
      type: Boolean,
      default: true,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    min: {
      type: Number,
      default: -Infinity,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    filled() {
      return this.modelValue !== '' && this.modelValue !== undefined && this.modelValue !== null;
    },
  },
  data() {
    return {
      isTouched: false,
      isFocused: false,
      initialValue: this.modelValue,
    };
  },
  created() {
    if (this.modelValue === null) {
      this.initialValue = '';
      this.updateValue('');
    }
  },
  methods: {
    getInput() {
      return this.$refs.input || this.$refs.textarea;
    },
    setInputValue(value) {
      this.getInput().value = value;
    },
    focus() {
      this.getInput().focus();
    },
    blur() {
      this.getInput().blur();
    },
    select() {
      this.getInput().select();
    },
    clear() {
      this.$emit('update:modelValue', '');
      this.$emit('clear');
    },
    reset() {
      this.$emit('update:modelValue', this.initialValue);
      this.$emit('reset');
    },
    updateValue(value) {
      this.$emit('update:modelValue', value);
    },
    handleBlur(event) {
      this.isFocused = false;
      this.$emit('blur', event);
    },
    handleFocus(event) {
      this.isFocused = true;
      this.$emit('focus', event);
    },
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    handleKeyDown(event) {
      this.$emit('keydown', event);
    },
    handleChange(event) {
      this.$emit('change', event.target.value);
    },
    handlePaste(event) {
      this.$emit('paste', event);
    },
  },
};
</script>
