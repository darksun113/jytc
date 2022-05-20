<template>
	<view class="page" :style="{height:'calc('+pageHeight+'px - 156rpx)'}">
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
				const windowHeight=systemInfo.screenHeight
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
	}
</style>
