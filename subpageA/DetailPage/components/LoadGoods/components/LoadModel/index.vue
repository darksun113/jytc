<template>
	<view class="model-box">
		<LoadModel ref="d_model" :OBJPath="goodsData.threeD" :MTLPath="goodsData.mtl" :MAPPath="goodsData.mapping"
			:loadType="goodsData.loadType" :modelType="goodsData.modelType">
		</LoadModel>
		<Preview :isShow="isOpenModelPre">
			<PreviewModel :goodsData="modelData" @close="closePreviewModel"></PreviewModel>
		</Preview>
		<Control v-if="goodsData.loadType==1" @preview="toOpenModelPre3D" @share="toShare" :buyerId="goodsData.ownerName"></Control>
		<view class="lock_text" v-else>
			购买后体验内容
		</view>
	</view>
</template>

<script>
	import LoadModel from "./components/LoadModel";
	import PreviewModel from "./components/PreviewModel";
	import Control from "../Control/index.vue"
	export default {
		props: {
			// goodsData.loadType: 0 未购买 1 已购买
			// goodsData.materialType 类型 0 模型  1 图片  2 视频  3 音频
			goodsData: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				isOpenModelPre: false,
				modelData: {}
			}
		},
		components: {
			LoadModel,
			PreviewModel,
			Control
		},
		methods: {
			toShare() {
				uni.$emit("toOpenSharePoster")
			},
			closePreviewModel() {
				this.$refs.d_model.startRotate()
				this.isOpenModelPre = false
			},
			toOpenModelPre3D() {
				const data = {
					threeD: this.goodsData.threeD,
					mtl: this.goodsData.mtl,
					mapping: this.goodsData.mapping,
					modelType: this.goodsData.modelType
				}
				this.$refs.d_model.stopRotate()
				this.modelData = {
					...data
				}
				this.isOpenModelPre = true
			}
		},
		mounted() {}
	}
</script>

<style lang="scss" scoped>
	.model-box {
		width: 100%;
		height: 100%;
		position: relative;

		.lock_text {
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

			&::before {
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
