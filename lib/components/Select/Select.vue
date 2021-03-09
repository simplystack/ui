<template>
  <div class="select" :class="classes" v-clickoutside="handleClickOutside">
    <label v-if="showLabel" class="select__label">{{ label }}</label>

    <input
      type="hidden"
      :name="name"
      :value="value.value"
      :disabled="disabled"
    />

    <div
      ref="container"
      class="select__container"
      :tabindex="disabled ? null : tabindex"
      @focus="onFocus"
      @click="toggleDropdown"
      @keydown.space.prevent="toggleDropdown"
      @keydown.enter.prevent="toggleDropdown"
    >
      <div class="select__display" ref="toggle">
        <slot
          v-if="isSlotDisplayed"
          name="option"
          :option="multiple ? mutableValue[0] : mutableValue"
        >
        </slot>

        <div
          v-if="
            ($scopedSlots.option && mutableValue.length === 2) ||
            (!$scopedSlots.option && mutableValue.length > 0 && multiple)
          "
        >
          <v-chip
            class="select__selected-option"
            :title="mutableValue[0][keys.label]"
            closable
            @click.stop
            @keydown.delete.stop="deleteSelectedOption($event, mutableValue[0])"
            @delete="deleteSelectedOption($event, mutableValue[0])"
          />
          <v-chip
            v-if="mutableValue.length > 1"
            :title="`+ ${mutableValue.length - 1}`"
          />
        </div>

        <div v-if="mutableValue && !$scopedSlots.option">
          {{ mutableValue[keys.label] }}
        </div>

        <div class="select__placeholder" v-if="isPlaceholderVisible">
          {{ placeholder }}
        </div>
      </div>

      <v-cross-icon
        v-if="isSlotDisplayed && clearable && !disabled"
        @click.native.stop="clear"
        class="select__clear"
        height="16"
        width="16"
      />

      <v-chevron-down-icon v-else class="select__chevron" height="18" width="18" />
    </div>

    <div
      ref="dropdown"
      tabindex="-1"
      class="select__dropdown"
      @keydown.esc.prevent="closeDropdown()"
      @keydown.down.prevent="highlightOption('next')"
      @keydown.enter.prevent.stop="handleOnEnterSelectOption"
      @keydown.tab="onBlur"
      @keydown.up.prevent="highlightOption('prev')"
    >
      <div class="select__filter-wrapper" v-if="filterable">
        <input
          tabindex="0"
          ref="filter"
          type="text"
          placeholder="Search"
          v-model="query"
          class="select__filter"
          autocomplete="off"
        />
      </div>

      <v-select-option
        ref="options"
        v-for="(option, index) in filteredOptions"
        :option="option"
        :multiple="multiple"
        :key="index"
        :keys="keys"
        :disabled="option[keys.disabled]"
        :selected="isOptionSelected(option)"
        :highlighted="highlightedIndex === index"
        @click.native.stop="select(option, index)"
      >
        <slot name="option" :index="index" :option="option"></slot>
      </v-select-option>
    </div>
  </div>
</template>

<script>
import fuzzysearch from 'fuzzysearch';
import VChevronDownIcon from '../../icons/ChevronDownIcon.vue';
import VCrossIcon from '../../icons/CrossIcon.vue';
import VSelectOption from '../SelectOption';
import VChip from '../Chip';
import { isObjectEmpty } from '../../util';
import { scrollIntoView, resetScroll } from '../../util/elementScroll';
import clickoutside from '../../directives/clickoutside';

