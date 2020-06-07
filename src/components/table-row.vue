<template>
  <div class="table-row">
    <label
      v-if="itemsAsArr.length !== 0"
      @click.prevent="select"
      class="table-row__checkbox"
    >
      <input type="checkbox" />
      <span
        :class="{ 'table-row__checkmark--active': selected }"
        class="table-row__checkmark"
      />
    </label>
    <div
      v-if="items[sortedFilter]"
      class="table-row__item"
      :class="{
        'table-row__item--lg': typeof items[sortedFilter] === 'string',
      }"
    >
      {{ items[sortedFilter] }}
    </div>
    <div
      v-for="(item, index) in itemsAsArr"
      :key="index"
      ref="rowItem"
      :data-id="items.id"
      class="table-row__item"
      :class="{ 'table-row__item--lg': typeof item === 'string' }"
    >
      {{ item }}
    </div>
    <div
      @click="opened = true"
      v-click-outside="test"
      class="table-row__delete-block"
    >
      <img src="../../public/images/rubbish-bin.svg" />
      <span>delete</span>
      <popup
        v-click-outside="(show = false)"
        :show="opened && show"
        @confirm="show"
        class="table-row__popup"
      >
        <p>Are you sure you want to <strong>delete item?</strong></p>
      </popup>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ClickOutside from "vue-click-outside";
import Popup from "./popup";

export default {
  name: 'TableRow',
  directives: {
    ClickOutside,
  },
  components: {
    Popup,
  },
  props: {
    items: {
      type: Object,
      default: () => {},
    },
    sortedFilter: {
      type: String,
      default: "",
    },
    selectedItem: {
      type: Boolean,
      default: false,
    },
    showPopup: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    selected: false,
    show: false,
    testShow: false,
  }),
  computed: {
    itemsAsArr() {
      let filteredObj = { ...this.items };
      delete filteredObj[this.sortedFilter];
      delete filteredObj["id"];
      return Object.values(filteredObj);
    },
  },
  watch: {
    selectedItem(val) {
      this.selected = val;
    },
  },
  methods: {
    test() {
      console.log(true);
      
    },
    select() {
      let rowId = this.$refs.rowItem[0].getAttribute("data-id");
      rowId = parseInt(rowId);
      this.$emit("select", rowId);
    },
    removeItem() {
      this.show = true;
      let rowId = this.$refs.rowItem[0].getAttribute("data-id");
      rowId = parseInt(rowId);
      this.$store.dispatch("REMOVE_PRODUCT_BY_ID", rowId);
    },
  },
};
</script>

<style lang="scss">
.table-row {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 18px 22px 17px 37px;
  box-sizing: border-box;

  &:hover {
    .table-row__delete-block {
      opacity: 1;
    }
  }

  &__item {
    margin-right: 20px;
    width: 100%;
    max-width: 12%;
    &--lg {
      width: 100%;
      max-width: 200px;
    }
  }

  &__checkbox {
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 30px;
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
      top: 50%;
      margin-top: -19%;
      width: 4px;
      height: 7px;
      border: solid white;
      border-width: 0 1px 1px 0;
      transform: rotate(45deg);
    }

    &--active {
      &.table-row__checkmark {
        background-color: #00a11e;
      }
      &.table-row:after {
        display: block;
      }
    }
  }

  &__delete-block {
    position: absolute;
    display: flex;
    align-items: center;
    right: 33px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 1;
    z-index: 5;

    span {
      font-size: 14px;
      color: #5b5e77;
    }

    img {
      width: 12px;
      height: 16px;
      margin-right: 6px;
    }
  }

  &__popup {
    p {
      white-space: nowrap;
    }
  }
}
</style>
