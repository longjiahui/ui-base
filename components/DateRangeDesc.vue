<template>
	<span v-if="startAt || endAt">
		<Scope
			:d="{
				start: dayjs(startAt),
				end: dayjs(endAt).endOf('day'),
			}"
			v-slot="{ start, end }"
		>
			<template v-if="!startAt"
				>{{
					$t("dateRangeDesc.toDateOver", {
						a: formatDate(end),
					})
				}}
			</template>
			<template v-else-if="!endAt"
				>{{
					$t("dateRangeDesc.fromDateStart", {
						a: formatDate(start),
					})
				}}
			</template>
			<template v-else
				>{{ formatDate(start) }} ~
				<span class="font-semibold text-default">
					{{ formatDate(end) }}
				</span>
			</template>
			<span
				v-if="endAt && !hideCountdown"
				:class="[
					'px-xxs py-xxxs rounded ml-xs text-xs tracking-tighter',
					end.diff(dayjs(), 'day') < 0
						? 'bg-danger text-white'
						: 'bg-light-3 text-dark',
				]"
				>{{ end.fromNow() }}</span
			>
		</Scope>
	</span>
</template>
<script setup lang="ts">
import { formatDate } from "@/base/util"
import dayjs from "dayjs"

defineProps<{
	startAt?: Date | string | null
	endAt?: Date | string | null
	hideCountdown?: boolean
}>()
</script>
