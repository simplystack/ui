<template>
  <form
    @submit.prevent="submit"
    class="space-y-2 pt-4"
  >
    <v-textbox
      v-model="form.email"
      label="Email"
      placeholder="Enter your email"
    />
    <v-textbox
      v-model="form.password"
      type="password"
      label="Password"
      placeholder="Enter your password"
    />
    <v-button
      type="submit"
      :loading="submitting"
      appearance="primary"
      class="w-full"
    >
      Submit
    </v-button>
  </form>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
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

    return { form, submitting, submit };
  },
};
</script>
