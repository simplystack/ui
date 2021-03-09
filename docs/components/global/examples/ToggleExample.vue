<template>
  <div class="flex items-center space-x-4">
    <v-toggle v-model="value" label="Turn off or on" />
    <v-toggle v-model="value" disabled label="Turn off or on" />
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
