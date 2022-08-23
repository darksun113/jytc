<template>
	<view class="active_box">
		<view class="active_title nowrap">
			{{seriesInfo.seriesName}}	
		</view>
		<view class="author-box">
			<image class="author-pic" :src="seriesInfo.shopIcon" mode=""></image>
			<view class="author-name nowrap">
				{{seriesInfo.shopName}}
			</view>
		</view>
		<view class="active_text">
			{{seriesInfo.description}}
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			seriesInfo:{
				type:Object,
				default:()=>{}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.active_box{
		background: #333;
		border-radius: 8rpx;
		padding: 40rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		.active_title{
			font-size: 40rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			line-height: 56rpx;
		}
		.author-box{
			margin-top: 16rpx;
			display: flex;
			align-items: center;
			.author-pic{
				width: 28rpx;
				height: 28rpx;
				min-width: 28rpx;
				min-height: 28rpx;
				margin-right: 10rpx;
				border-radius: 50%;
			}
			.author-name{
				font-size: 24rpx;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 34rpx;
			}
		}
		.active_text{
			margin-top: 28rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 40rpx;
			text-align: justify;
		}
	}
</style>