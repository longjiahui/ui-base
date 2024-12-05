<template>
	<div>
		<template
			v-for="(d, i) in datas"
			:key="
				dataKey ? (d[dataKey as keyof T] as any) : i
			"
		>
			<slot v-bind="{ data: d, index: i }"></slot>
			<!-- <Loop
        :style="{
          paddingLeft: '16px',
        }"
        v-if="(d[childrenKey as keyof T] as any[])?.length > 0"
        :datas="d[childrenKey as keyof T] as any[]"
        :children-key
        :data-key
      >
        <template #default="d">
          <slot v-bind="d"></slot>
        </template>
      </Loop> -->
		</template>
	</div>
</template>
<script setup lang="ts" generic="T">
withDefaults(
	defineProps<{
		datas: T[]
		dataKey: keyof T
		childrenKey?: keyof T
	}>(),
	{
		childrenKey: "children" as any,
	},
)

defineSlots<{
	default(props: { index: number; data: T }): void
}>()
</script>
