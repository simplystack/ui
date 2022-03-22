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
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const form = ref({
      email: '',
      password: '',
    });
    const submitting = ref(false);

    const submit = () => {
      submitting.value = true;

      setTimeout(() => {
        submitting.value = false;

        store.dispatch('modal/close', { payload: form.value });
      }, 2000);
    };

    return { form, submitting, submit };
  },
};
</script>
