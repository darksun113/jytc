<template>
	<PageTemp style="padding: 0 40rpx;">
		<view class="user-page">
			<UserHeader :isLogin="isLogin" @loginSuccess="loginSuccess"></UserHeader>
			<UserOrder :isLogin="isLogin"></UserOrder>
			<UserMenu :isLogin="isLogin"></UserMenu>
		</view>
		<LoginTipPop name="user" :isShow="isShow" @loginSuccess="loginSuccess" @close="isShow=false" />
		<ShareAndInvitePop :popUpshow="popUpshow" @closePop="closePop" />
	</PageTemp>
</template>

<script>
	import ShareAndInvitePop from "./components/UserMenu/components/ShareAndInvite/ShareAndInvite.vue"
	import UserHeader from "./components/UserHeader"
	import UserOrder from "./components/UserOrder"
	import UserMenu from "./components/UserMenu"
	export default {
		components: {
			UserHeader,
			UserOrder,
			UserMenu,
			ShareAndInvitePop
		},
		data() {
			return {
				isLogin: false,
				isShow: false,
				popUpshow: false,
				// popQrshow:false,
			};
		},
		onShow() {
			this.init()
		},
		onHide() {
			uni.$off("showLogin")
			uni.$off("showPopUp")
		},
		methods: {
			loginSuccess(){
				uni.$off("showLogin")
				uni.$off("showPopUp")
				this.init()
				uni.showToast({
					title:"登录成功",
					icon:"success",
					duration:2000
				})
			},
			init() {
				uni.$on("showLogin", () => {
					this.isShow = true
				})
				uni.$on("showPopUp", () => {
					this.popUpshow = true
				})
				this.isLogin = this.$checkLogin()
				if (this.isLogin) {
					this.$store.commit("getUserInfo")
				}
			},
			closePop() {
				this.popUpshow = false
			},
		},
	}
</script>

<style lang="scss" scoped>
	.user-page {
		height: 100%;
		overflow: auto;
		padding-bottom: 20rpx;
		padding-top: 40rpx;
	}
</style>
