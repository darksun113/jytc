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
			<view class="btn btn-cancel" @click.stop="$emit('cancelOrder',159)">
				取消订单
			</view>
			<view class="btn btn-pay" @click.stop="toPay">
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
@import "../../../common.scss";
</style>
