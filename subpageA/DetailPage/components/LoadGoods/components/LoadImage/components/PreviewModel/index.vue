<template>
	<view class="pre-image">
		<img class="close_icon" src="@/static/images/close_preview_icon.svg" alt="" @click="$emit('close')">
		<view class="scaleImg">
			<movable-area>
				<movable-view direction="all" scale-value="1" scale-min="0.1" scale="true" scale-max="2" :damping="100" out-of-bounds="false">
					<img :src="goodsData.image" alt="">
				</movable-view>
			</movable-area>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goodsData: {
				type: Object,
				default: () => {}
			}
		},
		methods: {}
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

		.scaleImg {
			width: 630rpx;
			height:630rpx;
			&>movable-area {
				width: 100vh;
				height: 100vh;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				z-index: 1000;

				movable-view {
					display: flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					left: 50%;
					top: 50%;
					img {
						width: 630rpx;
					}
				}

			}
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
