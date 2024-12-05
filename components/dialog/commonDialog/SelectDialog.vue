<template>
	<Dialog
		:dialog="dialog"
		:title="title ?? $t('selectDialog.defaultTitle')"
		:width
	>
		<template #autoPadding>
			<div
				v-for="o in options"
				:key="o.id"
				class="bg-light-2 rounded clickable p-xs"
				@click="dialog.finish(o)"
			>
				{{ o.name }}
			</div>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { DialogType } from "@/base/components/dialog/dialog"
type Option = {
	name?: string
	id?: any
}
withDefaults(
	defineProps<{
		dialog: DialogType<any, Option>
		title?: string
		width?: string
		options?: Option[]
	}>(),
	{
		width: "320px",
	},
)
</script>
