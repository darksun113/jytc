<script>
	import Fingerprint2 from "fingerprintjs2"
	export default {
		onLaunch: function() {
			this.getBrowserCode()
			this.resetFilePath()
		},
		onShow: function() {
			// this.watchRouter()
		},
		onHide: function() {},
		methods: {
			resetFilePath() {
				let time = setInterval(() => {
					this.$store.commit("resetFilePath")
				}, 1000 * 60)
			},
			// 获取浏览器唯一码
			getBrowserCode() {
				// #ifdef H5
				Fingerprint2.get((components) => {
					// 参数只有回调函数时，默认浏览器指纹依据所有配置信息进行生成
					const values = components.map((component) => component.value) // 配置的值的数组
					const browserCode = Fingerprint2.x64hash128(values.join(''), 31) // 生成浏览器指纹
					uni.setStorageSync("browserCode", browserCode)
				})
				// #endif
			},
			watchRouter() {
				let that = this;
				uni.addInterceptor('navigateTo', { //监听跳转
					success(e) {
						that.$wShare();
					}
				})
				uni.addInterceptor('redirectTo', { //监听关闭本页面跳转
					success(e) {
						that.$wShare();
					}
				})
				uni.addInterceptor('switchTab', { //监听tabBar跳转
					success(e) {
						that.$wShare();
					}
				})
				uni.addInterceptor('navigateBack', { //监听返回
					success(e) {
						that.$wShare();
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	@import "libs/css/common.scss";
</style>
