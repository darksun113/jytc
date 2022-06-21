<template>
	<view class="rules-des-box">
		<view class="goods-pic">
			<image :src="prePurchaseInfo.seriesImg"></image>
		</view>
		<view class="right-info">
			<view class="goods-name">{{prePurchaseInfo.seriesName}}</view>
			<view class="author-box">
				<image :src="prePurchaseInfo.shopIcon"></image>
				<text>{{prePurchaseInfo.shopName}}</text>
			</view>
			<view class="activity-rules" @click="viewRules">
				<image src="@/static/images/rules_icon.svg"></image>
				<text>查看活动规则</text>
			</view>
		</view>
		<ActivityPop @close="isShow=false" :isShow="isShow" :prePurchaseInfo="prePurchaseInfo"></ActivityPop>
	</view>
</template>

<script>
	import ActivityPop from "./components/ActivityPop"
	export default{
		props:{
			prePurchaseInfo:{
				type:Object,
				default:()=>{}
			}
		},
		data(){
			return{
				isShow:false
			}
		},
		components:{ActivityPop},
		methods:{
			viewRules(){
				this.isShow=true
			}
		}
	}
</script>

<style lang="scss" scoped>
	view{
		box-sizing: border-box;
	}
	.rules-des-box{
		height: 252rpx;
		background: #0A0C47;
		border-radius: 8rpx;
		padding: 8rpx;
		margin-top: 60rpx;
		display: flex;
		align-items: center;
		.goods-pic{
			width: 236rpx;
			height: 236rpx;
			min-width: 236rpx;
			min-height: 236rpx;
			margin-right: 20rpx;
			image{
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
			}
		}
		.right-info{
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			padding: 10rpx 0;
			height: 100%;
			color: #FFFFFF;
			.goods-name{
				width: 288rpx;
				height: 44rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				line-height: 44rpx;
			}
			.author-box{
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				line-height: 34rpx;
				display: flex;
				align-items: center;
				image{
					margin-right: 10rpx;
					width: 32rpx;
					height: 32rpx;
					border-radius: 50%;
				}
			}
			.activity-rules{
				display: flex;
				align-items: center;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #A5A6FF;
				line-height: 68rpx;
				image{
					margin-right: 16rpx;
					width: 28rpx;
					height: 32rpx;
				}
			}
		}
	}
</style>