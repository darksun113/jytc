<template>
	<view class="progress-bar-box">
		<view class="title-box">
			<view class="count-tip">
				已{{signDetail.type == 1 ? '连续' : '累计'}}签到
				<text v-if="signDetail.type == 1" style="color: #28D8E5;margin: 0 10rpx;">{{signDetail.continuityMaxDays || 0}}</text>
				<text v-else style="color: #28D8E5;margin: 0 10rpx;">{{signDetail.cumulativeDays || 0}}</text>
				天
			</view>
			<text class="rules" @tap="isRuleShow = true">签到规则</text>
		</view>
		<swiper class="number-of-power" :current="curDot" @change="swiperChange" :circular='circular'
			:display-multiple-items="(signDetail.rewards && signDetail.rewards.length < 3) ? signDetail.rewards.length : 3">
			<swiper-item v-for="(item , j) in signDetail.rewards" :key="j">
				<view class="gift-step-box">
					<view class="bar" v-if="signDetail.type == 2" :class="{flish:signDetail.cumulativeDays >= item.days}" :style="{borderRadius :j == 0 ? '40rpx':''}"></view>
					<view class="bar" v-else :class="{flish:signDetail.continuityMaxDays >= item.days}" :style="{borderRadius :j == 0 ? '40rpx':''}"></view>
					<view class="gift-box" v-if="signDetail.type == 2">
						<image class="get-gift" src="@/static/sign/text_get_icon.svg" v-if="signDetail.cumulativeDays >= item.days && item.receive == 0"></image>
						<image class="get-gift" src="@/static/sign/text_await_get_icon.svg" v-else></image>
						<view class="gift" @tap="openAward(item)">
							<image src="@/static/sign/gift_get_icon.svg" v-if="signDetail.cumulativeDays >= item.days && item.receive == 0"></image>
							<image src="@/static/sign/gift_await_get_icon.svg" v-else></image>
						</view>
						<text class="count-days">{{item.days}}天</text>
					</view>
					<view class="gift-box" v-else>
						<image class="get-gift" src="@/static/sign/text_get_icon.svg" v-if="signDetail.continuityMaxDays >= item.days && item.receive == 0"></image>
						<image class="get-gift" src="@/static/sign/text_await_get_icon.svg" v-else></image>
						<view class="gift" @tap="openAward(item)">
							<image src="@/static/sign/gift_get_icon.svg" v-if="signDetail.continuityMaxDays >= item.days && item.receive == 0"></image>
							<image src="@/static/sign/gift_await_get_icon.svg" v-else></image>
						</view>
						<text class="count-days">{{item.days}}天</text>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<AwardPop :isShow="isOpenAward" @openBlindSuccess="openSuccess" :blindData="awardRes" />
		<SignRulesPop :isShow="isRuleShow" :rulesData="signDetail" @close="isRuleShow=false"></SignRulesPop>
	</view>
</template>

<script>
	import AwardPop from "../../../subpageB/MyObject/components/BlindToGoods/index.vue";
	import { getFilePath } from "../../../utils/tools.js"
	import SignRulesPop from "./modals/SignRules.vue"
	export default {
		props: {
			signDetail: {
				type: Object,
				default: () => {}
			},
			signInId: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				curDot: 0,
				circular: false,
				totalNum: 2,
				isOpenAward: false,
				isRuleShow: false,
				awardRes: {}
			}
		},
		components: {
			AwardPop,
			SignRulesPop
		},
		methods: {
			swiperChange(e) {
				// this.curDot = e.detail.current;
			},
			openSuccess() {
				this.$emit("resetPage",this.signInId);
				this.isOpenAward = false;
			},
			async openAward(item) {
				const {days, receive ,rewardId} = item
				switch(this.signDetail.type){
					case 1:
					if (days > this.signDetail.cumulativeDays || receive == 1) return;
					case 2:
					if (days > this.signDetail.continuityMaxDays || receive == 1) return;
				}
				
				const res = await uni.$http("/signIn/reward/receive", {
					signInId: this.signInId,
					rewardId
				})
				if (res.code == 0) {
					this.awardRes = await getFilePath(res.data, ["image"]);
					this.isOpenAward = true;
				} else {
					uni.showModal({
						content: "很抱歉，此奖励已领取完",
						showCancel: false,
						confirmColor: "#fff",
						confirmText: "确认"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.progress-bar-box {
		height: 360rpx;
		background: #333333;
		border-radius: 20rpx;
		padding: 20rpx;
		color: #FFFFFF;
		margin-top: 30rpx;

		.title-box {
			display: flex;
			justify-content: space-between;

			.count-tip {
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				line-height: 48rpx;
			}

			.rules {
				font-size: 28rpx;
				font-family: SourceHanSansCN-Regular, SourceHanSansCN;
				line-height: 48rpx;
				margin-left: 10rpx;
				position: relative;
				padding-left: 40rpx;
			}

			.rules::after {
				width: 28rpx;
				height: 28rpx;
				content: "";
				position: absolute;
				top: 50%;
				left: 4rpx;
				transform: translateY(-50%);
				background: url("../../../static/sign/rules_explain_icon.svg") no-repeat center center;
				background-size: cover;
			}
		}

		.number-of-power {
			margin-top: 40rpx;
			height: 192rpx;

			.gift-step-box {
				position: relative;
				height: 192rpx;

				.bar {
					// width: 160rpx;
					width: 100%;
					height: 20rpx;
					background: #444;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					left: 0;

				}

				.flish {
					background: linear-gradient(90deg, #FFFFFF 0%, #28D8E5 50%, #C058F6 100%);
				}

				.gift-box {
					position: absolute;
					top: 50%;
					height: 100%;
					transform: translateY(-50%);
					right: 0;
					width: 100rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: flex-end;

					.get-gift {
						width: 80rpx;
						height: 48rpx;
					}

					.gift {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;

						image {
							width: 100%;
							height: 100%;
							min-width: 100%;
							min-height: 100%;
							border-radius: 50%;
						}
					}

					.count-days {
						font-size: 32rpx;
						padding-right: 14rpx;
					}
				}
			}
		}
	}

	.slot-icon {
		width: 80rpx;
		height: 80rpx;
		background: #9C76F2;
		border-radius: 50%;

	}
</style>
