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
				<ActivityRules :activityRule="prePurchaseInfo.activityRule"></ActivityRules>
			</view>
		</view>
	</u-popup>
</template>
<script>
	import ActivityStep from "./components/ActivityStep"
	import ActivityRules from "./components/ActivityRules"
	export default {
		props:{
			prePurchaseInfo:{
				type:Object,
				default:()=>{}
			},
			isShow:[Boolean]
		},
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
			ActivityRules
		},
		mounted() {
		},
		destroyed() {
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
	.activity-pop{
		height: 70vh;
		width: 100%;
		background: #333;
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
