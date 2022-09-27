<template>
	<view class="series-box" @click="toSeriesDetailPage">
		<template v-if="loadType==0 || loadType==2">
			<view class="sell-tip" style="font-family: PingFangSC-Regular, PingFang SC;" v-if="item.goodsTotal==0 || item.remainingNumber == 0">
				已售罄
			</view>
			<view class="sell-tip" style="font-family: PingFangSC-Regular, PingFang SC;" v-else-if="item.startTime>curTime">
				开售时间 {{item.startTime | formatYearToMinutes_EN}}
			</view>
			<view class="sell-tip" style="font-family: PingFangSC-Regular, PingFang SC;" v-else-if="item.sellTime>curTime">
				开售时间 {{item.sellTime | formatYearToMinutes_EN}}
			</view>
		</template>
		<template v-else-if="loadType==1">
			<view class="sell-tip" style="font-family: PingFangSC-Regular, PingFang SC;" v-if="item.writeListStatus==2">
				已使用
			</view>
			<view class="sell-tip" style="font-family: PingFangSC-Regular, PingFang SC;" v-else-if="item.writeListStatus==1">
				已过期
			</view>
			<view class="sell-tip" v-else-if="(item.sellTime - 10*60) - curTime > 0">
				<text>预购倒计时：</text>
				<u-count-down :time="((item.sellTime - 10*60) - curTime) * 1000" format="DD:HH:mm:ss" @change="onChange" @finish="finish">
					<view class="time">
						<text class="time__item">{{ timeData.days }}天</text>
						<text class="time__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}时</text>
						<text class="time__item">{{ timeData.minutes }}分</text>
						<text class="time__item">{{ timeData.seconds }}秒</text>
					</view>
				</u-count-down>
			</view>
		</template>
		<image class="series-pic" :src="item.seriesImg || item.image" :mode="isBlind?'aspectFit':'aspectFill'"></image>
		<view class="series-info-box">
			<view class="series-info">
				<view class="series-title nowrap">
					{{item.seriesName || item.blindboxName}}
				</view>
				<view class="author-box">
					<image class="author-icon" :src="item.shopIcon" mode=""></image>
					<view class="author-name nowrap_s">
						{{item.shopName}}
					</view>
				</view>
			</view>
			<view class="price-box" v-if="loadType==2">
				<view class="total">
					限量{{item.totalNumber}}
				</view>
				<view class="price">
					¥ {{(item.blindboxPrice/100).toFixed(2)}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {formatYearToMinutes_EN} from "@/utils/formatDate.js"
	export default {
		name:"ListCard",
		props:{
			item:{
				type:Object,
				default:()=>{}
			},
			isBlind:{
				type:Boolean,
				default:false
			},
			// 0 普通模式 1 预购模式 2 盲盒模式
			loadType:[Number,String]
		},
		data(){
			return{
				timeData: {},
				curTime:parseInt(Date.now()/1000)
			}
		},
		filters:{
			formatYearToMinutes_EN
		},
		methods:{
			toSeriesDetailPage(){
				const id = this.isBlind ? this.item.blindboxId : this.item.seriesId
				this.$emit("toSeriesDetailPage",id)
			},
			onChange(e){
				this.timeData = e
			},
			finish(){
				// this.item.writeListStatus=1
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .u-count-down__text{
		color: #FFFFFF;
		font-size: 28rpx;
	}
	.time {
	    @include flex;
	    align-items: center;
		font-family: PingFangSC-Semibold, PingFang SC;
	    &__item {
	         color: #fff;
	         font-size: 24rpx;
	         text-align: center;
	     }
	}
.series-box{
	color: #FFFFFF;
	// width: 670rpx;
	height: 840rpx;
	background: #333;
	border-radius: 30rpx;
	margin-bottom: 40rpx;
	overflow: hidden;
	position: relative;
	.sell-tip{
		position: absolute;
		background: rgba(0, 0, 0, .7);
		padding: 10rpx 20rpx;
		border-radius: 30rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		left: 40rpx;
		top: 40rpx;
		z-index: 1;
		display: flex;
		align-items: center;
	}
	.series-pic{
		width: 670rpx;
		height: 670rpx;
		border-radius: 30rpx;
	}
	.series-info-box{
		padding: 30rpx 40rpx;
		background: url("../../../static/images/card_bg.png") no-repeat right bottom;
		background-size: auto 140%;
		display: flex;
		justify-content: space-between;
		.series-info{
			.series-title{
				height: 44rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				line-height: 44rpx;
			}
			.author-box{
				display: flex;
				align-items: center;
				margin-top: 20rpx;
				.author-icon{
					width: 36rpx;
					height: 36rpx;
					min-width: 36rpx;
					min-height: 36rpx;
					border-radius: 50%;
					margin-right: 10rpx;
				}
				.author-name{
					height: 40rpx;
					font-size: 28rpx;
					max-width: 400rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					line-height: 40rpx;
					color: #999;
				}
			}
		}
		.price-box{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.total{
				font-size: 24rpx;
				font-family: SourceHanSansCN-Regular, SourceHanSansCN;
				font-weight: 400;
				color: #999999;
				line-height: 36rpx;
				text-align: right;
			}
			.price{
				font-size: 48rpx;
				font-family: SourceHanSansCN-Bold, SourceHanSansCN;
				font-weight: bold;
				color: #FFFFFF;
				line-height: 48rpx;
			}
		}
	}
}
</style>