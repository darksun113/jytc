export function formatYearToMinutes_EN(stamp) {
	if (!stamp) {
		return ""
	} else {
		const date = new Date(stamp * 1000)
		const Y = date.getFullYear()
		const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
		const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
		const H = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
		const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
		return Y + '.' + M + '.' + D + " " + H + ':' + m 
	}
}
export function formatYearToMinutes(stamp) {
	if (!stamp) {
		return ""
	} else {
		const date = new Date(stamp * 1000)
		const Y = date.getFullYear()
		const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
		const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
		const H = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
		const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
		return Y + '年' + M + '月' + D + '日' + H + '时' + m + '分'
	}
}

export function formatMouthToMinutes(stamp) {
	if (!stamp) {
		return ""
	} else {
		const date = new Date(stamp * 1000)
		const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
		const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
		const H = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
		const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
		return  M + '月' + D + '日 ' + H + ':' + m 
	}
}
