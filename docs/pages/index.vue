<template>
  <div class="flex-1 flex items-center justify-center">
    <div class="container">
      <div class="py-8">
        <div class="text-center">
          <h1 class="md:text-4xl xl:text-6xl font-bold mb-2">
            <Logo class="mx-auto mb-8" />
            {{ $t('home.title') }}
          </h1>
          <p class="max-w-4xl text-2xl text-secondary mx-auto mb-8">
            {{ $t('home.description') }}
          </p>

          <div class="flex items-center justify-center space-x-2 mb-32">
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
              <v-button appearance="primary">
                <span class="flex items-center space-x-2">
                  <span>Get started</span>
                  <ArrowNarrowRightIcon size="20" />
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

        <div class="grid grid-cols-3 shadow-lg">
          <div class="bg-base rounded-l-lg p-8">
            <figure class="mb-8">
              <Logo width="50" height="50" />
            </figure>
            <h4 class="text-xl font-bold mb-4">
              Explore components
            </h4>
            <p class="text-lg text-secondary mb-8">
              Take a look at components, how they looks like, how use them.
            </p>
            <div class="flex items-center justify-end">
              <NuxtLink
                :to="localePath({
                  name: 'section-category-slug',
                  params: {
                    section: 'documentation',
                    category: 'get-started',
                    slug: 'installation'
                  }
                })"
              >
                <span class="flex items-center font-bold space-x-2">
                  <span>Checkout</span>
                  <ArrowNarrowRightIcon size="20" />
                </span>
              </NuxtLink>
            </div>
          </div>
          <div class="bg-black text-white p-8">
            <figure class="mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width="35" height="50"><path d="M50 300c27.6 0 50-22.4 50-50v-50H50c-27.6 0-50 22.4-50 50s22.4 50 50 50z" fill="#0acf83" /><path d="M0 150c0-27.6 22.4-50 50-50h50v100H50c-27.6 0-50-22.4-50-50z" fill="#a259ff" /><path d="M0 50C0 22.4 22.4 0 50 0h50v100H50C22.4 100 0 77.6 0 50z" fill="#f24e1e" /><path d="M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50h-50V0z" fill="#ff7262" /><path d="M200 150c0 27.6-22.4 50-50 50s-50-22.4-50-50 22.4-50 50-50 50 22.4 50 50z" fill="#1abcfe" /></svg>
            </figure>
            <h4 class="text-xl font-bold mb-4">
              Figma library
            </h4>
            <p class="text-lg text-gray-400 mb-8">
              UI library made in Figma to quickly prototype and create new products.
            </p>
            <div class="flex items-center justify-end">
              <a href="#" class="flex items-center font-bold space-x-2">
                <span>Checkout</span>
                <ArrowNarrowRightIcon size="20" />
              </a>
            </div>
          </div>
          <div class="bg-green-700 text-white rounded-r-lg p-8">
            <figure class="mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261.76 226.69" width="50" height="50"><path d="M161.096.001l-30.224 52.35L100.647.002H-.005L130.872 226.69 261.749 0z" fill="#41b883" /><path d="M161.096.001l-30.224 52.35L100.647.002H52.346l78.526 136.01L209.398.001z" fill="#34495e" /></svg>
            </figure>
            <h4 class="text-xl font-bold mb-4">
              UI components on Vue 2
            </h4>
            <p class="text-lg text-gray-200 mb-8">
              NPM package with UI components made with Vue 2.
            </p>
            <div class="flex items-center justify-end">
              <a href="#" class="flex items-center font-bold space-x-2">
                <span>Checkout</span>
                <ArrowNarrowRightIcon size="20" />
              </a>
            </div>
          </div>
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
