<template>
  <div class="flex items-center space-x-4">
    <v-pagination v-model="currentPage" :total="250" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 1
    }
  }
}
</script>
