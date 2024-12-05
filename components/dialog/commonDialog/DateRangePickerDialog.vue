<template>
	<Dialog :dialog :title="finalTitle" width="300px">
		<template #autoPadding>
			<div v-if="content" class="text-light">
				{{ content }}
			</div>
			<DateRangePicker
				v-model="pickerValue"
			></DateRangePicker>
		</template>
		<template #footer>
			<Button @click="dialog.close()">{{
				$t("dialog.defaultCancel")
			}}</Button>
			<Button
				@click="
					dialog.finish(
						pickerValue && [
							dayjs(pickerValue[0]),
							dayjs(pickerValue[1]),
						],
					)
				"
				type="primary"
				>{{ $t("dialog.defaultResolve") }}</Button
			>
		</template>
	</Dialog>
</template>

<script lang="ts" setup>
import dayjs, { Dayjs } from "dayjs"
import { DialogType } from "../dialog"
import { useI18n } from "vue-i18n"
const props = defineProps<{
	dialog: DialogType<
		any,
		[Dayjs | undefined, Dayjs | undefined]
	>
	title?: string | null
	content?: string
	value?: [
		string | Dayjs | undefined,
		string | Dayjs | undefined,
	]
}>()

const { t } = useI18n()
const finalTitle = computed(
	() =>
		props.title ??
		t("dateRangePickerDialog.defaultTitle"),
)

const pickerValue = ref<
	[string, string] | [Dayjs, Dayjs]
>(
	(props.value?.map((d) => d ?? "") as
		| [string, string]
		| [Dayjs, Dayjs]) || ["", ""],
)
</script>
