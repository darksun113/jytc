<template>
	<view class="series-box" @click="toSeriesDetailPage">
		<view class="sell-tip" style="font-family: PingFangSC-Regular, PingFang SC;" v-if="item.goodsTotal==0 && loadType==0">
			已售罄
		</view>
		<view v-else-if="loadType==1">
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
		</view>
		<image class="series-pic" :src="item.seriesImg || item.image" mode="aspectFill"></image>
		<view class="series-info">
			<view class="series-title nowrap">
				{{item.seriesName || item.blindboxName}}
			</view>
			<view class="author-box">
				<image class="author-icon" :src="item.shopIcon" mode=""></image>
				<view class="author-name nowrap">
					{{item.shopName}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
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
			loadType:[Number,String]
		},
		data(){
			return{
				timeData: {},
				curTime:parseInt(Date.now()/1000)
			}
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
	.series-info{
		padding: 30rpx 40rpx;
		background: url("../../../static/images/card_bg.png") no-repeat right bottom;
		background-size: auto 140%;
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
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				line-height: 40rpx;
				color: #999;
			}
		}
	}
	
	
}
</style>