<template>
  <div class="toast" :class="classes">
    <div class="toast__content">
      <div class="toast__title">{{ computedTitle }}</div>
      <div class="toast__message">{{ message }}</div>
    </div>
    <div class="toast__close" v-if="dismissible">
      <v-button appearance="subtle" size="sm" @click="close">
        <template v-slot:icon>
          <v-cross-icon height="16" width="16" />
        </template>
      </v-button>
    </div>
  </div>
</template>

<script>
import VCrossIcon from '../../icons/CrossIcon.vue';
import VButton from '../Button';
import { capitalize } from '../../util';

export default {
  name: 'Toast',
  props: {
    type: {
      type: String,
      default: 'info',
      validator(type) {
        return ['info', 'success', 'warning', 'error'].indexOf(type) > -1;
      },
    },
    title: String,
    message: String,
    timestamp: Number,
    dismissible: {
      type: Boolean,
      default: true,
    },
    timeout: {
      type: Number,
      default: 5000,
      validator: (value) => value > 0,
    },
  },
  mounted() {
    if (this.timeout && this.dismissible) {
      this.timer = setTimeout(this.close, this.timeout);
    }
  },
  data: () => ({
    timer: null,
  }),
  computed: {
    computedTitle() {
      return this.title ? this.title : capitalize(this.type);
    },
    classes() {
      return [`toast--${this.type}`];
    },
  },
  methods: {
    close() {
      clearTimeout(this.timer);
      this.$store.dispatch('toasts/remove', this.timestamp);
    },
  },
  components: {
    VCrossIcon,
    VButton,
  },
};
</script>

<style lang="postcss">
.toast {
  @apply bg-base shadow-lg rounded;
  border-radius: 4px;
  display: flex;
  margin-bottom: 10px;
  overflow: hidden;
  padding: 16px;
  position: relative;
}
.toast::after {
  bottom: 0;
  content: "";
  display: block;
  left: 0;
  position: absolute;
  top: 0;
  width: 4px;
}

.toast__icon {
  align-items: flex-start;
  display: inline-flex;
  flex-basis: auto;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 8px;
}

.toast__title {
  font-weight: 700;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.toast__actions {
  display: flex;
  margin-top: 8px;
}

.toast__action {
  margin-right: 8px;
}

.toast__close {
  position: absolute;
  right: 8px;
  top: 8px;
}

.toast--info::after {
  @apply bg-brand;
}

.toast--success::after {
  @apply bg-success;
}

.toast--warning::after {
  @apply bg-warning;
}

.toast--error::after {
  @apply bg-danger;
}
</style>
