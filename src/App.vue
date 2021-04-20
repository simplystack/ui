<template>
  <div class="p-8">
    <v-modal/>
    <v-button appearance="primary" @click="open">
      Open Modal
    </v-button>
    {{ $store.state.count }}
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  methods: {
    open() {
      this.$store.dispatch('modal/open', {
        title: 'New Modal',
        component: defineAsyncComponent(() => import('@/LoginModal.vue')),
      });
    },
  },
};
</script>
