---
title: Toggle
position: 4
section: components
category: forms
toggleValue: 
  true
---

# Toggle

<preview>
  <template #component>
    <div class="flex justify-center">
      <v-toggle :value="toggleValue" />
    </div>
  </template>
</preview>

```html
<template>
  <v-toggle />
</template>

<script>
import { VToggle } from '@simplystack@/ui';

export default {
  components: { VToggle }
}
</script>
```
