<template>
  <FormItem
    :horizontal="horizontal"
    :static-error="staticError"
    :name="name as keyof T"
    :label="label"
    v-slot="{ name: field, value, update, validate }"
  >
    <Switch
      :disabled
      :size
      :model-value="value"
      @update:model-value="(val) => handleUpdate(val, update, validate, field)"
    ></Switch>
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
    size?: "default" | "small"
    disabled?: boolean
  }>(),
  {
    label: undefined,
    size: "default",
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
