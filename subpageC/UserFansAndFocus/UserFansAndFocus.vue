<template>
	<view class="fans-focus">
		<NavBar :current="curTab" @changeTab="changeTab"></NavBar>
		<view class="main">
			<Fans @toOtherPage="toOtherPage" v-if="curTab==0" :userId="userId" :viewBuyerId="viewBuyerId"></Fans>
			<Focus @toOtherPage="toOtherPage" :userId="userId" :viewBuyerId="viewBuyerId" v-else></Focus>
		</view>
	</view>
</template>

<script>
	import NavBar from "./components/NavBar/index.vue"
	import Fans from "./components/Fans/index.vue"
	import Focus from "./components/Focus/index.vue"
	export default {
		components:{
			NavBar,
			Focus,
			Fans
		},
		data() {
			return {
				curTab:0,
				viewBuyerId:"",
				userId:uni.getStorageSync("userInfo").buyerId
			}
		},
		onShow() {
			
		},
		onLoad(opt) {
			this.curTab=opt.type
			this.viewBuyerId=opt.viewBuyerId
		},
		methods:{
			changeTab(idx){
				this.curTab=idx
			},
			toOtherPage(otherId){
				const url=`../OtherPage/OtherPage?otherId=${otherId}`
				this.$routerTo(url)
			},
		}
	}
</script>

<style lang="scss" scoped>
.fans-focus{
	height: 100vh;
	background: #04030A;
	.main{
		height: calc(100% - 100rpx);
	}
}
</style>
