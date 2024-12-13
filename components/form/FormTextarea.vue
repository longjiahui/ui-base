<template>
  <!-- prettier-ignore-attribute -->
  <FormItem
    ref="formItemRef"
    :static-error="staticError"
    :horizontal="horizontal"
    :name="(name as keyof T)"
    :label="label"
  >
    <template #default="{ name: field, value, update, validate, isError }">
      <Textarea
        ref="textareaRef"
        :model-value="value"
        @update:model-value="
          (val: string) => {
            update(val as any)
            $nextTick(() => validate(field))
          }
        "
        :error="isError || error"
        :auto-size
        :disabled="disabled"
        :placeholder="placeholder"
      >
      </Textarea>
    </template>
  </FormItem>
</template>
<script lang="ts" setup generic="T extends Partial<Record<string, any>>">
import { AutoSize } from "../Textarea.vue"
import { useFormItem } from "./form"

defineProps<{
  // formitem
  name: keyof T
  label?: string
  horizontal?: boolean
  staticError?: boolean

  // input
  placeholder?: string
  error?: boolean
  disabled?: boolean
  autoSize?: AutoSize
}>()

const FormItem = useFormItem<T>()
</script>
