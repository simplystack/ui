<template>
  <div>
    <v-modal />

    <v-button appearance="primary" @click="toggleModal">Open modal</v-button>
  </div>
</template>

<script>
import { VButton } from '../lib';

export default {
  methods: {
    toggleModal() {
      this.$store.dispatch('modal/open', {
        title: 'Custom Modal',
        component: () => import('@/CustomModal.vue'),
      });
    },
  },
  components: { VButton },
};
</script>

<style>

</style>
