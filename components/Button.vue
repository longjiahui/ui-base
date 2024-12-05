<template>
	<AButton
		v-if="type !== 'text'"
		:shape="circle ? 'circle' : 'default'"
		:type
		:loading="isLoading"
		:danger
		:ghost
		class="leading-none flex items-center gap-xxs px-xs"
		:disabled
	>
		<slot> </slot>
	</AButton>
	<div
		v-else
		:class="[
			'leading-none cursor-pointer hover:opacity-85 duration-300 inline-flex items-center gap-xxs',
			danger ? 'text-danger' : 'text-primary',
		]"
	>
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		type?: "primary" | "default" | "text"
		danger?: boolean
		ghost?: boolean
		circle?: boolean
		disabled?: boolean
		isLoading?: boolean
	}>(),
	{},
)
</script>
