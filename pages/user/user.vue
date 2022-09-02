<template>
	<PageTemp style="padding: 0 40rpx;">
		<view class="user-page">
			<UserHeader :isLogin="isLogin"></UserHeader>
			<UserOrder :isLogin="isLogin"></UserOrder>
			<UserMenu :isLogin="isLogin"></UserMenu>
		</view>
		<LoginTipPop name="user" :isShow="isShow" @close="isShow=false"></LoginTipPop>
		<ShareAndInvitePop :popUpshow="popUpshow" @closePop="closePop">
		</ShareAndInvitePop>
	</PageTemp>
</template>

<script>
	import QrcodePop from './components/UserMenu/components/ShareAndInvite/components/QrcodePop/QrcodePop.vue'
	import ShareAndInvitePop from "./components/UserMenu/components/ShareAndInvite/ShareAndInvite.vue"
	import UserHeader from "./components/UserHeader"
	import UserOrder from "./components/UserOrder"
	import UserMenu from "./components/UserMenu"
	export default {
		components:{
			UserHeader,
			UserOrder,
			UserMenu,
			ShareAndInvitePop,
			QrcodePop
		},
		data() {
			return {
				isLogin:false,
				isShow:false,
				popUpshow:false,
				popQrshow:false,
			};
		},
		onShow() {
			this.init()
			uni.$on("showLogin",()=>{
				this.isShow=true
			})
			uni.$on("showPopUp",()=>{
				this.popUpshow=true
			})
			uni.$on("showQrUp",()=>{
				this.popQrshow=true
			})
			
		},
		onLoad() {
			
		},
		onHide() {
			uni.$off("showLogin")
			uni.$off("showPopUp")
			uni.$off("showQrUp")
		},
		methods:{
			init(){
				this.isLogin=this.$checkLogin()
				if(this.isLogin){
					this.$updateUserInfo()
				}
			},
			closePop(){
				this.popUpshow=false
			},
			closePopQr(){
				this.popQrshow=false
			},
		}
	}
</script>

<style lang="scss" scoped>
.user-page{
	height: 100%;
	overflow: auto;
	padding-bottom: 20rpx;
	padding-top: 40rpx;
}
</style>
