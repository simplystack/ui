<template>
  <div>
    <v-tabs>
      <v-tab title="Tab 1">
        <div class="pt-4">
          Tab #1
        </div>
      </v-tab>
      <v-tab title="Tab 2">
        <div class="pt-4">
          Tab #2
        </div>
      </v-tab>
      <v-tab title="Tab 3">
        <div class="pt-4">
          Tab #3
        </div>
      </v-tab>
      <v-tab title="Tab 3" disabled>
        <div class="pt-4">
          Tab #3
        </div>
      </v-tab>
    </v-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
