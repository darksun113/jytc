<template>
	<u-popup class="pop" :show="shows" mode="center" @close="$emit('close')" :closeOnClickOverlay="true">
		<view class="pop-box">
			<view class="head">
				<view style="width: 32rpx;"></view>
				<view class="text">联系专属客服</view>
				<image class="x" @click="$emit('close')" src="@/static/images/close_999.svg"></image>
			</view>
			<view class="body">
				<image class="code" src="@/static/images/contact.png"></image>
			</view>
			<view class="foot">
				<view class="text">长按保存二维码</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		props:{
			isShow:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				shows:this.isShow,
			}
		},
		watch:{
			isShow(boo){
				this.shows = boo 
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pop{
		display:flex;
		flex-direction:column;
		.pop-box{
			width: 640rpx;
			background: #333;
			color: #fff;
			border-radius: 20rpx;
			overflow: hidden;
			.head{
				display:flex;
				width: 100%;
				font-size: 32rpx;
				font-family: SourceHanSansCN-Medium, SourceHanSansCN;
				font-weight: 500;
				background-color: #333;
				margin-bottom: 100rpx;
				justify-content: space-between;
				// border-radius: 20rpx 20rpx 0 0;
				padding: 40rpx;
				.text{
					text-align: center;
				}
				.x{
					width: 32rpx;
					height: 32rpx;
					padding:12rpx 0 0 0;
				}
			}
			.body{
				height: 260rpx;
				text-align: center;
				.code{
					width: 260rpx;
					height: 260rpx;
				}
			}
			.foot{
				.text{
					padding:40rpx 0 80rpx 32%;
					color:black;
					font-size: 32rpx;
					font-family: SourceHanSansCN-Regular, SourceHanSansCN;
					font-weight: 400;
					color: #fff;
				}
			}
		}
	}
	::v-deep .u-popup__content{
		background: transparent;
	}
</style>
