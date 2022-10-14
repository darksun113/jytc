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
				goodsData: {},
			};
		},
		onLoad(opt) {
			this.instanceId = opt.instanceId
			this.goodsId = opt.goodsId
			this.getGoodsInfo()
		},
		methods: {
			toDonation() {

			},
			getGoodsInfo() {
				// this.goodsData = this.$store.state.goodsData
				this.goodsData = {
					image:require("../static/images/noquan.png"),
					goodsName:"故宫里的中国节-中秋当名字过长时换行字过长时换行字过长时换行",
					goodsCode:56,
					totalNumber:1000,
					shopIcon:require("../static/images/noquan.png"),
					shopName:"阿里云新能源"
				}
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
