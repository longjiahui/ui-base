import Form from "./Form.vue"
import FormItem from "./FormItem.vue"
import FormInput from "./FormInput.vue"
import FormTextarea from "./FormTextarea.vue"
import FormTimePicker from "./FormTimePicker.vue"
import FormDatePicker from "./FormDatePicker.vue"
import FormDatePickerInMonth from "./FormDatePickerInMonth.vue"
import FormSelect from "./FormSelect.vue"
import FormSwitch from "./FormSwitch.vue"
import FormCheckbox from "./FormCheckbox.vue"

export function useFormItem() {
  return FormItem
}

export function useForm(components = {}) {
  return {
    Form,
    FormInput,
    FormItem,
    FormTextarea,
    FormTimePicker,
    FormDatePicker,
    FormDatePickerInMonth,
    FormSelect,
    FormSwitch,
    FormCheckbox,
    ...components,
  }
}
