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

<style>
:root {
  --bg-color: rgb(12, 12, 12);
}

* {
  box-sizing: border-box;
}

body {
  background-color: var(--bg-color);
  color: white;
  font-family: Roboto, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 0;
}

.line-item:first-of-type label {
  display: block;
}

button {
  background-color: var(--bg-color);
  color: rgb(209, 209, 209);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
}

button:hover,
button:focus-visible {
  background-color: rgba(70, 70, 70, 0.664);
  transition: background-color 0.3s ease-in-out;
}

@media screen and (max-width: 796px) {
  .line-item label {
    display: block;
  }
}
</style>

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
