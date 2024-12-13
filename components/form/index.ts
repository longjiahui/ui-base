import Form from "./Form.vue"
import FormItem from "./FormItem.vue"
import type { GenericComponent } from "../../type"
import { Rule, ValidateErrorInfo, Emitter } from "../../util"

export { default as Form } from "./Form.vue"
export { default as FormInput } from "./FormInput.vue"
export { default as FormItem } from "./FormItem.vue"
export { default as FormTextarea } from "./FormTextarea.vue"
export { default as FormSelect } from "./FormSelect.vue"
export { default as FormCheckbox } from "./FormCheckbox.vue"
export { default as FormSwitch } from "./FormSwitch.vue"
export * from "./form"
import type { Ref } from "vue"

export type EditableProvider<T = any> = { value: T; update(val: any): void }

export enum ProvideKey {
  formRules = "formRules",
  formModel = "formModel",
  formFieldErrors = "formFieldErrors",
  formValidate = "formValidate",
  formHorizontal = "formHorizontal",
  formEmitter = "formEmitter",
  formFieldKey = "formFieldKey",
}

export type FormEmitterGenericType<T> = {
  submit: () => void
  validate: (field?: keyof T, rules?: Rule[]) => ValidateErrorInfo[]
}
export type FormEmitter<T> = Emitter<FormEmitterGenericType<T>>

export type FieldErrors<
  T extends Partial<Record<any, any>> = Partial<Record<any, any>>,
> = Partial<Record<keyof T, ValidateErrorInfo[]>>

export type FormType = GenericComponent<typeof Form>
export type FormRef<T extends Record<any, any> = any> = Ref<
  GenericComponent<typeof Form<T>> | undefined
>
export type FormsRef = Ref<GenericComponent<typeof Form>[]>
export type FormItemRef = Ref<GenericComponent<typeof FormItem> | undefined>
