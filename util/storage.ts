/**
 * @file 存储方法，封装存取时自动JSON序列化
 */

enum StorageType {
	local = "localStorage",
	session = "sessionStorage",
}

function getStorage(
	type: StorageType,
	key: string,
	defaultValue: any,
): any {
	const item = window[type].getItem(key)
	try {
		return typeof item === "string"
			? JSON.parse(item)
			: defaultValue
	} catch (err) {
		console.warn("getStorage JSON parse error: ", err)
		return defaultValue
	}
}
function setStorage(
	type: StorageType,
	key: string,
	value: any,
) {
	window[type].setItem(key, JSON.stringify(value))
}
function removeStorage(
	type: StorageType,
	key: string,
) {
	window[type].removeItem(key)
}
export function getLocal(
	key: string,
	defaultValue?: any,
) {
	return getStorage(
		StorageType.local,
		key,
		defaultValue,
	)
}
export function setLocal(
	key: string,
	value: any,
) {
	return setStorage(StorageType.local, key, value)
}
export function removeLocal(key: string) {
	return removeStorage(StorageType.local, key)
}
