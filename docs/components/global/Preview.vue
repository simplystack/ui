<template>
  <div class="flex border rounded">
    <div class="flex-1">
      <div class="flex items-center justify-between border-b p-4">
        <div class="flex items-center">
          <button class="text-secondary hover:text-primary mr-2" @click="zoomIn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button class="text-secondary hover:text-primary mr-2" @click="zoomOut">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button class="text-secondary hover:text-primary mr-2" @click="zoomReset">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        <ToggleMode @change="toggleMode" />
      </div>
      <div class="preview__component" :style="{ zoom }" :data-mode="mode">
        <Example :name="name" />
      </div>
    </div>
    <!-- <div class="border-l p-4">

    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  data () {
    return {
      zoom: 1,
      mode: 'light'
    }
  },
  methods: {
    zoomIn () {
      this.zoom = this.zoom + 0.25
    },
    zoomOut () {
      this.zoom = this.zoom - 0.25
    },
    zoomReset () {
      this.zoom = 1
    },
    toggleMode (mode) {
      this.mode = mode
    }
  }
}
</script>

<style lang="postcss">
.preview__component {
  @apply bg-white p-4;
  background-color: var(--ui-01);
  background-image: linear-gradient(45deg, rgb(249, 249, 250) 25%, transparent 25%), linear-gradient(135deg, rgb(249, 249, 250) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgb(249, 249, 250) 75%), linear-gradient(135deg, transparent 75%, rgb(249, 249, 250) 75%);
  background-size: 20px 20px;
  background-position: 0px 0px, 10px 0px, 10px -10px, 0px 10px;
}
</style>
