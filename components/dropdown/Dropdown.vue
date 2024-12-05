<template>
	<ADropdown>
		<slot></slot>
		<template v-if="$slots.body" #overlay>
			<slot name="body"></slot>
		</template>
	</ADropdown>
</template>
<script setup lang="ts"></script>
