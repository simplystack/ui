<template>
  <div class="preview">
    <div class="preview__component">
      <slot name="component" />
    </div>
    <!-- <div>
      <slot name="code" />
    </div> -->
  </div>
</template>

<script>
export default {

}
</script>

<style lang="postcss">
.preview {
  @apply border rounded;
}
.preview__component {
  @apply bg-white p-4;
  background-color: var(--ui-01);
  background-image: linear-gradient(45deg, rgb(249, 249, 250) 25%, transparent 25%), linear-gradient(135deg, rgb(249, 249, 250) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgb(249, 249, 250) 75%), linear-gradient(135deg, transparent 75%, rgb(249, 249, 250) 75%);
  background-size: 20px 20px;
  background-position: 0px 0px, 10px 0px, 10px -10px, 0px 10px;
}
</style>
