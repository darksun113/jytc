<template>
	<view class="active_box">
		<view class="title-box">
			<view class="active_title nowrap_s">
				{{seriesInfo.seriesName}}	
			</view>
			<view class="collection-box">
				<image class="icon" v-show="seriesInfo.favorite" @tap="handleFavorite(1)" src="@/static/images/collection_icon.svg"></image>
				<image class="icon" v-show="!seriesInfo.favorite" @tap="handleFavorite(0)" src="@/static/images/un_collection_icon.svg"></image>
			</view>
		</view>
		<view class="author-box">
			<image class="author-pic" :src="seriesInfo.shopIcon" mode=""></image>
			<view class="author-name nowrap">
				{{seriesInfo.shopName}}
			</view>
		</view>
		<view class="active_text">
			{{seriesInfo.description}}
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			seriesInfo:{
				type:Object,
				default:()=>{}
			}
		},
		methods: {
			handleFavorite(opt){
				const boo = this.$checkLogin();
				boo ? this.favoriteConfirm(opt) : this.$emit("showLoginTip");
			},
			async favoriteConfirm(opt){
				const { seriesId } = this.seriesInfo;
				const res = await uni.$http("/series/favorite",{
					seriesId,
					isFavorite:opt
				})
				if(res.code == 0){
					this.favoriteCount = res.data.count;
					this.seriesInfo.favorite = !this.seriesInfo.favorite
				}else{
					this.$toast(res.errorMsg,"error")
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.active_box{
		background: #333;
		border-radius: 8rpx;
		padding: 40rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		.title-box{
			display: flex;
			justify-content: space-between;
			.active_title{
				font-size: 40rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				line-height: 56rpx;
				max-width: 80%;
			}
			.collection-box{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				.icon{
					width: 28rpx;
					height:28rpx;
				}
				text{
					font-size: 28rpx;
					font-family: SourceHanSansCN-Regular, SourceHanSansCN;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 28rpx;
				}
			}
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