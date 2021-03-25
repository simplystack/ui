<template>
  <label class="radio" :for="id" :class="[{'radio--disabled': disabled}]">
    <input
      class="radio__input"
      type="radio"

      :id="id"
      :checked="checked"
      :disabled="disabled"
      :name="name"
      :tabindex="tabindex"
      :value="trueValue"

      @blur="onBlur"
      @change="onChange"
      @focus="onFocus"

    >
    <span class="radio__circle"></span>
    <span class="radio__text">{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: 'VRadio',
  props: {
    id: {
      type: [String, Number],
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    tabindex: {
      type: [String, Number],
    },
    value: {
      type: [Number, String],
      required: true,
    },
    trueValue: {
      type: [Number, String],
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    if (this.checked) {
      this.$emit('input', this.trueValue);
    }
  },
  computed: {
    isChecked() {
      // eslint-disable-next-line eqeqeq
      return (String(this.value).length > 0) && (this.value == this.trueValue);
    },
  },
  methods: {
    onFocus(e) {
      this.isActive = true;
      this.$emit('focus', e);
    },
    onBlur(e) {
      this.isActive = false;
      this.$emit('blur', e);
    },
    onChange(e) {
      if (!this.disabled) {
        this.$emit('input', this.trueValue);
      }

      this.$emit('change', this.isChecked, e);
    },
    focus() {
      this.$refs.input.focus();
    },
  },
};
</script>

<style lang="postcss">
.radio {
  @apply inline-flex items-center cursor-pointer;
}
.radio:hover .radio__circle {
  @apply border-control-hover;
}
.radio--disabled {
  @apply cursor-not-allowed;
}

.radio__circle {
  @apply block flex-shrink-0 relative h-5 w-5 border-control rounded-full mr-2 bg-primary;
}
.radio__input:checked + .radio__circle {
  @apply border-control-primary bg-control-primary;
}
.radio__circle:after {
  background: #fff;
  border-radius: 50%;
  content: "";
  height: 8px;
  left: 50%;
  opacity: 0;
  position: absolute;
  top: 50%;
  transform: translate(-50%,-50%) scale(.5);
  transition: transform 200ms ease;
  width: 8px;
}

.radio__input {
  @apply absolute appearance-none;
}
.radio__input:checked + .radio__circle:after {
  opacity: 1;
  transform: translate(-50%,-50%) scale(1);
}
.radio__input:focus + .radio__circle {
  @apply shadow;
}
.radio__input:disabled + .radio__circle {
  @apply bg-control-disabled border-control-disabled;
}
.radio__input[disabled]:checked + .radio__circle {
  @apply bg-control-disabled border-control-disabled;
}
.radio__text {
  @apply font-semibold;
}
</style>
