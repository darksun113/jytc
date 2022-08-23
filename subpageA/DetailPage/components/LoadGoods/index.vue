<template>
	<view class="show-box" :style="{height:goodsData.loadType==0 ? '668rpx':'780rpx'}">
		<ShowCode :goodsData="loadData" v-if="goodsData.loadType==1"></ShowCode>
		<LoadModel  :goodsData="loadData" v-if="loadData.materialType==0"></LoadModel>
		<LoadImage  :goodsData="loadData" v-else-if="loadData.materialType==1"></LoadImage>
		<LoadVideo  :goodsData="loadData" v-else-if="loadData.materialType==2"></LoadVideo>
		<LoadAudio  :goodsData="loadData" v-else></LoadAudio>
		<SharePoster :isOpenPoster="isOpenPoster" @close="isOpenPoster=false" :posterData="posterData"></SharePoster>
	</view>
</template>

<script>
	import LoadModel from "./components/LoadModel/index.vue"
	import LoadImage from "./components/LoadImage/index.vue"
	import LoadVideo from "./components/LoadVideo/index.vue"
	import LoadAudio from "./components/LoadAudio/index.vue"
	import ShowCode from "./components/ShowCode/index.vue"
	export default{
		props:{
			// materialType 类型 0 模型  1 图片  2 视频  3 音频
			goodsData:{
				type:Object,
				default:()=>{}
			}
		},
		data(){
			return {
				loadData:this.goodsData,
				isOpenPoster:false,
				posterData:{}
			}
		},
		mounted() {
			uni.$on("toOpenSharePoster",()=>{
				const name=uni.getStorageSync("userInfo").name
				const avatar=uni.getStorageSync("userInfo").avatar.split("?")[0]
				const posterImg = this.goodsData.image.split("?")[0]
				const instanceId = this.goodsData.goodsInstanceId?this.goodsData.goodsInstanceId:""
				const baseCodeUrl = process.env.NODE_ENV=="development" ? "http://192.168.2.27:8080":"http://h5.jytc-test.binavy.com/"
				this.posterData={
					codeUrl : `${baseCodeUrl}/subpageA/DetailPage/DetailPage?loadType=1&instanceId=${instanceId}`,
					name,
					posterImg,
					avatar,
					shopName:this.goodsData.shopName,
					shopIcon:this.goodsData.shopIcon.split("?")[0],
					goodsName:this.goodsData.goodsName,
					goodsCode:this.goodsData.goodsCode,
					totalNum:this.goodsData.totalNumber,
					loadType:1 // 0 邀请分享  1 分享把玩
				}
				this.isOpenPoster=true
			})
		},
		beforeDestroy() {
			uni.$off("toOpenSharePoster")
		},
		components:{
			LoadModel,
			LoadImage,
			LoadVideo,
			LoadAudio,
			ShowCode
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
		background: #0E0E0E;
		border: 2rpx solid #21201F;
	}
</style>