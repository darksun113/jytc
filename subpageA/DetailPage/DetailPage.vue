<template>
	<PageTemp>
		<view class="detail-page">
			<LoadGoods v-if="JSON.stringify(goodsData)!=='{}'" :goodsData="goodsData"></LoadGoods>
			<GoodsInfo v-if="JSON.stringify(goodsData)!=='{}'" :goodsData="goodsData" :buyerList="buyerList"></GoodsInfo>
			<ButtonBox v-if="JSON.stringify(goodsData)!=='{}' && loadType==0" :goodsData="goodsData" ></ButtonBox>
		</view>
	</PageTemp>
</template>

<script>
	import LoadGoods from "./components/LoadGoods/index.vue"
	import GoodsInfo from "./components/GoodsInfo/index.vue"
	import ButtonBox from "./components/ButtonBox/index.vue"
	import {getFilePath, getFilesPath} from "@/utils/tools.js"
	export default {
		components:{
			LoadGoods,
			GoodsInfo,
			ButtonBox
		},
		data() {
			return {
				// 加载方式 0 未购买  1 已购买
				loadType: 0,
				goodsId:"",
				goodsData:{},
				buyerList:[],
				instanceId:""
			}
		},
		onUnload() {
			uni.$off("toOpenSharePoster")
		},
		methods:{
			async getGoodsDetail(){
				try{
					const res= await uni.$http("/goods/getGoodsDetail",{goodsId:this.goodsId})
					if(res.code==0){
						const resData=res.data.goods
						const temp={
							image:resData.image,
							shopIcon: resData.shopIcon,
							description: resData.description,
						}
						resData.url?temp.url=resData.url:''
						resData.mapping?temp.mapping=resData.mapping:''
						resData.threeD?temp.threeD=resData.threeD:''
						resData.mtl?temp.mtl=resData.mtl:''
						const data=await getFilesPath(temp)
						Object.keys(data).forEach(key=>{
							resData[key]=data[key]
						})
						
						this.goodsData=resData
						this.goodsData.loadType=this.loadType
						this.goodsData.modelType=2
						uni.setNavigationBarTitle({
							title:resData.goodsName
						})
					}else{
						uni.showToast({
							title:res.errorMsg,
							icon:"error"
						})
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			async getGoodsInstanceDetail(){
				try{
					const res= await uni.$http("/goods/getGoodsInstanceDetail",{instanceId:this.instanceId})
					if(res.code==0){
						const temp={
							image:res.data.image,
							shopIcon: res.data.shopIcon,
							description: res.data.description,
						}
						res.data.url?temp.url=res.data.url:''
						res.data.mapping?temp.mapping=res.data.mapping:''
						res.data.threeD?temp.threeD=res.data.threeD:''
						res.data.mtl?temp.mtl=res.data.mtl:''
						const objData=await getFilesPath(temp)
						Object.keys(objData).forEach(key=>{
							res.data[key]=objData[key]
						})
						this.goodsData=res.data
						this.goodsData.loadType=this.loadType
						this.goodsData.modelType=3
					}else{
						uni.showToast({
							title:res.errorMsg,
							icon:"none"
						})
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			async getBuyers(callback){
				try{
					const res=await uni.$http("/goods/getBuyers",{goodsId:this.goodsId,size:3})
					if(res.code==0){
						res.data.list.forEach(async item=>{
							item.recipientIcon = await getFilePath(item.recipientIcon) 
							callback(item)
						})
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			async init(){
				if(this.loadType==0){
					this.getGoodsDetail()
					this.getBuyers(item=>{
						this.buyerList.push(item)
						this.buyerList=this.buyerList.sort((a,b)=>b.createTime-a.createTime)
					})
				}else{
					if(this.$checkLogin()){
						this.getGoodsInstanceDetail()
					}else{
						const instanceId=this.instanceId || ""
						const url=`/pages/login/LoginByMobile/GetVerifyCode/GetVerifyCode?instanceId=${instanceId}`
						this.$routerTo(url,'redirect')
					}
				}
			}
		},
		onLoad(opt) {
			// loadType: 0 未购买  已购买
			this.loadType=opt.loadType
			this.goodsId=opt.goodsId?opt.goodsId:""
			this.instanceId=opt.instanceId?opt.instanceId : ""
		},
		onShow() {
			this.init()
		}
	}
</script>

<style scoped>
.detail-page{
	height: 100%;
	overflow: auto;
	position: relative;
	padding-bottom: 204rpx;
}
</style>