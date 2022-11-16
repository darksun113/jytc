<template>
	<PageTemp style="padding: 0 40rpx;">
		<scroll-view class="home" scroll-y="true" @scrolltolower="updateList">
			<Search v-if="$checkLogin()" />
			<Banner />
			<view class="container">
				<StickyNav ref="nav" @changeShowType="changeShowType" @switchOverNav="switchOverNav" @resetPage="reset" />
				<!-- 数字藏品 -->
				<DigitalCollection v-show="navType==0" :renderList="renderList" :hasData="hasData" :isLastItem="isLastItem" :showType="showType"/>
				<!-- 盲盒 -->
				<BlindBoxModule v-show="navType==1" :renderList="renderList" :hasData="hasData" :isLastItem="isLastItem" />
				<!-- 发售日历 -->
				<CalendarModule v-show="navType==2" :renderList="renderList" :hasData="hasData" :isLastItem="isLastItem" />
			</view>
		</scroll-view>
		<Notice :isShow="isNoticeShow" :noticeList="noticeList" @close="closeNotice"></Notice>
	</PageTemp>
</template>

<script>
	import Banner from "./components/Banner/index.vue"
	import StickyNav from "./components/StickyNav/index.vue"
	import Search from "./components/Search"
	import DigitalCollection from "./components/DigitalCollection"
	import BlindBoxModule from "./components/BlindBoxModule"
	import CalendarModule from "./components/CalendarModule"
	import { getFilePath } from "@/utils/tools.js"

	export default {
		components: {
			Banner,
			StickyNav,
			Search,
			DigitalCollection,
			BlindBoxModule,
			CalendarModule,
		},
		data() {
			return {
				isNoticeShow:false,
				showType: 0,
				hasData: true,
				navType: 0,
				isLastItem: false,
				updatePage: 1,
				renderList: [],
				shouldRequest: true,
				showAnnoun: false,
				noticeList:[],
			}
		},
		onShow() {
			if(this.$checkLogin()&&uni.getStorageSync("announceIsShow")!=true){
				//已登录，且没有展示过公告
				this.getNoticeList()
			}
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
		methods: {
			changeShowType(type) {
				this.showType = type
			},
			// 切换nav
			switchOverNav(e) {
				this.renderList = []
				this.shouldRequest = true
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
						this.getCalendarBox()
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
			getCalendarBox() {
				this.getCalendarList(list => {
					if (list.length == 0) {
						this.hasData = false
					} else {
						if (list.length < 10) this.isLastItem = true;
						this.renderList = this.changeList(list)
					}
				})
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
							this.updateCalendar()
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
			// 下拉触底获取更多日历列表
			updateCalendar() {
				this.getCalendarList(list => {
					if (list.length == 0) {
						this.isLastItem = true
						this.shouldRequest = false
					} else {
						this.renderList = [...this.renderList, ...this.changeList(list)]
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
				} else {
					this.$toast(res.errorMsg)
				}
			},
			// 获取发售日历列表
			async getCalendarList(cb) {
				const res = await uni.$http("/launchCalendar/getPrepaidGoodsList", {
					page: this.updatePage,
					size: 10
				})
				if (res.code == 0) {
					res.data.list = await getFilePath(res.data.list, ["image"])
					this.updatePage++
					cb(res.data.list)
				} else {
					this.$toast(res.errorMsg)
				}
			},
			// 转换发售日历列表
			changeList(arr) {
				let newArr = []
				arr.forEach((item, i) => {
					let index = 1
					let isExist = newArr.some((it, j) => {
						// 时间相同时，即已存在
						if (item.startTime == it.startTime) {
							index = j
							return true
						}
					})
					if (!isExist) {
						// 不存在
						newArr.push({
							startTime: item.startTime,
							doneList: [item]
						})
					} else {
						// 存在
						newArr[index].doneList.push(item)
					}
				})
				newArr.sort(function(a, b) {
					return a.startTime - b.startTime
				})
				return newArr
			},
			async getNoticeList(){
				try{
					const res = await uni.$http("/homepage/getNoticeList", {
					})
					if (res.code == 0) {
						this.noticeList = res.data.list
						//公告数量不等于0时，展示公告
						if(this.noticeList.length!=0){
							this.isNoticeShow=true
						}
					}else{
						this.$toast(res.errorMsg)
					}
					
				}catch(e){
					//TODO handle the exception
				}
			},
			closeNotice(){
				this.isNoticeShow=false
				uni.setStorageSync("announceIsShow",true)
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
		position: relative;
		.container {
			position: relative;
			min-height: calc(100% - 150rpx - 134rpx);
		}
	}
</style>
