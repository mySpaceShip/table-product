<template>
  <div class="selector">
    <selector :value="selectedItem" text="Per page">
      <div />
      <div class="selector__list">
        <label
          v-for="(item, index) in items"
          :key="index"
          class="selector__item"
          @click="selectedItem = item"
        >
          <input type="checkbox" />
          <span
            class="selector__checkmark"
            :class="{ 'selector__item--active': selectedItem == item }"
          />
          {{ item }} per page
        </label>
      </div>
    </selector>
  </div>
</template>

<script>
import Selector from "../selectors/selector";
export default {
  name: 'SelectorPagination',
  components: {
    Selector,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    selectedItem: "",
  }),
  watch: {
    selectedItem(val) {
      this.$emit("changeSelect", val);
    },
  },
  mounted() {
    this.selectedItem = this.items[0];
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
    width: 130px;
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
