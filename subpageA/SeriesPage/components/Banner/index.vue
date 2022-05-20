<template>
	<view class="banner">
		<image class="banner-pic" src="@/static/images/demo1.png" mode="aspectFill"></image>
		<view class="sell-info">
			将于2022年06月01日 开售
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.banner{
		width: 100%;
		height: 540rpx;
		position: relative;
		.banner-pic{
			width: 100%;
			height: 100%;
		}
		.sell-info{
			position:absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 20rpx;
			width: 690rpx;
			height: 80rpx;
			background: rgba(10, 12, 71, .5);
			border-radius: 8rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 80rpx;
			text-align: center;
		}
	}
</style>