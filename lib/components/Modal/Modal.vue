<template>
  <transition name="modal" @after-enter="onEnter" @after-leave="onLeave">
    <div
      v-if="opened"
      class="modal-mask"
      :role="options.role"
      :class="classes"
    >
      <div
        ref="backdrop"
        class="modal-backdrop"
        @click="dismissOnBackdrop && dismiss()"
      >
        <div
          ref="container"
          class="modal-body"
          tabindex="-1"
          @click.stop
          @keydown.esc="dismissOnEsc && dismiss()"
        >

          <div class="modal-header">
            <h3 class="modal-title">{{ options.title }}</h3>

            <v-button appearance="subtle" icon size="sm" @click="dismiss()">
              <v-cross-icon :height="16" :width="16" />
            </v-button>
          </div>

          <div class="modal-content">
            <component v-bind="options.props" :is="options.component" />
          </div>

          <div tabindex="0" @focus.stop="redirectFocus"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import VCrossIcon from '../../icons/CrossIcon.vue';
import VButton from '../Button';

const modalOpenClass = 'overflow-hidden';

// const defaults = {
//   role: 'dialog',
//   size: '2',
//   dismissible: true,
//   dismissOn: 'backdrop esc close-button',
//   onClose() {},
//   onDismiss() {},
// };

export default {
  name: 'VModal',
  created() {
    // Bus.$on('modal.new', (options) => {
    //   this.open(options);
    // });

    // Bus.$on('modal.close', (data) => {
    //   this.close(data);
    // });

    // Bus.$on('modal.dismiss', () => {
    //   this.dismiss();
    // });
  },
  data: () => ({
    // opened: false,
    // options: null,
  }),
  computed: {
    opened() {
      return this.$store.getters['modal/opened'];
    },
    options() {
      return this.$store.getters['modal/options'];
    },
    dismissOnBackdrop() {
      return this.options.dismissOn.indexOf('backdrop') > -1;
    },
    dismissOnCloseButton() {
      return this.options.dismissOn.indexOf('close-button') > -1;
    },
    dismissOnEsc() {
      return this.options.dismissOn.indexOf('esc') > -1;
    },
    classes() {
      return [
        `modal--size-${this.options.size}`,
      ];
    },
  },
  methods: {
    open() {
      // this.options = { ...defaults, ...options };

      // this.opened = true;

      this.$nextTick(() => {
        this.lastfocusedElement = document.activeElement;
        this.$refs.container.focus();
        document.body.classList.add(modalOpenClass);
        document.addEventListener('focus', this.restrictFocus, true);
      });
    },
    close(data = null) {
      if (!this.options.dismissible) {
        return;
      }

      // this.opened = false;

      // Bus.$emit('modal.closed', data);

      if (this.options.onClose && typeof this.options.onClose === 'function') {
        this.options.onClose(this.$store.getters['modal/payload']);
      }

      this.$nextTick(() => {
        this.teardownModal();
      });
    },
    dismiss() {
      if (!this.options.dismissible) {
        return;
      }

      this.$store.dispatch('modal/close');

      // Bus.$emit('modal.dismissed');

      if (this.options.onDismiss && typeof this.options.onDismiss === 'function') {
        this.options.onDismiss();
      }

      this.$nextTick(() => {
        this.teardownModal();
      });
    },
    onEnter() {
      // Bus.$emit('modal.opened', {
      //   options: this.options,
      // });
    },
    onLeave() {
      // Bus.$emit('modal.destroyed');
      document.body.classList.remove(modalOpenClass);
    },
    teardownModal() {
      // this.options = null;
      document.body.classList.remove(modalOpenClass);
      document.removeEventListener('focus', this.restrictFocus, true);
      if (this.lastfocusedElement) {
        this.lastfocusedElement.focus();
      }

      this.$store.dispatch('modal/clear');
    },
    redirectFocus() {
      this.$refs.container.focus();
    },
    restrictFocus(e) {
      if (!this.$refs.container.contains(e.target)) {
        e.stopPropagation();
        this.$refs.container.focus();
      }
    },
  },
  components: { VButton, VCrossIcon },
  beforeDestroy() {
    if (this.opened) {
      this.teardownModal();
    }
  },
  watch: {
    opened(opened) {
      if (opened) {
        this.open();
      } else {
        this.$nextTick(() => {
          this.close();
        });
      }
    },
  },
};
</script>

<style lang="postcss">
.modal-mask {
  @apply fixed inset-0 z-20 overflow-auto;
  background-color: rgba(0, 0, 0, .80);
  transition: opacity 0.3s ease;
}

.modal-backdrop {
  @apply min-h-full flex flex-col items-center justify-center p-2;
  @screen md {
    @apply p-4;
  }
}

.modal-header {
  @apply flex items-center justify-between;
}

.modal-title {
  @apply font-bold text-xl flex-1;
}

.modal-body {
  @apply bg-base rounded shadow-lg mx-auto w-full p-4;
  max-width: 544px;
  transition: transform 0.3s ease;
}

.modal-body:focus {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}

.modal--size-1 .modal-body {
  max-width: 320px;
}

.modal--size-2 .modal-body {
  max-width: 544px;
}

.modal--size-3 .modal-body {
  max-width: 720px;
}

.modal--size-4 .modal-body {
  max-width: 1024px;
}

.modal-enter, .modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-body,
.modal-leave-active .modal-body {
  transform: scale(1.1);
}
</style>
