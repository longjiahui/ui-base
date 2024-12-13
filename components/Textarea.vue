<template>
  <ATextarea
    v-model:value="modelValue"
    class="resize-none"
    :auto-size
    :disabled
    :status="error ? 'error' : undefined"
  ></ATextarea>
</template>
<script lang="ts">
export type AutoSize =
  | boolean
  | {
      minRows: number
      maxRows: number
    }
</script>
<script setup lang="ts">
defineProps<{
  disabled?: boolean
  error?: boolean
  autoSize?: AutoSize
}>()

const modelValue = defineModel<string>("modelValue")
</script>
