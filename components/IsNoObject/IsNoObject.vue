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
	text-align: center;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50% , -50%);
	image{
		width: 200rpx;
		height: 260rpx;
	}
	.none-text{
		margin-top: 40rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 40rpx;
	}
}
</style>