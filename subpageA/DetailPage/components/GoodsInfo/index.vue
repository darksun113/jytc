<template>
	<view class="goods-info">
		<view class="goods-price-box">
			<view class="price">
				¥ 19.99
			</view>
			<view class="limit">
				<text>限量1000份</text>
			</view>
		</view>
		<view class="tags-box">
			<view class="tags">
				<view class="tag">神兽系列</view>
				<view class="tag">山海经</view>
				<view class="tag">国风</view>
			</view>
			<view class="goodsCode_box" >
				<view class="goodsCode">#2845/8000</view>
			</view>
		</view>
		<FunModule :loadType="1"></FunModule>
		<view class="goods-introduce">
			<img src="@/static/images/demo5.png" alt="">
		</view>
		<view class="digital-collection-tip">
			<view class="title">
				数字藏品说明
			</view>
			<view class="info">
				数字藏品为虚拟数字商品，而非实物，仅限实名认证为年满14周岁的中国大陆用户购买。数字藏品的版权由发行方或原创者拥有，除另行取得版权拥有者书面同意外，用户不得将数字藏品用于任何商业用途。本商品一经售出，不支持退换。本商品源文件不支持本地下载。请勿对数字藏品进行炒作、场外交易、欺诈，或以任何其他非法方式进行使用。
			</view>
		</view>
	</view>
</template>

<script>
	import FunModule from "./components/FunModule/index.vue"
	export default{
		components:{
			FunModule
		}
	}
</script>

<style lang="scss" scoped>
	.goods-info{
		padding: 40rpx;
		color: #FFFFFF;
		// padding-bottom: 164rpx;
		.goods-price-box{
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.price{
				font-size: 72rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				line-height: 100rpx;
			}
			.limit{
				text{
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					color: #A5A6FF;
					line-height: 34rpx;
				}
			}
		}
		.tags-box{
			margin-top: 10rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.tags{
				display: flex;
				.tag{
					margin-right: 10rpx;
					padding: 8rpx 16rpx;
					background: #A5A6FF;
					border-radius: 4rpx;
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
				}
			}
			.goodsCode_box{
				font-size: 24rpx;
				padding: 6rpx 10rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #000000;
				line-height: 34rpx;
				background: linear-gradient(90deg, #70D0FF 0%, #D575FF 100%);
				border-radius: 2px;
			}
		}
		.goods-introduce{
			margin-top: 40rpx;
			img{
				width: 100%;
			}
		}
		.digital-collection-tip{
			margin-top: 40rpx;
			padding: 40rpx;
			background: #0A0C47;
			border-radius: 20rpx;
			.title{
				font-size: 36rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				line-height: 50rpx;
			}
			.info{
				margin-top: 20rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				text-align: justify;
				color: #CCCCCC;
				line-height: 34rpx;
			}
		}
	}
</style>