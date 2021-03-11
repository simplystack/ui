<template>
  <div>
    <v-button appearance="primary" @click="openPane">
      Open pane
    </v-button>
  </div>
</template>

<script>
export default {
  methods: {
    openPane () {
      this.$store.dispatch('pane/open', {
        title: 'Notifications',
        component: () => import('@/components/global/examples/PaneNotificationsExample.vue')
      })
    }
  }
}
</script>
