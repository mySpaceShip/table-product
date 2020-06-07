<template>
  <div class="pagination">
    <div class="pagination__selector">
      <selector :items="pages" @changeSelect="selectPage" />
    </div>
    <div class="pagination__btns">
      <button
        :class="{ 'pagination__btn--disable': fromPage === 1 }"
        class="pagination__btn pagination__btn--left"
        @click="prevPage"
      />
      <div class="pagination__index">
        {{ fromPage }}
        <span v-if="toPage !== ''">
          -
        </span>
        {{ toPage }}
        <span>
          of
        </span>
        {{ lastPage }}
      </div>
      <button
        :class="{ 'pagination__btn--disable': fromPage + perPage >= lastPage }"
        class="pagination__btn pagination__btn--right"
        @click="nextPage"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import Selector from "./selectors/selector-pagination";
export default {
  name: 'Pagination',
  components: {
    Selector,
  },
  props: {
    perPage: {
      type: Number,
      default: 10,
    },
    pages: {
      type: Array,
      default: () => [10, 15, 20],
    },
    currPage: {
      type: Number,
      default: 1,
    },
  },
  data: () => ({}),
  computed: {
    fromPage() {
      const page = (this.currPage - 1) * this.perPage;
      return page === 0 ? 1 : page;
    },
    toPage() {
      const res =
        this.currPage * this.perPage >= this.lastPage
          ? ""
          : this.currPage * this.perPage;
      return res;
    },
    lastPage() {
      return this.$store.getters.PRODUCTS.length;
    },
  },
  methods: {
    selectPage(perPage) {
      this.$emit("selectPage", perPage);
    },
    nextPage() {
      const next = !this.toPage ? this.currPage
          : this.currPage + 1;
      this.$emit("nextPage", next);
    },
    prevPage() {
      const prev = this.currPage - 1 <= 0 ? this.currPage : this.currPage - 1;
      this.$emit("nextPage", prev);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  padding: 10px 20px &__selector {
    margin-right: 16px;
  }

  &__btns {
    display: flex;
    align-items: center;
    margin-left: 16px;    
  }

  &__btn {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border: 1px solid #c6cbd4;
    border-radius: 2px;
    padding: 9px;
    cursor: unset;
    background: transparent;

    &:after {
      content: "";
      border: solid #3d374a;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 3px;
    }

    &--left:after {
      transform: rotate(135deg);
    }

    &--right:after {
      transform: rotate(-45deg);
    }

    &--disable:after {
      border-color: #c6cbd4;
    }
  }

  &__index {
    margin: 0 8px;
  }
}
</style>
