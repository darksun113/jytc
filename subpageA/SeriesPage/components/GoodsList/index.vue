<template>
	<view class="goods-list">
		<view class="list-title">
			该系列下有{{total}}种藏品
		</view>
		<view class="list-contnet">
			<template v-for="(item,index) in goodsList">
				<GoodsCards :item="item" :key='index'></GoodsCards>
			</template>
			<IsEnd v-if="isLastItem"></IsEnd>
		</view>
	</view>
</template>

<script>
	import { getFilePath } from "@/utils/tools.js"
	export default {
		props:["seriesId"],
		data(){
			return {
				isLastItem:false,
				total:0,
				updatePage:0,
				goodsList:[
					{
						title:"漫威英雄系列",
						image:require("@/static/images/demo2.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsId:"7a7e5413004940d8b6d3ca27398f0a0d",
						materialType:1
					},
					{
						title:"超人系列",
						image:require("@/static/images/demo3.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsId:"7a7e5413004940d8b6d3ca27398f0a0d",
						materialType:3
					},{
						title:"漫威英雄系列",
						image:require("@/static/images/demo4.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsId:"7a7e5413004940d8b6d3ca27398f0a0d",
						materialType:4
					},
					{
						title:"超人系列",
						image:require("@/static/images/demo3.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsId:"7a7e5413004940d8b6d3ca27398f0a0d",
						materialType:3
						
					},{
						title:"漫威英雄系列",
						image:require("@/static/images/demo2.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsId:"7a7e5413004940d8b6d3ca27398f0a0d",
						materialType:2
					},
				]
			}
		},
		mounted() {
			this.init()
		},
		methods:{
			// 翻页更新goodsList
			updateList(){
				console.log("翻页更新")
			},
			init(){
				this.getSeriesGoodsList(callback)
			},
			async getSeriesGoodsList(callback){
				try{
					const res=await uni.$http("/series/getSeriesGoodsList",{
						seriesId:this.seriesId,
						page:this.updatePage,
						size:10
					})
					if(res.code==0){
						this.listTotal=res.data.total
						if(res.data.list.length==0){
							callback(0)
						}else{
							res.data.list.forEach(async item=>{
								item.image=await getFilePath(item.image)
							})
							callback(res.data.list)
						}
					}
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-list{
		margin-top: 40rpx;
		.list-title{
			height: 34rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999AFF;
			line-height: 34rpx;
		}
		.list-contnet{
			margin-top: 40rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}
	}
</style>