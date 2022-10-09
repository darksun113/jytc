<template>
	<view class="item" @click="toOrderPage">
		<view class="item-top">
			<view class="title-box">
				<view class="author-box">
					<image class="avatar" :src="item.goods.shopIcon" mode=""></image>
					<view class="author" style="overflow:hidden;white-space: nowrap;">
						{{item.goods.shopName}}
					</view>
				</view>
				<view class="count-box" style="justify-content: flex-end;">
					<text v-if="item.status==2">交易完成</text>
					<text v-else-if="item.status==1" style="color:#888888;">已取消</text>
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
						<view>
							¥ {{(item.goods.goodsPrice/100).toFixed(2)}}
						</view>
						<view style="font-size:28rpx;padding-top:12rpx;">
							<view v-if="item.status==5">退款成功</view>
							<view v-if="item.status==6" style="color:#FFD690">等待退款</view>
							<view v-if="item.status==7" style="color:#FF5454">退款失败</view>
							<view v-else></view>
						</view>
					</view>
					
				</view>
				
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
		mouted(){
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
			toOrderPage(){
				const url = `/subpageB/OrderPage/OrderPage?orderNo=${this.item.orderNo}`
				this.$routerTo(url)
			},
			countEnd() {
				console.log('countEnd')
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "../../../common.scss";
</style>
