<template>
	<view class="award-box">
		<view class="title-box">
			签到奖品<text>（左右滑动查看更多奖品）</text>
		</view>
		<swiper class="gift-box" :current="curDot" @change="swiperChange" :interval="3000" :circular="true" :autoplay="true" next-margin="-100rpx" :display-multiple-items="3">
			<swiper-item class="gift-item-swiper" v-for="(item , j) in totalNum" :key="j">
				<view class="gift-item" @tap="handleGift(item)">
					<image src="../../../static/新增icon/占位图.png" mode=""></image>
				</view>
			</swiper-item>
			<!-- <swiper-item style="width: 100rpx;"></swiper-item> -->
		</swiper>
	</view>
</template>

<script>
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
				totalNum:4
			}
		},
		methods:{
			swiperChange(e){
				this.curDot = e.detail.current;
			},
			handleGift(data){
				console.log(data)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.award-box{
		margin-top: 30rpx;
		padding: 40rpx 20rpx;
		padding-right: 0;
		height: 384rpx;
		background: #333333;
		border-radius: 20rpx;
		.title-box{
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 44rpx;
			text{
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				color: #999999;
			}
		}
		.gift-box{
			margin-top: 40rpx;
			height: 240rpx;
			.gift-item{
				width: 240rpx;
				height: 240rpx;
				background: #929292;
				border-radius: 20rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 20rpx;
				}
			}
			
		}
	}
</style>