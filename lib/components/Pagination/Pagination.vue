<template>
  <ul class="pagination" :class="[{'pagination--centerd': centered}]">
    <li class="ml-1" v-if="firstLast">
      <v-button
        :size="size"
        @click="onClickFirstPage"
        aria-label="Go to first page"
        :disabled="isInFirstPage"
      >
        First
      </v-button>
    </li>

    <li class="ml-1">
      <v-button
        :size="size"
        @click.prevent="onClickPreviousPage"
        aria-label="Go to previous page"
        :disabled="isInFirstPage"
      >
        Previous
      </v-button>
    </li>

    <li v-for="(page, i) in pages" :key="i" class="ml-1">
      <v-button
        :size="size"
        @click.prevent="onClickPage(page.name)"

        :appearance="isPageActive(page.name) ? 'primary' : 'default'"
        :class="{ active: isPageActive(page.name) }"
        :aria-label="`Go to page number ${page.name}`"

      >
        {{ page.name }}
      </v-button>
    </li>

    <li class="ml-1">
      <v-button
        :size="size"
        @click="onClickNextPage"
        :disabled="isInLastPage"
        aria-label="Go to next page"
      >
        Next
      </v-button>
    </li>

    <li class="ml-1" v-if="firstLast">
      <v-button
        :size="size"
        @click="onClickLastPage"
        :disabled="isInLastPage"
        aria-label="Go to last page"
      >
        Last
      </v-button>
    </li>
  </ul>
</template>

<script>
import VButton from '../Button';

export default {
  name: 'VPagination',
  props: {
    value: {
      type: Number,
      default: 1,
    },
    maxVisibleButtons: {
      type: Number,
      default: 3,
    },
    total: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    size: {
      type: String,
      default: 'lg',
    },
    firstLast: {
      type: Boolean,
      default: true,
    },
    centered: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentPage: this.value,
    };
  },
  computed: {
    startPage() {
      const start = this.currentPage - this.maxVisibleButtons;
      return (start > 0) ? start : 1;
    },
    endPage() {
      const end = this.currentPage + this.maxVisibleButtons;
      return (end < this.totalPages) ? end : this.totalPages;
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
    totalPages() {
      return Math.ceil(this.total / this.perPage);
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('input', 1);
    },
    onClickPreviousPage() {
      this.$emit('input', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('input', page);
    },
    onClickNextPage() {
      this.$emit('input', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('input', this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
  watch: {
    value(value) {
      this.currentPage = value;
    },
  },
  components: { VButton },
};
</script>

<style lang="postcss">
.pagination {
  @apply flex items-center;
}
.pagination--centerd {
  @apply justify-center;
}
</style>
