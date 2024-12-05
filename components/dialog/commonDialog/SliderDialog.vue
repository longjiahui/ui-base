<template>
	<Dialog :dialog :title>
		<template #autoPadding>
			<div v-if="content" class="text-light">
				{{ content }}
			</div>
			<Slider v-model="sliderValue" :range></Slider>
		</template>
		<template #footer>
			<Button @click="dialog.close()">{{
				$t("dialog.defaultCancel")
			}}</Button>
			<Button
				@click="dialog.finish(sliderValue)"
				type="primary"
				>{{ $t("dialog.defaultResolve") }}</Button
			>
		</template>
	</Dialog>
</template>

<script lang="ts" setup>
import { DialogType } from "../dialog"

const props = defineProps<{
	dialog: DialogType<any, number>
	range: [number, number]
	title?: string | null
	content?: string
	value?: number | null
}>()

const sliderValue = ref(
	props.value || props.range[0],
)
</script>
