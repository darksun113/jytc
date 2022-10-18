<template>
	<view class="progress-bar-box">
		<view class="title-box">
			<view class="count-tip">
				已连续签到<text style="color: #28D8E5;margin: 0 10rpx;">4</text>天
			</view>
			<text class="rules">签到规则</text>
		</view>
		<swiper class="number-of-power" :current="curDot" @change="swiperChange" :circular='circular' :display-multiple-items="3">
			<swiper-item v-for="(item , j) in totalNum" :key="j">
				<view class="gift-step-box">
					<view class="bar" :class="{flish:j == 0}" :style="{borderRadius :j == 0 ? '40rpx':''}"></view>
					<view class="gift-box">
						<image class="get-gift" src="@/static/sign/text_await_get_icon.svg" v-if="j !== 0" ></image>
						<image class="get-gift" src="@/static/sign/text_get_icon.svg" v-else></image>
						<view class="gift">
							<image src="@/static/sign/gift_await_get_icon.svg" v-if="j !== 0" ></image>
							<image src="@/static/sign/gift_get_icon.svg" v-else></image>
							<image src="" mode=""></image>
						</view>
						<text class="count-days">5天</text>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curDot: 0,
				circular:false,
				totalNum:3
			}
		},
		methods:{
			swiperChange(e){
				// this.curDot = e.detail.current;
			}			
		}
	}
</script>

<style lang="scss" scoped>
	.progress-bar-box{
		height: 360rpx;
		background: #333333;
		border-radius: 20rpx;
		padding: 20rpx;
		color: #FFFFFF;
		margin-top: 30rpx;
		.title-box{
			display: flex;
			justify-content: space-between;
			.count-tip{
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				line-height: 48rpx;
			}
			.rules{
				font-size: 28rpx;
				font-family: SourceHanSansCN-Regular, SourceHanSansCN;
				line-height: 48rpx;
				margin-left: 10rpx;
				position: relative;
				padding-left: 40rpx;
			}
			.rules::after{
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
		.number-of-power{
			margin-top: 40rpx;
			height: 192rpx;
			
			.gift-step-box{
				position: relative;
				height: 192rpx;
				.bar{
					width: 160rpx;
					height: 20rpx;
					background: #444;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					left: 0;
					
				}
				.flish{
					background: linear-gradient(90deg, #FFFFFF 0%, #28D8E5 50%, #C058F6 100%);
				}
				.gift-box{
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
					
					.get-gift{
						width: 80rpx;
						height: 48rpx;
					}
					.gift{
						width: 80rpx;
						height:80rpx;
						border-radius: 50%;
						background: #9C76F2;
						image{
							width: 100%;
							height: 100%;
							min-width: 100%;
							min-height: 100%;
							border-radius: 50%;
						}
					}
					.count-days{
						font-size: 32rpx;
						padding-right: 14rpx;
					}
				}
			}
		}
	}
	
	.slot-icon{
		width: 80rpx;
		height: 80rpx;
		background: #9C76F2;
		border-radius: 50%;
		
	}
</style>