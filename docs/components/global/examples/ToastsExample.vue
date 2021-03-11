<template>
  <div>
    <v-button appearance="primary" @click="createNotification">
      Open notification
    </v-button>
  </div>
</template>

<script>
export default {
  methods: {
    createNotification () {
      this.$store.dispatch('toasts/create', {
        title: 'You have a new message',
        type: 'success',
        message: 'You can read it in your notification center'
      })
    }
  }
}
</script>
