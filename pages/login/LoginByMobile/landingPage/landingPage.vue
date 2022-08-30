<template>
	<view class="page">
		<img style="width:100%" src="../../../../static/images/BG.jpg"/>
		<u-button @click="toReg">点击跳转</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code:'',
			}
		},
		onLoad(){
			// this.code=window.location.href.split("?")[1]; 
		},
		methods: {
			toReg(){
				uni.navigateTo({
					url:`../GetVerifyCode/GetVerifyCode.vue?code="ai"`
				})
			},
		}
	}
</script>

<style scoped>
.page{
	width: 100%;
	height: 100vh;
}
</style>
