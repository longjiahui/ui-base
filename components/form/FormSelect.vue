<template>
  <!-- prettier-ignore-attribute -->
  <FormItem
    :name="(name as keyof T)"
    :label="label"
    :validate-options="{ extraRequiredRule }"
  >
    <template
      #default="{ name: field, value, update, validate, isError, isRequired }"
    >
      <!-- prettier-ignore-attribute -->
      <Select
        :model-value="value"
        @update:model-value="
          (val) => handleUpdate(val, update, validate, field)
        "
        :options="(options as any[])"
        :error="isError"
        :disabled="disabled"
        :placeholder="placeholder"
        :clearable="clearable === undefined ? !isRequired : clearable"
      >
      </Select>
    </template>
  </FormItem>
</template>
<script
  lang="ts"
  setup
  generic="
    T extends Partial<Record<string, any>>,
    ID extends string | number | undefined | null
  "
>
import { Option } from "../Select.vue"
import { useFormItem } from "./form"
import { nextTick } from "vue"

withDefaults(
  defineProps<{
    // formitem
    name: keyof T
    label?: string
    options?: Option<ID>[]

    placeholder?: string
    disabled?: boolean
    clearable?: boolean
    error?: boolean

    extraRequiredRule?: (d: any) => boolean
  }>(),
  {
    options: () => [],
    extraRequiredRule: (d: any) => !!d,
  },
)

function handleUpdate(val: any, update: any, validate: any, field: any) {
  update(val)
  nextTick(() => {
    validate(field)
  })
}

const FormItem = useFormItem<T>()
</script>
