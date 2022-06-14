<template>
	<view class="model_preview">
		<img class="close_icon" src="@/static/images/close_preview_icon.svg" alt="" @click="$emit('close')">
		<LoadModelPre  ref="LoadModelPre" v-if="goodsData.threeD && goodsData.mtl && goodsData.mapping && loadType==2" 
			:OBJPath="goodsData.threeD" :MTLPath="goodsData.mtl"  :MAPPath="goodsData.mapping"
			:modelType="goodsData.modelType"></LoadModelPre>
		<view class="control">
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
		props:{
			goodsData:{
				type:Object,
				default:()=>{}
			}
		},
		components:{
			LoadModelPre
		},
		mounted() {
			this.loadType=2
		},
		data(){
			return {
				show:this.isShow,
				loadType:0
			}
		},
		methods:{
			startRotate(){
				this.$refs.LoadModelPre.startRotate()
			},
			stopRotate(){
				this.$refs.LoadModelPre.stopRotate()
			}
		},
		watch:{
			isShow(boo){
				this.show=boo
			}
		}
	}
</script>

<style lang="scss" scoped>
	.model_preview{
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, .8);
		position: relative;
		.close_icon{
			width: 64rpx;
			height: 64rpx;
			position: absolute;
			right: 60rpx;
			top: 120rpx;
			z-index: 999999;
		}
		.control{
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
			.btn{
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				background: linear-gradient(180deg, #70D0FF 0%, #D575FF 100%);
				display: flex;
				justify-content: center;
				align-items: center;
				img{
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
</style>