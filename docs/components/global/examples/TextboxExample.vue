<template>
  <div class="space-y-2">
    <v-textbox v-model="value" label="label" placeholder="Type something" />
    <v-textbox v-model="value" label="label" disabled placeholder="Type something" />
    <v-textbox v-model="value" label="label" readonly placeholder="Type something" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>
