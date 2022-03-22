<template>
  <transition
    enter-active-class="ease-in-out duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in-out duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
    @after-enter="showPanel = true"
  >
    <div
      v-if="opened"
      class="fixed z-30 inset-0 bg-tone transition-opacity"
      aria-hidden="true"
      @click="showPanel = false"
    >
      <div class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <transition
          appear
          enter-active-class="transform transition ease-in-out duration-300"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transform transition ease-in-out duration-300"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
          @after-leave="close"
        >
          <div v-if="showPanel" :style="{ width: `${options.width}px`}">
            <div
              @click.stop
              class="h-full flex flex-col py-6 bg-primary shadow-xl overflow-y-scroll"
            >
              <div class="px-4 sm:px-6">
                <div class="flex items-start justify-between">
                  <h2 class="text-2xl font-medium ">
                    {{ options.title }}
                  </h2>
                  <div class="ml-3 h-7 flex items-center">
                    <v-button
                      size="sm"
                      type="button"
                      appearance="subtle"
                      @click="showPanel = false"
                    >
                      <template v-slot:icon>
                        <v-cross-icon :height="16" :width="16" />
                      </template>
                    </v-button>
                  </div>
                </div>
              </div>
              <div class="mt-6 relative flex-1 px-4 sm:px-6">
                <component v-bind="options.props" :is="options.component" />
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import VCrossIcon from '../../icons/CrossIcon.vue';

export default {
  name: 'VPane',
  data() {
    return {
      showPanel: false,
    };
  },
  computed: {
    opened() {
      return this.$store.getters['pane/opened'];
    },
    options() {
      return this.$store.getters['pane/options'];
    },
  },
  methods: {
    close() {
      this.showPanel = false;
      this.$store.dispatch('pane/close');
    },
    handleOutsideClick(e) {
      const { container } = this.$refs;
      if (this.opened && container && !container.contains(e.target)) {
        this.close();
      }
    },
  },
  components: { VCrossIcon },
  watch: {
    opened(opened) {
      return opened
        ? document.addEventListener('click', this.handleOutsideClick, true)
        : document.removeEventListener('click', this.handleOutsideClick, true);
    },
  },
};
</script>
