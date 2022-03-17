<template>
  <form
    @submit.prevent="submit"
    class="space-y-2 pt-4"
  >
    <v-textbox
      id="form-modal-email"
      v-model="form.email"
      label="Email"
    />
    <v-textbox
      id="form-modal-password"
      v-model="form.password"
      type="password"
      label="Password"
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
