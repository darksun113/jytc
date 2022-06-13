<template>
	<PageTemp>
		<view class="share-page">
			<UserBox></UserBox>
			<ActivityRulesBox></ActivityRulesBox>
			<ActivityDetailBox></ActivityDetailBox>
		</view>
	</PageTemp>
</template>

<script>
	import UserBox from "./components/UserBox/index.vue"
	import ActivityRulesBox from "./components/ActivityRulesBox/index.vue"
	import ActivityDetailBox from "./components/ActivityDetailBox/index.vue"
	export default {
		components:{
			UserBox,
			ActivityRulesBox,
			ActivityDetailBox
		},
		data() {
			return {
				inviterId:"",
				seriesId:""
			}
		},
		methods: {
			
		},
		onLoad(opt) {
			this.inviterId=opt.inviterId
			this.seriesId=opt.seriesId
		},
		onShow() {
			uni.setNavigationBarTitle({
				title:"XXX平台"
			})
		}
	}
</script>

<style lang="scss" scoped>
	.share-page{
		height: 100%;
		overflow: auto;
		padding: 0 40rpx;
	}
</style>
