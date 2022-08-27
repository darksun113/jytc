<template>
	<view class="fun-module">
		<!-- 链上信息 -->
		<view class="options_box" v-if="goodsData.loadType==0 || goodsData.loadType==3" @click="toOpenBlockPopup(1)">
			<view class="options_right">
				<image class="options-icon" src="./static/images/block_info_icon.svg" mode=""></image>
				<view class="options_info">
					<view class="options_name">
						链上信息
					</view>
				</view>
			</view>
			<image style="width: 24rpx;height: 40rpx;" src="@/static/images/more_arrows_icon.svg" mode=""></image>
		</view>
		<!-- 区块链证书 -->
		<view class="options_box" v-else-if="goodsData.loadType==1" @click="toOpenBlockPopup(4)">
			<view class="options_right">
				<image class="options-icon" src="./static/images/certificate_icon.svg" style="border-radius: 0;"
					mode="">
				</image>
				<view class="options_info">
					<view class="options_name">
						区块链证书
					</view>
				</view>
			</view>
			<image style="width: 24rpx;height: 40rpx;" src="@/static/images/more_arrows_icon.svg" mode=""></image>
		</view>
		<!-- 发行方 -->
		<view class="options_box" @click="toOpenBlockPopup(2)">
			<view class="options_right">
				<image class="options-icon" :src="goodsData.shopIcon" mode=""></image>
				<view class="options_info">
					<view class="options_name">
						{{goodsData.shopName}}
					</view>
				</view>
			</view>
			<image style="width: 24rpx;height: 40rpx;" src="@/static/images/more_arrows_icon.svg" mode=""></image>
		</view>
		<!-- 流转历史 -->
		<!-- <view class="options_box" v-if="goodsData.loadType==1" @click="toOpenBlockPopup(5)">
			<view class="options_right">
				<image class="options-icon" src="./static/images/transfer_icon.svg" mode=""></image>
				<view class="options_info">
					<view class="options_name">
						流转历史
					</view>
				</view>
			</view>
			<image style="width: 24rpx;height: 40rpx;" src="@/static/images/more_arrows_icon.svg" mode=""></image>
		</view> -->
		<!-- 最近购买 -->
		<!-- <view class="options_box" v-if="goodsData.loadType==0" @click="toOpenBlockPopup(3)">
			<view class="options_right">
				<view class="options_info"
					style="margin-left: 0;font-size: 32rpx;font-family: PingFangSC-Regular, PingFang SC;color: #FFFFFF;">
					最近购买
				</view>
			</view>
			<view class="buyer_box">
				<view class="player_avatar">
					<image v-if="buyerList.length>0" :src="item.recipientIcon" v-for="(item ,index) in buyerList" :key="index"></image>
				</view>
				<image style="width: 24rpx;height: 40rpx;" src="@/static/images/more_arrows_icon.svg"></image>
			</view>
		</view> -->
		<PopupBottom :isShow="isPopupShow" :popupData="goodsData" :loadType="PopupShowType" @close="isPopupShow=false" @openTokenPop="isShow=true">
		</PopupBottom>
	</view>
</template>

<script>
	import PopupBottom from "./components/PopupBottom"
	export default {
		// loadType 0 未购买 1 已购买
		props: {
			goodsData:{
				type:Object,
				default:()=>{}
			},
			buyerList:{
				type:Array,
				default:()=>[]
			}
		},
		components: {
			PopupBottom
		},
		data() {
			return {
				isPopupShow:false,
				PopupShowType:0
			}
		},
		methods: {
			toOpenBlockPopup(type) {
				this.isPopupShow=true
				this.PopupShowType=type
			}
		},
	}
</script>

<style lang="scss" scoped>
	.fun-module {

		.options_box {
			display: flex;
			width: 100%;
			padding-top: 40rpx;
			align-items: center;
			justify-content: space-between;

			.options_right {
				display: flex;
				align-items: center;

				.options-icon {
					width: 44rpx;
					height: 44rpx;
					border-radius: 50%;
				}

			}

			.buyer_box {
				display: flex;
				.player_avatar {
					display: flex;
					margin-right: 20rpx;
					
					image {
						width: 44rpx;
						height: 44rpx;
						border-radius: 50%;
						margin-left:-16rpx;
						&:first-child{
							margin-left:0
						}
					}
				}
			}

			.options_info {
				margin-left: 10px;
				font-size: 14px;
				font-family: PingFangSC-Regular, PingFang SC;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.options_title {
					color: #999999;
				}

				.options_name {
					color: #ffffff;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					font-size: 28rpx;
				}
			}

			.options_collect {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
