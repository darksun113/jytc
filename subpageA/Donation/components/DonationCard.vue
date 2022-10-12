<template>
	<view  class="item_box">
		<view class="box_left">
			<image class="left_img" :src="goodsData.image" mode="aspectFill"> </image>
		</view>
		<view class="box_right">
			<view style="" class="right_text1 nowrap">
				{{ goodsData.goodsName }}
			</view>
			<view class="right_tab">
				<view class="goodsCode">#{{goodsData.goodsCode}}</view>
			</view>
			<view class="right_bot">
				<image class="avater" :src="goodsData.shopIcon" mode=""></image>
				<view style="margin-left: 10rpx; width: 340rpx" class="nowrap">
					{{ goodsData.shopName }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			goodsData:{
				type:Object,
				default:()=>{}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.item_box {
		background-color: #21201F;
		padding: 2rpx;
		overflow: hidden;
		width: 100%;
		height: 252rpx;
		margin-bottom: 40rpx;
		padding: 8rpx;
		border-radius: 32rpx;
		display: flex;
		align-items: center;
	
		.box_left {
			width:236rpx;
			height: 236rpx;
			min-width: 236rpx;
			min-height: 236rpx;
			border-radius: 32rpx;
			.left_img {
				width: 100%;
				height: 100%;
				border-radius: 32rpx;
			}
		}
	
		.three_img {
			width: 16px;
			height: 16px;
			position: absolute;
			top: 98px;
			left: 120px;
	
		}
	
		.box_right {
			padding: 20rpx 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 100%;
			.right_text1 {
				color: rgba(255, 255, 255, 1);
				font-size: 32rpx;
			}
	
			.right_tab {
				height: 50rpx;
				color: #000000;
				font-size: 24rpx;
				.goodsCode{
					text-align: center;
					height: 50rpx;
					font-size: 24rpx;
					padding: 6rpx 18rpx;
					background: #FAEED7;
					border-radius:0 4rpx 4rpx 0;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #000000;
					line-height: 40rpx;
					min-width: 120rpx;
				}
			}
	
			.right_bot {
				width: 100%;
				display: flex;
				color: rgba(255, 255, 255, 1);
				font-size: 12px;
	
				.avater {
					width: 18px;
					height: 18px;
					border-radius: 50%;
				}
			}
		}
	}
</style>