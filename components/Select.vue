<template>
  <ASelect
    v-model:value="modelValue!"
    :allow-clear="clearable"
    :disabled
    :status="error ? 'error' : undefined"
  >
    <ASelectOption v-for="o in options" :key="o.id" :value="o.id">{{
      o.name
    }}</ASelectOption>
  </ASelect>
</template>
<script lang="ts">
export interface Option<ID> {
  id: ID
  name?: string
}
</script>
<script setup lang="ts" generic="ID extends string | number | undefined | null">
defineProps<{
  options: Option<ID>[]
  clearable?: boolean
  disabled?: boolean
  error?: boolean
}>()
const modelValue = defineModel<ID>("modelValue")
</script>
