<template>
  <label :for="name">{{ label }}</label>
  <input :type="type" :name="name" :placeholder="placeholder" v-model="value" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  label: string
  type: 'text' | 'number'
  placeholder?: string
  modelValue?: any
}>()

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },

  set(newValue) {
    emit('update:modelValue', newValue)
  },
})
</script>

<style scoped>
label {
  display: none;
}
</style>
