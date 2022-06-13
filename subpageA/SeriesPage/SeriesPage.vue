<template>
	<PageTemp>
		<scroll-view class="series-page" scroll-y="true" @scrolltolower="updateList">
			<Banner :seriesInfo="seriesInfo"></Banner>
			<view class="container">
				<ActivityDesBox :seriesInfo="seriesInfo"></ActivityDesBox>
				<ActivityBox :seriesInfo="seriesInfo" v-if="seriesInfo.prePurchaseId"></ActivityBox>
				<GoodsList ref="GoodsList" :seriesId="seriesId"></GoodsList>
				<IsEnd></IsEnd>
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
				seriesInfo:{
					"seriesId": "qwe",// 系列ID
					"seriesName":"元宇宙国风潮玩时代", // 系列名称
					"seriesImg":require("@/static/images/demo1.png"),
					"description":"星堡的长者们看到琳琅满目的汉服和饰品跃跃欲试，也想穿着汉服游豫园，在充满幻想的国风主题街区中玩“穿越”，做不一样的时髦达人！",// 系列描述
					"shopId":"", // 发行方ID
					"shopName":"深圳九州龙文化传播有限公司", // 发行方名称
					"shopIcon":require("@/static/images/demo1.png"),
					"sellTime": parseInt(Date.now()/1000) + 3600*48,   // 售卖开始时间
					"prePurchaseId":"15985" ,// 活动ID
					"prePurchaseOpenTime":parseInt(Date.now()/1000) ,
					"prePurchaseFinishTime":parseInt(Date.now()/1000) + 3600*72,
					"joinNumber": 12358 ,// 参与总数
					"join": 1 ,// 本人是否参与 0 未参与 1参与
					"begin": 1 ,// 活动是否开始 0 未开始 1开始
					"end":0
				}
			};
		},
		onLoad(opt) {
			this.seriesId=opt.seriesId
			this.getSeriesDetail()
		},
		mounted() {
			uni.setNavigationBarTitle({
				title:"中国节系列-中秋"
			})
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
