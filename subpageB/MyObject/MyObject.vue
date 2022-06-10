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
	import {getFilesPath} from "@/utils/tools.js"
	export default {
		data() {
			return {
				hasData:true,
				isEnd:false,
				isCanReq:true,
				goodsList:[
					{
						name:"漫威英雄系列",
						image:require("@/static/images/demo2.png"),
						author:"深圳百纳维科技有限公司",
						authorIcon:require("@/static/images/demo1.png"),
						goodsId:"7a7e5413004940d8b6d3ca27398f0a0d",
						goodsType:1
					}
				]
			};
		},
		created() {
			this.init()
		},
		onHide() {
			this.goodsList=[]
		},
		methods:{
			updateList(){
				if(this.isCanReq)return;
				const startTime=this.goodsList[this.goodsList.length-1].startTime
				this.getGoodsList(startTime,(item=>{
					if(item==0){
						this.isCanReq=false
					}else{
						this.goodsList=this.goodsList.push(item).sort((a,b)=>a.startTime-b.startTime)
					}
				}))
			},
			init(){
				this.getGoodsList(parseInt(Date.now()/1000),(item)=>{
					if(item==0){
						this.hasData=false
					}else{
						this.goodsList=this.goodsList.push(item).sort((a,b)=>a.startTime-b.startTime)
					}
				})
			},
			async getGoodsList(startTime,callback){
				try{
					const viewBuyerId=uni.getStorageSync("userId")
					const res= await uni.$http("/goods/antiques",{
						viewBuyerId,
						size:10,
						startTime
					})
					if(res.code==0){
						if(res.data.list.length==0){
							callback(0)
						}else{
							res.data.list.forEach(async item=>{
								const temp={
									shopIcon:item.shopIcon,
									image:item.image
								}
								const obj = await getFilesPath(temp)
								Object.keys(obj).forEach(keys=>{
									item[keys]=obj[keys]
								})
								callback(item)
							})
						}
					}else{
						uni.$u.toast(res.errorMsg)
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
