<template>
	<view class="item-box">
		<view class="item-right">
			<image :src="src" mode=""></image>
			<slot></slot>
		</view>
		<image style="width: 24rpx;height: 40rpx;" src="@/static/images/more_arrows_icon.svg" mode=""></image>
	</view>
</template>

<script>
	export default{
		props:["src"],
		data(){
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	.item-box{
		padding: 40rpx;
		background: #333;
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
		border-radius: 8rpx;
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
</style>