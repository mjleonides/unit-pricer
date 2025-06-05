<template>
  <div class="line-item">
    <div class="row">
      <div class="button-container">
        <button
          v-if="store.priceCount > 1"
          id="remove-button"
          title="Remove line"
          @click="emit('onRemove')"
        >
          x
        </button>
      </div>
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
    </div>
    <div class="row">
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
        <span class="fill">=</span>
        <FieldComponent
          :id="`row-${price.key}-result`"
          name="result"
          class="small-field result"
          label="Unit Price"
          type="text"
          readonly
          :modelValue="unitPriceDisplay"
          prefix="$"
        />
        <span v-if="price.unit" class="fill">{{ price.unit }}</span>
      </div>
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
.line-item,
.row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: end;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

@media screen and (max-width: 796px) {
  .line-item {
    flex-direction: column;
  }
}

:deep(.small-field input) {
  text-align: right;
  max-width: 4rem;
}

:deep(.small-field label) {
  text-align: right;
}

.result-container {
  color: grey;
  min-width: 15rem;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 0.5rem;
}

:deep(.result input) {
  border-color: rgba(255, 255, 255, 0.651);
}

.button-container {
  margin-bottom: 0.5rem;
  min-width: 2rem;
}

.result {
  color: white;
}

.fill {
  min-height: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
