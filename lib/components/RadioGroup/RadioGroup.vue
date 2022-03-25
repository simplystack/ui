<template>
  <div>
    <div class="font-medium text-sm mb-1">{{ label }}</div>
    <div
      class="flex"
      :class="[vertical ? 'items-start flex-col space-y-4' : 'items-center space-x-4']"
    >
      <div
        :key="option[keys.id] || `${name}-${i}`"
        v-for="(option, i) in options"
      >
        <v-radio
          :id="option[keys.id] || `${name}-${i}`"
          :label="option[keys.label] || option"
          :checked="isOptionCheckedByDefault(option)"
          :disabled="disabled || option[keys.disabled]"
          :key="option[keys.id]"
          :name="name"
          :tabindex="tabindex"
          :true-value="option[keys.value] || option"

          @blur="onBlur"
          @focus="onFocus"

          v-model="selectedOptionValue"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VRadio from '../Radio';

export default {
  name: 'VRadioGroup',
  emits: ['update:modelValue', 'focus', 'blur'],
  props: {
    name: {
      type: String,
      required: true,
    },
    tabindex: {
      type: [String, Number],
    },
    label: {
      type: String,
    },
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: [Number, String],
      required: true,
    },
    keys: {
      type: Object,
      default() {
        return {
          id: 'id',
          label: 'label',
          value: 'value',
          checked: 'checked',
          disabled: 'disabled',
        };
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      initialValue: this.modelValue,
      selectedOptionValue: this.modelValue,
    };
  },
  methods: {
    reset() {
      this.$emit('update:modelValue', this.initialValue);
    },
    isOptionCheckedByDefault(option) {
      // eslint-disable-next-line eqeqeq
      return this.initialValue == option[this.keys.value] || this.initialValue == option
        || option[this.keys.checked];
    },
    onFocus(e) {
      this.$emit('focus', e);
    },
    onBlur(e) {
      this.$emit('blur', e);
    },
  },
  watch: {
    selectedOptionValue() {
      this.$emit('update:modelValue', this.selectedOptionValue);
      // this.$emit('change', this.selectedOptionValue);
    },
    value() {
      this.selectedOptionValue = this.modelValue;
    },
  },
  components: { VRadio },
};
</script>
