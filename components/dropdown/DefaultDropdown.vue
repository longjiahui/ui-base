<template>
	<Dropdown trigger="hover">
		<slot></slot>
		<template #body="d">
			<div
				class="bg-white flex flex-col rounded overflow-hidden shadow"
			>
				<slot name="body" v-bind="d"></slot>
			</div>
		</template>
	</Dropdown>
</template>
<script setup lang="ts"></script>
