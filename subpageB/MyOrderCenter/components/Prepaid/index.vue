<template>
	<scroll-view class="list-box" scroll-y="true" @scrolltolower="updateList">
		<IsNoData v-if="isNoData">
			暂无订单
		</IsNoData>
		<view v-else>
			<OrderCard :item="item" v-for="(item,index) in orderList" :key="index"></OrderCard>
			<IsEnd v-if="isLastData"></IsEnd>
		</view>
	</scroll-view>
</template>

<script>
	import OrderCard from "./components/OrderCard/index.vue"
	import {getFilePath} from "@/utils/tools.js"
	export default{
		components:{
			OrderCard
		},
		data(){
			return {
				isNoData:false,
				isLastData:false,
				updatePage:1,
				orderList:[],
				shouldRequest:true
			}
		},
		mounted() {
			this.init()
		},
		methods:{
			init(){
				this.updatePage=1
				this.orderList=[]
				this.getOrderList(parseInt(Date.now()/1000),list=>{
					if(list==0){
						this.isNoData=true
					}else{
						this.orderList=list
						console.log(this.orderList,list)
					}
				})
			},
			async getOrderList(createTime,callback){
				try{
					const res= await uni.$http("/order/list",{
						status:3,
						size:10,
						createTime,
						optType:0,
						page:this.updatePage
					})
					if(res.code==0){
						if(res.data.orders.length==0){
							callback(0)
						}else{
							this.updatePage++
							for (let i=0;i<res.data.orders.length;i++) {
								res.data.orders[i].goods=await getFilePath(res.data.orders[i].goods,["image","shopIcon"])
							}
							callback(res.data.orders)
						}
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			updateList(){
				if(this.shouldRequest){
					const createTime=this.orderList[this.orderList.length-1].createTime
					this.getOrderList(createTime,list=>{
						if(list==0){
							this.isLastData=true
							this.shouldRequest=false
						}else{
							this.orderList=[...this.orderList,...list]
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-box{
		box-sizing: border-box;
		height: 100%;
		overflow: auto;
		position: relative;
	}
</style>