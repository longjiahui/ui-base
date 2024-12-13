<template>
  <AInput
    :status="error ? 'error' : ''"
    v-model:value="value as any"
    :placeholder
    :type
    :autocomplete
    class="bg-white"
    :disabled
  >
    <template v-if="prefix" #prefix>
      <Component :is="prefix"></Component>
    </template>
    <template #suffix v-if="suffix">
      <Component :is="suffix"></Component>
    </template>
  </AInput>
</template>
<script lang="ts">
export type InputType =
  | "number"
  | "reset"
  | "submit"
  | "button"
  | "time"
  | "image"
  | "text"
  | "search"
  | "hidden"
  | "color"
  | "checkbox"
  | "radio"
  | "range"
  | "date"
  | "url"
  | "email"
  | "week"
  | "month"
  | "datetime-local"
  | "file"
  | "password"
  | "tel"
export type Autocomplete =
  | "off"
  | "true"
  | "name"
  | "honorific-prefix"
  | "given-name"
  | "additional-name"
  | "family-name"
  | "honorific-suffix"
  | "nickname"
  | "username"
  | "new-password"
  | "current-password"
  | "one-time-code"
  | "organization-title"
  | "organization"
  | "street-address"
  | "address-line1"
  | "address-line2"
  | "address-line3"
  | "address-level4"
  | "address-level3"
  | "address-level2"
  | "address-level1"
  | "country"
  | "country-name"
  | "postal-code"
  | "cc-name"
  | "cc-given-name"
  | "cc-additional-name"
  | "cc-family-name"
  | "cc-number"
  | "cc-exp"
  | "cc-exp-month"
  | "cc-exp-year"
  | "cc-csc"
  | "cc-type"
  | "transaction-currency"
  | "transaction-amount"
  | "language"
  | "bday"
  | "bday-day"
  | "bday-month"
  | "bday-year"
  | "sex"
  | "url"
  | "photo"
</script>
<script setup lang="ts">
const value = defineModel<string | number | null>("modelValue")

withDefaults(
  defineProps<{
    placeholder?: string
    prefix?: Component
    suffix?: Component
    disabled?: boolean
    error?: boolean
    type?: InputType
    autocomplete?: Autocomplete
  }>(),
  {
    autocomplete: "true",
  },
)
</script>
