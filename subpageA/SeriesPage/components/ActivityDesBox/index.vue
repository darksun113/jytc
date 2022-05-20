<template>
	<view class="active_box">
		<view class="active_title nowrap">
			元宇宙国风潮玩时代	
		</view>
		<view class="author-box">
			<image class="author-pic" src="@/static/images/demo1.png" mode=""></image>
			<view class="author-name nowrap">
				深圳九州龙文化传播有限公司
			</view>
		</view>
		<view class="active_text">
			星堡的长者们看到琳琅满目的汉服和饰品跃跃欲试，也想穿着汉服游豫园，在充满幻想的国风主题街区中玩“穿越”，做不一样的时髦达人！
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.active_box{
		background: #0A0C47;
		border-radius: 8rpx;
		padding: 40rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		.active_title{
			font-size: 40rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			line-height: 56rpx;
		}
		.author-box{
			margin-top: 16rpx;
			display: flex;
			align-items: center;
			.author-pic{
				width: 28rpx;
				height: 28rpx;
				min-width: 28rpx;
				min-height: 28rpx;
				margin-right: 10rpx;
				border-radius: 50%;
			}
			.author-name{
				font-size: 24rpx;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 34rpx;
			}
		}
		.active_text{
			margin-top: 28rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 40rpx;
			text-align: justify;
		}
	}
</style>