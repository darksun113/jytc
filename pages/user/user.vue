<template>
	<PageTempHasTabbar>
		<view class="user-page">
			<UserHeader></UserHeader>
			<UserOrder></UserOrder>
			<UserMenu></UserMenu>
		</view>
	</PageTempHasTabbar>
</template>

<script>
	import UserHeader from "./components/UserHeader"
	import UserOrder from "./components/UserOrder"
	import UserMenu from "./components/UserMenu"
	export default {
		components:{
			UserHeader,
			UserOrder,
			UserMenu
		},
		data() {
			return {
				userInfo:{}
			};
		},
		onShow() {
			this.getUserInfo()
		},
		methods:{
			getUserInfo(){
				const userInfo=uni.getStorageSync("userInfo")
				if(userInfo){
					this.$store.commit("updateUserInfo",JSON.parse(userInfo))
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.user-page{
	height: 100%;
	padding-bottom: 40rpx;
	overflow: auto;
}
</style>
