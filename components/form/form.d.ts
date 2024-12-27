import {
  Form,
  FormItem,
  FormInput,
  FormTextarea,
  FormTimePicker,
  FormDatePicker,
} from "."
import FormCheckboxVue from "./FormCheckbox.vue"
import FormSwitchVue from "./FormSwitch.vue"
import FormSelectVue from "./FormSelect.vue"
import FormDatePickerInMonth from "./FormDatePickerInMonth.vue"
import FormMonthRangePicker from "./FormMonthRangePicker.vue"
import type { GenericComponentProps } from "../../type"
import type { EmitsOptions, SetupContext, SlotsType } from "vue"

export declare function useFormItem<
  T extends Partial<Record<any, any>>,
>(): typeof FormItem<T>

export type UseFormReturnType<T extends Partial<Record<any, any>>> = {
  Form: typeof Form<T>
  FormItem: typeof FormItem<T>
  FormInput: typeof FormInput<T>
  FormMonthRangePicker: typeof FormMonthRangePicker<T>
  FormDatePicker: typeof FormDatePicker<T>
  FormDatePickerInMonth: typeof FormDatePickerInMonth<T>
  FormTimePicker: typeof FormTimePicker<T>
  FormTextarea: typeof FormTextarea<T>
  FormSelect: typeof FormSelectVue<T>
  FormCheckbox: typeof FormCheckboxVue<T>
  FormSwitch: typeof FormSwitchVue<T>
}
export declare function useForm<
  T extends Partial<Record<any, any>>,
>(): UseFormReturnType<T>
