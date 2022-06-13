<template>
	<u-popup :show="show" @close="close" @open="open" :closeable="true" bgColor="transparent">
		<view class="activity-pop">
			<view class="title-rules">
				活动规则
			</view>
			<view class="activity-pop-container">
				<!-- 活动时间 -->
				<view class="activity-timer-box">
					<view class="timer-title"> 活动时间</view>
					<ActivityStep :prePurchaseInfo="prePurchaseInfo"></ActivityStep>
				</view>
				<ActivityRules :prePurchaseInfo="prePurchaseInfo"></ActivityRules>
				<!-- 底部交互区 -->
				<view style="margin-top: 60rpx;">
					<JoinButton v-if="joinStatus == 0" :prePurchaseId="prePurchaseId"></JoinButton>
					<ActivityStatus v-else :prePurchaseInfo="prePurchaseInfo"></ActivityStatus>
				</view>
			</view>
		</view>
		<JoinResult :isShow='isShowStatus' @close="isShowStatus=false"></JoinResult>
		<SharePoster :isOpenPoster="isOpenPoster" @close="isOpenPoster=false" :posterData="posterData"></SharePoster>
	</u-popup>
</template>
<script>
	import ActivityStep from "./components/ActivityStep"
	import ActivityRules from "./components/ActivityRules"
	import JoinButton from "./components/JoinButton"
	import ActivityStatus from "./components/ActivityStatus"
	import JoinResult from "./components/JoinResult/index.vue"
	export default {
		props:['isShow',"prePurchaseId","joinStatus"],
		data() {
			return {
				show: this.isShow,
				isOpenPoster:false,
				isShowStatus:false,
				prePurchaseInfo:{
					openTime:parseInt(Date.now()/1000) - 24*3600,
					finishTime:parseInt(Date.now()/1000) + 72*3600,
					rewardTime:parseInt(Date.now()/1000) + 96*3600,
					activityRule:"该处为规则介绍，需要后台管理系统对系列开启“拉新”活动后，同时填写输入活动规则。同时填写输入活动规则。比如：该系列的介绍xxx平台联合xxx的IP发售该系列数字藏品，将通过活动，获得抽奖机会，赠送1000个提前购买名额，获得名额的用户可以不需要抢购，并且提前10分钟购买数字藏品。购买成功后，该权益消失，并且该权益只可使用一次限购一份。/ 1. 点击“参与活动”即可参与预购；/2. 分享专属二维码邀请好友，成功邀请5位新用户，完成实名注册即可参与抽奖。"
				},
				posterData:{
					state:0
				}
			}
		},
		components:{
			ActivityStep,
			JoinButton,
			ActivityRules,
			ActivityStatus,
			JoinResult
		},
		mounted() {
			uni.$on("toOpenSharePoster",(data)=>{
				this.posterData={...data}
				this.isOpenPoster=true
			})
			uni.$on("joinSuccess",(data)=>{
				this.posterData.state=1
			})
			uni.$on("joinSuccessShow",()=>{
				this.getPrePurchase()
				this.isShowStatus=true
			}) 
		},
		destroyed() {
			uni.$off("toOpenSharePoster")
			uni.$off("joinSuccess")
			uni.$off("joinSuccessShow")
		},
		methods: {
			joinSuccess(){
				this.posterData.state=1
			},
			async getPrePurchase(){
				try{
					const res=await uni.$http("/series/prepurchase/detail",{
						prePurchaseId:this.prePurchaseId
					})
					if(res.code==0){
						this.prePurchaseInfo=res.data
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			open() {
				this.getPrePurchase()
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
		}
	}
</style>
