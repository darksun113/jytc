<template>
	<view class="control-box">
		<view class="control"  @click="toOpenModelPre">
			<img src="@/static/images/control_icon.svg" alt="">
		</view>
		<view class="control"  @click="toShare">
			<img src="@/static/images/share_icon.svg" alt="">
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			toOpenModelPre(){
				this.$emit("preview")
			},
			toShare(){
				this.$emit("share")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.control-box{
		display: flex;
		width: 220rpx;
		justify-content: space-between;
		position: absolute;
		left: 50%;
		bottom: 20rpx;
		transform: translateX(-50%);
		.control{
			width: 60rpx;
			height: 60rpx;
			background: linear-gradient(180deg, #70D0FF 0%, #D575FF 100%);;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			img{
				width: 28rpx;
				height: 28rpx;
			}
		}
	}
</style>