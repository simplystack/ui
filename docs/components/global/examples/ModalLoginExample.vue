<template>
  <form class="space-y-2 pt-4" @submit.prevent="submit">
    <v-textbox v-model="form.email" label="Email" placeholder="Email" />
    <v-textbox v-model="form.password" label="Password" type="password" placeholder="Password" />
    <div class="flex justify-end space-x-2">
      <v-button :loading="submitting" appearance="secondary" @click="cancel">
        Cancel
      </v-button>
      <v-button :loading="submitting" type="submit" appearance="primary">
        Login
      </v-button>
    </div>
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
        this.$store.dispatch('modal/close', { payload: this.form })
      }, 2500)
    },
    cancel () {
      this.$store.dispatch('modal/dismiss')
    }
  }
}
</script>
