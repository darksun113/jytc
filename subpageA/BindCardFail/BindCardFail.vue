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
			this.info = option.errMsg;
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
		background-color:  #333;
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
			background: #28D8E5;
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
