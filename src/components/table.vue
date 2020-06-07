<template>
  <div class="table__wrapper">
    <h1 class="table__title">
      Table UI
    </h1>
    <div class="table">
      <div class="table-filters">
        <div class="table-filters__left-col">
          <div class="table__filters">
            <filters
              @selectFilter="(selected) => (filter = selected)"
              :filter="filter"
              :filters="selectedColumns"
            />
          </div>
        </div>
        <div class="table-filters__right-col">
          <popup
            @hide="(hide) => (showDelete = hide)"
            @confirm="confirmDelete"
            :show="showDelete"
          >
            <p>Are you sure you want to <strong>delete item?</strong></p>
          </popup>
          <div
            @click="showDelete = true"
            v-if="selectedProducts.length > 0"
            class="table__delete-btn"
          >
            Delete {{ selectedProducts.length }}
          </div>
          <div class="table__pagination">
            <pagination
              :pages="pageSettings.pages"
              :curr-page="pageSettings.currPage"
              :per-page="pageSettings.perPage"
              @selectPage="selectPage"
              @nextPage="nextPage"
              @prevPage="prevPage"
            />
          </div>
          <div class="table__selector">
            <selector-columns
              @changeColumns="selectColumns"
              :columns="titles"
              :show-all="true"
            />
          </div>
        </div>
      </div>
      <div class="table__box">
        <div class="table-header">
          <label class="table-checkbox" @click.prevent="selectAll">
            <input type="checkbox" />
            <span
              class="table-checkbox__checkmark"
              :class="{ 'table-checkbox--active': selectedAll }"
            />
          </label>
          <div
            v-if="selectedColumns.includes(filter)"
            @click="
              sortedProduct = filter;
              sortMax = !sortMax;
            "
            :class="{
              'table-header__title--active': sortMax,
              'table-header__title--lg': filter === 'product',
            }"
            class="table-header__title table-header__title--red"
          >
            {{ filter | servingBy }}
          </div>
          <div
            v-for="(title, index) in selectedColumns.filter(
              (el) => el !== filter
            )"
            :key="index"
            class="table-header__title"
            :class="{
              'table-header__title--active': index === 0,
              'table-header__title--lg': title === 'product',
            }"
          >
            {{ title | servingBy }}
          </div>
        </div>
        <div class="table__rows">
          <div
            v-for="(item, index) in pagedProducts"
            :key="index"
            class="table__row"
          >
            <row
              @select="collectRemove"
              @hidePopup="(id) => deletedProduct = id"
              :showPopup="pagedProducts.includes(el => el.id === deletedProduct)"
              :items="item"
              :selectedItem="selectedProducts.includes(item.id)"
              :sorted-filter="filter"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ClickOutside from "vue-click-outside";

