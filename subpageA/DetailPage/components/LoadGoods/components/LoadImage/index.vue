<template>
	<view class="load-image">
		<image class="goods-pic" src="@/static/images/demo2.png" mode="aspectFill"></image>
		<Control  v-if="goodsData.loadType==1" @preview="toOpenModelPreImg" @share="toShare"></Control>
		<view class="lock_text" v-else>购买后可解锁高清观赏模式</view>
		<Preview :isShow="isOpenPre" @close="isOpenPre=false">
			<PreviewModel :goodsData="imgData" @close="closePreviewModel"></PreviewModel>
		</Preview>
	</view>
</template>

<script>
	import Control from "../Control/index.vue"
	import PreviewModel from "./components/PreviewModel"
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
				isOpenPre:false,
				imgData:{}
			}
		},
		components:{
			Control,
			PreviewModel
		},
		methods:{
			closePreviewModel(){
				this.isOpenPre=false
			},
			toOpenModelPreImg(){
				const data= {
					image:require("@/static/images/demo2.png")
				}
				this.imgData={...data}
				this.isOpenPre=true
			},
			toShare(){
				uni.$emit("toOpenSharePoster")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.load-image{
		width: 100%;
		height: 100%;
		position: relative;
		.goods-pic{
			width: 450rpx;
			height: 450rpx;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
		}
		.lock-tip{
			display: flex;
			align-items: center;
			position: absolute;
			left: 50%;
			bottom: 20rpx;
			transform: translateX(-50%);
			.lock-icon{
				width: 20rpx;
				height: 20rpx;
				margin-right: 10rpx;
			}
			.lock-text{
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				color: #CCCCCC;
				line-height: 28rpx;
			}
		}
		.lock_text{
			height: 28rpx;
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
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