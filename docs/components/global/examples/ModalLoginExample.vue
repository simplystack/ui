<template>
  <form class="space-y-2 pt-4" @submit.prevent="submit">
    <v-textbox v-model="form.email" label="Email" placeholder="Email" />
    <v-textbox v-model="form.password" label="Password" type="password" placeholder="Password" />
    <v-button :loading="submitting" type="submit" appearance="primary" class="w-full">
      Login
    </v-button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      submitting: false
    }
  },
  methods: {
    submit () {
      this.submitting = true
      setTimeout(() => {
        this.$store.dispatch('modal/close', this.form)
      }, 2500)
    }
  }
}
</script>
