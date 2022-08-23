<template>
	<view class="content">
		<view class="card">
			<image src="../static/images/success.png" mode=""></image>
			<view class="res">
				密码重置成功
			</view>
			<view style="margin-top: 40rpx;color: #888888;">
				请妥善保管您的个人信息
			</view>
			<u-button text="重新登录" :custom-style="{color:'#000',marginTop:'40rpx',height:'100rpx',borderRadius: '16rpx'}"
				@click="toLoginPage" color="#28D8E5"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			toLoginPage() {
				this.$emit("toLoginPage")
			}
		}
	};
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.card {
			width: 600rpx;
			height: 600rpx;
			background: #333;
			;
			box-shadow: 0px 0px 20rpx 0px rgba(0, 0, 0, 0.08);
			border-radius: 20rpx;
			text-align: center;
			padding: 0 40rpx;

			.res {
				height: 56rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #4CB82E;
				line-height: 56rpx;
			}

			image {
				width: 120rpx;
				height: 120rpx;
				margin-top: 136rpx;
			}
		}
	}

	::v-deep .u-btn {
		&::after {
			border: none;
		}
	}

	::v-deep .u-button__text {
		span {
			font-family: PingFangSC-Regular, PingFang SC;
		}

	}
</style>
