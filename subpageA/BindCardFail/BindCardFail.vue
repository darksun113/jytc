<template>
	<PageTemp class="page">
		<view class="boxsu">
			<image class="succsstyle" src="../static/images/fail.png" mode="">
			</image>
			<view class="failText"> 认证失败 </view>
			<view style="margin-top: 10px" class="textcss"> 请重新认证 </view>
			<view class="textcss">{{ info }}</view>
			<button @click="toIdentity" class="buttonb">
				重新验证
			</button>
		</view>
	</PageTemp>
</template>

<script>
	export default {
		data() {
			return {
				info: "",
			};
		},
		onLoad(option) {
			this.info = option.errInfo;
		},
		methods: {
			toIdentity() {
				uni.navigateBack({
					delta: 1,
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.page{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.renStyle {
		margin-top: 30px;
		width: 248px;
		height: 50px;
		background: linear-gradient(180deg, #F9ECCD 0%, #CFA06E 100%);
		border-radius: 8rpx;
		line-height: 50px;
		font-size: 18px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
	}

	.uni-button:after {
		border: 0px solid rgba(0, 0, 0, .2);
	}

	.failText {
		color: rgba(245, 34, 45, 1);
		font-size: 16px;
	}

	.succsstyle {
		width: 60px;
		height: 60px;
	}

	.boxsu {
		width: 300px;
		height: 300px;
		background-color:  #0A0C47;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
		border-radius: 16px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 52rpx;
		.buttonb {
			width: 100%;
			height: 88rpx;
			background: linear-gradient(180deg, #70D0FF 0%, #D575FF 100%);
			line-height: 88rpx;
			color: #000;
			margin-top: 28rpx;
		}
	}

	.textcss {
		color: rgba(136, 136, 136, 1);
		font-size: 14px;
	}
</style>
