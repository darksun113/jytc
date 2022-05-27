<template>
	<view class="load-image">
		<image class="goods-pic" src="@/static/images/demo2.png" mode="aspectFill"></image>
		<view class="lock-tip">
			<image class="lock-icon" src="../../static/images/lock_icon.svg" mode=""></image>
			<text class="lock-text">购买后体验内容</text>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.load-image{
		width: 100%;
		height: 100%;
		position: relative;
		.goods-pic{
			width: 450rpx;
			height: 450rpx;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
		}
		.lock-tip{
			display: flex;
			align-items: center;
			position: absolute;
			left: 50%;
			bottom: 20rpx;
			transform: translateX(-50%);
			.lock-icon{
				width: 20rpx;
				height: 20rpx;
				margin-right: 10rpx;
			}
			.lock-text{
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				color: #CCCCCC;
				line-height: 28rpx;
			}
		}
	}
</style>