<script>
	export default {
		onLaunch: function() {
			
		},
		onShow: function() {
			// uni.navigateTo({
			// 	url:"./subpageA/SharePage/SharePage"
			// })
		},
		onHide: function() {
			
		},
		methods:{
			resetFilePath() {
				let time = setInterval(() => {
					this.$store.commit("resetFilePath")
				}, 1000 * 60)
			},
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	@import "libs/css/common.scss";
</style>
