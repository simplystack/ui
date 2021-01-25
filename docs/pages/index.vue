<template>
  <div class="flex-1 flex items-center justify-center">
    <div class="container">
      <div class="text-center py-8">
        <h1 class="text-4xl font-bold mb-2">
          {{ $t('home.title') }}
        </h1>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p class="text-xl text-gray-600 mb-8" v-html="$t('home.description')" />

        <div class="flex items-center justify-center space-x-2">
          <v-button type="primary">
            <span class="flex items-center space-x-2">
              <span>Get started</span>
              <ArrowRightIcon size="20" />
            </span>
          </v-button>
          <v-button>
            <span class="flex items-center space-x-2">
              <GithubIcon size="20" />
              <span>GitHub</span>
            </span>
          </v-button>
        </div>

        <nuxt-content :document="page" />

        <!-- <NuxtLink
          :to="localePath({
            name: $t('home.quickStart.routeName'),
            params: {
              section: $t('home.quickStart.section'),
              category: $t('home.quickStart.category'),
              slug: $t('home.quickStart.slug')
            }
          })"
          tag="button"
          class="bg-ui-primary font-bold text-white px-8 py-4 rounded shadow"
        >
          {{ $t('home.quickStart.name') }}
        </NuxtLink> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowRightIcon, GithubIcon } from 'vue-feather-icons'
export default {
  components: { ArrowRightIcon, GithubIcon },
  async asyncData ({ $content, app, params, error }) {
    const path = `${app.i18n.locale}`
    let page

    try {
      page = await $content(path, 'hello').fetch()
    } catch (e) {
      return error({ statusCode: 404, message: 'Page not found' })
    }

    return { page }
  }
}
</script>
