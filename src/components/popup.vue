<template>
  <div 
  v-if="show"
  class="popup">
    <slot />
    <div class="popup__btns">
      <button class="popup__btn" @click="$emit('hide', false)">
        cancel
      </button>
      <button class="popup__btn popup__btn--gray" @click="$emit('confirm', false)">
        confirm
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Popup',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.popup {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateX(-45%);
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  padding: 16px;
  font-size: 14px;
  line-height: 21px;
  z-index: 5;
  &__btns {
    display: flex;
    align-items: center;
    margin-top: 8px;
  }
  &__btn {
    border: 1px solid #c6cbd4;
    border-radius: 4px;
    font-size: 14px;
    line-height: 24px;
    color: #5b5e77;

    &--gray {
      margin-left: 16px;
      background: #00a11e;
      color: white;
    }
  }
}
</style>
