<template>
  <div class="space-y-2">
    <v-notification title="Info" message="I believe something awesome happens today!" />
    <v-notification type="success" title="Success" message="I believe something awesome happens today!" />
    <v-notification type="warning" title="Warning" message="I believe something awesome happens today!" />
    <v-notification type="error" title="Error" message="You have to choose on of those available disks." />
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
