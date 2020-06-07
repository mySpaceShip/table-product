<template>
  <div class="selector">
    <selector :value="selectedItems.length" text="columns selected">
      <div />
      <div class="selector__list">
        <label class="selector__item" @click.prevent="selectAll">
          <input type="checkbox" />
          <span
            class="selector__checkmark"
            :class="{ 'selector__item--active': showAllColumns }"
          />
          All selected
        </label>
        <label
          v-for="(item, index) in columns"
          :key="index"
          class="selector__item"
          @click.prevent="select(item)"
        >
          <input :checked="selectedItems.includes(item)" type="checkbox" />
          <span
            class="selector__checkmark"
            :class="{
              'selector__item--active':
                selectedItems.includes(item) || showAllColumns,
            }"
          />
          {{ item | servingBy}}
        </label>
      </div>
    </selector>
  </div>
</template>

<script>
/* eslint-disable */

import Selector from "../selectors/selector";
export default {
  name: 'SelectorColumns',
  components: {
    Selector,
  },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    showAll: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    showAllColumns: true,
    selectedItems: [],
  }),
   filters: {
    servingBy(val) {
      const servings = ['(100g serving)', '(%)', '(g)']
      val = val === 'product' ? val + " " + servings[0]
                : val === "iron" ? val + " " + servings[1]
                : val + " " + servings[2]
      return val.charAt(0).toUpperCase() + val.slice(1)

    }
  },
  watch: {
    selectedItems(val) {
        this.$emit("changeColumns", val);
    },
    columns(val) {
     this.selectedItems = this.showAllColumns ? val : [];
    }
  },
  created() {
    this.showAllColumns = this.showAll;
  },
  methods: {
    selectAll() {
      this.showAllColumns = !this.showAllColumns;
      this.selectedItems = this.showAllColumns ? this.columns : [];
    },
    select(column) {
      const columnHas = this.selectedItems.includes(column)
      this.selectedItems = columnHas 
        ? this.selectedItems.filter((el) => el !== column)
        : [...this.selectedItems ,column]
      if (this.selectedItems.length === this.columns.length) {
        this.showAllColumns = true;
      } else {
        this.showAllColumns = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.selector {
  &__select {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border: 1px solid #c6cbd4;
    border-radius: 2px;
    padding: 4px 3px 2px 13px;
    cursor: unset;
    background: transparent;
    font-size: 14px;
    line-height: 21px;
    color: #5b5e77;
    &:after {
      content: "";
      margin: -4px 5px 0 6px;
      border: solid #c6cbd4;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 2px;
      transform: rotate(45deg);
      transition: 0.4s linear;
    }
    &--active:after {
      transform: rotate(-135deg);
      margin-top: 0;
    }
  }
  &__list {
    position: absolute;
    padding: 15px 2px 14px 17px;
    top: 40px;
    width: 207px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    background: white;
    z-index: 10;
  }
  &__item {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 19px;
    font-size: 14px;
    line-height: 24px;
    user-select: none;
    color: #5b5e77;
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    &--active {
      &.selector__checkmark {
        background-color: #00a11e;
      }
      &.selector__checkmark:after {
        display: block;
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
  &__checkmark {
    display: block;
    flex-shrink: 0;
    margin-right: 8px;
    height: 14px;
    width: 14px;
    background-color: white;
    border: 1px solid #d5dae0;
    border-radius: 2px;
    &::after {
      content: "";
      position: absolute;
      left: 6px;
      top: 7px;
      width: 4px;
      height: 7px;
      border: solid white;
      border-width: 0 1px 1px 0;
      transform: rotate(45deg);
    }
  }
}
</style>
