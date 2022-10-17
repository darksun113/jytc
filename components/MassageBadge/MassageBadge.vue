<template>
	<view class="msg-box" @click="toMsgPage">
		<image class="msg-icon" src="@/static/images/msg-icon.svg" mode=""></image>
		<u-badge :isDot="isDot" class="dot"></u-badge>
	</view>
</template>

<script>
	export default {
		name:"MassageBadge",
		data() {
			return {
				isDot: true
			}
		},
		methods: {
			toMsgPage() {
				this.isDot = false;
				const url = `/pages/information/information`
				this.$routerTo(url)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.msg-box{
		width: 48rpx;
		height: 48rpx;
		position: relative;
		.msg-icon{
			width: 48rpx;
			height: 48rpx;
		}
		.dot{
			position: absolute;
			right: 0;
			top: 0;
		}
	}
</style>