<template>
  <div class="field">
    <label class="label" :for="id">{{ label }}</label>
    <div class="input-container">
      <span v-if="prefix" class="prefix">{{ prefix }}</span
      ><input
        :id="id"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        v-model="value"
        :readonly="readonly"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id: string
  name: string
  label: string
  placeholder?: string
  type: 'text' | 'number'
  modelValue?: any
  prefix?: string
  readonly?: boolean
}

// interface PropsText {
//   modelValue?: 'text'
// }
// interface PropsNumber{
//   modelValue?: 'number'
// }

// type Props<T extends PropsText | PropsNumber> = T extends 'text' ? PropsText : PropsNumber

// type NameOrId<T extends number | string> = T extends number
//   ? IdLabel
//   : NameLabel;

// <T extends number | string>(idOrName: T): NameOrId<T>

const props = defineProps<Props>()

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
.field {
  display: flex;
  flex-direction: column;
}

.input-container {
  position: relative;
}

.input-container:has(.prefix) input {
  padding-left: 1.125rem;
}

input {
  background-color: rgb(47, 47, 47);
  border: solid 1px rgb(47, 47, 47);
  color: white;
  border-radius: 8px;
  padding: 0.75rem 0.5rem;
  font-size: 1rem;
  min-height: 1.25rem;
}

.prefix {
  position: absolute;
  bottom: 1rem;
  left: 0.5rem;
  display: inline-block;
  content: '$';
  width: 1ch;
  height: 1rem;
  color: grey;
}

input::placeholder {
  opacity: 0.65;
}

label {
  color: grey;
  display: none;
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
}

.prefix {
  color: grey;
  margin-inline-end: 0.125rem;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  display: none;
}
/* input[type='number'] {
  -moz-appearance: textfield;
} */
</style>
