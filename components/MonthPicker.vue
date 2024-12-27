<template>
  <ADatePicker
    v-model:value="modelValue"
    :disabled-date
    picker="month"
    :allow-clear="clearable === undefined ? false : !!clearable"
  ></ADatePicker>
</template>
<script setup lang="ts">
import { Dayjs } from "dayjs"

const modelValue = defineModel<Dayjs>("modelValue", { required: true })
defineProps<{
  disabledDate?: (date: Dayjs) => boolean
  clearable?: boolean
}>()
</script>
