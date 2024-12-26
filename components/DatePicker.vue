<template>
  <ADatePicker v-model:value="modelValue" :disabled-date></ADatePicker>
</template>
<script setup lang="ts">
import { Dayjs } from "dayjs"

const modelValue = defineModel<Dayjs>("modelValue", { required: true })
defineProps<{
  disabledDate?: (date: Dayjs) => boolean
}>()
</script>
