<template>
	<ASwitch v-model:checked="modelValue"></ASwitch>
</template>

<script setup lang="ts">
const modelValue =
	defineModel<boolean>("modelValue")
</script>
