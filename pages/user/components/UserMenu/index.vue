<template>
	<view class="user-menu">
		<view class="title">常用功能</view>
		<MenuItem @click.native="toSubmenu(0)" src="/static/images/object_icon.svg">我的藏品</MenuItem>
		<MenuItem @click.native="toSubmenu(1)" src="/static/images/preorder_icon.svg">预购信息</MenuItem>
		<MenuItem @click.native="toSubmenu(7)" src="/static/images/un_collection_icon.svg">我的收藏</MenuItem>
		<MenuItem @click.native="toSubmenu(8)" src="/static/images/service_icon.svg">我的客服</MenuItem>
		<MenuItem @click.native="toSubmenu(5)" src="/static/images/my_cards.svg">我的银行卡</MenuItem>
		<MenuItem @click.native="toSubmenu(2)" src="/static/images/account_security_icon.svg">帐号与安全</MenuItem>
		<MenuItem @click.native="toSubmenu(3)" src="/static/images/privacy_icon.svg">隐私设置</MenuItem>
		<MenuItem @click.native="toSubmenu(4)" src="/static/images/about_icon.svg">关于平台</MenuItem>
		<MenuItem @click.native="toSubmenu(6)" src="/static/images/about_share.svg">分享与邀请</MenuItem>
		<customer-server :isShow="isShowServer" @close="isShowServer = false" />
	</view>
</template>

<script>
	import MenuItem from "./components/MenuItem.vue"
	import CustomerServer from "./components/CustomerServer.vue"
	export default {
		props:{
			isLogin:[Boolean]
		},
		data() {
			return {
				checkLogin:this.isLogin,
				isShowServer:false
			}
		},
		components:{
			MenuItem,
			CustomerServer
		},
		methods:{
			toSubmenu(idx){
				if(!this.checkLogin){
					uni.$emit("showLogin")
					return
				}
				const fn_to=(path)=>{
					this.$routerTo(`/subpageB/${path}/${path}`)
				}
				switch(idx){
					case 0 : fn_to("MyObject")
					break;
					case 1 : fn_to("MyPreorderList")
					break;
					case 2 : fn_to("AccountsAndSecurity")
					break;
					case 3 : fn_to("PrivacySetting")
					break;
					case 4 : fn_to("PlatformAbout")
					break;
					case 5 : fn_to("MyCards")
					break;
					case 6 : uni.$emit("showPopUp")
					break;
					case 7 : fn_to("MyCollection");
					break;
					case 8 :this.isShowServer = true;
					break
				}
			}
		},
		watch:{
			isLogin(boo){
				this.checkLogin=boo
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-menu{
		border-radius: 8rpx;
		padding-bottom: 0;
		margin-top: 40rpx;
		color: #FFFFFF;
		.title{
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			line-height: 50rpx;
			margin-bottom: 20rpx;
			padding-left: 40rpx;
		}
	}
</style>