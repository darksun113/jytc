<template>
	<view class="goods-list">
		<view class="list-title">
			该系列下有5种藏品
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
	export default {
		props:["seriesId"],
		data(){
			return {
				isLastItem:false,
				goodsList:[
					{
						title:"漫威英雄系列",
						image:require("@/static/images/demo2.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsId:"7a7e5413004940d8b6d3ca27398f0a0d",
						goodsType:1
					},
					{
						title:"超人系列",
						image:require("@/static/images/demo3.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsId:"7a7e5413004940d8b6d3ca27398f0a0d",
						goodsType:3
					},{
						title:"漫威英雄系列",
						image:require("@/static/images/demo4.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsId:"7a7e5413004940d8b6d3ca27398f0a0d",
						goodsType:4
					},
					{
						title:"超人系列",
						image:require("@/static/images/demo3.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsId:"7a7e5413004940d8b6d3ca27398f0a0d",
						goodsType:3
						
					},{
						title:"漫威英雄系列",
						image:require("@/static/images/demo2.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsId:"7a7e5413004940d8b6d3ca27398f0a0d",
						goodsType:2
					},
				]
			}
		},
		methods:{
			// 翻页更新goodsList
			updateList(){
				console.log("翻页更新")
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