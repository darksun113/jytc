<template>
	<view class="user-header">
		<image class="avatar" :src="userInfo.avatar"></image>
		<view class="user-info">
			<view class="name-box">
				<view class="name nowrap">{{userInfo.name}}</view>
				<view class="real-name" v-if="userInfo.certificationStatus==0">未认证</view>
			</view>
			<view class="user-info-item">
				<view class="id-style">
					<view>ID：</view> 
					<view class="nowrap_s" style="max-width: 300rpx;">{{userInfo.buyerId}}</view>
				</view>
				<image class="copy-icon" src="@/static/images/copy_icon.svg" @click="copy(userInfo.buyerId)"></image>
			</view>
			<view class="user-info-item">
				<view class="id-style">
					<view style="min-width: 164rpx;">区块链地址：</view> 
					<view class="nowrap_s" style="max-width: 300rpx;">{{userInfo.blockchainAddress}}</view>
				</view>
				<image class="copy-icon" src="@/static/images/copy_icon.svg" @click="copy(userInfo.blockchainAddress)"></image>
			</view>
			<view class="fans-focus">
				<view class="item" @click="toFansPage(0)">
					<text style="margin-right: 10rpx;color: #CCC;">粉丝</text>{{userInfo.fansNumber}}
				</view>
				<view class="item" @click="toFansPage(1)">
					<text style="margin-right: 10rpx;color: #CCC;">关注</text>{{userInfo.followNumber}}
				</view>
				<view class="item" @click="toFocus(0)" v-if="userInfo.ifFollow==1">
					关注
				</view>
				<view class="item" @click="toFocus(1)" v-else>
					取消关注
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			userInfo:{
				type:Object,
				default:()=>{}
			}
		},
		data(){
			return{
				isFocus:false
			}
		},
		methods:{
			async toFocus(type){
				try{
					const res=await uni.$http("/user/follow",{
						followId:this.userInfo.buyerId,
						type
					})
					if(res.code==0){
						this.userInfo.ifFollow=type
						type==0?this.userInfo.fansNumber++:this.userInfo.fansNumber--
					}else{
						this.$toast(res.errorMsg)
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			toLogin(){
				const url="/pages/login/LoginByMobile/GetVerifyCode/GetVerifyCode?name=user"
				this.$routerTo(url)
			},
			toFansPage(type){
				const url=`/subpageC/UserFansAndFocus/UserFansAndFocus?type=${type}&viewBuyerId=${this.userInfo.buyerId}`
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
			}
		},
		watch:{
		}
	}
</script>

<style lang="scss" scoped>
	.user-header{
		display: flex;
		margin-top: 40rpx;
		height: 220rpx;
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
				}
				.real-name{
					width: 88rpx;
					min-width: 88rpx;
					height: 32rpx;
					background: #666;
					border-radius: 4rpx;
					text-align: center;
					font-size: 20rpx;
					line-height: 32rpx;
				}
			}
			.user-info-item{
				display: flex;
				align-items: center;
				margin-top: 6rpx;
				.id-style{
					display: flex;
					font-size: 28rpx;
					max-width: 500rpx;
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
				align-items: center;
				font-family: PingFangSC-Regular, PingFang SC;
				margin-top: 20rpx;
				font-size: 28rpx;
				.item{
					height: 60rpx;
					line-height: 60rpx;
					&:last-child{
						width: 160rpx;
						background: #28D8E5;
						border-radius: 30rpx;
						font-size: 28rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						text-align: center;
					}
				}
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