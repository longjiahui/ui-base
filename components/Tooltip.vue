<template>
	<ATooltip
		overlay-class-name="pointer-events-none"
		:title="content"
		><slot></slot
	></ATooltip>
</template>
<script setup lang="ts">
defineProps<{ content: string }>()
</script>
