<template>
	<view class="item-box">
		<image class="avatar" :src="item.icon"></image>
		<view class="right-info">
			<view class="top">
				<view class="name">
					{{item.name}}
				</view>
				<view class="id-num">
					<text style="min-width: 40rpx;font-size: 24rpx;">ID：</text>
					<text class="nowrap_s" style="font-size: 24rpx;">{{item.buyerId}}</text>
				</view>
			</view>
			<view class="block-hash">
				<text style="min-width: 150rpx;font-size: 24rpx;">区块链地址：</text>
				<text class="nowrap_s" style="font-size: 24rpx;">{{item.addr}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"ListItem",
		props:{
			item:{
				type:Object,
				default:()=>{}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.item-box{
	display: flex;
	margin-bottom: 48rpx;
	.avatar{
		width: 80rpx;
		height: 80rpx;
		min-width: 80rpx;
		max-width: 80rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	.right-info{
		width: calc(100% - 100rpx);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.top{
			display: flex;
			justify-content: space-between;
			.name{
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 40rpx;
			}
			.id-num{
				font-size: 24rpx;
				max-width: 300rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #CCCCCC;
				line-height: 34rpx;
				display: flex;
			}
		}
		.block-hash{
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			color: #CCCCCC;
			line-height: 34rpx;
			display: flex;
		}
	}
}
</style>