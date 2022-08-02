<template>
	<PageTemp>
		<scroll-view v-if="hasData" class="my-object" scroll-y="true" @scrolltolower="updateList">
			<CardOfObject :item="item" v-for="(item,index) in goodsList" :key="index"></CardOfObject>
			<IsEnd v-show="isEnd"></IsEnd>
		</scroll-view>
		<IsNoObject v-else>
			暂无藏品
		</IsNoObject>
	</PageTemp>
</template>

<script>
	import {getFilePath} from "@/utils/tools.js"
	export default {
		data() {
			return {
				hasData:true,
				isEnd:false,
				isCanReq:true,
				goodsList:[]
			};
		},
		onShow() {
			this.init()
			
		},
		onLoad() {
			
		},
		onHide() {
			this.goodsList=[]
		},
		methods:{
			updateList(){
				if(this.isCanReq)return;
				const startTime=this.goodsList[this.goodsList.length-1].startTime
				this.getGoodsList(startTime,list=>{
					if(item==0){
						this.isCanReq=false
						this.isEnd=true
					}else{
						this.goodsList=[...this.goodsList,...list]
					}
				})
			},
			init(){
				this.getGoodsList(parseInt(Date.now()/1000),(list)=>{
					if(list==0){
						this.hasData=false
					}else{
						this.goodsList=list
					}
				})
			},
			async getGoodsList(startTime,callback){
				try{
					const viewBuyerId=uni.getStorageSync("viewBuyerId")
					const res= await uni.$http("/goods/antiques",{
						viewBuyerId,
						size:10,
						startTime
					})
					if(res.code==0){
						if(res.data.list.length==0){
							callback(0)
						}else{
							res.data.list=await getFilePath(res.data.list,["shopIcon","image"])
							callback(res.data.list)
						}
					}else{
						this.$toast(res.errorMsg)
					}
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss">
.my-object{
	box-sizing: border-box;
	padding: 40rpx;
	height: 100%;
	overflow: auto;
}
</style>
