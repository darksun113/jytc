export function routerTo(url,type='to') {
	uni.preloadPage({
		url,
		complete() {
			const option={
				to(){
					// 保留当前页，跳转到非tabbar页面，使用uni.navigateBack可以返回到原页面。
					uni.navigateTo({url})
				},
				back(){
					// 关闭当前页，返回上一页面或多级页面。
					uni.navigateBack({ delta: url})
				},
				switch(){
					// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
					uni.switchTab({url})
				},
				redirect(){
					// 关闭当前页面，跳转到应用内的某个页面。
					uni.redirectTo({url})
				},
				reLaunch(){
					// 关闭所有页面，打开到应用内的某个页面。
					uni.reLaunch({url})
				}
			}
			option[type]()
		}
	})
}
