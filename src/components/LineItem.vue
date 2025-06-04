<template>
  <div class="line-item">
    <FieldComponent name="name" label="Name" type="text" placeholder="Item name" />
    <FieldComponent name="cost" label="Cost" type="number" placeholder="$123.45" v-model="cost" />
    <FieldComponent
      name="qty"
      label="Quantity"
      type="number"
      placeholder="qty"
      v-model="quantity"
    />
    <FieldComponent name="unit" label="Unit" type="text" placeholder="qty" v-model="unit" />
    <div>
      <span>=</span>{{ `$${unitPrice}` }}<span v-if="unit"> / {{ unit }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import FieldComponent from '@/components/FieldComponent.vue'
import { ref, computed } from 'vue'

const cost = ref<number>()
const quantity = ref<number>()
const unit = ref<string>()

const unitPrice = computed(() =>
  cost.value && quantity.value ? `${(cost.value / quantity.value).toFixed(3)}` : '',
)
</script>

<style scoped>
.line-item {
  display: flex;
  flex-direction: row;
}
</style>
