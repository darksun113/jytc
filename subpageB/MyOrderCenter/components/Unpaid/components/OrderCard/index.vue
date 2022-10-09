<template>
	<view class="item">
		<view class="item-top">
			<view class="title-box">
				<view class="author-box">
					<image class="avatar" :src="item.goods.shopIcon" mode=""></image>
					<view class="author nowrap">
						{{item.goods.shopName}}
					</view>
				</view>
				<view class="count-box">
					<u-count-down style="width: 120rpx;" :time="(item.expireTime - curTime)*1000" format="HH:mm:ss"
						@finish="countEnd"></u-count-down>
					<text>待支付</text>
				</view>
			</view>
			<view class="order-time">
				{{item.updateTime | format}}
			</view>
		</view>
		<view class="item-center">
			<image class="goods-pic" :src="item.goods.image" mode="aspectFill"></image>
			<view class="goods-info">
				<view class="goods-name nowrap_2">
					{{item.goods.goodsName}}
				</view>
				<view>
					<image v-if="item.goods.materialType==0" class="goods-type" src="@/static/images/type_3D.svg"></image>
					<image v-else-if="item.goods.materialType==1" class="goods-type" src="@/static/images/type_pic.svg"></image>
					<image v-else-if="item.goods.materialType==2" class="goods-type" src="@/static/images/type_video.svg"></image>
					<image v-else-if="item.goods.materialType==3" class="goods-type" src="@/static/images/type_audio.svg"></image>
					<view class="price">
						¥ {{(item.goods.goodsPrice/100).toFixed(2)}}
					</view>
				</view>
			</view>
		</view>
		<view class="item-bottom">
			<view class="btn btn-cancel" @click.stop="$emit('cancelOrder',{orderNo:item.orderNo,index:index_})">
				取消订单
			</view>
			<view v-if="this.item.status==0||this.item.status==3" class="btn btn-pay" @click.stop="toPay">
				立即支付
			</view>
			<view v-if="this.item.status==4" class="btn btn-tail" @click.stop="toPay">
				支付尾款
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
			},
			index_:[Number,String]
		},
		data() {
			return {
				curTime:parseInt(Date.now()/1000)
			}
		},
		filters:{
			format(stamp){
				if(!stamp){
					return ""
				}else{
					const date = new Date(stamp*1000)
					const Y = date.getFullYear() + '.'
					const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.'
					const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
					const H = date.getHours() + ':'
					const M2 = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
					return Y + M + D + H + M2 + "00"
				}
			},
		},
		methods: {
			countEnd() {
				this.$emit("countEnd",this.index)
			},
			toPay() {
				const url = `/subpageB/OrderPage/OrderPage?orderNo=${this.item.orderNo}`
				this.$routerTo(url)
			},
		}
	}
</script>

<style lang="scss" scoped>
@import "../../../common.scss";
</style>
