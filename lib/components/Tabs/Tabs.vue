<template>
  <div class="tabs" :class="classes">
    <ul class="tabs__list" role="tablist">
      <v-tab-header
        ref="tabHeaders"

        :active="activeTabId === tab.id"
        :disabled="tab.disabled"
        :id="tab.id"
        :key="tab.id"
        :title="tab.title"

        @click="selectTab(tab)"
        @keydown.left.native="selectPreviousTab"
        @keydown.right.native="selectNextTab"

        v-for="tab in tabs"
      >
      </v-tab-header>
    </ul>

    <div class="tabs__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import VTabHeader from '../TabHeader';

export default {
  name: 'VTabs',
  props: {
    wide: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      tabs: [],
      activeTabId: null,
      activeTabIndex: -1,
    };
  },
  computed: {
    classes() {
      return [
        { 'tabs--wide': this.wide },
      ];
    },
  },
  methods: {
    addTab(tab) {
      this.tabs.push(tab);

      // Select the tab if there's no tab selected (i.e. the tab is the only tab)
      // or the tab's selected prop is true
      if (this.activeTabId === null || tab.selected) {
        this.activeTabId = tab.id;
      }
    },
    removeTab(tab) {
      const index = this.tabs.indexOf(tab);

      if (index > -1) {
        this.tabs.splice(index, 1);

        // Switch to the nearest available tab if the tab being
        // removed is the one currently active
        if (tab.id === this.activeTabId) {
          this.selectTab(this.findNearestTab());
        }
      }
    },
    onTabDisabledChange(tab) {
      // Switch to the nearest available tab if the tab being disabled is currently active
      if (tab.disabled && this.activeTabId === tab.id) {
        this.selectTab(this.findNearestTab());
      }
    },
    selectTab(tab) {
      // Abort if the tab is disabled or already selected
      if (tab === null || tab.disabled || tab.id === this.activeTabId) {
        return;
      }

      this.activeTabId = tab.id;
      this.$emit('tab-change', tab.id);
    },
    selectNextTab() {
      const nextTab = this.findNextTab();

      if (nextTab) {
        this.selectTab(nextTab);
        nextTab.$el.focus();
      }
    },
    selectPreviousTab() {
      const previousTab = this.findPreviousTab();

      if (previousTab) {
        this.selectTab(previousTab);
        previousTab.$el.focus();
      }
    },
    findNextTab() {
      let tab = null;

      // eslint-disable-next-line no-plusplus
      for (let i = this.activeTabIndex + 1; i < this.$refs.tabHeaders.length; i++) {
        if (this.$refs.tabHeaders[i] && !this.$refs.tabHeaders[i].disabled) {
          tab = this.$refs.tabHeaders[i];
          break;
        }
      }

      return tab;
    },
    findPreviousTab() {
      let tab = null;

      // eslint-disable-next-line no-plusplus
      for (let i = this.activeTabIndex - 1; i >= 0; i--) {
        if (this.$refs.tabHeaders[i] && !this.$refs.tabHeaders[i].disabled) {
          tab = this.$refs.tabHeaders[i];
          break;
        }
      }

      return tab;
    },
    findNearestTab() {
      return this.findPreviousTab() || this.findNextTab();
    },
    findTabById(id) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.$refs.tabHeaders.length; i++) {
        if (id === this.$refs.tabHeaders[i].id) {
          return this.$refs.tabHeaders[i];
        }
      }

      return null;
    },
    setActiveTab(tabId) {
      const tab = this.findTabById(tabId);

      if (tab && !tab.disabled) {
        this.selectTab(tab);
      }
    },
  },
  components: { VTabHeader },
  watch: {
    activeTabId() {
      this.tabs.forEach((tab, index) => {
        if (this.activeTabId === tab.id) {
          tab.activate();
          this.activeTabIndex = index;
        } else if (tab.active) {
          tab.deactivate();
        }
      });
    },
  },
};
</script>

<style lang="postcss">
.tabs__list {
  @apply flex flex-wrap items-center border-b-2;
}
</style>
