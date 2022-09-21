<template>
	<view class="user-header-default" v-if="!checkLogin">
		<image class="default-avatar" src="@/static/images/user_avatar_default.png"></image>
		<view class="login-text" @click="toLogin">
			<view style="margin-right: 40rpx;">注册 / 登录</view>
			<image style="width: 24rpx;height: 40rpx;" src="@/static/images/more_arrows_icon.svg" mode=""></image>
		</view>
	</view>
	<view class="user-header" v-else>
		<image class="avatar" :src="$store.state.userInfo.avatar"></image>
		<view class="user-info">
			<view class="name-box">
				<view class="name nowrap">{{$store.state.userInfo.name}}</view>
				<view class="real-name" v-if="$store.state.userInfo.certificationStatus!==1" @click.self="toBindCard">未认证</view>
			</view>
			<view class="user-info-item">
				<view class="id-style">
					<view>ID：</view> 
					<view class="nowrap_s" style="max-width: 280rpx;">{{$store.state.userInfo.buyerId}}</view>
				</view>
				<image class="copy-icon" src="@/static/images/copy_icon.svg" @click="copy($store.state.userInfo.buyerId)"></image>
			</view>
			<view class="user-info-item">
				<view class="id-style">
					<view style="min-width: 168rpx;">区块链地址：</view> 
					<view class="nowrap_s" style="max-width: 280rpx;">{{$store.state.userInfo.blockchainAddress}}</view>
				</view>
				<image class="copy-icon" src="@/static/images/copy_icon.svg" @click="copy($store.state.userInfo.blockchainAddress)"></image>
			</view>
			<view class="fans-focus">
				<view class="item" @click="toFansPage(0)">
					<text style="margin-right: 10rpx;color: #CCC;">粉丝</text>{{$store.state.userInfo.fansNumber}}
				</view>
				<view class="item" @click="toFansPage(1)">
					<text style="margin-right: 10rpx;color: #CCC;">关注</text>{{$store.state.userInfo.followNumber}}
				</view>
				<view class="item" @click="toMyObjects">
					<text style="margin-right: 10rpx;color: #CCC;">藏品</text>{{$store.state.userInfo.collectionNumber}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {PingAn_login,PingAn_authorize} from "@/utils/PingAn-app.js"
	export default{
		props:{
			isLogin:[Boolean]
		},
		data(){
			return{
				checkLogin:this.isLogin
			}
		},
		methods:{
			toLogin(){
				if(this.$isMap_PingAn){
					// PingAn_login(2)
					PingAn_authorize()
				}else{
					const url = "/pages/login/LoginByMobile/GetVerifyCode/GetVerifyCode?name=user"
					this.$routerTo(url)
				}
			},
			toFansPage(type){
				const url=`/subpageC/UserFansAndFocus/UserFansAndFocus?type=${type}&viewBuyerId=${this.$store.state.userInfo.buyerId}`
				this.$routerTo(url)
			},
			toMyObjects(){
				const url="/subpageB/MyObject/MyObject"
				this.$routerTo(url)
			},
			copy(info){
				uni.setClipboardData({
					data: info,
					success: () => {
						uni.showToast({
							title: "复制成功",
							icon: "none"
						})
					}
				}); 
			},
			toBindCard(){
				if(this.$store.state.userInfo.certificationStatus==0){
					this.$routerTo("/subpageA/BindIdCard/BindIdCard")
				}
			},
		},
		watch:{
			isLogin(boo){
				this.checkLogin=boo
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-header{
		display: flex;
		margin-top: 40rpx;
		.avatar{
			width: 130rpx;
			min-width: 130rpx;
			height: 130rpx;
			min-height: 130rpx;
			border-radius: 50%;
			margin-right: 36rpx;
		}
		.user-info{
			width: calc(100% - 130rpx);
			.name-box{
				font-family: PingFangSC-Medium, PingFang SC;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				font-weight: 500;
				.name{
					font-size: 32rpx;
					line-height: 44rpx;
					margin-right: 20rpx;
					max-width: 400rpx;
				}
				.real-name{
					min-width: 88rpx;
					padding: 4rpx 14rpx;
					background: #666;
					border-radius: 4rpx;
					text-align: center;
					font-size: 20rpx;
				}
			}
			.user-info-item{
				display: flex;
				align-items: center;
				margin-top: 6rpx;
				.id-style{
					display: flex;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 40rpx;
				}
				.copy-icon{
					width: 20rpx;
					height: 20rpx;
					margin-left: 20rpx;
				}
			}
			.fans-focus{
				display: flex;
				justify-content: space-between;
				font-family: PingFangSC-Regular, PingFang SC;
				margin-top: 20rpx;
				font-size: 28rpx;
			}
		}
	}
	.user-header-default{
		display: flex;
		align-items: center;
		.default-avatar{
			width: 130rpx;
			height: 130rpx;
			border-radius: 50%;
			margin-right: 36rpx;
		}
		.login-text{
			display: flex;
			align-items: center;
		}
	}
</style>