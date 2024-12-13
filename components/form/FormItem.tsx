import {
  UnExpectedError,
  validate,
  type Rule,
  type Rules,
  type ValidateErrorInfo,
  type ValidateOptions,
} from "@/base/util"
import {
  FieldErrors,
  FormEmitter,
  ProvideKey,
  type EditableProvider,
  type FormEmitterGenericType,
} from "."
import { Transition } from "vue"

export function useFormItem<T extends Partial<Record<any, any>>>() {
    const component = <Key extends keyof T>=>{}
  return defineComponent(function (
    props: {
      name?: Key
      // 可以关闭name警告
      noName?: boolean
      label?: string
      staticError?: boolean
      horizontal?: boolean
      rules?: (fieldRules: Rule[], rules?: Rule[]) => Rule[]

      onSubmit?: FormEmitterGenericType<T>["submit"]
      validateOptions?: ValidateOptions
    },
    ctx: {
      slots: {
        default: (d: any) => any
        label: () => any
      }
    },
  ) {
    const slots = useSlots()
    const hasLabel = computed(() => !!(slots.label || props.label))

    const { value: model, update: updateModel } = (inject<
      EditableProvider<ComputedRef<any>>
    >(ProvideKey.formModel) || { update: new Function(), value: {} }) as {
      value: ComputedRef<T>
      update: (val: T) => void
    }
    function warnNoName() {
      if (!props.noName) {
        console.debug("no name specified for form item: ", props.name)
      }
    }
    function hasName(d: any): d is string {
      return d === 0 || !!d
    }
    function updateValue(val: T[Key], autoValidate = false) {
      if (hasName(props.name)) {
        updateModel({
          ...unref(model),
          [props.name]: val,
        })
      } else {
        warnNoName()
      }
      if (autoValidate) {
        parentFormValidate(props.name)
      }
    }

    const formHorizontal = inject<ComputedRef<boolean>>(
      ProvideKey.formHorizontal,
    )
    const finalHorizontal = computed(() =>
      props.horizontal != null ? !!props.horizontal : !!formHorizontal?.value,
    )
    const formRules = inject<ComputedRef<Rules<T>>>(ProvideKey.formRules)
    const fieldErrors = inject<ComputedRef<FieldErrors<T>>>(
      ProvideKey.formFieldErrors,
    )
    const formEmitter = inject<FormEmitter<T>>(ProvideKey.formEmitter)
    function _submit(...rest: Parameters<FormEmitterGenericType<T>["submit"]>) {
      return props.onSubmit?.(...rest)
    }
    formEmitter?.on("submit", _submit)
    async function _validate(
      ...rest: Parameters<
        Parameters<NonNullable<typeof formEmitter>["on"]>["1"]
      >
    ) {
      if (hasName(props.name)) {
        const [field, rules] = rest
        if ((field && field === fk(props.name)) || (!field && props.name)) {
          return validateCurrentField(rules)
        } else {
          return [] as ValidateErrorInfo[]
        }
      } else {
        warnNoName()
        return []
      }
    }
    formEmitter?.on("validate", _validate)
    onBeforeUnmount(() => {
      formEmitter?.off("validate", _validate)
      formEmitter?.off("submit", _submit)
    })

    const parentFormValidate = inject<
      (field?: keyof T, rules?: Rule[]) => Promise<void>
    >(ProvideKey.formValidate, () => {
      throw new UnExpectedError("formValidate inject failed")
    })
    const fk = inject<(field: keyof T) => string>(
      ProvideKey.formFieldKey,
      () => {
        throw new UnExpectedError("formFieldKey inject failed")
      },
    )
    const fieldRules = computed(() => {
      let rs: Rule[] | Rule = formRules?.value[props.name] || []
      if (!(rs instanceof Array)) {
        rs = [rs]
      }
      return rs
    })
    const validateCurrentField = async (rules?: Rule[]) => {
      if (props.name) {
        const errors = await validate(
          model.value,
          {
            [props.name]: props.rules?.(fieldRules.value, rules || []),
          } as { [k in keyof T]: Rule[] },
          props.validateOptions,
        )
        errors.forEach((e) => (e.key = fk(e.key as any)))
        return errors
      } else {
        return []
      }
    }
    const isRequired = computed(() => {
      if (fieldRules.value instanceof Array) {
        return !!fieldRules.value.find((r) => !!r.required)
      }
      return false
    })

    const errors = computed(
      () => (props.name && fieldErrors?.value[fk(props.name)]) || [],
    )
    const isError = computed(() => errors.value.length > 0)
    const errorMessage = computed(
      () => errors.value.map((e) => e.message || "").join("，") + "。",
    )

    defineExpose({
      formRules,
      fieldRules,
    })
    return () => (
      <div class={["flex flex-col", !!ctx.slots.default ? "min-h-[32px]" : ""]}>
        <div
          class={[
            "s-full stretch",
            !finalHorizontal.value
              ? "gap-xs flex flex-col"
              : "flex gap-xs [&>div:first-child]:justify-end",
          ]}
        >
          {hasLabel.value && (
            <div
              class={[
                "flex leading-none gap-xxs items-start w-[var(--label-width)]",
                finalHorizontal.value ? " relative top-[8px]" : "",
              ]}
            >
              {!ctx.slots.label ? (
                <div
                  v-if="!$slots.label"
                  class="flex gap-xxs items-center text-right"
                >
                  <div class="break-all">{props.label}</div>
                  <div class="self-start items-center flex gap-xs">
                    {isRequired.value && (
                      <div class="relative top-0 border border-primary size-xs rounded-full"></div>
                    )}
                  </div>
                </div>
              ) : (
                ctx.slots.label?.()
              )}
            </div>
          )}
          <div class="relative flex flex-col gap-xs stretch">
            {!!ctx.slots.default && (
              <div
                class={[
                  "flex stretch",
                  props.label ? "items-stretch" : "items-center",
                ]}
              >
                {ctx.slots.default({
                  update: updateValue,
                  updateModel,
                  isError: isError.value,
                  model: model.value,
                  value: model.value?.[props.name] as T extends undefined
                    ? any
                    : T[Key],
                  name: props.name,
                  emitter: formEmitter,
                  validate: parentFormValidate,
                  isRequired: isRequired.value,
                })}
              </div>
            )}
            <Transition name="fade-translate-from-top" appear>
              {isError.value && (
                <div
                  class={[
                    "text-danger text-sm leading-none break-all whitespace-pre-wrap",
                    props.staticError
                      ? ""
                      : "absolute mt-xxs bottom-[-8px] translate-y-full",
                  ]}
                >
                  {errorMessage.value}
                </div>
              )}
            </Transition>
          </div>
        </div>
      </div>
    )
  })
}