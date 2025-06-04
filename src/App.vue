<template>
  <LineItem v-for="line in lines" :key="line" />
  <button @click="addLine">Add Comparison</button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import LineItem from '@/components/LineItem.vue'

const lines = ref([0])

const addLine = () => lines.value.push(lines.value.length)
</script>

<style>
body {
  background-color: black;
  color: white;
}
</style>
