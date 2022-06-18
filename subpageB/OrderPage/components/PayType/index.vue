<template>
	<view class="pay-type">
		<view class="title">请选择支付方式</view>
		<view class="type-item" @click="selectPayType('aliPay')">
			<image src="../../static/images/ali_pay.svg" mode=""></image>
			<view>支付宝</view>
			<image v-show="payType=='aliPay'" class="check-icon" style="width: 28rpx;height: 24rpx;" src="../../static/images/check.svg"></image>
		</view>
		<view class="type-item" @click="selectPayType('wxPay')">
			<image src="../../static/images/wx_pay.svg" mode=""></image>
			<view>微信支付</view>
			<image v-show="payType=='wxPay'" class="check-icon" style="width: 28rpx;height: 24rpx;" src="../../static/images/check.svg"></image>
		</view>
		<view class="type-item" @click="selectPayType('uniPay')">
			<image src="../../static/images/uni_pay.svg" mode=""></image>
			<view>银联支付</view>
			<image v-show="payType=='uniPay'" class="check-icon" style="width: 28rpx;height: 24rpx;" src="../../static/images/check.svg"></image>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				payType:"aliPay"
			}
		},
		methods:{
			selectPayType(type){
				this.payType=type
				this.$emit("setPayType",type)
			}
		}
	}
</script>

<style lang="scss" socped>
	.pay-type{
		margin-top: 40rpx;
		width: 750rpx;
		padding: 0 40rpx;
		
		background: #FFFFFF;
		.title{
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 120rpx;
		}
		.type-item{
			height: 120rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			color: #000000;
			line-height: 30px;
			border-top: 2rpx solid #EEE;
			position: relative;
			image{
				width: 48rpx;
				height: 48rpx;
				margin-right: 36rpx;
			}
			.check-icon {
				position: absolute;
				right: 20rpx;
				top: 50%;
				transform: translateY(-50%);
				margin: 0;
			}
		}
	}
</style>