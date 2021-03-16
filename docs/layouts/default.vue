<template>
  <div class="min-h-screen flex flex-col text-primary bg-body antialiased">
    <MainNav />
    <Nuxt />
    <v-modal />
    <v-toasts />
    <v-pane />
  </div>
</template>

<script>
export default {
  computed: {
    mode () {
      return this.$store.getters['mode/mode']
    }
  },
  mounted () {
    const document = window.document.documentElement

    document.setAttribute('data-mode', this.mode)
  }
}
</script>
