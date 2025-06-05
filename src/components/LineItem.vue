<template>
  <div class="line-item">
    <FieldComponent
      :id="`row-${price.key}-name`"
      name="name"
      label="Name"
      type="text"
      placeholder="Beans"
      :model-value="price.name"
      @update:model-value="(newValue) => store.updatePrice(price.key, 'name', newValue)"
    />
    <FieldComponent
      :id="`row-${price.key}-cost`"
      class="small-field"
      name="cost"
      label="Cost"
      type="number"
      placeholder="123.45"
      :model-value="price.cost"
      prefix="$"
      @update:model-value="(newValue) => store.updatePrice(price.key, 'cost', newValue)"
    />
    <FieldComponent
      :id="`row-${price.key}-qty`"
      class="small-field"
      name="quantity"
      label="Quantity"
      type="number"
      placeholder="10"
      :model-value="price.quantity"
      @update:model-value="(newValue) => store.updatePrice(price.key, 'quantity', newValue)"
    />
    <FieldComponent
      :id="`row-${price.key}-unit`"
      class="small-field"
      name="unit"
      label="Unit"
      type="text"
      placeholder="beans"
      :model-value="price.unit"
      @update:model-value="(newValue) => store.updatePrice(price.key, 'unit', newValue)"
    />
    <div class="result-container">
      <span> = </span><span class="result">{{ `$${unitPriceDisplay}` }}</span
      ><span class="unit" v-if="price.unit"> / {{ price.unit }}</span>
      <button
        v-if="store.priceCount > 1"
        id="remove-button"
        title="Remove line"
        @click="emit('onRemove')"
      >
        x
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import FieldComponent from '@/components/FieldComponent.vue'
import { computed } from 'vue'
import type { Price } from '@/types'
import { usePricesStore } from '@/store'

const props = defineProps<{
  price: Price
}>()

const emit = defineEmits(['onRemove'])

const store = usePricesStore()

const unitPrice = computed(() =>
  props.price.cost && props.price.quantity ? props.price.cost / props.price.quantity : undefined,
)

const unitPriceDisplay = computed(() => {
  if (unitPrice.value) {
    const fixedUnitPrice = unitPrice.value.toFixed(3).toString()

    if (fixedUnitPrice.endsWith('0')) {
      return unitPrice.value.toFixed(2)
    } else {
      return fixedUnitPrice
    }
  }

  return ''
})
</script>

<style scoped>
.line-item {
  display: flex;
  flex-direction: row;
  align-items: end;
}

:deep(.small-field input) {
  max-width: 4rem;
  text-align: right;
}

:deep(.small-field label) {
  text-align: right;
}

.result-container {
  margin-bottom: 1.125rem;
  color: grey;
}

.result {
  color: white;
}
</style>
