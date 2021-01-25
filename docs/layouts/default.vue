<template>
  <div class="min-h-screen flex flex-col bg-ui-background antialiased text-ui-typo">
    <MainNav />
    <Nuxt />
  </div>
</template>

<style lang="postcss">
:root {
  --color-ui-background: theme('colors.white');
  --color-ui-typo: theme('colors.gray.900');
  --color-ui-sidebar: theme('colors.gray.200');
  --color-ui-border: theme('colors.gray.300');
  --color-ui-primary: theme('colors.blue.500');
}
html[lights-out] {
  --color-ui-background: theme('colors.gray.900');
  --color-ui-typo: theme('colors.gray.100');
  --color-ui-sidebar: theme('colors.gray.800');
  --color-ui-border: theme('colors.gray.800');
  --color-ui-primary: theme('colors.blue.400');
}

html[lights-out] pre[class*="language-"],
html[lights-out] code[class*="language-"] {
  @apply bg-ui-border;
}
</style>
