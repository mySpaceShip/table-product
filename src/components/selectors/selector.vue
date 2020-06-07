<template>
  <div class="selector">
    <button
      :class="{ 'selector__select-btn--active': show }"
      class="selector__select-btn"
      @click="show = !show"
    >
      {{ value }} {{ text }}
    </button>
    <div v-if="show" v-click-outside="() => (show = false)">
      <slot />
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
export default {
  directives: {
    ClickOutside,
  },
  props: {
    value: {
      type: [Number, String],
      default: null,
    },
    text: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    show: false,
  }),
  mounted() {
    this.popupItem = this.$el;
  },
};
</script>

<style lang="scss" scoped>
.selector {
  position: relative;
  &__select-btn {
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
    font-family: 'Source Sans Pro', sans-serif;

    &:after {
      content: "";
      margin: -4px 5px 0 6px;
      border: solid #c6cbd4;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 2px;
      transform: rotate(45deg);
      transition: 0.1s linear;
    }

    &--active:after {
      transform: rotate(-135deg);
      margin-top: 0;
    }
  }
}
</style>
