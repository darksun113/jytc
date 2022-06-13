<template>
	<!-- :style="{height:'calc('+pageHeight+'px - 156rpx)'}" -->
	<view class="page" :style="{height:pageHeight+'px'}">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name:'PageTempHasTabbar',
		data() {
			return {
				pageHeight:0
			}
		},
		created() {
			this.getPageHeight()
		},
		methods: {
			getPageHeight(){
				const systemInfo=uni.getSystemInfoSync()
				const top=systemInfo.windowTop
				const windowHeight=systemInfo.windowHeight-top
				console.log(systemInfo)
				this.pageHeight=windowHeight-top
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		background: #04030A;
		padding: 0 30rpx;
		color: #FFFFFF;
		overflow: auto;
		height: 100%;
		// padding-bottom: 156rpx;
	}
</style>
