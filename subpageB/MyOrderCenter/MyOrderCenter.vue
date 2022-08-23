<template>
	<PageTemp class="order-center">
		<view class="tab-bar">
			<view class="item" :class="{cur:current==0}" @click="changeTab(0)">待付款</view>
			<view class="item" :class="{cur:current==1}" @click="changeTab(1)">已完成</view>
		</view>
		<view class="main">
			<Unpaid v-if="current==0"></Unpaid>
			<Prepaid v-else></Prepaid>
		</view>
	</PageTemp>
</template>

<script>
	import Prepaid from "./components/Prepaid/index.vue"
	import Unpaid from "./components/Unpaid/index.vue"
	export default {
		data() {
			return {
				current:null,
				
			};
		},
		components:{
			Prepaid,
			Unpaid
		},
		onLoad(opt) {
			this.current=opt.type
		},
		methods: {
			changeTab(cur){
				this.current=cur
			}
		}
	}
</script> 

<style lang="scss" scoped>
	.order-center{
		padding: 40rpx;
		.tab-bar{
			display: flex;
			justify-content: space-around;
			.item{
				font-size: 36rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 400;
				color: #888888;
				line-height: 50rpx;
			}
			.cur{
				color: #FFFFFF;
				font-weight: 500;
				transition: all .3s ease;
			}
		}
		.main{
			margin-top: 40rpx;
			height: calc(100% - 90rpx);
			overflow: auto;
		}
	}

</style>
