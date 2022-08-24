<template>
	<view class="author_popup">
		<view class="title">
			发行方
		</view>
		<view class="author_content">
			<view class="pic_box">
				<img :src="authorInfo.icon" alt="">
				<view class="author_name nowrap">
					{{authorInfo.shopName}}
				</view>
			</view>
			<view class="author_des">
				{{authorInfo.description}}
			</view>
		</view>
	</view>
</template>

<script>
	import {getFilePath} from "@/utils/tools.js"
	export default {
		props:{
			popupData: {
				type: Object,
				default: () => {}
			}
		},
		data(){
			return {
				authorInfo:{}
			}
		},
		created() {
			this.getAuthorData()
		},
		methods:{
			async getAuthorData(){
				try{
					const res=await uni.$http("/homepage/getShopDescription",{shopId:this.popupData.shopId})
					if(res.code==0){
						res.data=await getFilePath(res.data,["icon"])
						this.authorInfo=res.data
					}
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.author_popup{
	height: 100%;
	overflow: hidden;
	.title{
		text-align: center;
		height: 44rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 44rpx;
	}
	.author_content{
		height: calc(100% - 84rpx);
		overflow: auto;
		padding: 40rpx;
		padding-top: 0;
		margin-top: 40rpx;
		border-top: 2rpx solid rgba(255, 255, 255, 0.1);
		.pic_box{
			margin-top: 60rpx;
			text-align: center;
			img{
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}
			.author_name{
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #28D8E5;
				line-height: 44rpx;
				margin-top: 40rpx;
			}
		}
		.author_des{
			margin-top: 40rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 40rpx;
		}
	}
}
</style>