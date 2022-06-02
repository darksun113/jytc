<template>
	<view class="item" @click="toOrderPage">
		<view class="item-top">
			<view class="title-box">
				<view class="author-box">
					<image class="avatar" src="@/static/images/default_avatar.png" mode=""></image>
					<view class="author nowrap">
						深圳百纳维科技有限公司
					</view>
				</view>
				<view class="count-box" style="justify-content: end;">
					<text v-if="item.type==0">交易完成</text>
					<text v-else style="color:#888888;">已取消</text>
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
			toOrderPage(){
				const url = `/subpageB/OrderPage/OrderPage?orderNo=${1}`
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
