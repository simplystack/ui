<template>
  <label
    :tabindex="tabindex"
    class="group outline-none inline-flex items-center space-x-2"
    :class="[disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
    @keydown.space.prevent="$refs.input.click()"
    :for="id"
  >
    <input
      ref="input"
      type="radio"

      :id="id"
      hidden
      :checked="checked"
      :disabled="disabled"
      :name="name"
      :tabindex="tabindex"
      :value="trueValue"

      @blur="onBlur"
      @change="onChange"
      @focus="onFocus"

    >
    <span
      class="
        inline-flex items-center justify-center
        w-4 h-4
        border
        rounded-full
      "
      :class="[
        disabled
          ? 'bg-control-disabled border-control-default cursor-not-allowed'
          : isChecked
            ? `
                bg-control-primary
                border-control-primary
                group-focus:border-control-focus
                group-focus:ring-2
                group-focus:ring-primary/50
              `
            : `
                bg-control-default
                border-control-default
                group-hover:border-control-hover
                group-focus:border-control-focus
                group-focus:ring-2 group-focus:ring-primary/50
              `

      ]"
    >
      <span
        v-if="isChecked"
        class="inline-block bg-white w-1 h-1 rounded-full"
      ></span>
    </span>
    <span class="text-sm font-medium">
      {{ label }}
    </span>
  </label>
</template>

<script>
export default {
  name: 'VRadio',
  emits: ['update:modelValue', 'focus', 'blur', 'change'],
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
    modelValue: {
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
    tabindex: {
      type: [String, Number],
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    if (this.checked) {
      this.$emit('update:modelValue', this.trueValue);
      this.$emit('change', this.trueValue);
    }
  },
  computed: {
    isChecked() {
      // eslint-disable-next-line eqeqeq
      return (String(this.modelValue).length > 0) && (this.modelValue == this.trueValue);
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
    onChange() {
      if (this.disabled) {
        return;
      }
      // this.$emit('update:modelValue', this.isChecked, e);
      this.$emit('update:modelValue', this.trueValue);
      this.$emit('change', this.trueValue);
    },
    focus() {
      this.$refs.input.focus();
    },
  },
};
</script>
