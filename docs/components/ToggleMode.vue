<template>
  <button class="hover:text-primary" :aria-label="`Toggle ${mode}`" :title="`Toggle ${mode}`" @click="toggle">
    <SunIcon v-if="mode === 'light'" width="20" height="20" />
    <CoffeeIcon v-else-if="mode === 'sepia'" width="20" height="20" />
    <MoonIcon v-else width="20" height="20" />
  </button>
</template>

<script>

export default {
  data: () => ({
    mode: 'light'
  }),
  methods: {
    toggle () {
      switch (this.mode) {
        case 'light':
          this.mode = 'dark'
          break
        case 'dark':
          this.mode = 'sepia'
          break
        default:
          this.mode = 'light'
      }
      this.$emit('change', this.mode)
    }
  }
}
</script>
