<template>
	<PageTemp>
		<view class="detail-page">
			<LoadGoods :goodsData="goodsData"></LoadGoods>
			<GoodsInfo :goodsData="goodsData" :buyerList="buyerList"></GoodsInfo>
			<ButtonBox :goodsData="goodsData" v-if="loadType==0"></ButtonBox>
		</view>
	</PageTemp>
</template>

<script>
	import LoadGoods from "./components/LoadGoods/index.vue"
	import GoodsInfo from "./components/GoodsInfo/index.vue"
	import ButtonBox from "./components/ButtonBox/index.vue"
	import mixin from "./mixins/mixin.js"
	export default {
		components:{
			LoadGoods,
			GoodsInfo,
			ButtonBox
		},
		mixins:[mixin],
		data() {
			return {
				// 加载方式 0 未购买  1 已购买
				loadType: 0,
				goodsId:"",
				goodsData:{},
				buyerList:[]
			}
		},
		onUnload() {
			uni.$off("toOpenSharePoster")
		},
		onLoad(opt) {
			// loadType: 0 未购买  已购买
			this.loadType=opt.loadType
			this.goodsId=opt.goodsId
			this.instanceId=opt.instanceId
			this.goodsType=opt.goodsType
		}
	}
</script>

<style scoped>
.detail-page{
	height: 100%;
	overflow: auto;
	position: relative;
	/* padding-bottom: 204rpx; */
}
</style>