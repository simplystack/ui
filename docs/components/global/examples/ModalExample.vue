<template>
  <div>
    <v-button appearance="primary" @click="openModal">
      Open Modal
    </v-button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    openModal () {
      this.$store.dispatch('modal/open', {
        title: 'Nuxt modal',
        component: () => import('@/components/global/examples/ModalLoginExample.vue'),
        onClose: (data) => {
          console.log(data)
          console.log('closed')
        },
        onDismiss: () => console.log('dismissed')
      })
    }
  }
}
</script>
