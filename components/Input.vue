<template>
	<AInput
		:status="error ? 'error' : ''"
		v-model:value="(value as any)"
		:placeholder
		:type
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
<script setup lang="ts">
const value = defineModel<string | number | null>(
	"modelValue",
)

defineProps<{
	placeholder?: string
	prefix?: Component
	suffix?: Component
	disabled?: boolean
	error?: boolean
	type?:
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
}>()
</script>
