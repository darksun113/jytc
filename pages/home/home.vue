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
	</PageTemp>
</template>

<script>
	import Banner from "./components/Banner/index.vue"
	import StickyNav from "./components/StickyNav/index.vue"
	import Search from "./components/Search"
	import { getFilePath } from "@/utils/tools.js"
	import { checkAI } from "@/utils/tools.js"
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
				shouldRequest: true
			}
		},
		onShow() {
			this.init()
			this.getUrl()
		},
		onLoad() {
			checkAI(1)
		},
		onHide() {
			if (this.isLastItem) {
				this.seriesList = []
			}
		},
		methods: {
			getUrl() {
				var pages = getCurrentPages() //获取加载的页面
				var currentPage = pages[pages.length - 1] //获取当前页面的对象
				var url = currentPage.route //当前页面url
				var options = currentPage.options //如果要获取url中所带的参数可以查看options
				//参数多时通过&拼接url的参数
				var urlWithArgs = url + '?'
				for (var key in options) {
					var value = options[key]
					if(key=="code"&&value=="ai"){
						uni.setStorage({
						   key: 'isAI',
						   data: true
						})
					}
				}
			},
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
