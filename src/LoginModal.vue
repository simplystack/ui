<template>
  <form
    @submit.prevent="submit"
    class="space-y-2 pt-4"
  >
    <UITextbox
      v-model="form.email"
      label="Email"
      placeholder="Enter your email"
    />
    <UITextbox
      v-model="form.password"
      type="password"
      label="Password"
      placeholder="Enter your password"
    />
    <UIButton
      type="submit"
      :loading="submitting"
      appearance="primary"
      class="w-full"
    >
      Submit
    </UIButton>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  email: '',
  password: '',
});

const submitting = ref(false);

const submit = () => {
  submitting.value = true;

  setTimeout(() => {
    console.log(form.value);
    submitting.value = false;
  }, 2000);
};
</script>
