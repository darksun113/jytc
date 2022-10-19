<template>
	<view class="page">
		<img v-lazy style="width:100%" src="https://shubantong.oss-cn-guangzhou.aliyuncs.com/%E5%88%9B%E4%B8%96%E5%BE%BD%E7%AB%A0%E6%B4%BB%E5%8A%A8.jpg" />
		<view class="dianji" style="position: absolute;">
			点击下方按钮立即注册
		</view>
		<view class="toclass" @click="toReg">注册即送</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: 'ai',
			}
		},
		onShow() {
			uni.setStorage({
				key: 'isAI',
				data: true
			})
		},
		onLoad() {
			this.$checkAI(1)
		},
		methods: {
			toReg() {
				uni.navigateTo({
					url: `/pages/login/LoginByMobile/GetVerifyCode/GetVerifyCode?code=ai`
				})
			},
		}
	}
</script>

<style scoped>
	.dianji {
		font-size: 24rpx;
		font-family: SourceHanSansCN-Regular, SourceHanSansCN;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 36rpx;
		bottom: 320rpx;
		text-align: center;
		left: 50%;
		transform: translateX(-50%);
	}

	.page {
		width: 100%;
		position: relative;
	}

	.toclass {
		position: absolute;
		bottom: 220rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 548rpx;
		height: 80rpx;
		background: linear-gradient(90deg, #FFFFFF 0%, #28D8E5 50%, #C058F6 100%);
		border-radius: 10rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 32rpx;
		font-family: SourceHanSansCN-Medium, SourceHanSansCN;
		font-weight: 500;
		color: #000000;
	}
</style>
