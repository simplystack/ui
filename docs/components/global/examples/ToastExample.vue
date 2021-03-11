<template>
  <div class="space-y-2">
    <v-toast title="Info" message="I believe something awesome happens today!" />
    <v-toast type="success" title="Success" message="I believe something awesome happens today!" />
    <v-toast type="warning" title="Warning" message="I believe something awesome happens today!" />
    <v-toast type="error" title="Error" message="You have to choose on of those available disks." />
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
