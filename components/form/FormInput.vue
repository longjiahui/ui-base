<template>
  <FormItem :static-error="staticError" :name="name" :label="label">
    <template v-if="$slots.label" #label>
      <slot name="label"></slot>
    </template>
    <template #default="{ name: field, value, update, validate, isError }">
      <Input
        :model-value="value"
        @update:model-value="(val) => update(val as any)"
        @input="$nextTick(() => validate(field))"
        @focusout="isError && validate(field)"
        :placeholder
        :prefix
        :suffix
        :error="isError || error"
        :disabled="disabled"
        :type
        :autocomplete
      >
        <template v-if="$slots.suffix" #suffix>
          <slot name="suffix"></slot>
        </template>
        <template v-if="$slots.prefix" #prefix>
          <slot name="prefix"></slot>
        </template>
      </Input>
    </template>
  </FormItem>
</template>
<script
  lang="ts"
  setup
  generic="T extends Partial<Record<any, any>>, Key extends keyof T = keyof T"
>
import { useFormItem } from "./form"
import { InputType, Autocomplete } from "../Input.vue"

defineProps<{
  name: Key
  // 可以关闭name警告
  noName?: boolean
  label?: string
  staticError?: boolean

  // input
  placeholder?: string
  prefix?: Component
  suffix?: Component
  disabled?: boolean
  error?: boolean
  type?: InputType
  autocomplete?: Autocomplete
}>()

defineEmits<{
  (e: "change", val: string | number, isError: boolean): void
}>()

const FormItem = useFormItem<T>()
</script>
