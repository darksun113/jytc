<template>
	<view class="progress-bar-box">
		<view class="title-box">
			<view class="count-tip">
				已连续签到<text style="color: #28D8E5;margin: 0 10rpx;">{{signDetail.cumulativeDays || 0}}</text>天
			</view>
			<text class="rules" @tap="isRuleShow = true">签到规则</text>
		</view>
		<swiper class="number-of-power" :current="curDot" @change="swiperChange" :circular='circular' :display-multiple-items="3">
			<swiper-item v-for="(item , j) in totalNum" :key="j">
				<view class="gift-step-box">
					<view class="bar" :class="{flish:j == 0}" :style="{borderRadius :j == 0 ? '40rpx':''}"></view>
					<view class="gift-box">
						<image class="get-gift" src="@/static/sign/text_await_get_icon.svg" v-if="j !== 0" ></image>
						<image class="get-gift"  src="@/static/sign/text_get_icon.svg" v-else></image>
						<view class="gift" @tap="openAward">
							<image src="@/static/sign/gift_await_get_icon.svg" v-if="j !== 0" ></image>
							<image src="@/static/sign/gift_get_icon.svg"  v-else></image>
							<image src="" mode=""></image>
						</view>
						<text class="count-days">5天</text>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<AwardPop :isShow="isOpenAward" @openBlindSuccess="openSuccess" :blindData="awardRes" />
		<SignRulesPop :isShow="isRuleShow" :rulesData="rulesData" @close="isRuleShow=false"></SignRulesPop>
	</view>
</template>

<script>
	import AwardPop from "../../../subpageB/MyObject/components/BlindToGoods/index.vue"
	import SignRulesPop from "./modals/SignRules.vue" 
	export default {
		props:{
			signDetail:{
				type:Object,
				default:()=>{}
			},
			signInId:{
				type:String,
				default:""
			}
		},
		data() {
			return {
				curDot: 0,
				circular:false,
				totalNum:5,
				isOpenAward:false,
				isRuleShow:false,
				awardRes:{},
				rulesData:{
					title:"签到活动标题",
					startTime:parseInt(Date.now()/1000),
					endTime:parseInt(Date.now()/1000)+10*3600*24,
					content:`1.每日签到可得xx积分；/n
							2.连续签到x天，可得x积分和n次抽奖机会；连续签到x天，可得x积分和n次抽奖机会；/n
							此处是签到活动文案此处是签到活动文案此处是签到活动文案此处是签到活动文案此处是签到活动文案此处是签到活动文
							案此处是签到活动文案此处是签到活动文案此处是签到活动文案此处是签到活动文案此处是签到活动文案此处是签到活动文案此处是签到活动文案`
				}
			}
		},
		components:{
			AwardPop,
			SignRulesPop
		},
		methods:{
			swiperChange(e){
				// this.curDot = e.detail.current;
			},
			openSuccess(){
				this.isOpenAward = false
			},
			openAward(){
				this.awardRes = {
					goodsName:"炫彩明珠动四方为的哈",
					image:require("../../../static/新增icon/占位图.png")
				}
				this.isOpenAward = true
				// uni.showModal({
				// 	content:"很抱歉，此奖励已领取完",
				// 	showCancel:false,
				// 	confirmColor:"#fff",
				// 	confirmText:"确认"
				// })
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