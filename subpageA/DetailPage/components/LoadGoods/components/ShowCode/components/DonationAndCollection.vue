<template>
	<view class="donation-collection-box">
		<view class="donation-box" v-if="goodsData.loadType==1">
			<view class="donation-btn" @click="toDonationPage">转赠</view>
			<view class="donation-tip">需等待365天</view>
		</view>
		<view class="collection-box" v-else>
			<image class="icon" src="@/static/images/collection_icon.svg" mode=""></image>
			<text>100</text>
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
				const {goodsId , goodsInstanceId} = this.goodsData
				const url = `/subpageA/Donation/Donation?goodsId=${goodsId}&instanceId=${goodsInstanceId}`;
				this.$routerTo(url)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.donation-collection-box{
		min-width: 160rpx;
		
		.collection-box{
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
			.donation-btn{
				width: 100rpx;
				padding: 10rpx 0;
				margin: 0 auto;
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
				text-align: center;
				font-family: PingFangSC-Regular, PingFang SC;
				color: #AAAAAA;
			}
		}
	}
</style>
