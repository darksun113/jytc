<template>
	<PageTemp class="order-page">
		<view class="main">
			<OrderStatus :orderInfo="orderInfo"  v-if="orderInfo.goods"></OrderStatus>
			<OrderInfo :orderInfo="orderInfo" v-if="orderInfo.goods"></OrderInfo>
			<PayType v-if="orderInfo.status==0" @setPayType="setPayType"></PayType>
		</view>
		<PayButton v-if="orderInfo.status==0" :payType_="payType" :orderNo="orderNo" :price="orderInfo.goods.goodsPrice"></PayButton>
	</PageTemp>
</template>

<script>
	import OrderStatus from "./components/OrderStatus/index.vue"
	import OrderInfo from "./components/OrderInfo/index.vue"
	import PayType from "./components/PayType/index.vue"
	import PayButton from "./components/PayButton/index.vue"
	import {getFilePath} from "@/utils/tools.js"
	export default {
		components:{
			OrderStatus,
			OrderInfo,
			PayType,
			PayButton
		},
		onLoad(opt) {
			this.orderNo=opt.orderNo?opt.orderNo : uni.getStorageSync("orderNo")
			
		},
		onShow() {
			this.getOrderInfo()
		},
		data() {
			return {
				orderNo:"",
				payType:"aliPay",
				orderInfo:{}
			};
		},
		methods:{
			setPayType(type){
				this.payType=type
			},
			async getOrderInfo(){
				try{
					const res = await uni.$http("/order/detail",{
						orderNo:this.orderNo
					})
					if(res.code==0){
						res.data.order.goods=await getFilePath(res.data.order.goods,["image","shopIcon"])
						this.orderInfo=res.data.order
					}else{
						uni.showToast({
							title:res.errorMsg,
							icon:"error"
						})
						let timer=setTimeout(()=>{
							clearTimeout(timer)
							this.$routerTo(1,'back')
						},2000)
					}
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.order-page{
	background: #F3F3F3;
	.main{
		height: calc(100% - 188rpx);
		overflow: auto;
	}
}
</style>
