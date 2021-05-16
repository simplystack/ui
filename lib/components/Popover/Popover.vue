<template>
  <div class="popover" @keydown.esc="close" :class="{'popover--has-max-height': hasMaxHeight}">

    <slot name="toggle"></slot>

    <div
      ref="content"
      role="dialog"
      class="popover__content"
      aria-haspopup="true"
      :aria-expanded="isActive"
      tabindex="-1"
      v-if="isActive"
    >
      <slot></slot>

      <div class="popover__focus-redirector" tabindex="0" @focus="restrictFocus"></div>
    </div>
  </div>
</template>

<script>
import Popper from 'popper.js';

export default {
  name: 'VPopover',
  emits: ['open', 'close'],
  props: {
    trigger: {
      type: String,
      default: 'click',
    },
    containFocus: {
      type: Boolean,
      default: false,
    },
    hasMaxHeight: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String,
      default: 'bottom',
    },
    offset: {
      type: [String, Number],
      default: '0',
    },
    manualOpen: {
      type: Boolean,
      default: false,
    },
    manualClose: {
      type: Boolean,
      default: false,
    },
    returnFocusOnClose: {
      type: Boolean,
      default: true,
    },
    focusRedirector: Function,
  },
  data() {
    return {
      isActive: false,
      popperInstance: null,
    };
  },
  mounted() {
    this.addEventsListeners();
  },
  computed: {
    triggerEl() {
      return this.$el.children[0];
    },
    popperOptions() {
      return {
        placement: this.placement,
        modifiers: {
          offset: {
            offset: this.offset,
          },
        },
      };
    },
  },
  methods: {
    addEventsListeners() {
      switch (this.trigger) {
        case 'click':
          if (!this.manualClose) document.addEventListener('click', this.handleClickOutside, true);
          if (!this.manualOpen) this.triggerEl.addEventListener('click', this.toggle);
          break;
        case 'hover':
          if (!this.manualOpen) this.triggerEl.addEventListener('mouseenter', this.show);
          if (!this.manualClose) document.addEventListener('mousemove', this.handleClickOutside, true);
          break;
        default:
          throw new Error(`[popover] ${this.trigger} is not defined`);
      }
    },
    removeEventsListeners() {
      switch (this.trigger) {
        case 'click':
          if (!this.manualClose) document.removeEventListener('click', this.handleClickOutside, true);
          this.triggerEl.removeEventListener('click', this.toggle);
          break;
        case 'hover':
          if (!this.manualOpen) this.triggerEl.removeEventListener('mouseenter', this.show);
          if (!this.manualClose) document.removeEventListener('mousemove', this.handleClickOutside, true);
          break;
        default:
          throw new Error(`[popover] ${this.trigger} is not defined`);
      }
    },
    toggle() {
      return this.isActive ? this.close() : this.show();
    },
    show() {
      if (this.disabled) return;
      if (this.isActive) return;

      this.isActive = true;

      this.$nextTick(() => {
        this.initPopper();
        this.updatePopper();
        this.$el.focus();
        this.$emit('open');
      });
    },
    close() {
      this.isActive = false;

      this.$nextTick(() => {
        this.destroyPopper();
        this.$emit('close');
      });

      if (this.returnFocusOnClose) {
        this.triggerEl.focus();
      }
    },
    restrictFocus(e) {
      if (!this.containFocus) {
        this.close();
        return;
      }
      e.stopPropagation();
      if (this.focusRedirector) {
        this.focusRedirector(e);
      } else {
        this.$el.focus();
      }
    },
    initPopper() {
      this.popperInstance = new Popper(this.triggerEl, this.$refs.content, this.popperOptions);
    },
    updatePopper() {
      this.popperInstance.scheduleUpdate();
    },
    destroyPopper() {
      if (this.popperInstance) {
        this.popperInstance.destroy();
        this.popperInstance = null;
      }
    },
    handleClickOutside(e) {
      if (!this.$el.contains(e.target) && !this.triggerEl.contains(e.target) && this.isActive) {
        this.close();
      }
    },
  },
  beforeUnmount() {
    this.removeEventsListeners();
    this.destroyPopper();
  },
};
</script>

<style lang="postcss">
  .popover__content {
    @apply bg-primary border rounded shadow-lg z-20;
    outline: none;
    overflow: auto;
    position: absolute;
  }

  .popover__focus-redirector {
    opacity: 0;
    position: absolute;
  }

  .popover--has-max-height .popover__content {
    max-height: 320px;
  }

  .popover__content[x-placement="bottom"],
  .popover__content[x-placement="bottom-start"],
  .popover__content[x-placement="bottom-end"] {
    margin-top: 8px;
  }

  .popover__content[x-placement="top"],
  .popover__content[x-placement="top-3tart"],
  .popover__content[x-placement="top-end"] {
    margin-bottom: 8px;
  }

  .popover__content[x-placement="left"],
  .popover__content[x-placement="left-start"],
  .popover__content[x-placement="left-end"] {
    margin-right: 8px;
  }

  .popover__content[x-placement="right"],
  .popover__content[x-placement="right-start"],
  .popover__content[x-placement="right-end"] {
    margin-left: 8px;
  }
</style>
