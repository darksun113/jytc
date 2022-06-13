<template>
	<view class="activity-status">
		<view class="title-count" v-if="true">还差 4 人即可参与抽奖</view>
		<view class="title-count" v-else>已完成任务，等待开奖吧</view>
		<PowerNums></PowerNums>
		<view class="share-poster-btn" @click="toOpenSharePoster">
			分享我的专属海报
		</view>
	</view>
</template>

<script>
	import PowerNums from "./components/PowerNums/index.vue"
	export default{
		components:{PowerNums},
		methods:{
			toOpenSharePoster(){
				const data={a:44}
				uni.$emit("toOpenSharePoster",data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.activity-status{
		background: #2C2E69;
		border-radius: 8rpx;
		padding: 40rpx;
		box-sizing: border-box;
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
		.share-poster-btn{
			margin: 0 auto;
			margin-top: 40rpx;
			width: 496rpx;
			height: 100rpx;
			background: linear-gradient(180deg, #70D0FF 0%, #D575FF 100%);
			border-radius: 8rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 100rpx;
			text-align: center;
		}
	}
</style>