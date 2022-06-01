<template>
	<view class="pre-image">
		<img class="close_icon" src="../../../../static/images/close_preview_icon.svg" alt="" @click="$emit('close')">
		<video :src="goodsData.path" controls></video>
		<view class="control">
			<view class="btn" @click="startRotate">
				<img src="../../../../static/images/play_icon.svg" alt="">
			</view>
		</view>
	</view>
</template>

<script>
	import viewer from "viewer"
	export default {
		props: {
			goodsData: {
				type: Object,
				default: () => {}
			}
		},
		methods: {
			// 缩小
			shrink() {

			},
			// 放大
			magnify() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.pre-image {
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, .8);
		display: flex;
		justify-content: center;
		align-items: center;
		.close_icon {
			width: 64rpx;
			height: 64rpx;
			position: absolute;
			right: 60rpx;
			top: 120rpx;
			z-index: 999999;
		}
		

		.control {
			width: 260rpx;
			height: 80rpx;
			border-radius: 56rpx;
			position: absolute;
			left: 50%;
			bottom: 100rpx;
			transform: translateX(-50%);
			display: flex;
			justify-content: space-around;
			align-items: center;

			.btn {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				background: linear-gradient(180deg, #70D0FF 0%, #D575FF 100%);
				display: flex;
				justify-content: center;
				align-items: center;

				img {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
</style>
