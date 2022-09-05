<template>
	<PageTemp>
		<nav-bar @changeNav="changeNav"></nav-bar>
		<scroll-view v-if="hasData" class="my-object" scroll-y="true" @scrolltolower="updateList">
			<CardOfObject :item="item" v-for="(item,index) in goodsList" :key="index" :loadType="loadType" @toOpenBlindBox="toOpenBlindBox" />
			<IsEnd v-show="isEnd"></IsEnd>
		</scroll-view>
		<IsNoObject v-else>
			暂无藏品
		</IsNoObject>
	</PageTemp>
</template>

<script>
	import NavBar from "./components/NavBar.vue"
	import {
		getFilePath
	} from "@/utils/tools.js"
	export default {
		data() {
			return {
				hasData: true,
				isEnd: false,
				isCanReq: true,
				goodsList: [],
				loadType:0,//0 普通藏品  1 盲盒 2 日历模式
			};
		},
		components: {
			NavBar
		},
		onShow() {
			this.init(1)

		},
		onHide() {
			this.goodsList = []
		},
		methods: {
			toOpenBlindBox(id){
				
			},
			changeNav(idx) {
				this.isCanReq = true
				this.isEnd = false
				this.hasData = true
				this.loadType = idx
				this.init(++idx)
			},
			updateList() {
				if (!this.isCanReq) return;
				const startTime = this.goodsList[this.goodsList.length - 1].startTime
				const type = this.loadType == 0 ? 1 : 2
				this.getGoodsList(startTime, type, list => {
					if (item == 0) {
						this.isCanReq = false
						this.isEnd = true
					} else {
						this.goodsList = [...this.goodsList, ...list]
					}
				})
			},
			init(type) {
				this.goodsList=[]
				this.getGoodsList(parseInt(Date.now() / 1000), type, (list) => {
					if (list == 0) {
						this.hasData = false
					} else {
						this.goodsList = list
					}
				})
			},
			async getGoodsList(startTime, type, callback) {
				try {
					const viewBuyerId = uni.getStorageSync("viewBuyerId")
					const res = await uni.$http("/goods/antiques", {
						viewBuyerId,
						size: 10,
						startTime,
						type
					})
					if (res.code == 0) {
						if (res.data.list.length == 0) {
							callback(0)
						} else {
							res.data.list = await getFilePath(res.data.list, ["shopIcon", "image"])
							callback(res.data.list)
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

<style lang="scss">
	.my-object {
		box-sizing: border-box;
		height: calc(100% - 112rpx);
		padding: 40rpx;
		padding-top: 0;
		overflow: auto;
	}
</style>
