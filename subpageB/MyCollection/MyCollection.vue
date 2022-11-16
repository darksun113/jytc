<template>
	<PageTemp class="collection-page">
		<NavBar @changeNav="changeNav" />
		<scroll-view class="my-collection" scroll-y="true" @scrolltolower="updateList">
			<view v-if="hasData">
				<ModelOfListFlow :renderList="renderList" v-show="showType==0" :loadType="0"></ModelOfListFlow>
				<collectionGoods @resetGoodsList="resetGoodsList" :renderList="renderList" v-show="showType==1" ></collectionGoods>
				<IsEnd v-if="isLastItem"></IsEnd>
			</view>
			<IsNoData v-else>暂无数据</IsNoData>
		</scroll-view>
	</PageTemp>
</template>

<script>
	import NavBar from "./components/NavBar.vue"
	import collectionGoods from "./components/collectionGoods.vue"
	import {getFilePath} from "../../utils/tools.js"
	export default {
		data() {
			return {
				hasData:true,
				showType:0,
				isLastItem:false,
				renderList:[],
				updatePage:1
			};
		},
		onLoad() {
			this.changeNav(0)
		},
		components:{
			NavBar,
			collectionGoods
		},
		methods: {
			changeNav(nav) {
				this.renderList = [];
				this.showType = nav;
				this.updatePage = 1;
				this.isLastItem = false;
				this.hasData = true;
				if(nav == 0){
					this.getFavoriteSeriesList((list)=>{
						if(list.length == 0){
							this.hasData = false;
						}
						this.renderList = list;
					})
				}else{
					this.getFavoriteGoodsList(list=>{
						if(list.length == 0){
							this.hasData = false;
						}
						this.renderList = list;
					})
				}
			},
			updateList(){
				if(this.showType == 0){
					this.getFavoriteSeriesList((list)=>{
						this.renderList = [...this.renderList,...list];
						if(list.length < 5){
							this.isLastItem = true;
						}
					})
				}else{
					this.getFavoriteGoodsList(list=>{
						this.renderList = [...this.renderList,...list];
						if(list.length < 5){
							this.isLastItem = true;
						}
					})
				}
			},
			resetGoodsList(){
				this.updatePage = 1;
				this.isLastItem = false;
				this.hasData = true;
				this.getFavoriteGoodsList(list=>{
					if(list.length == 0){
						this.hasData = false;
					}
					this.renderList = list;
				})
			},
			async getFavoriteSeriesList(cb){
				const res = await uni.$http("/series/favoritesList",{
					size:5,
					page:this.updatePage
				})
				if(res.code == 0){
					this.updatePage++;
					res.data.list = await getFilePath(res.data.list,["seriesImg","shopIcon"]);
					cb(res.data.list)
				}else{
					this.$toast(res.errorMsg)
				}
			},
			async getFavoriteGoodsList(cb){
				const res = await uni.$http("/goods/getFavoritesByUserId",{
					size:10,
					page:this.updatePage
				})
				if(res.code == 0){
					this.updatePage++;
					res.data.list = await getFilePath(res.data.list,["image"])
					cb(res.data.list)
				}else{
					this.$toast(res.errorMsg)
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
.collection-page{
	padding: 0 40rpx;
	.my-collection {
		box-sizing: border-box;
		height: calc(100% - 152rpx);
		overflow: auto;
	}
}
</style>
