<template>
  <label class="textbox" :class="classes">
    <span v-if="label" class="textbox__label">{{ label }}</span>
    <input
      v-if="!multiline"
      ref="input"
      v-autofocus="autofocus"

      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @keydown="handleKeyDown"
      @change="handleChange"
      @paste="handlePaste"

      class="textbox__input"
      :value="modelValue"
      :placeholder="placeholder"
      :type="type"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"

      :min="min"
      :max="max"
      :step="step"
    />
    <textarea
      v-else
      ref="textarea"
      v-autofocus="autofocus"

      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @keydown="handleKeyDown"

      class="textbox__textarea"
      :readonly="readonly"
      :disabled="disabled"
      :required="required"
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
    />
    <span v-if="error" class="textbox__message">{{ errorText }}</span>
  </label>
</template>

<script>
import autofocus from '../../directives/autofocus';

export default {
  directives: { autofocus },
  emits: ['update:modelValue', 'focus', 'blur', 'reset', 'keydown', 'change', 'paste'],
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
      default: 'xl',
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
      return this.floated && this.modelValue !== '' && this.modelValue !== undefined && this.modelValue !== null;
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
      this.$emit('paste', event.target.value);
    },
  },
};
</script>

<style lang="postcss">
.textbox {
  @apply flex flex-col relative;
}

.textbox__input, .textbox__textarea {
  @apply bg-control-default w-full border-control rounded outline-none px-3;
}

.textbox__input:hover {
  @apply border-control-hover;
}

.textbox__input:focus, .textbox__textarea:focus {
  @apply shadow border-control-primary;
}

.textbox__label {
  @apply font-semibold mb-1;
}

.textbox__message {
  @apply text-danger text-sm;
}

.textbox--floated .textbox__label {
  @apply absolute font-bold uppercase text-secondary;
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
  @apply bg-control-disabled text-control-disabled border-control-disabled cursor-not-allowed;
}

.textbox--readonly .textbox__input, .textbox--readonly .textbox__textarea {
  @apply bg-control-disabled;
}

.textbox--error .textbox__input, .textbox--error .textbox__textarea {
  @apply border-control-danger;
}

.textbox--error .textbox__label, .textbox--error .textbox__label {
  @apply text-danger;
}

.textbox--size-sm .textbox__input {
  @apply h-6;
}
.textbox--size-md .textbox__input {
  @apply h-8;
}
.textbox--size-lg .textbox__input {
  @apply h-10;
}
.textbox--size-xl .textbox__input {
  @apply h-12;
}
.textbox--size-2xl .textbox__input {
  @apply h-16 text-xl font-semibold;
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
.textbox--size-xl .textbox__textarea {
  @apply py-3;
}
.textbox--size-xl.textbox--floated-active .textbox__textarea {
  padding-top: theme('height.5');
}
.textbox--size-2xl .textbox__textarea {
  @apply py-3 text-xl font-semibold;
}
</style>
