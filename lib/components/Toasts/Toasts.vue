<template>
  <div class="toasts" :class="classes">
    <transition-group name="list">
      <v-toast
        :key="item.timestamp"
        :type="item.type"
        :title="item.title"
        :message="item.message"
        :timestamp="item.timestamp"
        v-for="item in queue"
      ></v-toast>
    </transition-group>
  </div>
</template>

<script>
import VToast from '../Toast';

export default {
  name: 'VToasts',
  props: {
    position: {
      type: String,
      default: 'top-right',
      validator(position) {
        return ['top-left', 'top-right', 'bottom-right', 'bottom-left'].indexOf(position) > -1;
      },
    },
  },
  computed: {
    queue() {
      return this.$store.getters['toasts/queue'];
    },
    classes() {
      return [
        `toasts--${this.position}`,
      ];
    },
  },
  components: { VToast },
};
</script>

<style lang="postcss">
  .toasts {
    @apply fixed z-30;
    top: 16px;
    right: 16px;
    width: 320px;
  }
  .list-enter-active, .list-leave-active {
    transition: all .3s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
