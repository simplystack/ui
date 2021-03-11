<template>
  <transition name="pane">
    <aside
      v-if="opened"
      ref="container"
      class="pane fixed z-20 bg-base top-0 bottom-0 shadow-lg overflow-y-auto"
      :class="classes"
      :style="{ width: `${options.width}px`}"
    >
      <header class="sticky top-0 flex items-center border-b p-4">
        <h3 class="truncate flex-grow text-xl font-bold">{{ options.title }}</h3>
        <v-button class="ml-2" appearance="subtle" size="sm" @click="close">
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
  name: 'Pane',
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
        { 'border-l right-0': this.options.side === 'right' },
        { 'border-r left-0': this.options.side === 'left' },
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

<style>
.pane {
  transition: all 0.3s ease;
  transform: translateX(0);
  opacity: 1;
}

.pane-enter, .pane-leave-active {
  opacity: 1;
}

.pane-enter, .pane-leave-active {
  opacity: 0;
}

.pane--left.pane-enter, .pane--left.pane-leave-active {
  transform: translateX(80px);
}

.pane--left.pane-enter, .pane--left.pane-leave-active {
  transform: translateX(-80px);
}

.pane--right.pane-enter, .pane--right.pane-leave-active {
  transform: translateX(-80px);
}

.pane--right.pane-enter, .pane--right.pane-leave-active {
  transform: translateX(80px);
}
</style>
