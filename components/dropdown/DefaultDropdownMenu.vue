<template>
	<Dropdown trigger="hover">
		<slot></slot>
		<template #body>
			<div
				class="bg-white inline-flex flex-col rounded overflow-hidden shadow text-sm"
			>
				<div
					type="text"
					v-for="(m, i) in finalMenus"
					:key="i"
					@click="
						() => {
							m.click?.(m)
							click?.(m)
						}
					"
					:class="[
						m.danger ? 'text-danger' : '',
						m.divider
							? 'bg-light-3 w-[calc(100%_-_16px)] h-[1px] my-xs mx-auto'
							: 'p-xs flex items-center gap-xxs cursor-pointer hover:bg-light-1 duration-300',
					]"
				>
					<component :is="m.icon" v-if="m.icon"></component>
					<span>
						{{ m.name }}
					</span>
				</div>
			</div>
		</template>
	</Dropdown>
</template>
<script lang="ts">
export type Menu = {
	divider?: boolean
	id?: string
	name?: string
	icon?: Component
	show?: boolean
	danger?: boolean
	click?: (m: Menu) => void
}
</script>
<script setup lang="ts">
const props = defineProps<{
	menus: Menu[]
	click?: Menu["click"]
}>()
const finalMenus = computed(() =>
	props.menus.filter((m) => m.show !== false),
)
</script>
