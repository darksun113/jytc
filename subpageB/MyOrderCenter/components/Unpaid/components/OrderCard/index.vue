<template>
	<view class="item">
		<view class="item-top">
			<view class="title-box">
				<view class="author-box">
					<image class="avatar" src="@/static/images/default_avatar.png" mode=""></image>
					<view class="author nowrap">
						深圳百纳维科技有限公司
					</view>
				</view>
				<view class="count-box">
					<u-count-down style="width: 120rpx;" :time="5 * 60 * 60 * 1000" format="HH:mm:ss"
						@finish="countEnd"></u-count-down>
					<text>待支付</text>
				</view>
			</view>
			<view class="order-time">
				2022-02-01 15:30:00
			</view>
		</view>
		<view class="item-center">
			<image class="goods-pic" src="@/static/images/demo2.png" mode="aspectFill"></image>
			<view class="goods-info">
				<view class="goods-name nowrap_2">
					此处可以显示十
				</view>
				<view>
					<image v-if="item.type==0" class="goods-type" src="@/static/images/type_pic.svg" mode=""></image>
					<image v-else-if="item.type==1" class="goods-type" src="@/static/images/type_3D.svg" mode="">
					</image>
					<image v-else-if="item.type==2" class="goods-type" src="@/static/images/type_video.svg" mode="">
					</image>
					<image v-else-if="item.type==3" class="goods-type" src="@/static/images/type_audio.svg" mode="">
					</image>
					<view class="price">
						¥ 18.88
					</view>
				</view>
			</view>
		</view>
		<view class="item-bottom">
			<view class="btn btn-cancel" @click="$emit('cancelOrder',159)">
				取消订单
			</view>
			<view class="btn btn-pay" @click="toPay">
				立即支付
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {

			}
		},
		methods: {
			countEnd() {
				console.log('countEnd')
			},
			toPay() {
				const url = `/subpageB/OrderPage/OrderPage?orderNo=${1}`
				this.$routerTo(url)
			},
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .u-count-down__text {
		color: #FFD690;
		font-size: 28rpx;
	}

	.item {
		padding: 40rpx;
		margin-bottom: 40rpx;
		background: #0A0C47;
		border-radius: 20rpx;

		.item-top {
			padding-bottom: 20rpx;
			border-bottom: 2rpx dashed rgba(255, 255, 255, .1);

			.title-box {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.author-box {
					display: flex;
					align-items: center;
					margin-right: 40rpx;

					.avatar {
						width: 36rpx;
						min-width: 36rpx;
						height: 36rpx;
						border-radius: 50%;
						margin-right: 10rpx;
					}

					.author {
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 34rpx;
					}
				}

				.count-box {
					width: 204rpx;
					min-width: 204rpx;
					display: flex;
					align-items: center;
					font-size: 28rpx;
				}
			}

			.order-time {
				margin-top: 20rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 34rpx;
			}
		}

		.item-center {
			padding-top: 30rpx;
			display: flex;

			.goods-pic {
				height: 200rpx;
				width: 200rpx;
				min-width: 200rpx;
				margin-right: 20rpx;
			}

			.goods-info {
				font-family: PingFangSC-Medium, PingFang SC;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.goods-name {
					font-size: 32rpx;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 44rpx;
				}

				.goods-type {
					width: 36rpx;
					height: 36rpx;
				}

				.price {
					font-size: 44rpx;
					font-weight: 500;
					color: #FFFFFF;
				}
			}
		}

		.item-bottom {
			margin-top: 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.btn {
				width: 280rpx;
				height: 60rpx;
				border-radius: 44rpx;
				line-height: 60rpx;
				text-align: center;
			}

			.btn-cancel {
				border: 2rpx solid #A5A6FF;
				color: #A5A6FF;
			}

			.btn-pay {
				background: linear-gradient(180deg, #70D0FF 0%, #D575FF 100%);
				color: #000;
			}
		}
	}
</style>
