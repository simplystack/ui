---
title: Notification
description: You will learn how to send request by curl tool
position: 3
section: components
category: ui
---

# Notification

<preview>
  <template #component>
    <v-notification title="Info" message="I believe something awesome happens today!">
    </v-notification>
    <v-notification type="success" title="Success" message="I believe something awesome happens today!">
    </v-notification>
    <v-notification type="warning" title="Warning" message="I believe something awesome happens today!">
    </v-notification>
    <v-notification type="error" title="Error" message="You have to choose on of those available disks.">
    </v-notification>
  </template>
</preview>

```html
<template>
  <v-notification 
    title="Default notification" 
    message="I believe something awesome happens today!"
  />
</template>

<script>
import { VNotification } from '@simplystack@/ui';

export default {
  components: { VNotification }
}
</script>
```
