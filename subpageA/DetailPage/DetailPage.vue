<template>
	<PageTemp>
		<view class="detail-page" :style="{paddingBottom:(loadType==0 || loadType==2)?'156rpx':'0'}">
			<LoadGoods v-if="JSON.stringify(goodsData)!=='{}'" :goodsData="goodsData"></LoadGoods>
			<GoodsInfo v-if="JSON.stringify(goodsData)!=='{}'" :goodsData="goodsData" :buyerList="buyerList">
			</GoodsInfo>
			<ButtonBox v-if="JSON.stringify(goodsData)!=='{}' && (loadType==0 || loadType==2)" :goodsData="goodsData">
			</ButtonBox>
		</view>
	</PageTemp>
</template>

<script>
	import LoadGoods from "./components/LoadGoods/index.vue"
	import GoodsInfo from "./components/GoodsInfo/index.vue"
	import ButtonBox from "./components/ButtonBox/index.vue"
	import {
		getFilePath
	} from "@/utils/tools.js"
	export default {
		components: {
			LoadGoods,
			GoodsInfo,
			ButtonBox
		},
		data() {
			return {
				// 加载方式 0 未购买  1 已购买 2 盲盒
				loadType: 0,
				goodsId: "",
				goodsData: {},
				buyerList: [],
				instanceId: "",
				blindboxId: "",
				timer:null,
			}
		},
		destroyed(){
			clearTimeout(this.timer)
		},
		onShow() {
			this.init()
		},
		onHide() {
			uni.$emit("destroyAudio")
			uni.$off("destroyAudio")
		},
		onUnload() {
			uni.$off("toOpenSharePoster")
			uni.$off("reLoadPage")
			uni.$off("getSuccess")
		},
		mounted(){
			uni.$on("getSuccess",()=>{
				this.$toast("领取成功","success");
				const time = setTimeout(()=>{
					clearTimeout(time);
					this.init();
				},1500)
			})
			this.timer = setTimeout(()=> {
				clearTimeout(this.timer)
				this.count();
			}, 3000);
		},
		methods: {
			async getGoodsDetail() {
				try {
					const res = await uni.$http("/goods/getGoodsDetail", {
						goodsId: this.goodsId
					})
					if (res.code == 0) {
						const resData = res.data.goods
						const keysList = ["image", "shopIcon", "description"]
						resData.url ? keysList.push("url") : ''
						resData.mapping ? keysList.push("mapping") : ''
						resData.threeD ? keysList.push("threeD") : ''
						resData.mtl ? keysList.push("mtl") : ''
						const objData = await getFilePath(resData, keysList)
						this.goodsData = objData
						this.goodsData.loadType = this.loadType
						this.goodsData.modelType = 4
						if(true){
							uni.setNavigationBarTitle({
								title:this.goodsData.goodsName
							})
						}
					} else {
						uni.showToast({
							title: res.errorMsg,
							icon: "error"
						})
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			async getGoodsInstanceDetail() {
				try {
					const res = await uni.$http("/goods/getGoodsInstanceDetail", {
						instanceId: this.instanceId
					})
					if (res.code == 0) {
						const keysList = ["image", "shopIcon", "description"]
						res.data.url ? keysList.push("url") : ''
						res.data.mapping ? keysList.push("mapping") : ''
						res.data.threeD ? keysList.push("threeD") : ''
						res.data.mtl ? keysList.push("mtl") : ''
						const objData = await getFilePath(res.data, keysList)
						this.goodsData = objData
						this.goodsData.loadType = this.loadType
						this.goodsData.modelType = 4
						if(true){
							uni.setNavigationBarTitle({
								title:this.goodsData.goodsName
							})
						}
					} else if (res.code == 1000) {
						this.toLogin()
					} else {
						this.$toast(res.errorMsg)
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			async getBuyers(callback) {
				try {
					const reqData = {}
					if (this.loadType == 2) {
						reqData.blindboxId = this.blindboxId
					} else {
						reqData.goodsId = this.goodsId
					}
					const res = await uni.$http("/goods/getBuyers", {
						...reqData,
						size: 3
					})
					if (res.code == 0) {
						res.data.list = await getFilePath(res.data.list, ["recipientIcon"])
						callback(res.data.list)
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			async getBlindBoxDetail() {
				const res = await uni.$http("/blindbox/detail", {
					blindboxId: this.blindboxId
				})
				if (res.code == 0) {
					const keyList = ["image", "description", "shopIcon"]
					this.goodsData = await getFilePath(res.data.goods, keyList)
					this.goodsData.loadType = this.loadType	
				} else {
					this.$toast(res.errorMsg)
				}
			},
			init() {
				if (!!this.blindboxId && this.loadType == 2) {
					this.getBlindBoxDetail()
					this.getBuyers(list => {
						this.buyerList = list
					})
				} else {
					if ([0,3].includes(Number(this.loadType))) {
						this.getGoodsDetail()
						this.getBuyers(list => {
							this.buyerList = list
						})
					} else {
						if (this.$checkLogin()) {
							this.getGoodsInstanceDetail()
						} else {
							this.toLogin()
						}
					}
				}
			},
			toLogin() {
				const instanceId = this.instanceId || ""
				const url = `/pages/login/LoginByMobile/GetVerifyCode/GetVerifyCode?instanceId=${instanceId}`
				this.$routerTo(url, 'redirect')
			},
			async count(){
				const time = Date.now()
				const res = await uni.$http("/tracking/report",{
					eventCode: 'view_gooods',
					eventTimestamp: parseInt(time/1000),
					data: `{"goodsId":"${this.goodsId}"}`,
				},false)
			}
		},
		onLoad(opt) {
			// loadType: 0 未购买  1 已购买  2 盲盒   3 后台预览
			this.loadType = opt.loadType;
			this.goodsId = opt.goodsId ? opt.goodsId : "";
			this.instanceId = opt.instanceId ? opt.instanceId : "";
			this.blindboxId = opt.blindboxId ? opt.blindboxId : "";
			uni.$on("reLoadPage",()=>{
				this.init()
			})
		}
	}
</script>

<style lang="scss" scoped>
	.detail-page {
		height: 100%;
		overflow: auto;
		overflow-x: hidden;
		position: relative;
		background: #04030A;
	}
</style>
