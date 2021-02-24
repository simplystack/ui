<template>
  <label class="textbox" :class="classes">
    <span v-if="label" class="textbox__label">{{ label }}</span>
    <input
      v-if="!multiline"
      ref="input"
      v-autofocus="autofocus"

      @blur="handleBlur"
      @change="handleChange"
      @focus="handleFocus"
      @input="handleInput"
      @keydown="handleKeyDown"

      class="textbox__input placeholder-gray-600"
      :value="value"
      :placeholder="placeholder"
      :type="type"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
    />
    <textarea
      v-else
      ref="textarea"
      v-autofocus="autofocus"

      @blur="handleBlur"
      @change="handleChange"
      @focus="handleFocus"
      @input="handleInput"
      @keydown="handleKeyDown"

      class="textbox__textarea placeholder-gray-600"
      :readonly="readonly"
      :disabled="disabled"
      :required="required"
      :value="value"
      :rows="rows"
      :placeholder="placeholder"
    />
    <span v-if="error" class="text-red-500 text-sm">{{ errorText }}</span>
  </label>
</template>

<script>
import autofocus from '../../directives/autofocus';

export default {
  directives: { autofocus },
  props: {
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
    value: {
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
  },
  computed: {
    floatedActive() {
      return this.floated && this.value !== '' && this.value !== undefined && this.value !== null;
    },
    classes() {
      return [
        `textbox--size-${this.size}`,
        { 'textbox--disabled': this.disabled },
        { 'textbox--readonly': this.readonly },
        { 'textbox--error': this.error },
        { 'textbox--floated': this.floated },
        { 'textbox--floated-active': this.floatedActive },
      ];
    },
  },
  data() {
    return {
      isTouched: false,
      isFocused: false,
      initialValue: this.value,
    };
  },
  created() {
    if (this.value === null) {
      this.initialValue = '';
      this.updateValue('');
    }
  },
  methods: {
    getInput() {
      return this.$refs.input || this.$refs.textarea;
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
      this.$emit('input', '');
      this.$emit('change', '');
      this.$emit('clear');
    },
    reset() {
      this.$emit('input', this.initialValue);
      this.$emit('change', this.initialValue);
      this.$emit('reset');
    },
    updateValue(value) {
      this.$emit('input', value);
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
      this.$emit('input', event.target.value);
    },
    handleChange(event) {
      this.$emit('change', event.target.value);
    },
    handleKeyDown(event) {
      this.$emit('keydown', event);
    },
  },
};
</script>

<style lang="postcss">
  .textbox {
    @apply flex flex-col relative;
  }

  .textbox__input, .textbox__textarea {
    @apply w-full border rounded outline-none px-3;
    background-color: var(--field-01);
  }

  .textbox__input:focus, .textbox__textarea:focus {
    @apply shadow border-primary;
  }

  .textbox__label {
    @apply font-semibold mb-1;
  }

  .textbox--floated .textbox__label {
    /* @apply absolute uppercase text-secondary; */
    font-weight: 800;
    font-size: 10px;
    padding: 7px 0 0 12px;
    opacity: 0;
    visibility: hidden;
  }

  .textbox--floated-active .textbox__label {
    opacity: 1;
    visibility: visible;
  }

  .textbox--floated-active .textbox__input {
    padding-top: 16px;
  }

  .textbox--disabled .textbox__input, .textbox--disabled .textbox__textarea {
    /* @apply text-secondary; */
    /* background-color: var(--color-background-input-disabled); */
  }

  .textbox--readonly .textbox__input, .textbox--readonly .textbox__textarea {
    /* background-color: var(--color-background-input-disabled); */
  }

  .textbox--error .textbox__input, .textbox--error .textbox__textarea {
    border-color: theme('colors.red.500');
  }

  .textbox--error .textbox__label, .textbox--error .textbox__label {
    color: theme('colors.red.500');
  }

  .textbox--size-xs .textbox__input {
    @apply h-6;
  }
  .textbox--size-sm .textbox__input {
    @apply h-8;
  }
  .textbox--size-md .textbox__input {
    @apply h-10;
  }
  .textbox--size-lg .textbox__input {
    @apply h-12;
  }
  .textbox--size-xl .textbox__input {
    @apply h-16 text-xl font-semibold;
  }

  .textbox--size-xs .textbox__textarea {
    @apply py-3;
  }
  .textbox--size-sm .textbox__textarea {
    @apply py-3;
  }
  .textbox--size-md .textbox__textarea {
    @apply py-3;
  }
  .textbox--size-lg .textbox__textarea {
    @apply py-3;
  }
  .textbox--size-lg.textbox--floated-active .textbox__textarea {
    padding-top: theme('height.5');
  }
  .textbox--size-xl .textbox__textarea {
    @apply py-3 text-xl font-semibold;
  }
</style>
