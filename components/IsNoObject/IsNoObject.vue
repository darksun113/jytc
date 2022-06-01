<template>
	<view class="no-data">
		<image src="../../static/images/no_object_icon.png" mode=""></image>
		<view class="none-text">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"IsNoObject"
	}
</script>

<style lang="scss" scoped>
.no-data{
	width: 100%;
	margin-top: 200rpx;
	text-align: center;
	image{
		width: 200rpx;
		height: 260rpx;
	}
	.none-text{
		margin-top: 40rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #A5A6FF;
		line-height: 40rpx;
	}
}
</style>