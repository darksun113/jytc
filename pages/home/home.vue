<template>
	<PageTemp style="padding: 0 40rpx;">
		<scroll-view class="home" scroll-y="true" @scrolltolower="updateList">
			<!-- <Search /> -->
			<Banner />
			<StickyNav ref="nav" @changeShowType="changeShowType" @switchOverNav="switchOverNav" @resetPage="reset">
			</StickyNav>
			<view class="container">
				<template v-if="navType==0">
					<IsNoData v-if="!hasData">暂无数据</IsNoData>
					<view v-else>
						<ModelOfListFlow :renderList="renderList" v-if="showType==0" :loadType="0"></ModelOfListFlow>
						<ModelOfWaterFall :renderList="renderList" v-else></ModelOfWaterFall>
						<IsEnd v-if="isLastItem"></IsEnd>
					</view>
				</template>
				<template v-else-if="navType==1">
					<IsNoBlind v-if="!hasData">暂无盲盒，敬请期待！</IsNoBlind>
					<view v-else>
						<ModelOfListFlow :renderList="renderList" :loadType="2" :isBlind="true"></ModelOfListFlow>
						<IsEnd v-if="isLastItem"></IsEnd>
					</view>
				</template>
				<template v-else>
					<IsNoData v-if="!hasData">暂无数据</IsNoData>
					<view v-for="(item,index) in renderList" :key="index">
						<view class="sell-time">
							<!-- {{item.sellTime}} -->
							{{parseInt(Date.now()/1000) | format}}
						</view>
						<CardOfObject :item="item" :loadType="2"></CardOfObject>
					</view>
				</template>
			</view>
		</scroll-view>
		<!-- <Notice :isShow="isNoticeShow" @close="isNoticeShow=false"></Notice> -->
	</PageTemp>
</template>

<script>
	import Banner from "./components/Banner/index.vue"
	import StickyNav from "./components/StickyNav/index.vue"
	import Search from "./components/Search"
	import {
		getFilePath
	} from "@/utils/tools.js"
	import {
		formatMouthToMinutes
	} from "@/utils/formatDate.js"
	export default {
		components: {
			Banner,
			StickyNav,
			Search
		},
		data() {
			return {
				showType: 0,
				hasData: true,
				navType: 0,
				isLastItem: false,
				updatePage: 1,
				renderList: [],
				shouldRequest: true,
				isNoticeShow: true,
			}
		},
		onShow() {
			this.$nextTick(() => {
				this.$refs.nav.resetPage()
			})
		},
		filters: {
			format: formatMouthToMinutes
		},
		onLoad(opt) {
			if (opt.share) {
				window.localStorage.setItem('shareType', opt.share)
			}
			if (opt.userId) {
				window.localStorage.setItem('userId', opt.userId)
			}
			this.init()
		},
		onHide() {},
		methods: {
			changeShowType(type) {
				this.showType = type
			},
			// 切换nav
			switchOverNav(e) {
				this.renderList = []
				const { index } = e
				this.hasData = true
				this.isLastItem = false
				this.updatePage = 1
				this.navType = index
				switch (index) {
					case 0:
						this.init()
						break;
					case 1:
						this.getBlindBox()
						break;
					case 2:
						this.toSellCalendar()
						break
				}
			},
			// 盲盒
			getBlindBox() {
				this.getBlindList("", 0, null, list => {
					if (list == 0) {
						this.hasData = false
					} else {
						if (list.length < 10) this.isLastItem = true;
						this.renderList = list
					}
				})
			},
			// 发售日历
			toSellCalendar() {
				
			},
			reset() {
				this.init()
			},
			updateList() {
				if (this.shouldRequest) {
					switch (this.navType) {
						case 0:
							this.uodateSeriesList()
							break;
						case 1:
							this.updateBlindList()
							break;
						case 2:
							this.toSellCalendar()
							break
					}

				}
			},
			uodateSeriesList() {
				this.getSeriesList(list => {
					if (list == 0) {
						this.isLastItem = true
						this.shouldRequest = false
					} else {
						this.renderList = [...this.renderList, ...list]
					}
				})
			},
			updateBlindList() {
				const state = this.renderList[this.renderList.length - 1].remainingNumber == 0 ? 1 : 0
				const startTime = this.renderList[this.renderList.length - 1].startTime
				this.getBlindList("", state, startTime, list => {
					if (list == 0) {
						this.isLastItem = true
						this.shouldRequest = false
					} else {
						this.renderList = [...this.renderList, ...list]
					}
				})
			},
			init() {
				this.updatePage = 1
				this.shouldRequest = true
				this.isLastItem = false
				this.getSeriesList(list => {
					if (list == 0) {
						this.hasData = false
					} else {
						if (list.length < 10) this.isLastItem = true;
						this.renderList = list
					}
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
			},
			async getBlindList(keyWord, state, startTime, cb) {
				const res = await uni.$http("/blindbox/list", {
					keyWord,
					state,
					size: 10,
					startTime
				})
				if (res.code == 0) {
					res.data.list = await getFilePath(res.data.list, ["image", "shopIcon"])
					cb(res.data.list)
				}else{
					this.$toast(res.errorMsg)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		height: 100%;
		width: 100%;
		overflow: auto;
		color: #FFFFFF;

		.container {
			position: relative;
			min-height: calc(100% - 280rpx - 150rpx - 134rpx);

			.sell-time {
				padding: 40rpx 0;
				font-size: 32rpx;
				font-family: SourceHanSansCN-Medium, SourceHanSansCN;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
	}
</style>
