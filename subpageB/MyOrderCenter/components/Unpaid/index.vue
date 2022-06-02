<template>
	<scroll-view class="list-box" scroll-y="true" @scrolltolower="updateList">
		<IsNoData v-if="isNoData">
			暂无订单
		</IsNoData>
		<view v-else>
			<OrderCard :item="item" v-for="(item,index) in orderList" :key="index" @cancelOrder="cancelOrder"></OrderCard>
			<IsEnd></IsEnd>
		</view>
		<CancelPop :isShow="isShow" :orderNo="cancelOrderNo" @close="isShow=false" @cancelSuccess="cancelSuccess"></CancelPop>
	</scroll-view>
</template>

<script>
	import CancelPop from "./components/CancelPop/index.vue"
	import OrderCard from "./components/OrderCard/index.vue"
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
				orderList:[
					{
						type:0
					},
					{
						type:1
					},
					{
						type:3
					}
				] 
			} 
		},
		methods:{
			cancelOrder(orderNo){
				this.cancelOrderNo=orderNo
				this.isShow=true
			},
			cancelSuccess(){
				this.isShow=false
				console.log("cancelSuccess")
			},
			updateList(){
				console.log('update')
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