<template>
	<Dialog :dialog :title>
		<template #autoPadding>
			<div v-if="content" class="text-light">
				{{ content }}
			</div>
			<!-- <Textarea v-model="textareaValue"></Textarea> -->
			<Textarea
				v-focus
				:placeholder
				class="text-md size-full outline-none resize-none bg-transparent"
				:rows="8"
				v-model="textareaValue"
			></Textarea>
		</template>
		<template #footer>
			<Button @click="dialog.close()">取消</Button>
			<Button
				@click="dialog.finish(textareaValue)"
				type="primary"
				>确定</Button
			>
		</template>
	</Dialog>
</template>

<script lang="ts" setup>
import { DialogType } from "../dialog"

const props = defineProps<{
	dialog: DialogType<any, string>
	title?: string | null
	content?: string
	value?: string | null
	placeholder?: string
}>()

const textareaValue = ref(props.value || "")
</script>
