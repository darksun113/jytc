<template>
	<view style="margin-top: 40rpx;">
		<view class="power-success-tip" >
			<image src="@/static/images/check_icon.svg" mode=""></image>
			<view class="">
				已成功为TA助力
			</view>
		</view>
		<view class="share-poster-btn" @click="toJoinActive">
			我也要参与	
		</view>
	</view>
</template>

<script>
	export default {
		props:["seriesId"],
		data(){
			return{
				token:uni.getStorageSync("token")||""
			}
		},
		methods:{
			toJoinActive(){
				const url=`/subpageA/SeriesPage/SeriesPage?seriesId=${this.seriesId}`
				this.$routerTo(url,"redirect")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.power-success-tip{
		display: flex;
		justify-content: center;
		align-items: center;
		image{
			width: 48rpx;
			height: 48rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}
	}
	.share-poster-btn{
		margin: 0 auto;
		margin-top: 24rpx;
		width: 496rpx;
		height: 100rpx;
		background: #28D8E5;
		border-radius: 8rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 100rpx;
		text-align: center;
		&:last-child{
			margin-top: 40rpx;
		}
	}
</style>