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
		data(){
			return {
				introduceInfo:"该处为规则介绍，需要后台管理系统对系列开启“拉新”活动后，同时填写输入活动规则。同时填写输入活动规则。比如：该系列的介绍xxx平台联合xxx的IP发售该系列数字藏品，将通过活动，获得抽奖机会，赠送1000个提前购买名额，获得名额的用户可以不需要抢购，并且提前10分钟购买数字藏品。购买成功后，该权益消失，并且该权益只可使用一次限购一份。/ 1. 点击“参与活动”即可参与预购；/2. 分享专属二维码邀请好友，成功邀请5位新用户，完成实名注册即可参与抽奖。"
			}
		},
		computed:{
			introduceInfoText(){
				return this.introduceInfo.replace(/\//g,"<br />")
			}
		},
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