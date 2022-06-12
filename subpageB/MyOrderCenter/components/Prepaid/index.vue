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
	export default{
		components:{
			OrderCard
		},
		data(){
			return {
				isNoData:false,
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
				this.orderList=[]
				this.getOrderList(parseInt(Date.now()/1000),item=>{
					if(item==0){
						this.isNoData=true
					}else{
						this.orderList.push(item)
						this.orderList=this.orderList.sort((a,b)=>a.createTime-b.createTime)
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
						if(res.data.list.length==0){
							callback(0)
						}else{
							res.data.list.forEach(async item=>{
								const temp={
									image:item.goods.image,
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
			updateList(){
				const createTime=this.orderList[this.orderList.length-1].createTime
				this.getOrderList(createTime,item=>{
					if(item==0){
						this.isLastData=true
					}else{
						this.orderList.push(item)
						this.orderList=this.orderList.sort((a,b)=>a.createTime-b.createTime)
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