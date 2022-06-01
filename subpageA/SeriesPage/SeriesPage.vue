<template>
	<PageTemp>
		<scroll-view class="series-page" scroll-y="true" @scrolltolower="updateList">
			<Banner></Banner>
			<view class="container">
				<ActivityDesBox></ActivityDesBox>
				<ActivityBox></ActivityBox>
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
	export default {
		components:{
			Banner,
			GoodsList,
			ActivityDesBox,
			ActivityBox
		},
		data() {
			return {
				seriesId:""
			};
		},
		onLoad(opt) {
			this.seriesId=opt.seriesId
		},
		mounted() {
			uni.setNavigationBarTitle({
				title:"中国节系列-中秋"
			})
		},
		methods:{
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
