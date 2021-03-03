<template>
  <div class="dropdown">
    <v-popover
      ref="popover"
      contain-focus

      @open="onOpen"
      @close="onClose"
      :disabled="disabled"
      :placement="placement"
    >
      <template v-slot:toggle>
        <slot name="toggle"></slot>
      </template>

      <v-menu
        @select="onSelect"
        @close="$refs.popover.close()"
        :options="options"
        :contain-focus="containFocus"
      />
    </v-popover>
  </div>
</template>

<script>
import VPopover from '../Popover';
import VMenu from '../Menu';

export default {
  name: 'VDropdown',
  props: {
    placement: {
      type: String,
      default: 'bottom',
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    containFocus: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onSelect(option) {
      this.$emit('select', option);
    },
    onOpen() {
      this.$emit('open');
    },
    onClose() {
      this.$emit('close');
    },
  },
  components: {
    VPopover,
    VMenu,
  },
};
</script>
