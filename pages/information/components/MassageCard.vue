<template>
	<view class="msg-card">
		<view class="title-box">
			<view class="title-text">
				<text>系统消息</text>
				<u-badge :isDot="item.isRead == 0" class="dot"></u-badge>
			</view>
			<text class="title-text">{{item.createTime | formatMouthToMinutes}}</text>
		</view>
		<view class="content-box">
			{{item.content}}
		</view>
		<view class="more-box" v-if="item.msgType == 1">
			<text>查看详情</text>
			<image style="width: 24rpx;height: 40rpx;" src="@/static/images/more_arrows_icon.svg" mode=""></image>
		</view>
	</view>
</template>

<script>
	import { formatMouthToMinutes } from "../../../utils/formatDate.js"
	export default {
		props:["item"],
		filters: {
			formatMouthToMinutes
		}
		
	}
</script>

<style lang="scss" scoped>
	.msg-card{
		padding: 20rpx;
		margin-bottom: 40rpx;
		background: #333333;
		border-radius: 20rpx;
		.title-box{
			font-size: 24rpx;
			font-family: SourceHanSansCN-Regular, SourceHanSansCN;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 36rpx;
			display: flex;
			justify-content: space-between;
			.title-text{
				display: flex;
				.dot{
					margin-left: 10rpx;
				}
			}
		}
		.content-box{
			padding: 20rpx 0;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 48rpx;
			text-align: justify;
		}
		.more-box{
			border-top: 2rpx solid rgba(255, 255, 255, 0.1);
			font-size: 24rpx;
			font-family: SourceHanSansCN-Regular, SourceHanSansCN;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 36rpx;
			padding-top: 36rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>