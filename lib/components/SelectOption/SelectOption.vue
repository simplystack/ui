<template>
  <div class="select-option" :class="classes" :data-value="option[keys.value]">
    <slot>
      <div>{{ option[keys.label] }}</div>
    </slot>
    <div
      v-if="multiple && !disabled"
      class="select-option__checkbox"
      :class="{ 'select-option__checkbox--selected': selected }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'VSelectOption',
  props: {
    option: {
      type: [String, Object],
    },
    selected: Boolean,
    highlighted: Boolean,
    disabled: Boolean,
    multiple: Boolean,
    keys: {
      type: Object,
      default() {
        return {
          label: 'label',
          value: 'value',
          image: 'image',
          disabled: 'disabled',
        };
      },
    },
  },
  computed: {
    classes() {
      return [
        { 'select-option--selected': this.selected },
        { 'select-option--highlighted': this.highlighted },
        { 'select-option--disabled': this.disabled },
      ];
    },
  },
};
</script>

<style lang="postcss">
.select-option {
  align-items: center;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  margin: 4px 8px;
  padding: 4px 8px;
  text-align: left;
}

.select-option--highlighted {
  background-color: var(--color-background-select-option-highlighted);
}

.select-option--selected {
  background-color: var(--color-background-select-option-selected);
  color: var(--color-primary);
}

.select-option:hover:not(.select-option--disabled) {
  background-color: var(--color-background-select-option-hover);
  cursor: pointer;
}

.select-option:active:not(.select-option--disabled) {
  background-color: var(--color-background-select-option-active);
}

.select-option:focus:not(.select-option--disabled) {
  box-shadow: inset 0 0 0 2px var(--blue-300);
}

.select-option--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.select-option__checkbox {
  position: relative;
  align-items: center;
  background-color: #fff;
  border-radius: 50%;
  color: white;
  display: flex;
  height: 20px;
  justify-content: center;
  width: 20px;
}

.select-option__checkbox:after {
  border-bottom: 2px solid #fff;
  border-right: 2px solid #fff;
  bottom: 6px;
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

.select-option__checkbox--selected {
  @apply bg-blue-500;
  border: none;
}

.select-option__checkbox--selected.select-option__checkbox:after {
  opacity: 1;
}
</style>
