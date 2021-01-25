<template>
  <div>
    <div class="preview__component">
      <slot name="component" />
    </div>
    <div>
      <slot name="code" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="postcss">
.preview__component {
  @apply border rounded p-4;
  background-color: white;
  background-image: linear-gradient(45deg, rgb(249, 249, 250) 25%, transparent 25%), linear-gradient(135deg, rgb(249, 249, 250) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgb(249, 249, 250) 75%), linear-gradient(135deg, transparent 75%, rgb(249, 249, 250) 75%);
  background-size: 20px 20px;
  background-position: 0px 0px, 10px 0px, 10px -10px, 0px 10px;
}
</style>
