<template>
  <div class="flex-1 flex items-center justify-center">
    <div class="container">
      <div class="text-center py-8">
        <h1 class="text-4xl font-bold mb-2">
          <Logo class="mx-auto mb-8" />
          {{ $t('home.title') }}
        </h1>
        <p class="max-w-2xl text-xl text-gray-600 mx-auto mb-8">
          {{ $t('home.description') }}
        </p>

        <div class="flex items-center justify-center space-x-2">
          <NuxtLink
            tag="div"
            :to="localePath({
              name: 'section-category-slug',
              params: {
                section: 'documentation',
                category: 'get-started',
                slug: 'installation'
              }
            })"
          >
            <v-button type="primary">
              <span class="flex items-center space-x-2">
                <span>Get started</span>
                <ArrowNarrowRight size="20" />
              </span>
            </v-button>
          </NuxtLink>
          <v-button>
            <span class="flex items-center space-x-2">
              <GithubIcon size="20" />
              <span>GitHub</span>
            </span>
          </v-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>
