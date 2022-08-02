<template>
	<PageTemp style="padding: 0 30rpx;">
		<view class="user-page">
			<UserHeader :isLogin="isLogin"></UserHeader>
			<UserOrder :isLogin="isLogin"></UserOrder>
			<UserMenu :isLogin="isLogin"></UserMenu>
		</view>
		<LoginTipPop name="user" :isShow="isShow" @close="isShow=false"></LoginTipPop>
	</PageTemp>
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
				isLogin:false,
				isShow:false
			};
		},
		onShow() {
			this.init()
			uni.$on("showLogin",()=>{
				this.isShow=true
			})
		},
		onLoad() {
			
		},
		onHide() {
			uni.$off("showLogin")
		},
		methods:{
			init(){
				this.isLogin=this.$checkLogin()
				if(this.isLogin){
					this.$updateUserInfo()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.user-page{
	height: 100%;
	overflow: auto;
	padding-bottom: 20rpx;
}
</style>
