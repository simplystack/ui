---
title: Button
description: You will learn how to send request by curl tool
position: 1
section: components
category: forms
---

# Button
Buttons are used primarily for actions.

<preview>
  <template #component>
    <v-button>Default</v-button>
    <v-button appearance="primary">Primary</v-button>
  </template>
</preview>

```html
<template>
  <v-button type="primary">Primary</v-button>
</template>

<script>
import { VButton } from '@simplystack@/ui';

export default {
  components: { VButton }
}
</script>
```
