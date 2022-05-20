<template>
	<view class="series-box" @click="toSeriesDetailPage">
		<image class="series-pic" :src="item.image" mode="aspectFill"></image>
		<view class="series-info">
			<view class="series-title nowrap">
				{{item.title}}
			</view>
			<view class="author-box">
				<image class="author-icon" :src="item.authorIcon" mode=""></image>
				<view class="author-name nowrap">
					{{item.author}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"ListCard",
		props:{
			item:{
				type:Object,
				default:()=>{}
			}
		},
		methods:{
			toSeriesDetailPage(){
				this.$emit("toSeriesDetailPage")
			}
		}
	}
</script>

<style lang="scss" scoped>
.series-box{
	color: #FFFFFF;
	width: 690rpx;
	height: 852rpx;
	background: #0A0C47;
	border-radius: 20rpx;
	margin-bottom: 40rpx;
	.series-pic{
		width: 690rpx;
		height: 690rpx;
		border-radius: 20rpx;
	}
	.series-info{
		padding: 30rpx 40rpx;
		.series-title{
			height: 44rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			line-height: 44rpx;
		}
		.author-box{
			display: flex;
			align-items: center;
			margin-top: 20rpx;
			.author-icon{
				width: 36rpx;
				height: 36rpx;
				min-width: 36rpx;
				min-height: 36rpx;
				border-radius: 50%;
				margin-right: 10rpx;
			}
			.author-name{
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				line-height: 40rpx;
			}
		}
	}
	
	
}
</style>