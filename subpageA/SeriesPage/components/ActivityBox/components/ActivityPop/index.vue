<template>
	<u-popup :show="show" @close="close" @open="open" :closeable="true" bgColor="transparent">
		<view class="activity-pop">
			<view class="title-rules">
				活动规则
			</view>
			<view class="activity-pop-container">
				<view class="activity-timer-box">
					<view class="timer-title">
						活动时间
					</view>
					<ActivityStep></ActivityStep>
				</view>
				<view class="activity-introduction-box">
					<view class="rules">
						活动规则
					</view>
					<view class="introduce" v-html="introduceInfoText"></view>
					<view class="warn-tip">
						提醒：需完成实名认证才可以进行购买
					</view>
					<view class="join-btn-box">
						<view class="tip-check">
							<image @click="isChecked=false" v-if="isChecked" class="chick-icon" src="@/static/images/check_icon.svg" mode=""></image>
							<image @click="isChecked=true" v-else  class="chick-icon" src="@/static/images/un_check_icon.svg" mode=""></image>
							<view class="chick-text">
								我已了解活动规则且自愿参与
							</view>
						</view>
						<view class="btn">
							确认
						</view>
					</view>
				</view>
			</view>
		</view>
	</u-popup>
</template>
<script>
	import ActivityStep from "./components/ActivityStep"
	export default {
		props:['isShow'],
		data() {
			return {
				show: this.isShow,
				isChecked:true,
				introduceInfo:"该处为规则介绍，需要后台管理系统对系列开启“拉新”活动后，同时填写输入活动规则。同时填写输入活动规则。比如：该系列的介绍xxx平台联合xxx的IP发售该系列数字藏品，将通过活动，获得抽奖机会，赠送1000个提前购买名额，获得名额的用户可以不需要抢购，并且提前10分钟购买数字藏品。购买成功后，该权益消失，并且该权益只可使用一次限购一份。/ 1. 点击“参与活动”即可参与预购；/2. 分享专属二维码邀请好友，成功邀请5位新用户，完成实名注册即可参与抽奖。"
			}
		},
		components:{
			ActivityStep
		},
		computed:{
			introduceInfoText(){
				return this.introduceInfo.replace(/\//g,"<br />")
			}
		},
		methods: {
			open() {
				// console.log('open');
			},
			close() {
				this.$emit("close")
				// console.log('close');
			}
		},
		watch:{
			isShow(newState){
				this.show=newState
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .u-steps-item__wrapper{
		background-color: rgba(0, 0, 0, 0);
	}
	.activity-pop{
		height: 70vh;
		width: 100%;
		background: #0A0C47;
		color: #FFFFFF;
		.title-rules{
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			line-height: 32rpx;
			padding: 36rpx;
			text-align: center;
			border-bottom: 2rpx solid rgba(255, 255, 255, .1);
		}
		.activity-pop-container{
			height: calc(100% - 104rpx);
			box-sizing: border-box;
			padding: 40rpx;
			overflow: auto;
			.activity-timer-box{
				.timer-title{
					font-size: 36rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #A5A6FF;
					line-height: 50rpx;
					text-align: center;
					padding: 0 34rpx;
				}
			}
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
				.join-btn-box{
					margin-top: 100rpx;
					.tip-check{
						display: flex;
						justify-content: center;
						align-items: center;
						.chick-icon{
							width: 30rpx;
							height: 30rpx;
							border-radius: 50%;
						}
						.chick-text{
							margin-left: 20rpx;
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							line-height: 56rpx;
						}
					}
					.btn{
						margin: 0 auto;
						margin-top: 20rpx;
						width: 570rpx;
						height: 88rpx;
						background: linear-gradient(180deg, #70D0FF 0%, #D575FF 100%);
						border-radius: 8rpx;
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #000000;
						line-height: 88rpx;
						text-align: center;
					}
				}
			}
		}
	}
</style>
