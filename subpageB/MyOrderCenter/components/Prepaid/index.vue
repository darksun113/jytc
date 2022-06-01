<template>
	<scroll-view class="list-box" scroll-y="true" @scrolltolower="updateList">
		<IsNoData v-if="isNoData">
			暂无订单
		</IsNoData>
		<view v-else>
			<OrderCard :item="item" v-for="(item,index) in orderList" :key="index"></OrderCard>
			<IsEnd></IsEnd>
		</view>
	</scroll-view>
</template>

<script>
	import OrderCard from "./components/OrderCard/index.vue"
	export default{
		components:{
			OrderCard
		},
		data(){
			return {
				isNoData:false,
				orderList:[
					{
						type:0
					},
					{
						type:1
					},
					{
						type:3
					},{
						type:4
					}
				]
			}
		},
		methods:{
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