<template>
	<scroll-view class="list-box" scroll-y="true" @scrolltolower="updateList">
		<IsNoData v-if="isNoData">
			暂无订单
		</IsNoData>
		<view v-else>
			<OrderCard :item="item" :index="index" v-for="(item,index) in orderList" :key="index" @cancelOrder="cancelOrder" @spliceOrder="spliceOrder"></OrderCard>
			<IsEnd v-if="isLastData"></IsEnd>
		</view>
		<CancelPop :isShow="isShow" :orderNo="cancelOrderNo" @close="isShow=false" @cancelSuccess="cancelSuccess"></CancelPop>
	</scroll-view>
</template>

<script>
	import CancelPop from "./components/CancelPop/index.vue"
	import OrderCard from "./components/OrderCard/index.vue"
	import {getFilesPath} from "@/utils/tools.js"
	export default{
		components:{
			OrderCard,
			CancelPop
		},
		data(){
			return {
				isNoData:false,
				isShow:false,
				// 要取消的订单号
				cancelOrderNo:null,
				cancelIdx:null,
				isLastData:false,
				updatePage:1,
				orderList:[] 
			} 
		},
		mounted() {
			this.init()
		},
		methods:{
			init(){
				this.updatePage=1
				this.orderList=[]
				this.getOrderList(parseInt(Date.now()/1000),item=>{
					if(item==0){
						this.isNoData=true
					}else{
						this.orderList=this.orderList.push(item).sort((a,b)=>a.createTime-b.createTime)
					}
				})
			},
			async getOrderList(createTime,callback){
				try{
					const res= await uni.$http("/order/list",{
						status:0,
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
							res.data.orders.forEach(async item=>{
								const temp={
									// image:item.goods.image,
									shopIcon:item.goods.shopIcon
								}
								const objData = await getFilesPath(temp)
								Object.keys(objData).forEach(key=>{
									item.goods[key]=objData[key]
								})
								callback(item)
							})
						}
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			cancelOrder(orderNo,index){
				this.cancelOrderNo=orderNo
				this.cancelIdx=index
				this.isShow=true
			},
			cancelSuccess(){
				this.isShow=false
				this.$toast("取消成功")
				this.orderList.splice(this.cancelIdx,1)
			},
			spliceOrder(cancelIdx){
				this.orderList.splice(cancelIdx,1)
			},
			updateList(){
				const createTime=this.orderList[this.orderList.length-1].createTime
				this.getOrderList(createTime,item=>{
					if(item==0){
						this.isLastData=true
					}else{
						this.orderList=this.orderList.push(item).sort((a,b)=>a.createTime-b.createTime)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-box{
		box-sizing: border-box;
		height: 100%;
		overflow: auto;
	}
</style>