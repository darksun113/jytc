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
				this.pageHeight=systemInfo.windowHeight
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		background: #222;
		color: #FFFFFF;
		overflow: auto;
		position: relative;
	}
</style>
