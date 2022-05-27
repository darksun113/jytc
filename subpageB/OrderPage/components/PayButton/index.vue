<template>
	<view class="pay-btn">
		<view class="price-box">
			待支付：<text class="price">  ¥ 18.88</text>
		</view>
		<view class="btn">
			去支付
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.pay-btn{
		width: 100%;
		height: 188rpx;
		background: #FFFFFF;
		position: fixed;
		padding: 32rpx 40rpx;
		left: 0;
		bottom: 0;
		color: #000;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-family: PingFangSC-Medium, PingFang SC;
		.price{
			font-size: 44rpx;
			font-weight: 500;
			color: #C75943;
		}
		.btn{
			width: 240rpx;
			height: 84rpx;
			background: #C75943;
			border-radius: 44rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 84rpx;
			text-align: center;
		}
	}
</style>