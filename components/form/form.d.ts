import { Form, FormItem, FormInput, FormTextarea } from "."
import FormCheckboxVue from "./FormCheckbox.vue"
import FormSwitchVue from "./FormSwitch.vue"
import FormSelectVue from "./FormSelect.vue"
import type { GenericComponentProps } from "../../type"
import type { EmitsOptions, SetupContext, SlotsType } from "vue"

export declare function useFormItem<
  T extends Partial<Record<any, any>>,
>(): typeof FormItem<T>

export type UseFormReturnType<T extends Partial<Record<any, any>>> = {
  Form: typeof Form<T>
  FormItem: typeof FormItem<T>
  FormInput: typeof FormInput<T>
  FormTextarea: typeof FormTextarea<T>
  FormSelect: typeof FormSelectVue<T>
  FormCheckbox: typeof FormCheckboxVue<T>
  FormSwitch: typeof FormSwitchVue<T>
}
export declare function useForm<
  T extends Partial<Record<any, any>>,
>(): UseFormReturnType<T>
