<template>
	<view class="order-info">
		<view class="goods">
			<view class="left">
				<image class="goods-pic" :src="orderInfo.goods.image" mode="aspectFill"></image>
			</view>
			<view class="right">
				<view class="goods-name nowrap">
					{{orderInfo.goods.goodsName}}
				</view>
				<view class="author">
					<image class="author-pic" :src="orderInfo.goods.shopIcon" mode=""></image>
					<view class="author-name nowrap">{{orderInfo.goods.shopName}}</view>
				</view>
			</view>
		</view>
		<view class="order-detail-box">
			<view class="order-detail">
				<view class="title">订单金额：</view>
				<view class="detail price">¥ {{(orderInfo.goods.goodsPrice/100).toFixed(2)}}</view>
			</view>
			<view class="order-detail">
				<view class="title">订单编号：</view>
				<view class="detail">{{orderInfo.orderNo}}</view>
			</view>
			<view class="order-detail">
				<view class="title">创建时间：</view>
				<view class="detail">{{orderInfo.createTime | format}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			orderInfo:{
				type:Object,
				default:()=>{}
			}
		},
		data(){
			return {}
		},
		filters:{
			format(stamp){
				if(!stamp){
					return ""
				}else{
					const date = new Date(stamp*1000)
					const Y = date.getFullYear() + '-'
					const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
					const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
					const H = date.getHours() + ':'
					const M2 = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
					const S = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
					return Y + M + D + H + M2 + S
				}
			}
		}
	}
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