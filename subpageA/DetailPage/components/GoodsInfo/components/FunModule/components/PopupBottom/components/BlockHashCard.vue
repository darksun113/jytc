<template>
	<view class="block_popup">
		<view class="title">
			区块链证书
		</view>
		<view class="item_box">
			<view class="renzheng_box">
				<view class=" renzheng_pic_info">
					<view class="rz_info_item">
						<view >
							收藏家
						</view>
						<view>
							{{popupData.buyerName}}
						</view>
					</view>
					<view class="rz_info_item">
						<view>
							收藏时间
						</view>
						<view>
							{{popupData.collectionTime| formatDate}}
						</view>
					</view>
					<view class="rz_info_item">
						<view>
							区块链身份
						</view>
						<view>
							{{popupData.buyerHash}}
						</view>
					</view>
					<view class="rz_info_item">
						<view>
							区块链地址
						</view>
						<view>
							{{popupData.hash}}
						</view>
					</view>
					<view class="rz_info_item">
						<view>
							区块高度
						</view>
						<view>
							{{popupData.height}}
						</view>
					</view>
					<view class="rz_info_item">
						<view>
							令牌ID
						</view>
						<view>
							{{popupData.tokenId}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			popupData: {
				type: Object,
				default: () => {}
			}
		},
		filters: {
			formatDate(stamp) {
				if (!stamp) {
					return ""
				} else {
					const date = new Date(stamp * 1000)
					const Y = date.getFullYear() + '-'
					const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
					const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate()
					return Y + M + D
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.block_popup {
		height: 100%;
		overflow: hidden;
	
		.title {
			text-align: center;
			height: 44rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 44rpx;
		}

		.item_box {
			height: calc(100% - 44rpx);
			overflow: auto;
			
			.renzheng_box {
				margin-top: 60rpx;
				width: 100%;
				height: 630rpx;
				background: url("../static/images/block_hash_card.png") no-repeat;
				background-size: cover;
				border-radius: 20rpx;
				padding: 40rpx;
				.renzheng_pic_info {
					display: flex;
					height: 100%;
					flex-direction: column;
					justify-content: space-between;
					.rz_info_item {
						display: flex;
						line-height: 38rpx;
						margin-bottom: 30rpx;
						
						view {
							color: #000000;
							font-size: 28rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 500;
							&:first-child {
								color: #4135FE;
								width: 140rpx;
							}

							&:last-child {
								width: calc(100% - 160rpx);
								word-break: break-all;
								line-height: 32rpx;
								margin-left: 20rpx;
							}
						}
					}

					.rz_tip {
						display: flex;
						padding-left: 144rpx;
						margin: 60rpx auto 20rpx auto;
						color: #cccccc;
						align-items: center;
						image {
							width: 28rpx;
							height: 28rpx;
							margin-right: 8rpx;
						}
						view{
							color: #8A3B01;
						}
					}


				}
			}
		}
	}
</style>
