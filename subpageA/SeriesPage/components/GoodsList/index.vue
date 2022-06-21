<template>
	<view class="goods-list">
		<view class="list-title">
			该系列下有{{listTotal}}种藏品
		</view>
		<view class="list-contnet">
			<template v-for="(item,index) in goodsList">
				<GoodsCards :item="item" :key='index'></GoodsCards>
			</template>
			<IsEnd v-if="isLastItem"></IsEnd>
		</view>
	</view>
</template>

<script>
	import { getFilePath } from "@/utils/tools.js"
	export default {
		props:["seriesId"],
		data(){
			return {
				isLastItem:false,
				listTotal:0,
				updatePage:1,
				goodsList:[],
				shouldRequest:true
			}
		},
		mounted() {
			this.updatePage=1
			this.init()
		},
		methods:{
			// 翻页更新goodsList
			updateList(){
				if(this.shouldRequest){
					this.getSeriesGoodsList((list)=>{
						if(list==0){
							this.isLastItem=true
							this.shouldRequest=false
						}else{
							this.goodsList=[...this.goodsList,...list]
						}
					})
				}
				
			},
			init(){
				this.getSeriesGoodsList((list,total)=>{
					this.listTotal=total
					this.goodsList=list
				})
			},
			async getSeriesGoodsList(callback){
				try{
					const res=await uni.$http("/series/getSeriesGoodsList",{
						seriesId:this.seriesId,
						page:this.updatePage,
						size:10
					})
					if(res.code==0){
						if(res.data.list.length==0){
							callback(0)
						}else{
							res.data.list.forEach(async item=>{
								item.image = await getFilePath(item.image)
							})
							this.updatePage++
							callback(res.data.list,res.data.total)
						}
					}
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-list{
		margin-top: 40rpx;
		.list-title{
			height: 34rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999AFF;
			line-height: 34rpx;
		}
		.list-contnet{
			margin-top: 40rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}
	}
</style>