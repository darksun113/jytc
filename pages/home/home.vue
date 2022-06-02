<template>
	<PageTempHasTabbar>
		<scroll-view class="home" scroll-y="true" @scrolltolower="updateList">
			<view>
				<Banner></Banner>
				<StickyNav @changeShowType="changeShowType"></StickyNav>
				<view class="container">
					<IsNoData v-if="false">暂无数据</IsNoData>
					<view v-else>
						<ModelOfListFlow :seriesList="seriesList" v-if="showType==0"></ModelOfListFlow>
						<ModelOfWaterFall :seriesList="seriesList" v-else></ModelOfWaterFall>
						<IsEnd></IsEnd>
					</view>
				</view>
			</view>
		</scroll-view>
	</PageTempHasTabbar>
</template>

<script>
	import Banner from "./components/Banner/index.vue"
	import StickyNav from "./components/StickyNav/index.vue"
	export default {
		components:{
			Banner,
			StickyNav
		},
		data(){
			return{
				showType:0,
				seriesList:[
					{
						title:"漫威英雄系列",
						image:require("@/static/images/demo1.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsType:1
					},
					{
						title:"超人系列",
						image:require("@/static/images/demo4.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsType:2
					},{
						title:"漫威英雄系列",
						image:require("@/static/images/demo5.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsType:3
					},
					{
						title:"超人系列",
						image:require("@/static/images/demo3.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsType:4
					},{
						title:"漫威英雄系列",
						image:require("@/static/images/demo2.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsType:3
					},
					{
						title:"超人系列",
						image:require("@/static/images/demo6.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsType:1
					},
				]
			}
		},
		methods:{
			changeShowType(type){
				this.showType=type
			},
			updateList() {
				console.log(456)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home{
		height: 100%;
		overflow: auto;
		color: #FFFFFF;
	}
</style>
