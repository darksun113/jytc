<template>
	<view class="donation-collection-box">
		<view class="donation-box" v-if="goodsData.loadType==1">
			<view class="donation-btn" style="opacity:0.6" v-if="format > 0">转赠</view>
			<view class="donation-btn" v-else @click="toDonationPage">转赠</view>
			<view class="donation-tip" v-if="format > 0">需等待{{format}}天</view>
		</view>
		<view class="collection-box" v-else>
			<image class="icon" v-show="goodsData.ifFavorite" @tap="handleFavorite(1)" src="@/static/images/collection_icon.svg"></image>
			<image class="icon" v-show="!goodsData.ifFavorite" @tap="handleFavorite(0)" src="@/static/images/un_collection_icon.svg"></image>
			<text>{{goodsData.favorites}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			goodsData:{
				type:Object,
				default:()=>{}
			}
		},
		data() {
			return {
				curTime: Date.now()
			}
		},
		computed: {
			format(){
				let stamp = this.goodsData.collectionTime*1000
				const D = 1000 * 60 * 60 * 24;
				const D_180 = D * 180;
				stamp += D_180;
				const resStamp = stamp - this.curTime;
				return Math.ceil(resStamp/D);
			}
		},
		methods: {
			handleFavorite(opt){
				const boo = this.$checkLogin();
				boo ? this.favoriteConfirm(opt) : this.$emit("showLoginTip");
			},
			async favoriteConfirm(opt){
				const { goodsId } = this.goodsData
				const res = await uni.$http("/goods/favorite",{
					goodsId,
					isFavorite:opt
				})
				if(res.code == 0){
					this.goodsData.favorites = res.data.count;
					this.goodsData.ifFavorite = !this.goodsData.ifFavorite
				}else{
					this.$toast(res.errorMsg,"error")
				}
			},
			toDonationPage() {
				const {image,goodsName,goodsCode,shopIcon,shopName,goodsId , goodsInstanceId} = this.goodsData
				uni.setStorageSync("donationGoods",{image,goodsName,goodsCode,shopIcon,shopName});
				const url = `/subpageA/Donation/Donation?goodsId=${goodsId}&instanceId=${goodsInstanceId}`;
				this.$routerTo(url)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.donation-collection-box{
		min-width: 160rpx;
		
		.collection-box{
			padding-right: 12rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.icon{
				width: 28rpx;
				height:28rpx;
				margin-right: 10rpx;
			}
			text{
				font-size: 28rpx;
				font-family: SourceHanSansCN-Regular, SourceHanSansCN;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 28rpx;
			}
		}
		.donation-box{
			.donation-btn{
				width: 100rpx;
				padding: 10rpx 0;
				margin: 0 auto;
				background: #28D8E5;
				border-radius: 30rpx;
				text-align: center;
				font-size: 20rpx;
				font-family: SourceHanSansCN-Medium, SourceHanSansCN;
				font-weight: 500;
				color: #000000;
				line-height: 30rpx;
			}
			.donation-tip{
				margin-top: 10rpx;
				font-size: 20rpx;
				text-align: center;
				font-family: PingFangSC-Regular, PingFang SC;
				color: #AAAAAA;
			}
		}
	}
</style>