import Filters from "./table-filters";
import Pagination from "./Pagination";
import SelectorColumns from "./selectors/selector-columns";
import Row from "./table-row";
import Popup from "./popup";
import { mapActions, mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: 'Table',
  directives: {
    ClickOutside,
  },
  components: {
    SelectorColumns,
    Filters,
    Pagination,
    Row,
    Popup,
  },  
  data: () => ({
    pageSettings: {
      pages: [10, 20, 15, 5, 4, 3, 2, 17],
      perPage: 10,
      currPage: 1,
      firstIndex: 0,
      lastIndex: 10,
    },
    products: [],
    titles: [],
    selectedColumns: [],
    sortMax: true,
    sortedProduct: "",
    filter: "Product",
    selectedProducts: [],
    showDelete: false,
    deletedProduct: ''
  }),
  filters: {
    servingBy(val) {
      const servings = ["(100g serving)", "(%)", "(g)"];
      val =
        val === "product"
          ? val + " " + servings[0]
          : val === "iron"
          ? val + " " + servings[1]
          : val + " " + servings[2];
      return val.charAt(0).toUpperCase() + val.slice(1);
    },
  },
  computed: {
    pagedProducts() {
      const firstIndex =
        (this.pageSettings.currPage - 1) * this.pageSettings.perPage;
      const lastIndex = firstIndex + this.pageSettings.perPage;
      let paginateProducts = this.$store.getters.PAGINATED_PRODUCTS(
        firstIndex,
        lastIndex
      );
      paginateProducts = this.sortMax
        ? _.orderBy(paginateProducts, [this.sortedProduct], ["desc"])
        : _.orderBy(paginateProducts, [this.sortedProduct], ["asc"]);

      return paginateProducts.map((el) => {
        let obj = {};
        this.selectedColumns.forEach((column) => {
          obj[column] = el[column];
          obj.id = el.id;
        });
        return obj;
      });
    },
    selectedAll() {
      return this.selectedProducts.length === this.pagedProducts.length
        ? true
        : false;
    },
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      await this.$store.dispatch("GET_PRODUCTS");
      this.products = await this.$store.getters.PRODUCTS.slice(
        0,
        this.pageSettings.perPage
      );
      this.titles = await this.$store.getters.PRODUCT_TITLES;
      this.filter = this.titles[0];
    },
    selectPage(perPage) {
      this.pageSettings.currPage = 1;
      this.pageSettings.perPage = perPage;
    },
    nextPage(next) {
      this.pageSettings.currPage = next;
      this.selectedProducts = [];
    },
    prevPage(prev) {
      this.pageSettings.currPage = prev;
      this.selectedProducts = [];
    },
    selectColumns(columns) {
      this.selectedColumns = this.titles.filter((el) => columns.includes(el));
    },
    collectRemove(id) {
      const columnHas = this.selectedProducts.includes(id);
      this.selectedProducts = columnHas
        ? this.selectedProducts.filter((el) => el !== id)
        : [...this.selectedProducts, id];
    },
    selectAll() {
      this.selectedProducts = this.selectedAll
        ? []
        : this.pagedProducts.map((el) => {
            let id;
            this.pagedProducts.forEach((innerEl) => (id = el.id));
            return id;
          });
    },
    confirmDelete() {
      this.showDelete = false;
      this.$store.dispatch("REMOVE_PRODUCTS_BY_ID", this.selectedProducts);
      this.selectedProducts = [];
    },
  },
};
</script>

<style lang="scss" scoped>
.table {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0 0 0;
  border-top: 1px solid #ededed;

  &__wrapper {
    width: 100%;
    max-width: 1140px;
    padding: 0 30px;
  }

  &__title {
    text-align: left;
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
  }

  &__selector {
    margin-left: 16px;
  }

  &-filters {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;

    &__left-col {
      margin-right: 10px;
    }

    &__right-col {
      position: relative;
      display: flex;
      align-items: center;
    }
  }

  &__delete-btn {
    margin-right: 12px;
    padding: 6px 11px 7px 18px;
    background: #27a11d;
    border-radius: 2px;
    color: white;
  }

  &__box {
    width: 100%;
    padding: 22px 0 100px;
    background: #ffffff;
    border-radius: 4px;
  }
  &-header {
    display: flex;
    align-items: center;
    padding: 0 0 20px 37px;
    width: 100%;
    border-bottom: 1px solid #ededed;

    &__title {
      position: relative;
      margin-right: 20px;
      width: 100%;
      max-width: 11%;
      color: #282136;
      font-weight: 600;

      &--lg {
        width: 100%;
        max-width: 200px;
      }

      &--red {
        color: #00a11e;
        cursor: default;
        &:after {
          position: absolute;
          content: "\2191";
          font-weight: 600;
          color: #333333;
          cursor: default;
        }
      }

      &--active:after {
        transform: rotate(180deg);
      }
    }
  }
  &__row {
    &:hover,
    &:active {
      cursor: pointer;
      background: rgba(0, 161, 30, 0.07) !important;
    }

    &:nth-child(even) {
      background: #f8f9fa;
    }
  }
  &-checkbox {
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

    &--active {
      &.table-checkbox__checkmark {
        background-color: #00a11e;
      }
      &.table-checkbox__checkmark:after {
        display: block;
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
        top: 3px;
        width: 4px;
        height: 7px;
        border: solid white;
        border-width: 0 1px 1px 0;
        transform: rotate(45deg);
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

<style lang="scss">
.popup {
  max-width: 254px;
  left: 0;
  top: 60px;
}
</style>
