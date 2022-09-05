<template>
	<u-popup :zIndex="10074" :show="popUpshowAccept" mode="bottom" close-icon-color="#999999" :closeable="true" @close="close"
		@open="open">
		<view class="content">
			<view class="header">
				分享名单
			</view>
			<view class="forText">
				<view class="headerTip">
					<view class="">
						用户昵称
					</view>
					<view class="">
						是否实名
					</view>
					<view class="">
						注册时间
					</view>
				</view>
				<scroll-view scroll-y="true">
					<view class="scrollSt">
						<view v-for="index in 30" :key="index" class="oneText">
							<view style="width:270rpx;" class="">
								张三
							</view>
							<view style="height:30rpx; text-align: center;width:100rpx;">
								<img style="width:26rpx;height:30rpx;display: inline-block;"
									src="../../../../../../static/新增icon/认证.svg" alt="">
							</view>
							<view style="width:270rpx;text-align: right;" class="">
								2022/12/12
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="bottom">
					<view @click="toQrcode" class="buttons">
						生成专属邀请海报
					</view>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		props: {
			popUpshow: {
				type: Boolean,
				default: () => {
					return false
				}
			}
		},
		data() {
			return {
				show: false,
				popUpshowAccept: this.popUpshow
			}
		},
		watch: {
			popUpshow(newVal) {
				this.popUpshowAccept = newVal
			}
		},
		methods: {
			close() {
				this.$emit('closePop')
			},
			open() {},
			toQrcode() {
				uni.$emit("showQrUp")
			},
		}
	}
</script>

<style lang="less">
	::v-deep .u-popup__content {
		z-index: 9998 !important;
	}

	.oneText {
		width: 100%;
		height: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		font-family: SourceHanSansCN-Regular, SourceHanSansCN;
		font-weight: 400;
		color: #CCCCCC;
		line-height: 42rpx;
		margin-bottom: 24rpx;
	}

	.buttons {
		width: 100%;
		height: 80rpx;
		background: #28D8E5;
		border-radius: 20rpx;
		font-size: 32rpx;
		font-family: SourceHanSansCN-Medium, SourceHanSansCN;
		font-weight: 500;
		color: #000000;
		line-height: 80rpx;
		text-align: center;
	}

	.bottom {
		position: absolute;
		bottom: 0rpx;
		height: 160rpx;
		width: 100%;
		transform: translateX(-50%);
		left: 50%;
		padding: 0 20rpx;
	}

	.scrollSt {
		width: 100%;
		height: calc(100vh - 1060rpx);
		margin-top: 20rpx;
	}

	.content {
		height: 60vh;
		padding-top: 20rpx;
		background: #222222;
        z-index: 9998 !important;
		::v-deep .u-popup__content__close--top-right {
			top: 16rpx !important;
		}

		position: relative;
	}

	.headerTip {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		font-family: SourceHanSansCN-Regular, SourceHanSansCN;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 42rpx;
	}

	.header {
		width: 100%;
		height: 100rpx;
		border-bottom: 2rpx solid rgba(255, 255, 255, 0.1);
		font-size: 36rpx;
		font-family: SourceHanSansCN-Medium, SourceHanSansCN;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 80rpx;
		text-align: center;
	}

	.forText {
		width: 100%;
		height: calc(100vh - 100rpx);
		padding: 40rpx;
	}
</style>
