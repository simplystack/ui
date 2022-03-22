<template>
  <transition
    enter-from-class="opacity-0"
    enter-active-class="ease-out duration-300"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-to-class="opacity-0"
    @enter="onEnterBackdrop"
    @after-enter="onAfterEnterBackdrop"
    @after-leave="onLeaveBackdrop"
  >
    <div
      v-if="showBackdrop"
      class="fixed inset-0 z-20 bg-tone overflow-auto"
      :role="options.role"
      data-test="modal-root"
    >
      <div
        ref="backdrop"
        class="min-h-full flex flex-col items-center justify-center p-2 md:p-4"
        @click="dismissOnBackdrop && dismiss()"
      >
        <transition
          enter-from-class="opacity-0 scale-110"
          enter-active-class="ease-out duration-300"
          enter-to-class="opacity-100 scale-100"
          leave-from-class="opacity-100 scale-100"
          leave-active-class="ease-in duration-200"
          leave-to-class="opacity-0 scale-110"
          @after-enter="onAfterEnterModal"
          @after-leave="onAfterLeaveModal"
        >
          <div
            v-if="showModal"
            ref="container"
            class="
              max-w-xl w-full
              bg-primary
              rounded
              focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary
              p-4
            "
            tabindex="-1"
            @click.stop
            @keydown.esc="dismissOnEsc && dismiss()"
            data-test="modal"
          >

            <div class="flex items-center justify-between">
              <h3 class="font-bold text-xl flex-1">{{ options.title }}</h3>

              <v-button appearance="subtle" size="sm" @click="dismiss()">
                <template #icon>
                  <v-cross-icon :height="16" :width="16" />
                </template>
              </v-button>
            </div>

            <div class="">
              <component v-bind="options.props" :is="options.component" />
            </div>

            <div tabindex="0" @focus.stop="redirectFocus"></div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import VCrossIcon from '../../icons/CrossIcon.vue';
import VButton from '../Button';

export default {
  name: 'VModal',
  data() {
    return { showBackdrop: false, showModal: false };
  },
  computed: {
    opened() {
      return this.$store.getters['modal/opened'];
    },
    dismissed() {
      return this.$store.getters['modal/dismissed'];
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
  },
  methods: {
    // Handle Backdrop transition hooks
    onEnterBackdrop() {
      this.lastfocusedElement = document.activeElement;
      document.body.classList.add('overflow-hidden');
      document.addEventListener('focus', this.restrictFocus, true);
    },
    onAfterEnterBackdrop() {
      this.showModal = true;
    },
    onLeaveBackdrop() {
      document.body.classList.remove('overflow-hidden');
    },
    // Handle Modal transition hooks
    onAfterEnterModal() {
      this.redirectFocus();
    },
    onAfterLeaveModal() {
      this.showBackdrop = false;
      this.teardownModal();
    },
    handleClose() {
      if (!this.options.dismissible) {
        return;
      }

      if (this.options.onClose && typeof this.options.onClose === 'function') {
        this.options.onClose(this.$store.getters['modal/payload']);
      }
    },
    handleDismiss() {
      if (!this.options.dismissible) {
        return;
      }

      if (this.options.onDismiss && typeof this.options.onDismiss === 'function') {
        this.options.onDismiss();
      }
    },
    dismiss() {
      this.showModal = false;
      this.$store.dispatch('modal/dismiss');
    },
    teardownModal() {
      document.body.classList.remove('overflow-hidden');
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
  beforeUnmount() {
    if (this.opened) {
      this.teardownModal();
    }
  },
  watch: {
    opened(opened) {
      if (opened) {
        this.showBackdrop = true;
      } else {
        if (this.dismissed) {
          this.handleDismiss();
        } else {
          this.handleClose();
        }
        this.showModal = false;
      }
    },
  },
};
</script>
