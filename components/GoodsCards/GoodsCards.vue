<template>
	<view class="goods-box" @click="toDetailPage">
		<view class="goods-pic-box">
			<image class="goods-pic" :src="item.image" mode="aspectFill"></image>
			<view class="goods-count">
				限量10000份
			</view>
		</view>
		<view class="goods-info">
			<view class="goods-title nowrap_2">
				{{item.title}}
			</view>
			<view class="price-box">
				<view class="price">
					¥ 18.88
				</view>
				<image v-if="item.type==0" class="goods-type" src="@/static/images/type_pic.svg" mode=""></image>
				<image v-else-if="item.type==1" class="goods-type" src="@/static/images/type_3D.svg" mode=""></image>
				<image v-else-if="item.type==2" class="goods-type" src="@/static/images/type_video.svg" mode=""></image>
				<image v-else-if="item.type==3" class="goods-type" src="@/static/images/type_audio.svg" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"GoodsCards",
		props:{
			item:{
				type:Object,
				default:()=>{}
			}
		},
		methods:{
			toDetailPage(){
				const goodsId=""
				const type=0
				this.$routerTo(`../../subpageA/DetailPage/DetailPage?goodsId=${goodsId}&type=${type}`)
			}
		}
	}
</script>

<style lang="scss" scoped>
.goods-box{
	color: #FFFFFF;
	width: 336rpx;
	background: #0A0C47;
	border-radius: 8rpx;
	margin-bottom: 20rpx;
	.goods-pic-box{
		width: 336rpx;
		height: 336rpx;
		border-radius: 8rpx;
		position: relative;
		overflow: hidden;
		.goods-pic{
			width: 100%;
			height: 100%;
		}
		.goods-count{
			padding: 2rpx 4rpx;
			background: rgba(10, 12, 71, .5);
			border-radius: 2px;
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			line-height: 32rpx;
			position: absolute;
			right: 10rpx;
			top: 10rpx;
		}
	}
	
	.goods-info{
		padding: 10rpx 20rpx;
		font-weight: 500;
		font-family: PingFangSC-Medium, PingFang SC;
		.goods-title{
			font-size: 28rpx;
			line-height: 40rpx;
		}
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.price{
				font-size: 44rpx;
				line-height: 60rpx;
			}
			.goods-type{
				width: 36rpx;
				height: 36rpx;
			}
		}
	}
	
	
}
</style>