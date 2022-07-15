<template>
	<!-- status:0未支付 1已取消 2已支付 -->
	<view v-if="orderInfo.status == 0" class="topBox">
		<image class="status-icon" src="../../static/images/payIng.svg" mode=""></image>
		<view class="tabRight">
			<view class="" style="font-size: 38rpx"> 待支付 </view>
			<view class="nowrap" style="font-size: 28rpx; display: flex; align-items: center">
				<view class=""> 交易剩余时间 </view>
				<view style="width: 120rpx;padding-left: 10rpx;">
					<u-count-down :time="orderInfo.expireTime*1000 - curTime" format="HH:mm:ss" @finish="countEnd"></u-count-down>
				</view>
				<view >, 请及时付款！</view>
			</view>
		</view>
	</view>
	<view v-else-if="orderInfo.status == 2" class="topBox" style="background-color: #f9fff6">
		<image class="status-icon" src="../../static/images/paySuccess.svg" mode=""></image>
		<view class="tabRight">
			<view class="" style="font-size: 38rpx; color: #7ecf55"> 支付成功 </view>
			<view class="" style="font-size: 28rpx; display: flex; color: #7ecf55">
				感谢您对数字藏品的支持
			</view>
		</view>
	</view>
	<view v-else-if="orderInfo.status == 1" class="topBox">
		<u-icon name="close-circle" size="50" color="#999999"></u-icon>
		<view class="tabRight" style="font-size: 38rpx; color: #999999; line-height: 100rpx">
			订单已取消
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			orderInfo:{
				type:Object,
				default:()=>{}
			}
		},
		data(){
			return{
				curTime:parseInt(Date.now())
			}
		},
		methods:{
			countEnd(){
				this.orderInfo.status=1
			}
		},
		watch:{}
	}
</script>

<style lang="scss" scoped>
	::v-deep .u-count-down__text{
		color: #ECA800;
		font-size: 28rpx;
	}
	.topBox {
		width: 100%;
		height: 192rpx;
		background-color: #fffcf2;
		display: flex;
		padding: 0 40rpx;
		align-items: center;
		.status-icon {
			width: 80rpx;
			height: 80rpx;
		}
		.tabRight {
			padding-left: 40rpx;
			height: 100rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			color: #eca800;
		}
	}
</style>