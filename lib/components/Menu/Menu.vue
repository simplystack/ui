<template>
  <ul class="menu" role="menu">
    <v-menu-option
      :key="option.id"
      :disabled="option[keys.disabled]"
      :label="option[keys.type] === 'divider' ? null : option[keys.label] || option"
      :type="option[keys.type]"

      @click="selectOption(option)"
      @keydown.enter.prevent="selectOption(option)"
      @keydown.esc.stop="closeMenu"

      v-for="option in options"
    >
      <slot name="option" :option="option"></slot>
    </v-menu-option>

    <div
      class="menu__focus-redirector"
      tabindex="0"

      @focus="redirectFocus"

      v-if="containFocus"
    ></div>
  </ul>
</template>

<script>
import VMenuOption from '../MenuOption';

export default {
  name: 'VMenu',
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    containFocus: {
      type: Boolean,
      default: false,
    },
    keys: {
      type: Object,
      default() {
        return {
          type: 'type',
          label: 'label',
          disabled: 'disabled',
        };
      },
    },
  },
  methods: {
    selectOption(option) {
      if (option.disabled || option.type === 'divider') {
        return;
      }
      this.$emit('select', option);
      this.closeMenu();
    },
    closeMenu() {
      this.$emit('close');
    },
    redirectFocus(e) {
      e.stopPropagation();
      this.$el.querySelector('.menu-option').focus();
    },
  },
  components: {
    VMenuOption,
  },
};
</script>

<style lang="postcss">
.menu {
  @apply outline-none text-primary p-1;
  list-style: none;
  max-height: 100vh;
  max-width: 272px;
  min-width: 168px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
