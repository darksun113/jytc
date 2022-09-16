<template>
	<view class="load-image">
		<image class="goods-pic" :src="goodsData.image" mode="aspectFit"></image>
		<view class="lock_text">购买后体验内容</view>
	</view>
</template>

<script>
	import Control from "../Control/index.vue"
	export default {
		props:{
			// goodsData.loadType: 0 未购买 1 已购买
			// goodsData.materialType 类型 0 模型  1 图片  2 视频  3 音频
			goodsData:{
				type:Object,
				default:()=>{}
			}
		},
		data(){
			return {
			}
		},
		methods:{
		}
	}
</script>

<style lang="scss" scoped>
	.load-image{
		width: 100%;
		height: 100%;
		position: relative;
		.goods-pic{
			width: 500rpx;
			height: 500rpx;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
		}
		.lock_text{
			height: 28rpx;
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #ccc;
			line-height: 28rpx;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 40rpx;
			padding-left: 28rpx;
			&::before{
				width: 20rpx;
				height: 20rpx;
				content: '';
				position: absolute;
				left: 4rpx;
				top: 50%;
				transform: translateY(-50%);
				background: url("@/static/images/lock_model.svg") no-repeat center center;
				background-size: 100% 100%;
			}
		}
	}
</style>