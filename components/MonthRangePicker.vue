<template>
  <ARangePicker v-model:value="modelValue" :disabled-date picker="month" />
</template>
<script setup lang="ts">
import { Dayjs } from "dayjs"
const modelValue = defineModel<[Dayjs, Dayjs]>("modelValue", { required: true })

defineProps<{
  disabledDate?: (date: Dayjs) => boolean
}>()
</script>
