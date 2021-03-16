<template>
  <button class="hover:text-primary" :aria-label="`Toggle ${mode}`" :title="`Toggle ${mode}`" @click="toggle">
    <SunIcon v-if="mode === 'light'" width="20" height="20" />
    <!-- <CoffeeIcon v-else-if="mode === 'sepia'" width="20" height="20" /> -->
    <MoonIcon v-else width="20" height="20" />
  </button>
</template>

<script>

export default {
  computed: {
    mode () {
      return this.$store.getters['mode/mode']
    }
  },
  methods: {
    toggle () {
      switch (this.mode) {
        case 'light':
          this.$store.dispatch('mode/set', 'dark')
          break
        // case 'dark':
        //   this.mode = 'sepia'
        //   break
        default:
          this.$store.dispatch('mode/set', 'light')
      }
      this.$emit('change', this.mode)
    }
  }
}
</script>
