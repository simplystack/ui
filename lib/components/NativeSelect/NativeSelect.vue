<template>
  <label class="inline-flex flex-col" :for="id">
    <span v-if="label" class="mb-1 font-medium text-sm text-secondary">{{ label }}</span>
    <select
      v-bind="$attrs"
      class="
        appearance-none
        bg-select-chevron
        bg-[right_0.5rem_center]
        bg-no-repeat
        bg-[length:1.5em_1.5em]
        bg-control-default
        border-control-default
        hover:border-control-default-hover
        focus:border-control-primary
        focus:ring-1
        focus:ring-primary
        h-12
        rounded
        outline-none
        text-sm
        border
        shadow-sm
        px-3
        pr-8"
    >
      <option
        v-for="option in options"
        :key="option.value"
        v-bind="genereteProps(option)"
      >
        {{ option.label }}
      </option>
    </select>
  </label>
</template>

<script>
export default {
  name: 'NativeSelect',
  props: {
    id: {
      type: String,
      default: '',
    },
    label: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    genereteProps(option) {
      const { label, ...props } = option;

      return props;
    },
  },
};
</script>
