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
					<JoinButton v-if="joinStatus_ == 0" :prePurchaseId="prePurchaseId" :seriesId="prePurchaseInfo.seriesId"></JoinButton>
					<ActivityStatus v-else :prePurchaseInfo="prePurchaseInfo.userList" :totalNum="prePurchaseInfo.peopleNum"></ActivityStatus>
				</view>
			</view>
		</view>
		<JoinResult :isShow='isShowStatus' @close="isShowStatus=false" :rewardTime="prePurchaseInfo.rewardTime"></JoinResult>
		<SharePoster :isOpenPoster="isOpenPoster" @close="isOpenPoster=false" :posterData="posterData"></SharePoster>
	</u-popup>
</template>
<script>
	import ActivityStep from "./components/ActivityStep"
	import ActivityRules from "./components/ActivityRules"
	import JoinButton from "./components/JoinButton"
	import ActivityStatus from "./components/ActivityStatus"
	import JoinResult from "./components/JoinResult/index.vue"
	import {getFilePath} from "@/utils/tools.js"
	export default {
		props:['isShow',"prePurchaseId","joinStatus"],
		data() {
			return {
				show: this.isShow,
				isOpenPoster:false,
				isShowStatus:false,
				joinStatus_:this.joinStatus,
				prePurchaseInfo:{},
				posterData:{}
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
			uni.$on("toOpenSharePoster",()=>{
				const prePurchaseId=this.prePurchaseId
				const userId=uni.getStorageSync("userInfo").buyerId
				const baseCodeUrl = process.env.NODE_ENV=="development" ? "http://192.168.3.239:8080":"https://h5.jialex.cn"
				this.posterData={
					codeUrl :`${baseCodeUrl}/subpageA/SharePage/SharePage?prePurchaseId=${prePurchaseId}&userId=${userId}&share=prePurchase`,
					// posterImg:this.prePurchaseInfo.seriesImg,
					posterImg:this.prePurchaseInfo.seriesImg.split("?")[0],
					loadType:0 // 0 邀请分享  1 分享把玩  3分享邀请
				}
				this.isOpenPoster=true
			})
			uni.$on("joinSuccessShow",()=>{
				this.getPrePurchase()
				this.$emit("changeAcitveBoxStatus")
				this.joinStatus_=1
				this.isShowStatus=true
			}) 
		},
		destroyed() {
			uni.$off("toOpenSharePoster")
			uni.$off("joinSuccessShow")
		},
		methods: {
			async getPrePurchase(){
				try{
					const res=await uni.$http("/series/prepurchase/detail",{
						prePurchaseId:this.prePurchaseId
					})
					if(res.code==0){
						res.data = await getFilePath(res.data,["seriesImg"])
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
			}
		},
		watch:{
			isShow(newState){
				this.show=newState
			},
			joinStatus(boo){
				this.joinStatus_=boo
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
		background: #222;
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
					color: #28D8E5;
					line-height: 50rpx;
					text-align: center;
					padding: 0 34rpx;
				}
			}
		}
	}
</style>
