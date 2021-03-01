<template>
  <div>
    <v-select v-model="value" :options="options" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: {},
      options: [
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
        { label: 'Violet', value: 'violet' },
        { label: 'Yellow', value: 'yellow' }
      ]
    }
  }
}
</script>
