<template>
  <div class="layout">
    <TableComponent />
    <FooterComponent />
  </div>
</template>
<script setup lang="ts">
import TableComponent from '@/components/TableComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
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

.layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  align-items: center;
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
  background-color: rgba(68, 26, 26, 0.664);
  transition: background-color 0.3s ease-in-out;
}

.line-item:first-of-type label {
  display: block;
}

@media screen and (max-width: 796px) {
  .line-item label {
    display: block;
  }
}
</style>
