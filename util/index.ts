import { Rule, Rules, validate } from "./validate"
import dayjs from "dayjs"

import relativeTime from "dayjs/plugin/relativeTime"
import isLeapYear from "dayjs/plugin/isLeapYear"
import weekOfYear from "dayjs/plugin/weekOfYear"
import {
  ref,
  watch,
  WatchSource,
  WatchOptions,
  Ref,
  WatchStopHandle,
  MaybeRef,
} from "vue"
import SeedRandom from "seed-random"
dayjs.extend(relativeTime)
dayjs.extend(isLeapYear)
dayjs.extend(weekOfYear)
// dayjs.extend(weekday)

export * from "./storage"
export * from "./traverse"
export * from "./validate"
export * from "./emitter"
export * from "./error"

/**
 * @method                  创建异步的computed
 * @param watcher           监听函数，与watch的第一个参数对应
 * @param asyncFunction     异步computed函数
 * @param initValue         初始值
 * @param options           watch的options
 * @returns { Ref<T> }      返回Ref<T>
 */
export function computedAsync<
  Return = any, // return type
  T = any, // watch type
  Immediate extends Readonly<boolean> = true,
>(
  watcher: WatchSource<T>,
  asyncFunction: (val: T, old?: T) => Promise<Return>,
  initValue?: Return,
  options?: WatchOptions<Immediate>,
): Ref<Return | undefined> {
  const ret = ref<Return | undefined>(initValue) as Ref<Return | undefined>
  watch<T, boolean>(
    watcher,
    async (val, old) => {
      if (val !== old) {
        ret.value = await asyncFunction(val, old)
      }
    },
    {
      immediate: true,
      deep: true,
      ...options,
    },
  )
  return ret
}

export function selectFile(accept?: string): Promise<Blob | undefined> {
  const input = document.createElement("input")
  input.type = "file"
  if (accept) {
    input.accept = accept
  }
  return new Promise((r, reject) => {
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement
      r(target.files?.[0])
    }
    input.onerror = reject
    input.click()
  })
}

export function getTabs<T extends string>(
  desc: Partial<Record<T, string>> = {},
) {
  return Object.keys(desc).map((d) => ({
    id: d as T,
    title: desc[d as T] || "",
  }))
}

export function useWatch(
  _watch: (() => WatchStopHandle) | (() => WatchStopHandle)[],
  immediate = true,
) {
  const watch = _watch instanceof Array ? _watch : [_watch]
  let us: WatchStopHandle[] = []
  if (immediate) {
    if (us.length > 0) {
      us.forEach((u) => u())
      us = []
    }
    us = watch.map((w) => w())
  }
  return {
    resume() {
      if (us.length > 0) {
        us.forEach((u) => u())
        us = []
      }
      us = watch.map((w) => w())
    },
    pause() {
      if (us.length > 0) {
        us.forEach((u) => u())
        us = []
      }
    },
  }
}

export function formatDate(d: any, format = "YYYY/MM/DD") {
  const val = dayjs(d)
  return val.isValid() ? val.format(format) : "Invalid Date"
}

export function formatDateTime(d: any, format = "YYYY/MM/DD HH:mm") {
  const val = dayjs(d)
  return val.isValid() ? val.format(format) : "Invalid Date"
}

export function useWatchValidate<D extends object>(
  entity: MaybeRef<D>,
  rules: Rules<D>,
  options: WatchOptions = {},
) {
  const errors = ref({}) as Ref<{
    [k in keyof D]?: string
  }>
  Object.keys(rules).forEach((k) => {
    watch(
      () => unref(entity)[k as keyof D],
      async () => {
        const rule = rules[k as keyof D] as Rule<D, D[keyof D]>
        if (rule) {
          errors.value[k as keyof D] = (
            await validate(unref(entity), {
              [k]: rule,
            } as any)
          ).find((d) => d.key === k)?.message
        }
      },
      { immediate: true, ...options },
    )
  })
  return {
    errors,
    errorMessage: computed(() =>
      Object.keys(errors.value)
        .map((k) => errors.value[k as keyof D])
        .filter((k) => !!k)
        .join("，"),
    ),
    hasError: computed(() => !!Object.keys(errors.value).length),
  }
}

export function getHSLHash(val: string) {
  let random = SeedRandom(val || "")
  return Math.floor(random() * 361)
}
