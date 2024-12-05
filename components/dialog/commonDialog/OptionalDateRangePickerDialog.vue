<template>
	<Dialog :dialog :title width="300px">
		<template #autoPadding>
			<div v-if="content" class="text-light">
				{{ content }}
			</div>
			<div class="flex items-center gap-xs">
				<div>
					{{ $t("dateRangePickerDialog.startDate") }}
				</div>
				<DatePicker
					class="stretch"
					:model-value="pickerValue[0]"
					@update:model-value="
						(val) => (pickerValue[0] = val)
					"
					:disabled-date="
						(d) => {
							if (pickerValue[1]) {
								return d.isAfter(pickerValue[1])
							}
							return false
						}
					"
				></DatePicker>
			</div>
			<div class="flex items-center gap-xs">
				<div>
					{{ $t("dateRangePickerDialog.endDate") }}
				</div>
				<DatePicker
					class="stretch"
					:model-value="pickerValue[1]"
					@update:model-value="
						(val) => (pickerValue[1] = val)
					"
					:disabled-date="
						(d) => {
							if (pickerValue[0]) {
								return d.isBefore(pickerValue[0])
							}
							return false
						}
					"
				></DatePicker>
			</div>
		</template>
		<template #footer>
			<Button @click="dialog.close()">{{
				$t("dialog.defaultCancel")
			}}</Button>
			<Button
				@click="
					dialog.finish(
						pickerValue && [
							pickerValue[0]
								? dayjs(pickerValue[0])
								: undefined,
							pickerValue[1]
								? dayjs(pickerValue[1])
								: undefined,
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

const props = withDefaults(
	defineProps<{
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
	}>(),
	{
		title: "Pick a date range",
	},
)
const pickerValue = ref<
	[string, string] | [Dayjs, Dayjs]
>(
	(props.value?.map((d) => d ?? "") as
		| [string, string]
		| [Dayjs, Dayjs]) || ["", ""],
)
</script>
