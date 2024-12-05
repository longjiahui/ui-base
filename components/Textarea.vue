<template>
	<ATextarea
		v-model:value="modelValue"
		class="resize-none"
	></ATextarea>
</template>
<script setup lang="ts">
const modelValue =
	defineModel<string>("modelValue")
</script>
