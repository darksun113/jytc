<template>
	<view class="activity-introduction-box">
		<view class="rules">
			活动规则
		</view>
		<view class="introduce" v-html="introduceInfoText"></view>
		<view class="warn-tip">
			提醒：需完成实名认证才可以进行购买
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
				info:""
			}
		},
		computed:{
			introduceInfoText(){
				return this.info.replace(/\n/g,"<br/>")
			}
		},
		watch:{
			prePurchaseInfo(data){
				this.info=data.activityRule
			}
		}
	}
</script>

<style lang="scss" scoped>
	.activity-introduction-box{
		margin-top: 60rpx;
		.rules{
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #A5A6FF;
			line-height: 50rpx;
			text-align: center;
		}
		.introduce{
			margin-top: 28rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			min-height: 352rpx;
			color: #FFFFFF;
			line-height: 40rpx;
			text-align: justify;
		}
		.warn-tip{
			margin-top: 40rpx;
			font-size: 24rpx;
		}
	}
</style>