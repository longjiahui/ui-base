<template>
	<Dialog :dialog :title :width>
		<template #autoPadding>
			<div
				v-if="typeof content === 'string'"
				class="text-light"
			>
				{{ content }}
			</div>
			<component
				v-else-if="content"
				:is="content"
			></component>
			<!-- <Textarea v-model="inputValue"></Textarea> -->
			<Input
				:prefix
				:suffix
				:disabled
				:type
				@keypress.enter="dialog.finish(inputValue)"
				v-focus
				:placeholder
				class="text-md size-full outline-none resize-none bg-transparent"
				v-model="inputValue"
			></Input>
		</template>
		<template #footer>
			<Button @click="dialog.close()">{{
				$t("dialog.defaultCancel")
			}}</Button>
			<Button
				@click="dialog.finish(inputValue)"
				type="primary"
				>{{ $t("dialog.defaultResolve") }}</Button
			>
		</template>
	</Dialog>
</template>

<script lang="ts" setup>
import { DialogType } from "../dialog"

const props = withDefaults(
	defineProps<{
		dialog: DialogType<any, string>
		title?: string | null
		content?: string | Component
		prefix?: Component
		suffix?: Component
		value?: string | null
		placeholder?: string
		disabled?: boolean
		width?: string
		type?: "password" | "text" | "email"
	}>(),
	{
		width: "320px",
	},
)

const inputValue = ref(props.value || "")
</script>
