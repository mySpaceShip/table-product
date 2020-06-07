<template>
  <div class="tb-sort">
    <div class="tb-sort__title fnt fnt--bold">
      Sorting by:
    </div>
    <div class="tb-sort__filters">
      <button
        v-for="(item, index) in filters"
        :key="index"
        :class="{ 'tb-sort__item--active': filter === item }"
        class="tb-sort__item fnt"
        @click="selectFilter(item)"
      >
        {{ item | servingBy }}
        <!-- add getter to store for servings
        <p v-if="filter === 'filter'"> (100g serving )</p>
        <p v-if="filter !== 'iron' || filter !== 'filter' "> (g)</p>
        <p v-if="filter === 'Iron'"> (%)</p>-->
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableFilters',
  props: {
    filters: {
      type: Array,
      default: () => [],
    },
    filter: {
      type: String,
      default: "",
    },
    sortMax: {
      type: Boolean,
      default: false,
    },
  },
   filters: {
    servingBy(val) {
      const servings = ['(100g serving)', '(%)', '(g)']
      val = val === 'product' ? val + " " + servings[0]
                : val === "iron" ? val + " " + servings[1]
                : val + " " + servings[2]
      return val.charAt(0).toUpperCase() + val.slice(1)

    }
  },
  methods: {
    selectFilter(filter) {
      this.$emit("selectFilter", filter);
    },
  },
};
</script>

<style lang="scss" scoped>
.fnt {
  font-size: 14px;
  line-height: 17px;
  color: #3d374a;

  &--bold {
    font-weight: 600;
  }
}

.tb-sort {
  display: flex;
  align-items: center;
  width: 100%;

  &__title {
    flex-shrink: 0;
  }

  &__filters {
    display: flex;
    align-items: center;
    margin-left: 8px;
  }

  &__item {
    margin-right: 4px;
    padding: 8px 5px 8px 8px;
    cursor: unset;
    background: transparent;
    border: none;
    font-family: 'Source Sans Pro', sans-serif;

    &--active,
    &:hover {
      background: #27a11d;
      border-radius: 2px;
      color: white;
      outline: none;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
