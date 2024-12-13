<template>
  <FormItem :name="name as keyof T" :label="label">
    <template #default="{ name: field, value, update, validate, isError }">
      <div class="flex items-center">
        <Checkbox
          :model-value="value"
          @update:model-value="
            (val) => handleUpdate(val, update, validate, field)
          "
          :error="isError"
          :disabled="disabled"
          :placeholder="placeholder"
        >
          <slot></slot>
        </Checkbox>
      </div>
    </template>
  </FormItem>
</template>
<script lang="ts" setup generic="T extends Partial<Record<string, any>>">
import { useFormItem } from "./form"
import { nextTick } from "vue"

withDefaults(
  defineProps<{
    // formitem
    name: keyof T
    label?: string

    placeholder?: string
    disabled?: boolean
  }>(),
  {
    label: "",
    placeholder: undefined,
    disabled: undefined,
  },
)

const emit = defineEmits<{
  (e: "update:key", k: string | number, mk: string | number): void
  (e: "change", val: boolean): void
}>()

function handleUpdate(val: any, update: any, validate: any, field: any) {
  update(val)
  emit("change", val)
  nextTick(() => {
    validate(field)
  })
}

const FormItem = useFormItem<T>()
</script>
