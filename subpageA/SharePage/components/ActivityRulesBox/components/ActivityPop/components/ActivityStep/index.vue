<template>
	<view class="activity-step-box">
		<view class="top">
			<view class="item">活动开启</view>
			<view class="item" style="margin-left: 10rpx;">进行中</view>
			<view class="item" style="margin-left: 50rpx;">活动结束</view>
			<view class="item">公布开奖</view>
		</view>
		<view class="center">
			<view class="dot"></view>
			<view class="dot"></view>
			<view class="dot"></view>
			<view class="dot"></view>
		</view>
		<view class="bottom">
			<view class="item">
				<view>{{prePurchaseInfo.openTime | formatDate}}</view>
				<view>{{prePurchaseInfo.openTime | formatTime}}</view>
			</view>
			<view class="item">
				<view>{{curTime | formatDate}}</view>
				<view>{{curTime | formatTime}}</view>
			</view>
			<view class="item">
				<view>{{prePurchaseInfo.finishTime | formatDate}}</view>
				<view>{{prePurchaseInfo.finishTime | formatTime}}</view>
			</view>
			<view class="item">
				<view>{{prePurchaseInfo.rewardTime | formatDate}}</view>
				<view>{{prePurchaseInfo.rewardTime | formatTime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			prePurchaseInfo:{
				type:Object,
				default:()=>{}
			}
		},
		data(){
			return {
				curTime:parseInt(Date.now()/1000)
			}
		},
		filters:{
			formatDate(stamp){
				if(!stamp){
					return ""
				}else{
					const date = new Date(stamp*1000)
					const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
					const D = date.getDate() < 10 ? '0' + date.getDate(): date.getDate()
					return M + D 
				}
			},
			formatTime(stamp){
				if(!stamp){
					return ""
				}else{
					const date = new Date(stamp*1000)
					const H = date.getHours() + ':'
					const M2 = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
					return H + M2
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.activity-step-box{
		margin-top: 40rpx;
		
		.top{
			display: flex;
			justify-content: space-between;
			.item{
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 40rpx;
			}
		}
		.center{
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			position: relative;
			.dot{
				width: 20rpx;
				height: 20rpx;
				border-radius: 50%;
				background: #28D8E5;
				z-index: 1;
			}
			&::before{
				width: 100%;
				height: 1px;
				background: #4E4C8B;
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
			}
		}
		.bottom{
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			.item{
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #CCCCCC;
				line-height: 34rpx;
			}
		}
	}
</style>