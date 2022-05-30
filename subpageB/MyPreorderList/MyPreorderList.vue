<template>
	<PageTemp>
		<scroll-view class="pre-order" scroll-y="true" @scrolltolower="updateList">
			<view class="container">
				<view class="title">
					已获得以下系列的预购名额
				</view>
				<ModelOfListFlow :seriesList="seriesList"></ModelOfListFlow>
				<IsEnd></IsEnd>
			</view>
		</scroll-view>
	</PageTemp>
</template>

<script>
	export default {
		data() {
			return {
				seriesList:[
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
			};
		},
		methods:{
			updateList(){
				console.log(123)
			}
		}
	}
</script>

<style lang="scss">
.pre-order{
	height: 100%;
	box-sizing: border-box;
	overflow: auto;
	padding: 40rpx 30rpx;
	padding-top: 0;
	.container{
		.title{
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			color: #FFFFFF;
			line-height: 44rpx;
			text-align: center;
			margin: 40rpx 0;
		}
	}
}
</style>
