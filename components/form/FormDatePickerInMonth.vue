<template>
  <FormItem
    :horizontal="horizontal"
    :static-error="staticError"
    :name="name as keyof T"
    :label="label"
    v-slot="{ name: field, value, update, validate }"
  >
    <DatePickerInMonth
      :disabled
      :model-value="value"
      @update:model-value="(val) => handleUpdate(val, update, validate, field)"
    ></DatePickerInMonth>
  </FormItem>
</template>
<script lang="ts" setup generic="T extends Partial<Record<string, any>>">
import { useFormItem } from "./form"

const FormItem = useFormItem<T>()
withDefaults(
  defineProps<{
    name: keyof T
    label?: string
    staticError?: boolean
    horizontal?: boolean
    disabled?: boolean
  }>(),
  {
    label: undefined,
    disabled: undefined,
  },
)
function handleUpdate(val: any, update: any, validate: any, field: any) {
  update(val)
  nextTick(() => {
    validate(field)
  })
}
</script>
