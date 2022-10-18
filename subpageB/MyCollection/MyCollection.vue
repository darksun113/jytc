<template>
	<PageTemp class="collection-page">
		<NavBar @changeNav="changeNav" />
		<scroll-view class="my-collection" scroll-y="true" @scrolltolower="updateList">
			<IsNoData v-if="!hasData">暂无数据</IsNoData>
			<view v-else>
				<ModelOfListFlow :renderList="renderList" v-show="showType==0" :loadType="0"></ModelOfListFlow>
				<ModelOfWaterFall :renderList="renderList" v-show="showType==1"></ModelOfWaterFall>
				<IsEnd v-if="isLastItem"></IsEnd>
			</view>
		</scroll-view>
	</PageTemp>
</template>

<script>
	import NavBar from "./components/NavBar.vue"
	export default {
		data() {
			return {
				hasData:false,
				showType:0,
				isLastItem:false,
				renderList:[]
			};
		},
		components:{
			NavBar
		},
		methods: {
			changeNav(nav) {
				
			},
			updateList(){
				
			},
			async getFavoriteSeriesList(){
				// const res = await uni.$http("")
			},
			async getFavoriteGoodsList(){
				// const res = await uni.$http("")
			}
		},
	}
</script>

<style lang="scss" scoped>
.collection-page{
	padding: 40rpx;
	.my-collection {
		box-sizing: border-box;
		height: calc(100% - 112rpx);
		// height: 100%;
		overflow: auto;
	}
}
</style>
