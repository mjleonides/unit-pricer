<template>
  <div class="line-item">
    <div class="row">
      <FieldComponent
        :id="`row-${price.key}-name`"
        name="name"
        label="Name"
        type="text"
        placeholder="Beans"
        :model-value="price.name"
        @update:model-value="(newValue) => store.updatePrice(price.key, 'name', newValue)"
      />
    </div>
    <div class="row">
      <FieldComponent
        :id="`row-${price.key}-cost`"
        class="small-field"
        name="cost"
        label="Cost"
        type="number"
        placeholder="123.45"
        :model-value="price.cost"
        prefix="$"
        inputmode="decimal"
        @update:model-value="(newValue) => store.updatePrice(price.key, 'cost', newValue)"
      />
      <FieldComponent
        :id="`row-${price.key}-qty`"
        class="small-field"
        name="quantity"
        label="Quantity"
        type="number"
        placeholder="10"
        inputmode="decimal"
        :model-value="price.quantity"
        @update:model-value="(newValue) => store.updatePrice(price.key, 'quantity', newValue)"
      />
      <FieldComponent
        :id="`row-${price.key}-unit`"
        class="small-field"
        name="unit"
        label="Unit"
        type="text"
        placeholder="Bean"
        :model-value="price.unit"
        @update:model-value="(newValue) => store.updatePrice(price.key, 'unit', newValue)"
      />
    </div>
    <div class="row">
      <div class="result-container">
        <span class="fill">=</span>
        <FieldComponent
          :id="`row-${price.key}-result`"
          name="result"
          class="small-field result"
          :label="price.unit ? `Per ${price.unit}` : ''"
          type="text"
          readonly
          :modelValue="unitPriceDisplay"
          prefix="$"
          show-label
        />
      </div>
    </div>
    <div v-if="store.priceCount > 1" class="button-container">
      <button id="remove-button" title="Remove line" @click="emit('onRemove')">Remove</button>
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
  align-items: flex-end;
  gap: 0.5rem;
}

.line-item {
  margin-bottom: 1rem;
}

:deep(.small-field input) {
  text-align: right;
  max-width: 6.5rem;
}

:deep(.small-field label) {
  text-align: right;
}

.result-container {
  color: grey;
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

@media screen and (max-width: 796px) {
  .line-item {
    flex-direction: column;
    border: solid 1px rgba(128, 128, 128, 0.437);
    border-radius: 8px;
    padding: 1rem;
    align-items: center;
  }

  .row {
    justify-content: flex-end;
    width: 100%;
  }

  .button-container {
    margin-bottom: -0.5rem;
  }
}
</style>
