import Form from "./Form.vue"
import FormItem from "./FormItem.vue"
import FormInput from "./FormInput.vue"
import FormTextarea from "./FormTextarea.vue"
import FormSelect from "./FormSelect.vue"
import FormSwitch from "./FormSwitch.vue"
import FormCheckbox from "./FormCheckbox.vue"

export function useFormItem() {
  return FormItem
}

export function useForm(components = {}) {
  return {
    Form: Form,
    FormInput: FormInput,
    FormItem: FormItem,
    FormTextarea: FormTextarea,
    FormSelect: FormSelect,
    FormSwitch: FormSwitch,
    FormCheckbox: FormCheckbox,
    ...components,
  }
}
