<template>
	<view class="block_popup">
		<view class="title">
			链上信息
		</view>
		<view class="item_box">
			<view class="item">
				<view class="item_title">
					区块哈希
				</view>
				<view class="item_info">
					{{popupData.blockHash}}
				</view>
			</view>
			<view class="item">
				<view class="item_title">
					tokenID
				</view>
				<view class="item_info">
					{{popupData.goodsId}}
				</view>
			</view>
			<view class="item">
				<view class="item_title">
					认证标准
				</view>
				<view class="item_info">
					<view style="font-size: 12px;color: #888888;margin-bottom: 20rpx;">
						至信链开放联盟链-智能合约标准
					</view>
					<view>
						NRC-721
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			popupData:{
				type:Object,
				default:()=>{}
			}
		}
	}
</script>

<style lang="scss" scoped>
.block_popup{
	height: 100%;
	overflow: hidden;
	.title{
		text-align: center;
		height: 44rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 44rpx;
	}
	.item_box{
		height: calc(100% - 88rpx);
		overflow: auto;
		padding: 40rpx;
		padding-top: 0;
		margin-top: 40rpx;
		border-top: 2rpx solid rgba(255, 255, 255, 0.1);
		.item{
			margin-top: 60rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-size: 28rpx;
			line-height: 40rpx;
			.item_title{
				color: #28D8E5 ;
			}
			.item_info{
				margin-top: 20rpx;
				color: #FFFFFF;
				word-break:break-all;
			}
		}
	}
	
}
</style>