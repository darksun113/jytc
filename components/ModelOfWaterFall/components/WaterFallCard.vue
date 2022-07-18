<template>
	<view class="series-box" @click="toSeriesDetailPage">
		<view class="sell-tip" v-if="item.goodsTotal==0">
			已售罄
		</view>
		<img class="series-pic" :src="item.seriesImg" />
		<view class="series-info">
			<view class="series-title nowrap">
				{{item.seriesName}}
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
		name:"WaterFallCard",
		props:{
			item:{
				type:Object,
				default:()=>{}
			}
		},
		methods:{
			toSeriesDetailPage(){
				this.$emit("toSeriesDetailPage",this.item.seriesId)
			}
		}
	}
</script>

<style lang="scss" scoped>
.series-box{
	color: #FFFFFF;
	background: #0A0C47;
	border-radius: 20rpx;
	margin-bottom: 40rpx;
	overflow: hidden;
	width: 336rpx;
	position: relative;
	.sell-tip{
		position: absolute;
		background: rgba(0, 0, 0, .7);
		padding: 10rpx 20rpx;
		border-radius: 4px;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		left: 20rpx;
		top: 20rpx;
		z-index: 1;
		display: flex;
		align-items: center;
	}
	.series-pic{
		width: 100%;
		max-height: 690rpx;
		min-height: 300rpx;
		object-fit: cover;
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