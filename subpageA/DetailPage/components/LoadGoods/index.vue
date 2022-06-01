<template>
	<view class="show-box">
		<LoadModel  :goodsData="loadData" v-if="loadData.goodsType==1 && loadData.threeD && loadData.mtl && loadData.mapping"></LoadModel>
		<LoadImage  :goodsData="loadData" v-else-if="loadData.goodsType==2"></LoadImage>
		<LoadVideo  :goodsData="loadData" v-else-if="loadData.goodsType==3"></LoadVideo>
		<LoadAudio  :goodsData="loadData" v-else></LoadAudio>
		<SharePoster :isOpenPoster="isOpenPoster" @close="isOpenPoster=false" :posterData="posterData"></SharePoster>
	</view>
</template>

<script>
	import LoadModel from "./components/LoadModel/index.vue"
	import LoadImage from "./components/LoadImage/index.vue"
	import LoadVideo from "./components/LoadVideo/index.vue"
	import LoadAudio from "./components/LoadAudio/index.vue"
	export default{
		props:{
			// goodsType 类型 1 模型  2 图片  3 视频  4 音频
			goodsData:{
				type:Object,
				default:()=>{}
			}
		},
		data(){
			return {
				loadData:this.goodsData,
				isOpenPoster:false,
				posterData:{
					
				}
			}
		},
		mounted() {
			uni.$on("toOpenSharePoster",(data)=>{
				this.posterData={...data}
				this.isOpenPoster=true
			})
		},
		components:{
			LoadModel,
			LoadImage,
			LoadVideo,
			LoadAudio
		},
		watch:{
			goodsData(data){
				this.loadData=data
			}
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