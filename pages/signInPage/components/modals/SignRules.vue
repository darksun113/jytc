<template>
	<u-popup :show="show" mode="center" :closeOnClickOverlay="true" @close="$emit('close')" :mask="true" bgColor="transparent">
		<view class="notice-box">
			<img v-lazy class="close_icon" src="@/static/notice/close_notice_icon.svg" alt="" @click="$emit('close')" />
			<view class="content">
				<view class="title"> {{rulesData_.title}}</view>
				<view class="info">
					<view>
						一.活动时间：<text>{{rulesData_.startTime | formatYearToDay}} - {{rulesData_.endTime | formatMouthToDay}}</text>
					</view>
					<view class="">
						二.活动规则：
					</view>
					<view v-html="translateHtml(rulesData_.content)"></view>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import { formatYearToDay , formatMouthToDay } from "../../../../utils/formatDate.js"
	export default {
		name: "Preview",
		props: {
			isShow: [Boolean],
			rulesData: {
				type: Object,
				default: () => {}
			},
		},
		data() {
			return {
				show: this.isShow,
				rulesData_: this.rulesData,
				currentDot: 0,
			};
		},
		filters:{
			formatYearToDay,
			formatMouthToDay
		},
		methods: {
			translateHtml(htmlText) {
				const textArr = htmlText.split("/n").map((item, idx) => {
					return item + "<br/>"
				})
				return textArr.join("")
			},
		},
		watch: {
			isShow(boo) {
				this.show = boo
			},
			rulesData(newVal) {
				this.rulesData_ = newVal
			}
		}
	}
</script>

<style lang="scss">
	img {
		pointer-events: auto;
	}

	.notice-box {
		width: 600rpx;
		height: 780rpx;
		padding: 40rpx;
		background:#333;
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;
		border-radius: 20rpx;
		position: relative;
		color: #fff;
		backdrop-filter: blur(27px);
		

		.close_icon {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			right: 0;
			top: -100rpx;
			z-index: 2;
		}

		.content {
			height: calc(100% - 40rpx);
			font-size: 28rpx;
			font-family: SourceHanSansCN-Regular, SourceHanSansCN;
			font-weight: 400;
			color: #fff;
			line-height: 42rpx;
			text-align: justify;
			width: 100%;
			overflow: auto;
			.title {
				text-align: center;
				font-size: 36rpx;
				font-family: SourceHanSansCN-Medium, SourceHanSansCN;
				font-weight: 500;
				color: #fff;
				line-height: 54rpx;
			}
			.info{
				margin-top: 40rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 44rpx;
			}
		}
	}
</style>
