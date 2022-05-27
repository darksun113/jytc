<template>
	<PageTemp class="order-page">
		<view class="main">
			<OrderStatus></OrderStatus>
			<OrderInfo></OrderInfo>
			<PayType></PayType>
		</view>
		<PayButton></PayButton>
	</PageTemp>
</template>

<script>
	import OrderStatus from "./components/OrderStatus/index.vue"
	import OrderInfo from "./components/OrderInfo/index.vue"
	import PayType from "./components/PayType/index.vue"
	import PayButton from "./components/PayButton/index.vue"
	export default {
		components:{
			OrderStatus,
			OrderInfo,
			PayType,
			PayButton
		},
		data() {
			return {
				
			};
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
