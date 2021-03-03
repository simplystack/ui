<template>
  <div class="flex items-center space-x-2">
    <v-radio v-model="value" name="option" true-value="Option 1" label="Option 1" />
    <v-radio v-model="value" name="option" true-value="Option 2" label="Option 2" />
    <v-radio v-model="value" name="disabled" true-value="disabled" disabled label="Disabled" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 'Option 1'
    }
  }
}
</script>
