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
					<ActivityStep></ActivityStep>
				</view>
				<ActivityRules></ActivityRules>
				<!-- 底部交互区 -->
				<view style="margin-top: 60rpx;">
					<JoinButton v-if="posterData.state == 0"></JoinButton>
					<ActivityStatus v-else></ActivityStatus>
				</view>
			</view>
		</view>
		<SharePoster :isOpenPoster="isOpenPoster" @close="isOpenPoster=false" :posterData="posterData"></SharePoster>
	</u-popup>
</template>
<script>
	import ActivityStep from "./components/ActivityStep"
	import ActivityRules from "./components/ActivityRules"
	import JoinButton from "./components/JoinButton"
	import ActivityStatus from "./components/ActivityStatus"
	export default {
		props:['isShow'],
		data() {
			return {
				show: this.isShow,
				isOpenPoster:false,
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
		},
		mounted() {
			uni.$on("toOpenSharePoster",(data)=>{
				this.posterData={...data}
				this.isOpenPoster=true
			})
			uni.$on("joinSuccess",(data)=>{
				this.posterData.state=1
			})
		},
		destroyed() {
			uni.$off("toOpenSharePoster")
		},
		methods: {
			joinSuccess(){
				this.posterData.state=1
			},
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
		}
	}
</style>
