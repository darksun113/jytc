<template>
	<PageTempHasTabbar>
		<scroll-view class="home" scroll-y="true" @scrolltolower="updateList">
			<view>
				<Banner></Banner>
				<StickyNav @changeShowType="changeShowType"></StickyNav>
				<view class="container">
					<IsNoData v-if="!hasData">暂无数据</IsNoData>
					<view v-else>
						<ModelOfListFlow :seriesList="seriesList" v-if="showType==0"></ModelOfListFlow>
						<ModelOfWaterFall :seriesList="seriesList" v-else></ModelOfWaterFall>
						<IsEnd v-if="isLastItem"></IsEnd>
					</view>
				</view>
			</view>
		</scroll-view>
	</PageTempHasTabbar>
</template>

<script>
	import Banner from "./components/Banner/index.vue"
	import StickyNav from "./components/StickyNav/index.vue"
	import {getFilesPath} from "@/utils/tools.js"
	export default {
		components:{
			Banner,
			StickyNav
		},
		data(){
			return{
				showType:0,
				hasData:true,
				isLastItem:false,
				updatePage:1,
				seriesList:[
					{
						seriesName:"漫威英雄系列",
						seriesImg:require("@/static/images/demo1.png"),
						shopName:"深圳百纳维科技有限公司",
						shopIcon:require("@/static/images/demo1.png"),
						seriesId:"15444",
						goodsType:1
					},
					{
						seriesName:"超人系列",
						seriesImg:require("@/static/images/demo4.png"),
						shopName:"深圳百纳维科技有限公司",
						shopIcon:require("@/static/images/demo1.png"),
						seriesId:"15444",
						goodsType:2
					},{
						seriesName:"漫威英雄系列",
						seriesImg:require("@/static/images/demo5.png"),
						shopName:"深圳百纳维科技有限公司",
						shopIcon:require("@/static/images/demo1.png"),
						seriesId:"15444",
						goodsType:3
					},
					{
						seriesName:"超人系列",
						seriesImg:require("@/static/images/demo3.png"),
						shopName:"深圳百纳维科技有限公司",
						shopIcon:require("@/static/images/demo1.png"),
						seriesId:"15444",
						goodsType:4
					},{
						seriesName:"漫威英雄系列",
						seriesImg:require("@/static/images/demo2.png"),
						shopName:"深圳百纳维科技有限公司",
						shopIcon:require("@/static/images/demo1.png"),
						seriesId:"15444",
						goodsType:3
					},
					{
						seriesName:"超人系列",
						seriesImg:require("@/static/images/demo6.png"),
						shopName:"深圳百纳维科技有限公司",
						shopIcon:require("@/static/images/demo1.png"),
						seriesId:"15444",
						goodsType:1
					},
				]
			}
		},
		onShow() {
			// this.init()
		},
		methods:{
			changeShowType(type){
				this.showType=type
			},
			updateList() {
				this.getSeriesList(list=>{
					if(list==0){
						this.isLastItem=true
					}else{
						this.updatePage++
						this.seriesList=[...this.seriesList,...list]
					}
				})
			},
			init(){
				this.getSeriesList(list=>{
					if(list==0){
						this.hasData=false
					}else{
						this.seriesList=list
					}
				})
			},
			async getSeriesList(callback){
				try{
					const res=await uni.$http("/series/getSeriesList",{page:this.updatePage,size:10})
					if(res.code==0){
						if(res.data.list==0){
							callback(0)
						}else{
							res.data.list.forEach(async item=>{
								const temp={
									shopIcon:item.shopIcon,
									seriesImg:item.seriesImg
								}
								const objData=await getFilesPath(temp)
								Object.keys(objData).forEach(key=>{
									item[key]=objData[key]
								})
							})
							callback(res.data.list)
						}
					}else{
						uni.$u.toast(res.errorMsg)
					}
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home{
		height: 100%;
		overflow: auto;
		color: #FFFFFF;
	}
</style>
