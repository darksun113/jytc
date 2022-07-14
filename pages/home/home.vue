<template>
	<PageTempHasTabbar>
		<scroll-view class="home" scroll-y="true" @scrolltolower="updateList">
			<Banner></Banner>
			<StickyNav @changeShowType="changeShowType"></StickyNav>
			<view class="container">
				<IsNoData v-if="!hasData">暂无数据</IsNoData>
				<view v-else>
					<ModelOfListFlow :seriesList="seriesList" v-if="showType==0" :loadType="0"></ModelOfListFlow>
					<ModelOfWaterFall :seriesList="seriesList" v-else></ModelOfWaterFall>
					<IsEnd v-if="isLastItem"></IsEnd>
				</view>
			</view>
		</scroll-view>
	</PageTempHasTabbar>
</template>

<script>
	import Banner from "./components/Banner/index.vue"
	import StickyNav from "./components/StickyNav/index.vue"
	import {getFilePath} from "@/utils/tools.js"
	export default {
		components:{
			Banner,
			StickyNav
		},
		data(){
			return{
				showType:0,
				loadType:0,
				hasData:true,
				isLastItem:false,
				updatePage:1,
				seriesList:[],
				shouldRequest:true
			}
		},
		onShow() {
			this.updatePage=1
			this.init()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.updatePage=1
			this.init()
		},
		// 上拉加载
		onReachBottom() {
			console.log('上拉加载')
			setTimeout(() => {
				console.log('上拉加载停止')
				uni.stopPullDownRefresh()
			},1000)
		},
		methods:{
			changeShowType(type){
				this.showType=type
			},
			updateList() {
				if(this.shouldRequest){
					this.getSeriesList(list=>{
						if(list==0){
							this.isLastItem=true
							this.shouldRequest=false
						}else{
							this.seriesList=[...this.seriesList,...list]
						}
					})
				}
			},
			init(){
				this.getSeriesList(list=>{
					if(list==0){
						this.hasData=false
					}else{
						this.seriesList=list
					}
					uni.stopPullDownRefresh()
				})
			},
			async getSeriesList(callback){
				try{
					const res=await uni.$http("/series/getSeriesList",{page:this.updatePage,size:10})
					if(res.code==0){
						if(res.data.list==0){
							callback(0)
						}else{
							this.updatePage++
							const keysList=["shopIcon","seriesImg"]
							const list = await getFilePath(res.data.list,keysList)
							callback(list)
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

<style lang="scss" scoped>
	.home{
		height: 100%;
		overflow: auto;
		color: #FFFFFF;
	}
</style>
