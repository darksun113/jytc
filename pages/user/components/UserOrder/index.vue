<template>
	<view class="order-box">
		<view class="title">我的订单</view>
		<view class="container">
			<view style="flex: 1; border-right: 1px solid rgba(255, 255, 255, .2);" @click="toOrderCenter(0)">
				待付款
			</view>
			<view style="flex: 1;" @click="toOrderCenter(1)">
				已完成
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			toOrderCenter(idx){
				const url = `/subpageB/MyOrderCenter/MyOrderCenter?type=${idx}`
				this.$routerTo(url)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-box{
		margin-top: 40rpx;
		height: 216rpx;
		padding: 40rpx;
		background: #0A0C47;
		border-radius: 8rpx;
		.title{
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 50rpx;
		}
		.container{
			margin-top: 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #CCCCCC;
			line-height: 44rpx;
			text-align: center;
		}
	}
</style>