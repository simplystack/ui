<template>
  <div class="notification" :class="classes">
    <div class="notification__icon">
      <!-- <v-icon :name="`${type}-icon`" width="20" height="20" /> -->
    </div>
    <div class="notification__content">
      <div class="notification__title">{{ computedTitle }}</div>
      <div class="notification__message">{{ message }}</div>
      <div class="notification__actions" v-if="actions.length > 0">
        <div
          class="notification__action"
          :key="i"
          v-for="(action, i) in actions"
        >
          <v-button
            :appearance="action.appearance"
            size="2"
            @click="actionClickHandler(action.onClick)"
          >
            {{ action.text }}
          </v-button>
        </div>
      </div>
    </div>
    <div class="notification__close" v-if="dismissible">
      <v-button appearance="subtle" size="1" @click.stop="onClose($event)">
        <template v-slot:icon>
          <!-- <v-icon name="cross-icon" width="14" height="14" /> -->
        </template>
      </v-button>
    </div>
  </div>
</template>

<script>
import VButton from "../Button";
import { capitalize } from "../../util";

export default {
  name: "VNotification",
  props: {
    id: {
      type: [Number, String],
      default: 1,
    },
    type: {
      type: String,
      default: "info",
      validator(type) {
        return ["info", "success", "warning", "error"].indexOf(type) > -1;
      },
    },
    title: {
      type: String,
    },
    message: String,
    dismissible: {
      type: Boolean,
      default: true,
    },
    timeout: {
      type: Number,
      default: 5000,
      validator: (value) => value > 0,
    },
    actions: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    computedTitle() {
      return this.title ? this.title : capitalize(this.type);
    },
    classes() {
      return [`notification--${this.type}`];
    },
  },
  mounted() {
    if (this.timeout && this.dismissible) {
      setTimeout(this.onClose, this.timeout);
    }
  },
  methods: {
    onClose(e) {
      this.$emit("close", e);
    },
    actionClickHandler(action) {
      if (action) {
        action();
        this.onClose();
      } else {
        this.onClose();
      }
    },
  },
  components: {
    VButton,
  },
};
</script>

<style lang="postcss">
.notification {
  background-color: var(--ui-01);
  border-radius: 4px;
  box-shadow: 0 0 1px rgba(76, 76, 76, 0.32),
    0 12px 10px -8px rgba(76, 76, 76, 0.12);
  display: flex;
  margin-bottom: 10px;
  overflow: hidden;
  padding: 16px;
  position: relative;
}
.notification::after {
  bottom: 0;
  content: "";
  display: block;
  left: 0;
  position: absolute;
  top: 0;
  width: 4px;
}

.notification__icon {
  align-items: flex-start;
  display: inline-flex;
  flex-basis: auto;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 8px;
}

.notification__title {
  font-weight: 700;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.notification__actions {
  display: flex;
  margin-top: 8px;
}

.notification__action {
  margin-right: 8px;
}

.notification__close {
  position: absolute;
  right: 8px;
  top: 8px;
}

.notification--info::after {
  @apply bg-blue-500;
}

.notification--success::after {
  @apply bg-green-500;
}

.notification--warning::after {
  @apply bg-yellow-500;
}

.notification--error::after {
  @apply bg-red-500;
}
</style>