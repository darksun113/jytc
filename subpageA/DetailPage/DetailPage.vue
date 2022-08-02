<template>
	<PageTemp>
		<view class="detail-page" :style="{paddingBottom:loadType==0?'204rpx':'0'}">
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
	import {getFilePath} from "@/utils/tools.js"
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
		onHide() {
			uni.$emit("destroyAudio")
			uni.$off("destroyAudio")
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
						const keysList=["image","shopIcon","description"]
						resData.url?keysList.push("url"):''
						resData.mapping?keysList.push("mapping"):''
						resData.threeD?keysList.push("threeD"):''
						resData.mtl?keysList.push("mtl"):''
						const objData= await getFilePath(resData,keysList)
						this.goodsData=objData
						this.goodsData.loadType=this.loadType
						this.goodsData.modelType=4
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
						const keysList=["image","shopIcon","description"]
						res.data.url?keysList.push("url"):''
						res.data.mapping?keysList.push("mapping"):''
						res.data.threeD?keysList.push("threeD"):''
						res.data.mtl?keysList.push("mtl"):''
						const objData=await getFilePath(res.data,keysList)
						this.goodsData=objData
						this.goodsData.loadType=this.loadType
						this.goodsData.modelType=4
						uni.setNavigationBarTitle({
							title:res.data.goodsName
						})
					}else if(res.code == 1000){
						this.toLogin()
					}else{
						this.$toast(res.errorMsg)
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			async getBuyers(callback){
				try{
					const res=await uni.$http("/goods/getBuyers",{goodsId:this.goodsId,size:3})
					if(res.code==0){
						res.data.list= await getFilePath(res.data.list,["recipientIcon"])
						callback(res.data.list)
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			async init(){
				if(this.loadType==0 || this.loadType==3){
					this.getGoodsDetail()
					this.getBuyers(list=>{
						this.buyerList=list
					})
				}else{
					if(this.$checkLogin()){
						this.getGoodsInstanceDetail()
					}else{
						this.toLogin()
					}
				}
			},
			toLogin(){
				const instanceId=this.instanceId || ""
				const url=`/pages/login/LoginByMobile/GetVerifyCode/GetVerifyCode?instanceId=${instanceId}`
				this.$routerTo(url,'redirect')
			},
		},
		onLoad(opt) {
			// loadType: 0 未购买  1 已购买  2 后台预览
			this.loadType=opt.loadType
			this.goodsId=opt.goodsId?opt.goodsId:""
			this.instanceId=opt.instanceId?opt.instanceId : ""
			
		},
		onShow() {
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
.detail-page{
	height: 100%;
	overflow: auto;
	position: relative;
}
</style>