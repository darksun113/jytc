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
		},
		onLoad(opt) {
			this.prePurchaseId=opt.prePurchaseId
			this.userId=opt.userId
			
		},
		mounted() {
			this.getPrePurchase()
		},
		onShow() {
			uni.setNavigationBarTitle({
				title:"XXX平台"
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
