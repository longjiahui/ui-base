import type { Component } from "vue"
import {
	type DialogType,
	useDialog,
} from "./dialog"
import * as CommonDialogs from "./commonDialog"
import * as BizDialogs from "@/bizComponents/dialog"
import { ComponentProps } from "@/type"
import plugins from "@/plugins"
import { ConfigProvider } from "ant-design-vue"
import { useI18n } from "vue-i18n"
import enUS from "ant-design-vue/es/locale/en_US"
import zhCN from "ant-design-vue/es/locale/zh_CN"

export type DialogParams<T extends Component> =
	Omit<ComponentProps<T>, "dialog">

export function openDialog<
	C extends Component = Component,
>(Component: C, params: DialogParams<C>) {
	const dialog = useDialog<
		any,
		ComponentProps<C>["dialog"] extends DialogType<
			any,
			infer U
		>
			? U
			: void
	>()
	const app = createApp({
		render() {
			const i18n = useI18n()
			const locale = computed(
				() =>
					({
						zh: zhCN,
						en: enUS,
					})[i18n.locale.value] || enUS,
			)
			return h(
				ConfigProvider,
				{
					locale: locale.value,
				},
				() => [
					h(Component, {
						dialog,
						...params,
					}),
				],
			)
		},
	})
	app.use(plugins)
	const div = document.createElement("div")
	document.body.append(div)
	app.mount(div)
	return dialog.show().finally(() => {
		setTimeout(() => {
			app?.unmount()
			div?.remove()
		}, 3000)
	})
}

type Dialogs = typeof CommonDialogs &
	typeof BizDialogs
export const dialogs: {
	[k in keyof Dialogs]: (
		..._: keyof DialogParams<Dialogs[k]> extends {}
			? [DialogParams<Dialogs[k]>?]
			: [DialogParams<Dialogs[k]>]
	) => ReturnType<typeof openDialog<Dialogs[k]>>
} = Object.keys({
	...CommonDialogs,
	...BizDialogs,
}).reduce(
	(t, k) => {
		t[k as keyof typeof t] = (params) =>
			openDialog(
				CommonDialogs[k as keyof typeof CommonDialogs] ||
					BizDialogs[k as keyof typeof BizDialogs],
				params || {},
			)
		return t
	},
	{} as typeof dialogs,
)
