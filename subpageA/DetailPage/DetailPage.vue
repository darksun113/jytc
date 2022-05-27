<template>
	<PageTemp>
		<view class="detail-page">
			<LoadGoods></LoadGoods>
			<GoodsInfo></GoodsInfo>
			<ButtonBox></ButtonBox>
		</view>
	</PageTemp>
</template>

<script>
	import LoadGoods from "./components/LoadGoods/index.vue"
	import GoodsInfo from "./components/GoodsInfo/index.vue"
	import ButtonBox from "./components/ButtonBox/index.vue"
	export default {
		components:{
			LoadGoods,
			GoodsInfo,
			ButtonBox
		},
		data() {
			return {
				// 加载方式 0 未购买  1 已购买
				loadType: 1
			}
		},
		onLoad(opt) {
			this.loadType=opt.type
		}
	}
</script>

<style scoped>
.detail-page{
	height: 100%;
	overflow: auto;
	position: relative;
	padding-bottom: 124rpx;
}
</style>