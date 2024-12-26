<template>
  <DefaultDropdown trigger="click">
    <div
      class="bg-white border rounded h-[32px] leading-[32px] px-s hover:border-primary duration-300 cursor-pointer"
    >
      {{ modelValue.format("DD") }}
    </div>
    <template #body>
      <div class="p-xs">
        <Calendar :month="dayjs()">
          <template #default="{ date }">
            <div
              @click="modelValue = modelValue.date(date)"
              :class="[
                'p-2 flex items-center justify-center hover:bg-light-2 duration-300 cursor-pointer rounded',
                modelValue.date() === date ? 'bg-light-3' : '',
              ]"
            >
              {{ date }}
            </div>
          </template>
        </Calendar>
      </div>
    </template>
  </DefaultDropdown>
</template>
<script setup lang="ts">
import dayjs, { Dayjs } from "dayjs"

const modelValue = defineModel<Dayjs>("modelValue", { required: true })
</script>
