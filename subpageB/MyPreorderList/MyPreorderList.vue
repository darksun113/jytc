<template>
	<PageTemp>
		<scroll-view class="pre-order" scroll-y="true" @scrolltolower="updateList" v-if="hasData">
			<view class="container">
				<view class="title" v-if="seriesList.length>0">
					已获得以下系列的预购名额
				</view>
				<ModelOfListFlow :seriesList="seriesList" :loadType="1"></ModelOfListFlow>
				<IsEnd v-if="isLastItem"></IsEnd>
			</view>
		</scroll-view>
		<IsNoData v-else>
			暂无数据
		</IsNoData>
	</PageTemp>
</template>

<script>
	import {getFilePath} from "@/utils/tools.js"
	export default {
		data() {
			return {
				seriesList:[],
				isLastItem:false,
				hasData:true,
				updatePage:1
			};
		},
		onShow() {
			this.init()
		},
		methods:{
			updateList(){
				this.getWritelist(list=>{
					if(list==0){
						this.isLastItem=true
					}else{
						this.seriesList=[...this.seriesList,...list]
					}
				})
			},
			init(){
				this.updatePage=1
				this.getWritelist(list=>{
					if(list==0){
						this.hasData=false
					}else{
						this.seriesList=list
					}
				})
			},
			// 获取预购白名单
			async getWritelist(callback){
				try{
					const res = await uni.$http("/series/prepurchase/writelist",{
						page:this.updatePage,
						size:10
					})
					if(res.code==0){
						if(res.data.list.length==0){
							callback(0)
						}else{
							this.updatePage++
							res.data.list=await getFilePath(res.data.list,["seriesImg","shopIcon"])
							callback(res.data.list)
						}
					}else{
						this.$toast(res.errorMsg)
					}
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss">
.pre-order{
	height: 100%;
	box-sizing: border-box;
	overflow: auto;
	padding: 40rpx 30rpx;
	padding-top: 0;
	.container{
		.title{
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			color: #FFFFFF;
			line-height: 44rpx;
			text-align: center;
			margin: 40rpx 0;
		}
	}
}
</style>
