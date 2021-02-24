<template>
  <button v-if="mode === 'light'" class="hover:text-primary" aria-label="Toggle dark" title="Toggle dark">
    <SunIcon width="20" height="20" />
  </button>
  <button v-else-if="mode === 'dark'" class="text-yellow-500 hover:text-yellow-600" aria-label="Toggle sepia" title="Toggle sepia">
    <MoonIcon width="20" height="20" />
  </button>
  <button v-else class="hover:text-ui-primary" aria-label="Toggle light" title="Toggle light">
    <CoffeeIcon width="20" height="20" />
  </button>
</template>

<script>

export default {
  data: () => ({
    mode: 'light'
  })
}
</script>