export default {
  name: 'VSelect',
  directives: { clickoutside },
  props: {
    id: {
      type: [Number, String],
    },
    tabindex: {
      type: [Number, String],
      default: 0,
    },
    name: {
      type: String,
    },
    label: {
      type: String,
      default: 'Label',
    },
    value: {
      type: [Array, Object],
      required: true,
    },
    showLabel: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
    },
    filterable: {
      type: Boolean,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
    error: {
      type: Boolean,
    },
    placeholder: {
      type: String,
      default: 'Placeholder',
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
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
  created() {
    this.mutableValue = this.multiple ? [] : this.value;
    this.mutableOptions = this.options.slice(0);
  },
  data() {
    return {
      query: '',
      isOpen: false,
      isActive: false,
      mutableValue: null,
      mutableOptions: [],
      highlightedIndex: -1,
    };
  },
  computed: {
    classes() {
      return [
        { 'select--open': this.isOpen },
        { 'select--error': this.error },
        { 'select--disabled': this.disabled },
      ];
    },
    isSlotDisplayed() {
      if (this.multiple) {
        return this.mutableValue.length > 0 && this.mutableValue.length <= 1;
      }
      return this.mutableValue !== '' && !isObjectEmpty(this.mutableValue);
    },
    isPlaceholderVisible() {
      return (
        this.mutableValue === ''
        || this.mutableValue === null
        || this.mutableValue.length === 0
        || Object.keys(this.mutableValue).length === 0
      );
    },
    filteredOptions() {
      if (!this.filterable) {
        return this.mutableOptions;
      }
      return this.mutableOptions.filter((option, index) => this.defaultFilter(option, index));
    },
  },
  methods: {
    handleClickOutside() {
      if (this.isOpen) {
        this.closeDropdown();
      } else if (this.isActive) {
        this.isActive = false;
      }
    },
    handleOnEnterSelectOption() {
      const option = this.filteredOptions[this.highlightedIndex];
      this.select(option);
    },
    select(option) {
      if (option.disabled) {
        return;
      }
      if (this.multiple) {
        if (this.isOptionSelected(option)) {
          this.deselect(option);
        } else {
          this.mutableValue.push(option);
          this.setValue(this.mutableValue);
        }
      } else {
        this.setValue(option);
        this.closeDropdown();
      }
      this.$emit('select', option);
    },
    deselect(option) {
      const indexOfOption = this.mutableValue.indexOf(option);
      this.mutableValue.splice(indexOfOption, 1);
    },
    setValue(value) {
      this.mutableValue = value;
      this.$emit('input', value);
      this.$emit('change', value);
    },
    toggleDropdown() {
      this[this.isOpen ? 'closeDropdown' : 'openDropdown']();
    },
    onOpen() {
      this.$nextTick(() => {
        this.$refs.dropdown.focus();
        this.scrollOptionIntoView(
          this.$refs.dropdown.querySelector('.select-option--selected'),
        );
      });
    },
    onBlur() {
      this.isActive = false;
      this.$emit('blur');
      if (this.isOpen) {
        this.closeDropdown();
      }
    },
    onFocus() {
      this.isActive = true;
      this.$emit('focus');
    },
    openDropdown() {
      if (!this.disabled) {
        this.isOpen = true;
        this.$refs.dropdown.focus();
      }
    },
    closeDropdown() {
      this.isOpen = false;
      this.$refs.container.focus();
      this.$nextTick(() => {
        this.query = '';
      });
    },
    isOptionSelected(option) {
      if (this.multiple) {
        return this.mutableValue.some(
          (value) => value[this.keys.label] === option[this.keys.label],
        );
      }
      return this.mutableValue[this.keys.label] === option[this.keys.label];
    },
    clear() {
      if (this.multiple) {
        this.setValue([]);
      } else {
        this.setValue({});
      }

      this.highlightedIndex = -1;

      this.$emit('clear');

      this.$nextTick(() => {
        resetScroll(this.$refs.dropdown);
      });
    },
    reset() {
      this.clear();
    },
    deleteSelectedOption(e, option) {
      const index = this.mutableValue.indexOf(option);
      if (index > -1) {
        this.mutableValue.splice(index, 1);
      }
      e.stopPropagation();
    },
    defaultFilter(option) {
      const query = this.query.toLowerCase();
      let text = option[this.keys.label];
      if (typeof text === 'string') {
        text = text.toLowerCase();
      }
      return fuzzysearch(query, text);
    },
    highlightOption(direction) {
      if (this.$refs.options.length === this.highlightedIndex) return;

      if (direction === 'next') {
        this.highlightedIndex += 1;
        if (this.highlightedIndex === this.$refs.options.length) {
          this.highlightedIndex = 0;
        }
      }
      if (direction === 'prev') {
        this.highlightedIndex -= 1;
        if (this.highlightedIndex < 0) {
          this.highlightedIndex = this.$refs.options.length - 1;
        }
      }

      const option = this.filteredOptions[this.highlightedIndex];

      if (option.disabled) {
        this.highlightOption(direction);
      }

      this.$nextTick(() => {
        this.scrollOptionIntoView(
          this.$refs.options[this.highlightedIndex].$el,
        );
      });
    },
    scrollOptionIntoView(optionEl) {
      scrollIntoView(optionEl, {
        container: this.$refs.dropdown,
        marginTop: 8,
      });
    },
  },
  watch: {
    value(val) {
      this.mutableValue = val;
    },
    options(val) {
      this.mutableOptions = val;
    },
    isOpen() {
      if (this.isOpen) {
        this.onOpen();
        this.$emit('open');
      } else {
        this.$emit('close');
      }
    },
    query() {
      this.highlightedIndex = 0;
    },
  },
  components: {
    VSelectOption,
    VChip,
    VChevronDownIcon,
    VCrossIcon,
  },
};
</script>

<style lang="postcss">
.select {
  @apply inline-block relative text-primary w-full;
}
.select__label {
  @apply block mb-2;
}

.select__container {
  @apply bg-control-default flex items-center justify-between border rounded cursor-pointer px-4;
  height: 48px;
  user-select: none;
}

.select__container:hover {
  @apply border-control-hover;
}

.select__container:focus {
  @apply outline-none border-brand shadow;
}

.select__input {
  @apply border-none p-0;
}

.select__filter-wrapper {
  margin-bottom: 8px;
  padding: 0 8px;
}

.select__filter {
  @apply border;
  border-radius: 3px;
  padding: 8px;
  width: 100%;
}
.select__filter:focus {
  @apply border-brand;
  outline: none;
}

.select__placeholder {
  @apply truncate text-placeholder;
}

.select__chevron,
.select__clear {
  @apply text-secondary;
  flex-shrink: 0;
  margin-left: 4px;
}

.select__chevron {
  transition: transform 200ms ease-in-out;
}

.select__display {
  overflow: hidden;
  text-align: left;
}

.select__selected-option {
  margin-right: 4px;
}

.select__dropdown {
  @apply absolute bg-base border z-10 shadow-lg;
  border-radius: 0 0 4px 4px;
  left: 0;
  margin-top: -1px;
  max-height: 180px;
  opacity: 0;
  outline: none;
  overflow-y: auto;
  padding: 8px 0;
  right: 0;
  top: 100%;
  visibility: hidden;
}

/* Disabled */
.select--disabled .select__display {
  @apply text-control-disabled;
}
.select--disabled .select__container {
  @apply bg-control-disabled border-control-disabled;
  cursor: not-allowed;
}

.select--disabled .select__chevron {
  @apply text-secondary;
}

.select--disabled .select__placeholder {
  @apply text-control-disabled;
}

/* Open */
.select--open .select__dropdown {
  @apply border-brand;
  opacity: 1;
  visibility: visible;
}

.select--open .select__container {
  @apply border-brand shadow;
  border-radius: 4px 4px 0 0;
}

.select--open .select__chevron {
  transform: rotate(180deg);
}

/* Error */
.select--error .select__container,
.select--error .select__dropdown {
  @apply border-control-danger;
}
</style>
