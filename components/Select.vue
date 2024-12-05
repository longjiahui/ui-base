<template>
	<ASelect v-model:value="modelValue!">
		<ASelectOption
			v-for="o in options"
			:key="o.id"
			:value="o.id"
			>{{ o.name }}</ASelectOption
		>
	</ASelect>
</template>

<script
	setup
	lang="ts"
	generic="
		ID extends string | number | undefined | null
	"
>
defineProps<{
	options: {
		id: ID
		name?: string
	}[]
}>()
const modelValue = defineModel<ID>("modelValue")
</script>
