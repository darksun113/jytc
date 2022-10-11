<template>
	<view class="item">
		<view class="item-top">
			<view class="title-box">
				<view class="author-box">
					<image class="avatar" :src="item.goods.shopIcon" mode=""></image>
					<view class="author nowrap_s">
						<!-- {{item.goods.shopName}} -->
						深圳百纳维科技有限公司维科技有限公司
					</view>
				</view>
				<view class="count-box" v-if="item.goods.startTime > curTime && item.status == 4">
					预付成功，等待开售
				</view>
				<view class="count-box" v-else>
					<u-count-down style="width: 120rpx;" :time="(item.expireTime - curTime)*1000" format="HH:mm:ss"
						@finish="countEnd"></u-count-down>
					<text style="margin-left: 20rpx;">待支付</text>
				</view>
			</view>
			<view class="order-time">
				{{item.updateTime | format}}
			</view>
		</view>
		<view class="item-center">
			<view class="goods-pic-box">
				<image class="goods-pic" :src="item.goods.image" :mode="item.goods.goodsType == 2 ? 'aspectFit' : 'aspectFill'"></image>
				<image v-if="item.goods.materialType==0" class="goods-type" src="@/static/images/type_3D.svg"></image>
				<image v-else-if="item.goods.materialType==1" class="goods-type" src="@/static/images/type_pic.svg"></image>
				<image v-else-if="item.goods.materialType==2" class="goods-type" src="@/static/images/type_video.svg"></image>
				<image v-else-if="item.goods.materialType==3" class="goods-type" src="@/static/images/type_audio.svg"></image>
			</view>
			<view class="goods-info">
				<view class="goods-name nowrap_2">
					{{item.goods.goodsName}}
				</view>
				<view class="price-box">
					<view class="price">
						<text v-if="item.status == 3 || item.status == 4">¥ {{((item.goods.prepayAmount + item.goods.deposit)/100).toFixed(2)}}</text>
						<text v-else>¥ {{(item.totalFee/100).toFixed(2)}}</text>
					</view>
					<view class="pre-pay-price" v-if="item.status == 3 || item.status == 4">
						<text v-if="item.status == 3">定金：¥ {{(item.totalFee/100).toFixed(2)}}</text>
						<text v-else-if="item.status == 4">尾款：¥ {{(item.totalFee/100).toFixed(2)}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="item-bottom">
			<view class="btn btn-cancel" @click.stop="$emit('cancelOrder',{orderNo:item.orderNo,index:index_,orderStatus:item.status})">
				取消订单
			</view>
			<view v-if="this.item.status==0||this.item.status==3" class="btn btn-pay" @click.stop="toPay">
				立即支付
			</view>
			<view v-else-if="this.item.status==4" class="btn" :class="item.goods.startTime < curTime ? 'btn-pay':'btn-tail'" @click.stop="toPay">
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
