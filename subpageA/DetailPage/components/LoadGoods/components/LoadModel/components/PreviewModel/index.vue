<template>
	<view class="model_preview">
		<view class="control-top">
			<view class="control-top-box">
				<view class="bar" :style="{left:showType==0?'0':'120rpx'}"></view>
				<text :style="{color:showType==0?'#fff':'#999',fontWeight:showType==0? 'bold':'normal'}" @click="changeModule(0)">旋转</text>
				<text :style="{color:showType==0?'#999':'#fff',fontWeight:showType==1? 'bold':'normal'}" @click="changeModule(1)">平移</text>
			</view>
			<img class="close_icon" src="@/static/images/close_preview_icon.svg" alt="" @click="$emit('close')">
		</view>
		<LoadModelPre ref="LoadModelPre" v-if="goodsData.threeD && goodsData.mtl && goodsData.mapping && loadType==2"
			:OBJPath="goodsData.threeD" :MTLPath="goodsData.mtl" :MAPPath="goodsData.mapping"
			:modelType="goodsData.modelType"></LoadModelPre>
		<view class="control" v-show="showType==0">
			<view class="btn" @click="startRotate">
				<img src="../../static/images/start_rotate_icon.svg" alt="">
			</view>
			<view class="btn" @click="stopRotate">
				<img src="../../static/images/stop_rotate_icon.svg" alt="">
			</view>
		</view>
	</view>
</template>

<script>
	import LoadModelPre from "./LoadModelPre.vue"
	export default {
		props: {
			goodsData: {
				type: Object,
				default: () => {}
			}
		},
		components: {
			LoadModelPre
		},
		mounted() {
			this.loadType = 2
		},
		data() {
			return {
				show: this.isShow,
				loadType: 0,
				showType: 0
			}
		},
		methods: {
			startRotate() {
				this.$refs.LoadModelPre.startRotate()
			},
			stopRotate() {
				this.$refs.LoadModelPre.stopRotate()
			},
			changeModule(type){
				this.showType=type
				if(type== 1){
					this.$refs.LoadModelPre.openEnablePan()
				}else{
					this.$refs.LoadModelPre.closeEnablePan()
				}
			}
		},
		watch: {
			isShow(boo) {
				this.show = boo
			}
		}
	}
</script>

<style lang="scss" scoped>
	.model_preview {
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, .8);
		position: relative;

		.control-top {
			position: absolute;
			top: 120rpx;
			left: 0;
			width: 100%;
			z-index: 999999;
			padding: 0 60rpx 0 36rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.control-top-box {
				width: 240rpx;
				height: 64rpx;
				background: #333333;
				border-radius: 32rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 32rpx;
				font-family: SourceHanSansCN-Regular, SourceHanSansCN;
				font-weight: 400;
				color: #999999;
				position: relative;
				text {
					flex: 1;
					text-align: center;
				}

				.bar {
					width: 120rpx;
					height: 64rpx;
					background: #666666;
					border-radius: 32rpx;
					position: absolute;
					transition: all 0.5s ease;
					left: 0;
					top: 0;
					opacity: 0.4;
				}
			}

			.close_icon {
				width: 64rpx;
				height: 64rpx;
			}
		}

		.control {
			width: 260rpx;
			height: 80rpx;
			border-radius: 56rpx;
			position: absolute;
			left: 50%;
			bottom: 100rpx;
			transform: translateX(-50%);
			display: flex;
			justify-content: space-around;
			align-items: center;

			.btn {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				background: #28D8E5;
				display: flex;
				justify-content: center;
				align-items: center;

				img {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
</style>
