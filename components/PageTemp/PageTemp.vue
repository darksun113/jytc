<template>
	<view class="page" :style="{height:pageHeight+'px'}">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name:'PageTemp',
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
				const statusBarHeight=systemInfo.statusBarHeight
				const windowHeight=systemInfo.windowHeight
				this.pageHeight=windowHeight
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		background: #04030A;
		color: #FFFFFF;
		overflow: auto;
	}
</style>
