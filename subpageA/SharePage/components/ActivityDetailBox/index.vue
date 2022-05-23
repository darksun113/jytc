<template>
	<view class="activity-status">
		<view class="title-count" v-if="true">还差 4 人即可参与抽奖</view>
		<view class="title-count" v-else>已完成任务，等待开奖吧</view>
		<!-- <scroll-view  class="number-of-power" scroll-x="true" >
			<image src="@/static/images/power_num.png" mode=""></image>
			<image src="@/static/images/power_num.png" mode=""></image>
			<image src="@/static/images/power_num.png" mode=""></image>
			<image src="@/static/images/power_num.png" mode=""></image>
			<image src="@/static/images/power_num.png" mode=""></image>
		</scroll-view> -->
		
		<PowerNums></PowerNums>
		<view style="margin-top: 40rpx;" v-if="false">
			<view class="power-tip">
				完成以下操作立即帮TA助力
			</view>
			<view class="share-poster-btn" v-if="true">
				立即注册
			</view>
			<view class="share-poster-btn" v-if="true">
				立即实名认证
			</view>
		</view>
		<view style="margin-top: 40rpx;" v-else>
			<view class="power-success-tip">
				<image src="@/static/images/join_success_icon.svg" mode=""></image>
				<view class="">
					已成功为TA助力
				</view>
			</view>
			<view class="share-poster-btn" v-if="true">
				我也要参与	
			</view>
		</view>
	</view>
</template>

<script>
	import PowerNums from "./components/PowerNums/index.vue"
	export default{
		data(){
			return {
				curDot:0,
				list:[
					"12",3,4,5,55
				]
			}
		},
		components:{
			PowerNums
		},
		methods:{
			swiperChange(e){
				this.curDot = e.detail.current;
			},
			leftImg(){
				let num = this.list.length - 1
				if (this.curDot <= 0) {
					this.curDot = num
				} else {
					this.curDot--
				}
			},
			rightImg(){
				let num = this.list.length - 1
				if (this.curDot >= num) {
					this.curDot = 0
				} else {
					this.curDot++
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.activity-status{
		background: #0A0C47;;
		border-radius: 8rpx;
		padding: 40rpx;
		box-sizing: border-box;
		margin-top: 40rpx;
		position: relative;
		.title-count{
			font-size: 36rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			color: #FFFFFF;
			line-height: 50rpx;
			text-align: center;	
		}
		.number-of-power{
			margin: 0 auto;
			width: 496rpx;
			margin-top: 20rpx;
			text-align: center;
			overflow: auto;
			white-space: nowrap;
			image{
				width: 80rpx;
				height:80rpx;
				margin-right: 20rpx;
				border-radius: 50%;
				&:last-child{
					margin-right: 0;
				}
			}
		}
		.power-tip{
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			line-height: 34rpx;
			text-align: center;
		}
		.share-poster-btn{
			margin: 0 auto;
			margin-top: 24rpx;
			width: 496rpx;
			height: 100rpx;
			background: linear-gradient(180deg, #70D0FF 0%, #D575FF 100%);
			border-radius: 8rpx;
			font-size: 16px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 100rpx;
			text-align: center;
			&:last-child{
				margin-top: 40rpx;
			}
		}
		.power-success-tip{
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 48rpx;
				height: 48rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
		}
		.left-right-icon{
			position: absolute;
		}
	}
</style>