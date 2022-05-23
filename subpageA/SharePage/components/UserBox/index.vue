<template>
	<view class="user-box">
		<image class="avatar" src="@/static/images/demo3.png" mode=""></image>
		<view class="user-name"> 收藏家：张三 </view>
		<view class="power-text"> 助力一臂之力抽中白名单机会吧 </view>
	</view>
</template>

<script>
</script>

<style lang="scss" scpoed>
	.user-box{
		margin-top: 40rpx;
		text-align: center;
		color: #FFFFFF;
		font-family: PingFangSC-Regular, PingFang SC;
		.avatar{
			width: 130rpx;
			height: 130rpx;
			border-radius: 50%;
		}
		.user-name{
			font-size: 28rpx;
			line-height: 40rpx;
			margin-top: 20rpx;
		}
		.power-text{
			font-size: 36rpx;
			line-height: 50rpx;
			margin-top: 20rpx;
		}
	}
</style>