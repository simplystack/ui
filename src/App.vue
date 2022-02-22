<template>
  <div
    class="min-h-screen flex items-center bg-primary text-primary space-x-8 p-8"
    data-mode="dark"
  >
    <UIModal/>
    <UIButton appearance="primary" @click="open">
      Open Modal
    </UIButton>

    <UIRadio name="radio-choice" v-model="form.choice" true-value="radio-1" label="Radio 1" />
    <UIRadio name="radio-choice" v-model="form.choice" true-value="radio-2" label="Radio 2" />
  </div>
</template>

<script setup>
import { defineAsyncComponent, reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const form = reactive({
  choice: 'radio-1',
});

const open = () => {
  store.dispatch('modal/open', {
    title: 'Login',
    component: defineAsyncComponent(() => import('@/LoginModal.vue')),
  });
};
</script>
