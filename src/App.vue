<template>
  <div class="border-b px-8 py-2" data-theme="light">
    <div class="flex items-center space-x-2">
      <v-native-select
        @change="handlePresetChange"
        label="Preset"
        name="preset"
        id="switcher"
        class="w-full"
        :options="[
          { label: '1. Simplystack', value: 'simplystack' },
          { label: '2. Terrapacket', value: 'terrapacket' },
          { label: '3. Unstyled', value: 'unstyled' },
          { label: '4. Baremetal', value: 'baremetal', disabled: true },
        ]"
      />
    </div>
  </div>
  <div class="min-h-screen grid md:grid-cols-2 xl:grid-cols-3">
    <div
      class="bg-body font-body text-base text-primary space-y-4 divide-y p-8"
      v-for="theme in themes"
      :key="theme"
      :data-theme="theme"
    >
      <div>
        <span
          class="inline-block bg-secondary text-xs uppercase font-bold rounded-full py-1 px-2 mb-1"
        >
          {{ theme }}
        </span>
        <h1 class="font-bold text-2xl mb-3">Theming example</h1>
        <p class="leading-relaxed text-secondary">
          This example demonstrates how fast & consistenly we can build our products.
        </p>
      </div>

      <div class="grid grid-cols-3 gap-4 py-4">
        <v-button disabled appearance="default">Disabled</v-button>
        <v-button appearance="default">Default</v-button>
        <v-button appearance="primary">Primary</v-button>
        <v-button appearance="secondary">Secondary</v-button>
        <v-button appearance="danger">Danger</v-button>
        <v-button appearance="subtle">Subtle</v-button>
        <v-button loading>Loading</v-button>
      </div>

      <div class="py-4">
        <form @submit.prevent class="bg-primary shadow rounded-lg space-y-4 p-4">
          <v-textbox
            :id="`form-email-${theme}`"
            v-model="form.email"
            label="Email"
          />
          <v-textbox
            :id="`form-password-${theme}`"
            v-model="form.password"
            type="password"
            label="Password"
            error
            error-text="Password is required"
          />
          <v-textbox
            :id="`form-message-${theme}`"
            multiline
            v-model="form.message"
            type="text"
            label="Message"
            :disabled="!form.remember"
          />
          <div>
            <v-native-select
              :id="`form-select-${theme}`"
              class="w-full"
              :options="[
                { label: 'Select a something', value: 'something' },
                { label: 'Option 1', value: 'opt-1' },
                { label: 'Option 2', value: 'opt-2' },
              ]"
            />
          </div>
          <v-checkbox label="Remember me" v-model="form.remember" />
          <div class="flex items-center space-x-4">
            <v-radio v-model="form.choice" name="choice" true-value="choice-1" label="Choice 1" />
            <v-radio v-model="form.choice" name="choice" true-value="choice-2" label="Choice 2" />
          </div>
          <v-button
            appearance="primary"
            class="w-full"
            :disabled="!(form.password && form.email)"
          >
            Get started
          </v-button>
        </form>
      </div>

      <div class="py-4">
        <div class="grid grid-cols-3 gap-4">
          <v-button appearance="primary" @click="openModal(theme)" class="w-full">
            Modal
          </v-button>
          <v-button appearance="primary" @click="openPane(theme)" class="w-full">
            Side pane
          </v-button>
          <v-button appearance="primary" @click="showToast(theme)" class="w-full">
            Toast
          </v-button>
        </div>

        <v-modal v-if="theme === 'light' && currentModal === 'light'" />
        <v-modal v-if="theme === 'dark' && currentModal === 'dark'" />
        <v-modal v-if="theme === 'sepia' && currentModal === 'sepia'" />

        <v-pane v-if="theme === 'light' && currentPane === 'light'" />
        <v-pane v-if="theme === 'dark' && currentPane === 'dark'" />
        <v-pane v-if="theme === 'sepia' && currentPane === 'sepia'" />

        <v-toasts v-if="theme === 'light' && currentToast === 'light'" />
        <v-toasts v-if="theme === 'dark' && currentToast === 'dark'" />
        <v-toasts v-if="theme === 'sepia' && currentToast === 'sepia'" />
      </div>

      <div class="py-4">
        <v-tabs>
          <v-tab title="Cloud">Cloud content</v-tab>
          <v-tab title="Baremetal">Baremetal content</v-tab>
          <v-tab title="Images">Images content</v-tab>
        </v-tabs>
      </div>

      <div class="py-4">
        <v-pagination
          :total="pagination.total"
          :per-page="pagination.perPage"
          v-model="pagination.value"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  defineAsyncComponent, nextTick, reactive, ref,
} from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const currentTheme = ref('simplystack');
const currentModal = ref();
const currentPane = ref();
const currentToast = ref();
// const isSimplystack = computed(() => currentTheme.value === 'simplystack');
// const isTerrapacket = computed(() => currentTheme.value === 'terrapacket');

const themes = ['light', 'dark', 'sepia'];

const form = reactive({
  email: 'best@serverhub.com',
  password: '',
  message: '',
  choice: 'choice-1',
  remember: true,
});

const pagination = reactive({
  value: 1,
  total: 50,
  perPage: 10,
});

const openModal = (theme) => {
  currentModal.value = theme;

  nextTick(() => {
    store.dispatch('modal/open', {
      title: 'Testing modal',
      component: defineAsyncComponent(() => import('./LoginModal.vue')),
    });
  });
};

const openPane = (theme) => {
  currentPane.value = theme;

  nextTick(() => {
    store.dispatch('pane/open', {
      title: 'Testing pane',
      component: defineAsyncComponent(() => import('./LoginModal.vue')),
    });
  });
};

const showToast = (theme) => {
  currentToast.value = theme;

  nextTick(() => {
    store.dispatch('toasts/create', {
      title: 'Testing toast',
      text: 'ekkw',
    });
  });
};

const handlePresetChange = (e) => {
  document.documentElement.setAttribute('data-theme', e.target.value);

  currentTheme.value = e.target.value;
};
</script>
