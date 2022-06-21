<template>
	<PageTemp>
		<scroll-view class="series-page" scroll-y="true" @scrolltolower="updateList">
			<Banner :seriesInfo="seriesInfo"></Banner>
			<view class="container">
				<ActivityDesBox :seriesInfo="seriesInfo"></ActivityDesBox>
				<ActivityBox :seriesInfo="seriesInfo" v-if="seriesInfo.prePurchaseId"></ActivityBox>
				<GoodsList ref="GoodsList" :seriesId="seriesId"></GoodsList>
			</view>
		</scroll-view>
	</PageTemp>
</template>

<script>
	import Banner from "./components/Banner"
	import ActivityDesBox from "./components/ActivityDesBox"
	import ActivityBox from "./components/ActivityBox"
	import GoodsList from "./components/GoodsList"
	import { getFilesPath } from "@/utils/tools.js"
	export default {
		components:{
			Banner,
			GoodsList,
			ActivityDesBox,
			ActivityBox
		},
		data() {
			return {
				seriesId:"",
				seriesInfo:{}
			};
		},
		onLoad(opt) {
			this.seriesId=opt.seriesId
			this.getSeriesDetail()
		},
		methods:{
			async getSeriesDetail(){
				try{
					const res=await uni.$http("/series/getSeriesDetail",{
						seriesId:this.seriesId
					})
					if(res.code==0){
						uni.setNavigationBarTitle({
							title:res.data.seriesName
						})
						const temp={
							seriesImg:res.data.seriesImg,
							shopIcon:res.data.shopIcon,
						}
						const objData=await getFilesPath(temp)
						Object.keys(objData).forEach(key=>{
							res.data[key]=objData[key]
						})
						this.seriesInfo=res.data
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			updateList(){
				this.$refs.GoodsList.updateList()
			}
		}
	}
</script>

<style lang="scss" scoped>
.series-page{
	height: 100%;
	overflow: auto;
	.container{
		padding: 30rpx;
		margin-top: 44rpx;
		
	}
}
</style>
