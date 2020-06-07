/* eslint-disable */


import Vue from "vue";
import Vuex from "vuex";
import { getProducts } from "../api/request";
import _ from 'lodash'

Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    state: {
      products: [],
    },
    getters: {
      PRODUCTS: state => state.products,
      PAGINATED_PRODUCTS: state => (currIndex, lastIndex) => {
        return state.products.slice(currIndex, lastIndex)
      },
      PRODUCT_TITLES: state => {
          return Object.keys(state.products[0]).filter(el => el != 'id')
      }
      // GET_SHRINKED_PRODUCT: state => state.products.pop()
      // FILTERED_CATEGORIES: (state) => (categoryId) => {
      //   return state.allCategories.filter((el) => el.parent_id == categoryId);
      // },
      // SET_CHECKED_URL_CATEGORIES: (state) => {
      //   let url = "";
      //   const checkedCategories = [];
      //   if (process.browser) {
      //     url = window.location.href;
      //   }
      //   state.allCategories.forEach((el) => {
      //     const regexp = new RegExp(`${el.url}`);
      //     if (url.match(regexp)) {
      //       checkedCategories.push(el);
      //     }
      //   });
      //   return checkedCategories;
      // },
    },
    mutations: {
      SET_PRODUCTS: (state, products) => {
        state.products = products;
      },
      REMOVE_PRODUCT_BY_ID: (state, products) => {
        state.products = products
      },
      REMOVE_PRODUCTS_BY_ID: (state, products) => {
        state.products = products
      }
      // SORT_PRODUCTS: (state, varType, sortMax, byTitle) => {
      //   let res = []
      //   if (sortMax) {
      //     state.paginatedProducts = typeof varType === Number 
      //     ? state.paginatedProducts_ 
      //     }) 
      //   }
      //   res = this.
      // },
      // DELETE_PRODUCTS: state => state.products = state.products.filter(el => el.id > 30 && el.id < 140 )
    },
    actions: {
      GET_PRODUCTS: async context => {
        const response = await getProducts()
          .then( resolve => resolve )
          .catch ( err => console.error(err));
          let result = response ? response : []
          context.commit("SET_PRODUCTS", result);
        },
        REMOVE_PRODUCT_BY_ID: async (context, id) => {
          const products = _.remove(context.state.products, product => product.id !== id)
          context.commit("REMOVE_PRODUCT_BY_ID", products)
        },
        REMOVE_PRODUCTS_BY_ID: async (context, collection) => {
          const products = _.remove(context.state.products, product => !collection.includes(product.id))
          context.commit("REMOVE_PRODUCTS_BY_ID", products)
        },
      },
  });

export default store;
