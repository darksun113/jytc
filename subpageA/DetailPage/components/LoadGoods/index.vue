<template>
	<view class="show-box">
		<LoadModel v-if="loadType==0"></LoadModel>
		<LoadImage v-else-if="loadType==1"></LoadImage>
		<LoadVideo v-else-if="loadType==2"></LoadVideo>
		<LoadAudio v-else></LoadAudio>
	</view>
</template>

<script>
	import LoadModel from "./components/LoadModel/index.vue"
	import LoadImage from "./components/LoadImage/index.vue"
	import LoadVideo from "./components/LoadVideo/index.vue"
	import LoadAudio from "./components/LoadAudio/index.vue"
	export default{
		props:{
			// load 类型 0 模型  1 图片  2 视频 3 音频
			loadType:{
				type:Number,
				default:()=>1
			}
		},
		components:{
			LoadModel,
			LoadImage,
			LoadVideo,
			LoadAudio
		}
	}
</script>

<style lang="scss" scoped>
	.show-box{
		height: 668rpx;
		background: #0E0E0E;
		border: 2rpx solid #21201F;
	}
</style>