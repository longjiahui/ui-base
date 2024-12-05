<template>
	<AModal
		v-if="dialog"
		:open="dialog.visible"
		@cancel="dialog.resolve()"
		:footer="null"
		:width
		:title="null"
		:closable="false"
		:mask-closable="!disableMaskClosable"
	>
		<!-- v-loading="dialog.isLoading" -->
		<div
			class="flex flex-col max-h-[80vh] bg-light-1"
		>
			<slot v-if="$slots.title" name="title"></slot>
			<div
				v-else-if="title"
				class="p-s font-semibold text-md"
			>
				{{ title }}
			</div>
			<div v-if="!$slots.autoPadding" class="stretch">
				<slot></slot>
			</div>
			<div
				v-else
				:class="[
					'stretch overflow-auto px-s gap-s flex flex-col',
					$slots.title || title ? '' : 'pt-s',
					$slots.footer ? '' : 'pb-s',
				]"
			>
				<slot name="autoPadding"></slot>
			</div>
			<div
				v-if="$slots.footer"
				class="flex items-center gap-xs justify-end p-s"
			>
				<slot name="footer"></slot>
			</div>
		</div>
	</AModal>
</template>
<script lang="ts" setup>
import { AnyDialogType } from "./dialog"

export type Size = "small" | "medium" | "large"

withDefaults(
	defineProps<{
		dialog: AnyDialogType
		title?: string | null
		width?: string
		disableMaskClosable?: boolean
	}>(),
	{
		title: null,
		width: undefined,
	},
)
</script>

<style lang="scss">
.ant-modal .ant-modal-content {
	padding: 0;
	overflow: hidden;
}
</style>
