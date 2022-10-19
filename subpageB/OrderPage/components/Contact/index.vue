<template>
	<view>
		<view class="contact-btn">
			<view class="btn" @click="contact">
				联系客服
			</view>
		</view>
		<u-popup class="pop" :show="shows" mode="center">
			<view class="pop-box">
				<view class="head">
					<view class="text">联系专属客服</view>
					<image class="x" @click="closeCpop" src="../../static/images/x.svg"></image>
				</view>
				<view class="body">
					<image class="code" src="../../static/images/contact.png"></image>
				</view>
				<view class="foot">
					<view class="text">长按保存二维码</view>
				</view>
			</view>
		</u-popup>
	</view>
	
</template>

<script>
	export default {
		props:{
			orderInfo:{
				type:Object,
				default:()=>{}
			}
		},
		data() {
			return {
				shows:false,
			}
		},
		methods: {
			contact(){
				this.shows = true;
			},
			closeCpop(){
				this.shows = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contact-btn {
		width: 100%;
		height:80rpx;
		text-align: center;
		font-size: 32rpx;
		font-family: SourceHanSansCN-Medium, SourceHanSansCN;
		font-weight: 500;
		padding: 0rpx 40rpx;
		.btn {
			width: 100%;
			height: 100%;
			border-radius: 20rpx;
			color: #000000;
			background-color: #28D8E5;
			padding-top: 14rpx;
		}
	}
	
	.pop{
		display:flex;
		flex-direction:column;
		.pop-box{
			width: 640rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			.head{
				display:flex;
				width: 100%;
				height: 80rpx;
				padding:40rpx 40rpx;
				font-size: 32rpx;
				font-family: SourceHanSansCN-Medium, SourceHanSansCN;
				font-weight: 500;
				color: #000000;
				background-color: #FFFFFF;
				line-height: 27px;
				margin-bottom: 100rpx;
				.text{
					width:100%;
					padding:0 26% 0 30%;
				}
				.x{
					width: 32rpx;
					height: 32rpx;
					padding:12rpx 0 0 0;
				}
			}
			.body{
				height: 260rpx;
				padding-left: 30%;
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
				}
			}
		}
	}
</style>
