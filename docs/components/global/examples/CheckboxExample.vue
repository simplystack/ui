<template>
  <div class="flex items-center space-x-2">
    <v-checkbox v-model="value" label="Default" />
    <v-checkbox v-model="value" disabled label="Disabled" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: false
    }
  }
}
</script>
