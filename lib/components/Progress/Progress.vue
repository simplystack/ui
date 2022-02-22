<template>
  <div class="progress" :class="classes">
    <div
      class="progress__bar"
      role="progressbar"

      :aria-valuemax="100"
      :aria-valuemin="0"
      :aria-valuenow="moderatedProgress"
      :style="{ 'width': `${moderatedProgress}%` }"

      v-if="type === 'determinate'"
    ></div>

    <div
      class="progress__bar"
      role="progressbar"

      :aria-valuemax="100"
      :aria-valuemin="0"

      v-else
    ></div>
  </div>
</template>

<script>
export default {
  name: 'UIProgress',
  props: {
    type: {
      type: String,
      default: 'indeterminate',
      validator(type) {
        return ['indeterminate', 'determinate'].indexOf(type) > -1;
      },
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    classes() {
      return [
        `progress--${this.type}`,
      ];
    },
    moderatedProgress() {
      if (this.progress < 0) {
        return 0;
      }
      if (this.progress > 100) {
        return 100;
      }
      return this.progress;
    },
  },
};
</script>

<style lang="postcss">
  .progress {
    @apply bg-tertiary;
    border-radius: 4px;
    display: block;
    height: 4px;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .progress__bar {
    @apply bg-brand;
    border-radius: 4px;
    height: 4px;
    transition: width 500ms ease;
  }

  .progress--indeterminate > .progress__bar {
    height: auto;
  }

  .progress--indeterminate > .progress__bar::before {
    animation: progress-indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395)
    infinite;
    background-color: inherit;
    content: "";
    height: 4px;
    left: 0;
    position: absolute;
    top: 0;
  }
  .progress--indeterminate > .progress__bar::after {
    animation: progress-indeterminate-short 2.1s
    cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    animation-delay: 1.15s;
    background-color: inherit;
    content: "";
    height: 4px;
    left: 0;
    position: absolute;
    top: 0;
  }

  @keyframes progress-indeterminate {
    0% {
      left: -35%;
      right: 100%;
    }
    60% {
      left: 100%;
      right: -90%;
    }
    100% {
      left: 100%;
      right: -90%;
    }
  }

  @keyframes progress-indeterminate-short {
    0% {
      left: -200%;
      right: 100%;
    }
    60% {
      left: 107%;
      right: -8%;
    }
    100% {
      left: 107%;
      right: -8%;
    }
  }
</style>
