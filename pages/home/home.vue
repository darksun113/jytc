<template>
	<PageTemp>
		<view class="home">
			<Banner></Banner>
			<StickyNav @changeShowType="changeShowType"></StickyNav>
			<view class="container" >
				<view class="list_layout" v-if="showType==0">
					<ModelOfListFlow :item="item" v-for="(item,index) in list" :key="index"></ModelOfListFlow>
				</view>
				<view class="water_layout" v-else>
					<view>
						<ModelOfWaterFall :item="item" v-for="(item,index) in list" :key="index" v-if="index % 2 ==0"></ModelOfWaterFall>
					</view>
					<view>
						<ModelOfWaterFall :item="item" v-for="(item,index) in list" :key="index" v-if="index % 2 !==0"></ModelOfWaterFall>
					</view>
				</view>
			</view>
		</view>
	</PageTemp>
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
				list:[
					{
						title:"漫威英雄系列",
						image:require("@/static/images/demo2.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png")
					},
					{
						title:"超人系列",
						image:require("@/static/images/demo3.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png")
					},{
						title:"漫威英雄系列",
						image:require("@/static/images/demo5.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png")
					},
					{
						title:"超人系列",
						image:require("@/static/images/demo3.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png")
					},{
						title:"漫威英雄系列",
						image:require("@/static/images/demo5.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png")
					},
					{
						title:"超人系列",
						image:require("@/static/images/demo3.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png")
					},
				]
			}
		},
		methods:{
			changeShowType(type){
				this.showType=type
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home{
		height: 100%;
		overflow: auto;
		color: #FFFFFF;
		.water_layout{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}
	}
</style>
