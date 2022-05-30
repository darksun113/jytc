<template>
	<view class="series-box" @click="toSeriesDetailPage">
		<view class="sell-tip" v-if="false">
			已售罄
		</view>
		<view class="sell-tip" v-if="false">
			<text>预购倒计时：</text>
			<u-count-down :time="30 * 60 * 60 * 1000" format="DD:HH:mm:ss" @change="onChange" @finish="finish">
				<view class="time">
					<text class="time__item">{{ timeData.days }}天</text>
					<text class="time__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}时</text>
					<text class="time__item">{{ timeData.minutes }}分</text>
					<text class="time__item">{{ timeData.seconds }}秒</text>
				</view>
			</u-count-down>
		</view>
		<image class="series-pic" :src="item.image" mode="aspectFill"></image>
		<view class="series-info">
			<view class="series-title nowrap">
				{{item.title}}
			</view>
			<view class="author-box">
				<image class="author-icon" :src="item.authorIcon" mode=""></image>
				<view class="author-name nowrap">
					{{item.author}}
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
			}
		},
		data(){
			return{
				timeData: {},
			}
		},
		methods:{
			toSeriesDetailPage(){
				this.$emit("toSeriesDetailPage")
			},
			onChange(e){
				this.timeData = e
			},
			finish(){}
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
	width: 690rpx;
	height: 852rpx;
	background: #0A0C47;
	border-radius: 20rpx;
	margin-bottom: 40rpx;
	position: relative;
	.sell-tip{
		position: absolute;
		background: rgba(0, 0, 0, .7);
		padding: 10rpx 20rpx;
		border-radius: 4px;
		font-size: 28rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		left: 40rpx;
		top: 40rpx;
		z-index: 1;
		display: flex;
		align-items: center;
	}
	.series-pic{
		width: 690rpx;
		height: 690rpx;
		border-radius: 20rpx;
	}
	.series-info{
		padding: 30rpx 40rpx;
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
			}
		}
	}
	
	
}
</style>