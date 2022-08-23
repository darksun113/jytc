<template>
	<PageTemp class="page">
		<view class="boxsu">
			<image class="succsstyle" src="../static/images/success.svg" mode="">
			</image>
			<view class="succText"> 认证成功 </view>
			<view style="margin-top: 26px" class="textcss"> 身份信息认证成功</view>
		</view>
	</PageTemp>
</template>

<script>
	export default {
		data() {
			return {};
		},
		mounted() {
			setTimeout(() => {
				uni.navigateBack({
					delta: 2,
				});
			}, 2000);
		},
		methods: {},
	};
</script>

<style>
	.page {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.succsstyle {
		width: 60px;
		height: 60px;
	} 

	.boxsu {
		width: 300px;
		height: 300px;
		background-color: #333;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
		border-radius: 16px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.textcss {
		color:  #CCCCCC;
		font-size: 14px;
	}

	.succText {
		color: rgba(76, 184, 46, 1);
		font-size: 16px;
	}
</style>
