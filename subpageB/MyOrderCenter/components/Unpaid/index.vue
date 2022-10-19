<template>
	<scroll-view class="list-box" scroll-y="true" @scrolltolower="updateList">
		<IsNoData v-if="isNoData">
			暂无订单
		</IsNoData>
		<view v-else>
			<OrderCard :item="item" :index_="index" v-for="(item,index) in orderList" :key="index" @cancelOrder="cancelOrder" @countEnd="countEnd"></OrderCard>
			<IsEnd v-if="isLastData"></IsEnd>
		</view>
		<CancelPop :isShow="isShow" :orderNo="cancelOrderNo" :orderStatus="orderStatus" @close="isShow=false" @cancelSuccess="cancelSuccess"></CancelPop>
	</scroll-view>
</template>

<script>
	import CancelPop from "./components/CancelPop/index.vue"
	import OrderCard from "./components/OrderCard/index.vue"
	import {getFilePath} from "@/utils/tools.js"
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
				orderList:[],
				orderStatus:0
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
							for (let i=0;i<res.data.orders.length;i++) {
								res.data.orders[i].goods=await getFilePath(res.data.orders[i].goods,["image","shopIcon"])
							}
							callback(res.data.orders)
						}
					}else{
						this.$toast(res.errorMsg)
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			cancelOrder(data){
				const {orderNo,index,orderStatus}=data
				this.cancelOrderNo=orderNo
				this.cancelIdx=index
				this.orderStatus = orderStatus
				this.isShow=true
			},
			cancelSuccess(){
				this.isShow=false
				this.orderStatus = 0
				this.$toast("取消成功")
				this.orderList.splice(this.cancelIdx,1)
				if(this.orderList.length==0){
					this.isNoData=true
				}
			},
			countEnd(cancelIdx){
				this.orderList.splice(cancelIdx,1)
				if(this.orderList.length==0){
					this.isNoData=true
				}
			},
			updateList(){
				const createTime=this.orderList[this.orderList.length-1].createTime
				this.getOrderList(createTime,list=>{
					if(list==0){
						this.isLastData=true
					}else{
						this.orderList=[...this.orderList,...list] 
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
		position: relative;
	}
</style>