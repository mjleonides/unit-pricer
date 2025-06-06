<template>
  <div class="table">
    <LineItem
      v-for="price in store.prices"
      :price="price"
      :key="price.key"
      @on-remove="store.removePrice(price.key)"
    />

    <div class="button-container">
      <button @click="store.addPrice">+ Add Comparison</button>
      <button @click="store.clear">Clear</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import LineItem from '@/components/LineItem.vue'
import { usePricesStore } from '@/store'

const store = usePricesStore()
</script>
<style scoped>
.table {
  margin: 5rem auto;
  max-width: max-content;
}
.button-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
}
</style>
