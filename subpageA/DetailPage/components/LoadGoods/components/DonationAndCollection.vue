<template>
	<view class="donation-collection-box">
		<view class="collection-box">
			<image class="icon" src="../../../../../static/images/my_objects_icon.svg" mode=""></image>
			<text>100</text>
		</view>
		<view class="donation-box">
			<view class="donation-btn" @click="toDonationPage">转赠</view>
			<view class="donation-tip">需等待365天</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			goodsData:{
				type:Object,
				default:()=>{}
			}
		},
		methods: {
			toDonationPage() {
				const url = "/subpageA/Donation/Donation";
				this.$routerTo(url)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.donation-collection-box{
		position: absolute;
		height: 100%;
		min-width: 160rpx;
		right: 28rpx;
		top: 0;
		.collection-box{
			width: 100%;
			position: absolute;
			top: 40rpx;	
			right: 0;
			padding-right: 12rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.icon{
				width: 28rpx;
				height:28rpx;
				margin-right: 10rpx;
			}
			text{
				font-size: 28rpx;
				font-family: SourceHanSansCN-Regular, SourceHanSansCN;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 28rpx;
			}
		}
		.donation-box{
			position: absolute;
			bottom: 20rpx;
			right: 0;
			.donation-btn{
				padding: 10rpx 26rpx;
				background: #28D8E5;
				border-radius: 30rpx;
				text-align: center;
				font-size: 20rpx;
				font-family: SourceHanSansCN-Medium, SourceHanSansCN;
				font-weight: 500;
				color: #000000;
				line-height: 30rpx;
			}
			.donation-tip{
				margin-top: 10rpx;
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				color: #AAAAAA;
				// line-height: 28rpx;
			}
		}
	}
</style>
