<template>
	<PageTemp style="padding: 0 40rpx;">
		<scroll-view class="home" scroll-y="true" @scrolltolower="updateList">
			<!-- <Search /> -->
			<Banner />
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
		<!-- <Notice :isShow="isNoticeShow" @close="isNoticeShow=false"></Notice> -->
	</PageTemp>
</template>

<script>
	import Banner from "./components/Banner/index.vue"
	import StickyNav from "./components/StickyNav/index.vue"
	import Search from "./components/Search"
	import { getFilePath } from "@/utils/tools.js"
	export default {
		components: {
			Banner,
			StickyNav,
			Search
		},
		data() {
			return {
				showType: 0,
				loadType: 0,
				hasData: true,
				isLastItem: false,
				updatePage: 1,
				seriesList: [],
				shouldRequest: true,
				isNoticeShow:true
			}
		},
		onShow() {
		},
		onLoad(opt) {
			//this.$checkAI(1,opt.code)
			this.init()
		},
		onHide() {},
		methods: {
			changeShowType(type) {
				this.showType = type
			},
			updateList() {
				if (this.shouldRequest) {
					this.getSeriesList(list => {
						if (list == 0) {
							this.isLastItem = true
							this.shouldRequest = false
						} else {
							this.seriesList = [...this.seriesList, ...list]
						}
					})
				}
			},
			init() {
				this.updatePage = 1
				this.shouldRequest = true
				this.isLastItem = false
				this.getSeriesList(list => {
					if (list == 0) {
						this.hasData = false
					} else {
						if(list.length<10)this.isLastItem = true;
						this.seriesList = list
					}
					uni.stopPullDownRefresh()
				})
			},
			async getSeriesList(callback) {
				try {
					const res = await uni.$http("/series/getSeriesList", {
						page: this.updatePage,
						size: 10
					})
					if (res.code == 0) {
						if (res.data.list == 0) {
							callback(0)
						} else {
							this.updatePage++
							const keysList = ["shopIcon", "seriesImg"]
							const list = await getFilePath(res.data.list, keysList)
							callback(list)
						}
					} else {
						this.$toast(res.errorMsg)
					}
				} catch (e) {
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		height: 100%;
		width: 100%;
		overflow: auto;
		color: #FFFFFF;
		.container{
			position: relative;
			height: calc(100% - 280rpx - 150rpx);
		}
	}
</style>
