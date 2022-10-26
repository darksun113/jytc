<template>
	<PageTemp class="Donation-page">
		<DonationCard :goodsData="goodsData"></DonationCard>
		<Search :instanceId="instanceId" :goodsId="goodsId"></Search>
		<TextTip></TextTip>
		<DonationCheckModal></DonationCheckModal>
	</PageTemp>
</template>

<script>
	import DonationCard from "./components/DonationCard.vue"
	import Search from "./components/Search"
	import TextTip from "./components/TextTip"
	import DonationCheckModal from "./components/DonationCheckModal"
	export default {
		components: {
			DonationCard,
			Search,
			TextTip,
			DonationCheckModal
		},
		data() {
			return {
				instanceId: "",
				goodsId:"",
				goodsData:{},
			};
		},
		onLoad(opt) {
			this.instanceId = opt.instanceId
			this.goodsId = opt.goodsId
			this.getGoodsInfo()
		},
		methods: {
			getGoodsInfo() {
				this.goodsData = uni.getStorageSync("donationGoods")
				if(JSON.stringify(this.goodsData)=="{}"){
					uni.reLaunch({
						url:"/pages/MyObject/MyObject"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.Donation-page {
		padding: 40rpx;
	}
</style>
