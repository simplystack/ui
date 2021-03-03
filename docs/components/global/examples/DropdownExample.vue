<template>
  <div class="flex items-center space-x-2">
    <v-dropdown :options="options">
      <template #toggle>
        <v-button>Toggle dropdown</v-button>
      </template>
    </v-dropdown>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [
        { id: 'option-1', label: 'Option 1' },
        { id: 'option-2', label: 'Option 2' },
        { id: 'option-3', label: 'Option 3', disabled: true },
        { id: 'option-4', label: 'Option 4' }
      ]
    }
  }
}
</script>
