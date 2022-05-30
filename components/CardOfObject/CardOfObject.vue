<template>
	<view class="card-of-object">
		<view class="goods-pic-box">
			<image class="goods-pic" src="../../static/images/demo2.png" mode="aspectFill"></image>
			<view class="icon">
				<image v-if="item.type==0" class="goods-type" src="@/static/images/type_pic.svg" mode=""></image>
				<image v-else-if="item.type==1" class="goods-type" src="@/static/images/type_3D.svg" mode=""></image>
				<image v-else-if="item.type==2" class="goods-type" src="@/static/images/type_video.svg" mode=""></image>
				<image v-else-if="item.type==3" class="goods-type" src="@/static/images/type_audio.svg" mode=""></image>
			</view>
		</view>
		
		<view class="goods-info">
			<view class="goods-name nowrap_2">
				故宫里的中国节-中秋当名字过长时换行当名字过长时换行当名字过长时换行
			</view>
			<view class="goods-code-box">
				<view class="code">
					#2845/8000
				</view>
			</view>
			<view class="author-box">
				<image class="author-icon" src="../../static/images/demo1.png" mode=""></image>
				<view class="author-name nowrap">
					深圳百纳维科技有限公司
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"CardOfObject",
		data() {
			return {
				item:{
					type:0
				}
			};
		}
	}
</script>

<style lang="scss" scoped>
.card-of-object{
	background: #0A0C47;
	border-radius: 8rpx;
	margin-bottom: 40rpx;
	padding: 8rpx;
	color: #FFFFFF;
	display: flex;
	.goods-pic-box{
		position: relative;
		width: 236rpx;
		height: 236rpx;
		min-width: 236rpx;
		border-radius: 8rpx;
		.goods-pic{
			width: 100%;
			height: 100%;
		}
		.icon{
			position: absolute;
			width: 40rpx;
			height: 40rpx;
			left: 12rpx;
			bottom: 12rpx;
			background: rgba(0, 0, 0, .4);
			border-radius: 4rpx;
			padding: 0 4rpx;
			.goods-type{
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.goods-info{
		padding: 20rpx;
		.goods-name{
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			line-height: 44rpx;
		}
		.goods-code-box{
			margin-top: 20rpx;
			display: flex;
			.code{
				padding: 6rpx 10rpx;
				background: linear-gradient(90deg, #70D0FF 0%, #D575FF 100%);
				border-radius: 4rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #000000;
				line-height: 34rpx;
			}
		}
		.author-box{
			margin-top: 24rpx;
			display: flex;
			align-items: center;
			.author-icon{
				width: 36rpx;
				min-width: 36rpx;
				height: 36rpx;
				border-radius: 50%;
				margin-right: 10rpx;
			}
			.author-name{
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 34rpx;
			}
		}
	}
	
}
</style>