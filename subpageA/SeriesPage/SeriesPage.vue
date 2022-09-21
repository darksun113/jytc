<template>
	<PageTemp>
		<scroll-view class="series-page" scroll-y="true" @scrolltolower="updateList">
			<Banner :seriesInfo="seriesInfo"></Banner>
			<view class="container">
				<ActivityDesBox :seriesInfo="seriesInfo"></ActivityDesBox>
				<ActivityBox :seriesInfo="seriesInfo" v-if="seriesInfo.prePurchaseId" @loginSuccess="loginSuccess"></ActivityBox>
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
	import { getFilePath } from "@/utils/tools.js"
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
			
		},
		onShow() {
			this.getSeriesDetail()
		},
		methods:{
			loginSuccess(){
				this.getSeriesDetail()
				uni.showToast({
					title:"登录成功",
					icon:"success",
					duration:2000
				})
			},
			async getSeriesDetail(){
				try{
					const res=await uni.$http("/series/getSeriesDetail",{
						seriesId:this.seriesId
					})
					if(res.code==0){
						uni.setNavigationBarTitle({
							title:res.data.seriesName
						})
						const keysList=["seriesImg","shopIcon"]
						const reqData=await getFilePath(res.data,keysList)
						this.seriesInfo=reqData
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			updateList(){}
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
