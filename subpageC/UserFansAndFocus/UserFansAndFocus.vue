<template>
	<view class="fans-focus">
		<NavBar :current="curTab" @changeTab="changeTab"></NavBar>
		<view class="main">
			<Fans @toOtherPage="toOtherPage" v-if="curTab==0"></Fans>
			<Focus @toOtherPage="toOtherPage" v-else></Focus>
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
				curTab:0
			}
		},
		onLoad(opt) {
			this.curTab=opt.type
		},
		methods:{
			changeTab(idx){
				this.curTab=idx
			},
			toOtherPage(data){
				const url=`../OtherPage/OtherPage`
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
