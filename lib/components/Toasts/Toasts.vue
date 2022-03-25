<template>
  <div class="fixed z-30 top-4 right-4 w-80">
    <transition-group
      enter-from-class="opacity-0 translate-x-8"
      enter-active-class="ease-out duration-300"
      enter-to-class="opacity-100 translate-x-0"
      leave-from-class="opacity-100 translate-x-0"
      leave-active-class="ease-in duration-200"
      leave-to-class="opacity-0 translate-y-8"
    >
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
  },
  components: { VToast },
};
</script>
