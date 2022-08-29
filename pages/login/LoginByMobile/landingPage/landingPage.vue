<template>
	<view class="page">
		<u-button @click="toReg">点击跳转</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(opt){
			this.$checkAI(1,opt)
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
	background: url(../../ResetPwd/static/images/success.png) no-repeat center;
	background-size: 100% 100%;
}
</style>
