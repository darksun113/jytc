<template>
	<view class="user-menu">
		<view class="title">常用功能</view>
		<view class="item-box" @click="toSubmenu(0)">
			<view class="item-right">
				<image src="@/static/images/my_ objects_icon.svg" mode=""></image>
				我的藏品
			</view>
			<image style="width: 24rpx;height: 40rpx;" src="@/static/images/more_arrows_icon.svg" mode=""></image>
		</view>
		<view class="item-box" @click="toSubmenu(1)">
			<view class="item-right">
				<image src="@/static/images/preorder_icon.svg" mode=""></image>
				预购信息
			</view>
			<image style="width: 24rpx;height: 40rpx;" src="@/static/images/more_arrows_icon.svg" mode=""></image>
		</view>
		<view class="item-box" @click="toSubmenu(5)">
			<view class="item-right">
				<image src="@/static/images/my_cards.svg" mode=""></image>
				我的银行卡
			</view>
			<image style="width: 24rpx;height: 40rpx;" src="@/static/images/more_arrows_icon.svg" mode=""></image>
		</view>
		<view class="item-box" @click="toSubmenu(2)">
			<view class="item-right" >
				<image src="@/static/images/account_security_icon.svg" mode=""></image>
				帐号与安全
			</view>
			<image style="width: 24rpx;height: 40rpx;" src="@/static/images/more_arrows_icon.svg" mode=""></image>
		</view>
		<view class="item-box" @click="toSubmenu(3)">
			<view class="item-right">
				<image src="@/static/images/privacy_icon.svg" mode=""></image>
				隐私设置
			</view>
			<image style="width: 24rpx;height: 40rpx;" src="@/static/images/more_arrows_icon.svg" mode=""></image>
		</view>
		<view class="item-box" @click="toSubmenu(4)">
			<view class="item-right">
				<image src="@/static/images/about_icon.svg" mode=""></image>
				关于平台
			</view>
			<image style="width: 24rpx;height: 40rpx;" src="@/static/images/more_arrows_icon.svg" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			isLogin:[Boolean]
		},
		data() {
			return {
				checkLogin:this.isLogin
			}
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
		background: #0A0C47;
		border-radius: 8rpx;
		padding: 40rpx;
		padding-bottom: 0;
		margin-top: 40rpx;
		color: #FFFFFF;
		.title{
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			line-height: 50rpx;
		}
		.item-box{
			padding: 40rpx 0;
			border-bottom: 2rpx solid rgba(255, 255, 255, .2);
			display: flex;
			justify-content: space-between;
			&:last-child{
				border: none;
			}
			.item-right{
				display: flex;
				align-items: center;
				font-size: 32rpx;
				image{
					width: 32rpx;
					height: 32rpx;
					margin-right: 44rpx;
				}
			}
		}
	}
</style>