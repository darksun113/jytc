<template>
	<PageTemp>
		<scroll-view v-if="true" class="my-object" scroll-y="true" @scrolltolower="updateList">
			<CardOfObject :item="item" v-for="(item,index) in goodsList" :key="index"></CardOfObject>
			<IsEnd></IsEnd>
		</scroll-view>
		<IsNoObject v-else>
			暂无藏品
		</IsNoObject>
	</PageTemp>
</template>

<script>
	export default {
		data() {
			return {
				goodsList:[
					{
						name:"漫威英雄系列",
						image:require("@/static/images/demo2.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsId:"7a7e5413004940d8b6d3ca27398f0a0d",
						goodsType:1
					},
					{
						name:"超人系列",
						image:require("@/static/images/demo3.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsId:"7a7e5413004940d8b6d3ca27398f0a0d",
						goodsType:3
					},{
						name:"漫威英雄系列",
						image:require("@/static/images/demo4.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsId:"7a7e5413004940d8b6d3ca27398f0a0d",
						goodsType:4
					},
					{
						name:"超人系列",
						image:require("@/static/images/demo3.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsId:"7a7e5413004940d8b6d3ca27398f0a0d",
						goodsType:3
						
					},{
						name:"漫威英雄系列",
						image:require("@/static/images/demo2.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsId:"7a7e5413004940d8b6d3ca27398f0a0d",
						goodsType:2
					},
				]
			};
		},
		methods:{
			updateList(){
				console.log('update')
			}
		}
	}
</script>

<style lang="scss">
.my-object{
	box-sizing: border-box;
	padding: 40rpx;
	height: 100%;
	overflow: auto;
}
</style>
