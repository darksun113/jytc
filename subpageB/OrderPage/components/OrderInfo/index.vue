<template>
	<view class="order-info">
		<view class="goods">
			<view class="left">
				<image class="goods-pic" src="@/static/images/demo2.png" mode=""></image>
			</view>
			<view class="right">
				<view class="goods-name nowrap">
					故宫里的中国节-中秋
				</view>
				<view class="author">
					<image class="author-pic" src="@/static/images/demo1.png" mode=""></image>
					<view class="author-name nowrap">深圳百纳维科技有限公司</view>
				</view>
			</view>
		</view>
		<view class="order-detail-box">
			<view class="order-detail">
				<view class="title">订单金额：</view>
				<view class="detail price">¥ 18.88</view>
			</view>
			<view class="order-detail">
				<view class="title">订单编号：</view>
				<view class="detail">20220201234567890</view>
			</view>
			<view class="order-detail">
				<view class="title">创建时间：</view>
				<view class="detail">2022-02-01 15:00:30</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.order-info{
		width: 100%;
		height: 504rpx;
		background: #fff;
		padding: 0 40rpx;
		.goods{
			height: 280rpx;
			padding: 40rpx 0;
			display: flex;
			align-items: center;
			border-bottom: 2rpx dashed #EEEEEE;
			.left{
				height:200rpx;
				width: 200rpx;
				.goods-pic{
					width: 100%;
					height: 100%;
				}
			}
			.right{
				width: calc(100% - 200rpx);
				padding: 20rpx;
				height: 200rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.goods-name{
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 44rpx;
				}
				.author{
					display: flex;
					align-items: center;
					margin-top: 20rpx;
					.author-pic{
						width: 36rpx;
						height: 36rpx;
						min-width: 36rpx;
						min-height: 36rpx;
						border-radius: 50%;
						margin-right: 10rpx;
					}
					.author-name{
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #000000;
						line-height: 34rpx;
					}
				}
			}
		}
		.order-detail-box{
			height: 224rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			.order-detail{
				display: flex;
				justify-content: space-between;
				font-family: PingFangSC-Regular, PingFang SC;
				font-size: 28rpx;
				color: #000000;
				view{
					line-height: 60rpx;
				}
				.price{
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #C75943;
				}
			}
		}
	}
</style>