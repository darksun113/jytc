<template>
	<PageTemp>
		<view class="share-page">
			<UserBox :prePurchaseInfo="prePurchaseInfo"></UserBox>
			<ActivityRulesBox :prePurchaseInfo="prePurchaseInfo"></ActivityRulesBox>
			<ActivityDetailBox :prePurchaseInfo="prePurchaseInfo"></ActivityDetailBox>
		</view>
	</PageTemp>
</template>

<script>
	import {getFilePath} from "@/utils/tools.js"
	import Fingerprint2 from "fingerprintjs2"
	import UserBox from "./components/UserBox/index.vue"
	import ActivityRulesBox from "./components/ActivityRulesBox/index.vue"
	import ActivityDetailBox from "./components/ActivityDetailBox/index.vue"
	export default {
		components:{
			UserBox,
			ActivityRulesBox,
			ActivityDetailBox
		},
		data() {
			return {
				prePurchaseId:"",
				userId:"",
				prePurchaseInfo:{}
			}
		},
		methods: {
			async getPrePurchase(){
				try{
					const res=await uni.$http("/series/prepurchase/detail",{
						prePurchaseId:this.prePurchaseId,
						buyerId:this.userId
					})
					if(res.code==0){
						const keysList=["avatar","shopIcon","seriesImg"]
						res.data=await getFilePath(res.data,keysList)
						this.prePurchaseInfo=res.data
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			// 获取浏览器唯一码
			getBrowserCode() {
				// #ifdef H5
				Fingerprint2.get((components) => {
					// 参数只有回调函数时，默认浏览器指纹依据所有配置信息进行生成
					const values = components.map((component) => component.value) // 配置的值的数组
					const browserCode = Fingerprint2.x64hash128(values.join(''), 31) // 生成浏览器指纹
					uni.setStorageSync("browserCode", browserCode)
				})
				// #endif
			},
		},
		onLoad(opt) {
			this.prePurchaseId=opt.prePurchaseId
			this.userId=opt.userId
			this.getBrowserCode()
		},
		onShow() {
			this.getPrePurchase()
			uni.setNavigationBarTitle({
				title:"金裕天成平台"
			})
		}
	}
</script>

<style lang="scss" scoped>
	.share-page{
		height: 100%;
		overflow: auto;
		padding: 0 40rpx;
	}
</style>
