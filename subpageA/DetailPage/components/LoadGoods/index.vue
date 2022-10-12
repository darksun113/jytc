<template>
	<view class="show-box" :style="{height:(goodsData.loadType==0 || goodsData.loadType==2) ? '668rpx':'780rpx'}">
		
		<show-code :goodsData="loadData" v-if="goodsData.loadType==1" />
		<load-blind :goodsData="loadData" v-if="loadData.goodsType==2"/>
		<load-model  :goodsData="loadData" v-else-if="loadData.materialType==0" />
		<load-image  :goodsData="loadData" v-else-if="loadData.materialType==1" />
		<load-video  :goodsData="loadData" v-else-if="loadData.materialType==2" />
		<load-audio :goodsData="loadData" v-else></load-audio>
		<donation-and-collection :goodsData="loadData"/>
		<SharePoster :isOpenPoster="isOpenPoster" @close="isOpenPoster=false" :posterData="posterData"></SharePoster>
	</view>
</template>

<script>
	import LoadModel from "./components/LoadModel/index.vue"
	import LoadImage from "./components/LoadImage/index.vue"
	import LoadVideo from "./components/LoadVideo/index.vue"
	import LoadAudio from "./components/LoadAudio/index.vue"
	import LoadBlind from "./components/LoadBlind/index.vue"
	import ShowCode from "./components/ShowCode/index.vue"
	import DonationAndCollection from "./components/DonationAndCollection"
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
				const baseCodeUrl = process.env.NODE_ENV=="development" ? "http://192.168.2.11:8080":"https://h5.jialex.cn"
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
			ShowCode,
			LoadBlind,
			DonationAndCollection
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
		background: #0E0E0E ;
		border: 2rpx solid #21201F;
		position: relative;
	}
</style>