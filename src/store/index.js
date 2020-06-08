import Vue from "vue";
import Vuex from "vuex";
import { getProducts, deleteProducts } from "../api/request";
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
    },
    actions: {
      /* eslint-disable*/
      GET_PRODUCTS: async context => {
        const response = await getProducts()
          .then( resolve => resolve )
          .catch ( err => console.error(err));
          let result = response ? response : []
          context.commit("SET_PRODUCTS", result);
        },
        REMOVE_PRODUCT_BY_ID: async (context, id) => {
      /* eslint-disable*/
          const response = await deleteProducts()
          .then( resolve => resolve )
          .catch ( err => console.error(err));
          const products = _.remove(context.state.products, product => product.id !== id)
          context.commit("REMOVE_PRODUCT_BY_ID", products)
        },
        REMOVE_PRODUCTS_BY_ID: async (context, collection) => {
      /* eslint-disable*/
          const response = await deleteProducts()
          .then( resolve => resolve )
          .catch ( err => console.error(err));
          const products = _.remove(context.state.products, product => !collection.includes(product.id))
          context.commit("REMOVE_PRODUCTS_BY_ID", products)
        },
      },
  });

export default store;
