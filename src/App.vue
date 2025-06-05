<template>
  <div class="table">
    <LineItem
      v-for="price in store.prices"
      :row="price.key"
      :price="price"
      :key="price.key"
      @on-remove="store.removePrice(price.key)"
    />

    <div class="button-container">
      <button @click="store.addPrice">Add Comparison</button>
      <button @click="store.clear">Clear</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import LineItem from '@/components/LineItem.vue'
import { usePricesStore } from '@/store'

const store = usePricesStore()
</script>

<style>
body {
  background-color: black;
  color: white;
  font-family: Roboto, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.table {
  margin: 0 auto;
  max-width: max-content;
  /* display: flex;
  flex-direction: row;
  justify-content: center; */
}

.line-item:first-of-type label {
  display: block;
}

.button-container {
  margin: 0.5rem 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

button {
  background-color: black;
  color: grey;
  border: solid 1px rgb(84, 84, 84);
  border-radius: 4px;
  margin: 0 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
}

button:hover,
button:focus-visible {
  background-color: rgb(84, 84, 84);
  color: white;
}
</style>
