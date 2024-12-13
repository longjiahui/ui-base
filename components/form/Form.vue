<template>
  <form
    v-if="$props.as === 'form'"
    :style="{ '--label-width': $props.labelWidth }"
    @submit.prevent
  >
    <slot
      v-bind="{
        value: $props['modelValue'],
        isError,
        errors,
        errorList,
        validate,
        fk,
      }"
    ></slot>
  </form>
  <component
    v-else
    :is="$props.as"
    :style="{ '--label-width': $props.labelWidth }"
  >
    <slot
      v-bind="{
        value: $props['modelValue'],
        isError,
        errors,
        errorList,
        validate,
        fk,
      }"
    ></slot
  ></component>
</template>
<script setup lang="ts" generic="T extends Partial<Record<any, any>>">
import { EditableProvider, ProvideKey } from "./index"
import type { FieldErrors, FormEmitter, FormEmitterGenericType } from "./index"
import type { ValidateErrorInfo } from "../../util/validate/validate"
import { Rule, Rules, Emitter } from "../../util"
import { v1 as uuid } from "uuid"

class DefaultError extends Error {
  messages: any[]
  constructor(...messages: any[]) {
    super(
      messages
        .map((m) => {
          try {
            return typeof m === "string" ? m : JSON.stringify(m)
          } catch (err) {
            console.warn(err)
            return "[unknown]"
          }
        })
        .join(" "),
    )
    this.messages = messages
    this.name = "DefaultError"
  }
}
class ValidateError extends DefaultError {
  constructor(...rest: any[]) {
    super(...rest)
    this.name = "ValidateError"
  }
}
/*
    增加ID 是为了父子ID间区分相同的field，这样可以在子Item中对父级同名字段进行validate
    统一将所有的错误信息保存在根Form中，使用混入ID的key来设置/获取错误信息
 */
const id = uuid()
// field key
function fk(field: keyof T) {
  return `${id}-${field.toString()}`
}
const props = withDefaults(
  defineProps<{
    modelValue?: T
    as?: "div" | "form"
    rules?: Rules<T>
    horizontal?: boolean
    labelWidth?: string
  }>(),
  {
    modelValue: () => ({}) as T,
    as: "form",
    rules: () => ({}),
    horizontal: undefined,
    labelWidth: "",
  },
)

const emit = defineEmits<{
  (e: "update:model-value", val: typeof props.modelValue): void
}>()

const errors = ref<FieldErrors>({})
const errorList = computed(() => Object.values(errors.value).flatMap((d) => d))
const isError = computed(() => Object.keys(errors.value).length > 0)

const formHorizontal = inject<ComputedRef<boolean>>(
  ProvideKey.formHorizontal,
  computed(() => false),
)
const parentFormFieldErrors = inject<ComputedRef<FieldErrors<T>> | undefined>(
  ProvideKey.formFieldErrors,
  undefined,
)

function getErrorsByValidateErrorInfos(infos: ValidateErrorInfo[]) {
  return infos.reduce<FieldErrors>((t, e) => {
    if (e.key) {
      const key = e.key
      if (!t[key]) {
        t[key] = []
      }
      t[key]?.push(e)
    }
    return t
  }, {})
}

const validate = async function (field?: keyof T, rules?: Rule[]) {
  const validateErrors = (
    await emitter.emit("validate", field ? fk(field) : field, rules)
  ).flat(Infinity) as ValidateErrorInfo[]
  if (field) {
    errors.value[fk(field)] = validateErrors
  } else {
    errors.value = getErrorsByValidateErrorInfos(validateErrors)
  }
  if (validateErrors.length > 0) {
    throw new ValidateError(validateErrors)
  }
}

const finalHorizontal = computed(() =>
  props.horizontal != null ? !!props.horizontal : !!formHorizontal?.value,
)
const emitter = new Emitter<FormEmitterGenericType<T>>()
provide(ProvideKey.formEmitter, emitter)
const parentEmitter = inject<FormEmitter<T> | undefined>(
  ProvideKey.formEmitter,
  undefined,
)
parentEmitter?.onAll(async (c, ...rest) => {
  switch (c) {
    // 如果是 validate，则需要统计当下的错误
    case "validate": {
      const ret = await emitter.emit(c, ...rest)
      const validateErrors = ret.flat(Infinity) as ValidateErrorInfo[]
      const field = rest[0]
      if (field) {
        errors.value[fk(field)] = validateErrors
      } else {
        errors.value = getErrorsByValidateErrorInfos(validateErrors)
      }
      return ret
    }
    case "submit":
      return emitter.emit("submit")
  }
})

provide<EditableProvider>(ProvideKey.formModel, {
  value: computed(() => props.modelValue || {}),
  update(val: any) {
    emit("update:model-value", val)
  },
})
provide<typeof fk>(ProvideKey.formFieldKey, fk)
provide(
  ProvideKey.formRules,
  computed(() => props.rules),
)

provide(
  ProvideKey.formFieldErrors,
  computed(() => {
    return Object.assign({}, parentFormFieldErrors?.value, errors.value)
  }),
)
provide(
  ProvideKey.formHorizontal,
  computed(() => finalHorizontal.value),
)

provide(ProvideKey.formValidate, validate)

defineExpose({
  validate,
  submit() {
    return emitter.emit("submit")
  },
})
</script>
