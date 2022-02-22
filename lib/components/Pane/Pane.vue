<template>
  <transition name="pane">
    <aside
      v-if="opened"
      ref="container"
      class="pane"
      :class="classes"
      :style="{ width: `${options.width}px`}"
    >
      <header class="pane__header">
        <h3 class="pane__title">{{ options.title }}</h3>
        <v-button class="pane__close" appearance="subtle" size="sm" @click="close">
          <template v-slot:icon>
            <v-cross-icon :height="16" :width="16" />
          </template>
        </v-button>
      </header>

      <main>
        <component :is="options.component" />
      </main>
    </aside>
  </transition>
</template>

<script>
import VCrossIcon from '../../icons/CrossIcon.vue';

export default {
  name: 'UIPane',
  computed: {
    opened() {
      return this.$store.getters['pane/opened'];
    },
    options() {
      return this.$store.getters['pane/options'];
    },
    classes() {
      return [
        `pane--${this.options.side}`,
      ];
    },
  },
  methods: {
    close() {
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

<style lang="postcss">
.pane {
  @apply fixed z-20 bg-primary top-0 bottom-0 shadow-lg overflow-y-auto;
  transition: all 0.3s ease;
  transform: translateX(0);
  opacity: 1;
}
.pane__header {
  @apply sticky top-0 flex items-center border-b p-4;
}
.pane__title {
  @apply truncate flex-grow text-xl font-bold;
}
.pane__close {
  @apply ml-2;
}

.pane--right {
  @apply border-l right-0;
}
.pane--left {
  @apply border-r left-0;
}

.pane-enter-from, .pane-leave-active {
  opacity: 1;
}

.pane-enter-from, .pane-leave-active {
  opacity: 0;
}

.pane--left.pane-enter-from, .pane--left.pane-leave-active {
  transform: translateX(80px);
}

.pane--left.pane-enter-from, .pane--left.pane-leave-active {
  transform: translateX(-80px);
}

.pane--right.pane-enter-from, .pane--right.pane-leave-active {
  transform: translateX(-80px);
}

.pane--right.pane-enter-from, .pane--right.pane-leave-active {
  transform: translateX(80px);
}
</style>
