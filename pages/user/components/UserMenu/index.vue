<template>
	<view class="user-menu">
		<view class="title">常用功能</view>
		<view class="item-box">
			<view class="item-right">
				<image src="@/static/images/my_ objects_icon.svg" mode=""></image>
				我的藏品
			</view>
			<image style="width: 24rpx;height: 40rpx;" src="@/static/images/more_arrows_icon.svg" mode=""></image>
		</view>
		<view class="item-box">
			<view class="item-right">
				<image src="@/static/images/preorder_icon.svg" mode=""></image>
				预购信息
			</view>
			<image style="width: 24rpx;height: 40rpx;" src="@/static/images/more_arrows_icon.svg" mode=""></image>
		</view>
		<view class="item-box">
			<view class="item-right">
				<image src="@/static/images/account_security_icon.svg" mode=""></image>
				帐号与安全
			</view>
			<image style="width: 24rpx;height: 40rpx;" src="@/static/images/more_arrows_icon.svg" mode=""></image>
		</view>
		<view class="item-box">
			<view class="item-right">
				<image src="@/static/images/privacy_icon.svg" mode=""></image>
				隐私设置
			</view>
			<image style="width: 24rpx;height: 40rpx;" src="@/static/images/more_arrows_icon.svg" mode=""></image>
		</view>
		<view class="item-box">
			<view class="item-right">
				<image src="@/static/images/about_icon.svg" mode=""></image>
				关于平台
			</view>
			<image style="width: 24rpx;height: 40rpx;" src="@/static/images/more_arrows_icon.svg" mode=""></image>
		</view>
	</view>
</template>

<script>
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