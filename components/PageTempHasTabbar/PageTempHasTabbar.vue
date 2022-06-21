<template>
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
				this.pageHeight=systemInfo.windowHeight
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
	}
</style>
