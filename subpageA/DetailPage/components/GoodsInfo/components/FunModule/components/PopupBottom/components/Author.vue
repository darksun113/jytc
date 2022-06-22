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
					<!-- 深圳百纳维科技有限公司 -->
				</view>
			</view>
			<view class="author_des">
				{{authorInfo.description}}
				<!-- 此处是发行方的介绍啊此处是发行方的介绍啊此处是发行方的介绍啊此处是发行方的介绍啊此处是发行方的介绍啊此处是发行方的介绍啊此处是发行方的介绍啊此处是发行方的介绍啊此处是发行方的介绍啊此处是发行方的介绍啊 -->
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
						res.data.icon=await getFilePath(res.data.icon)
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
		height: calc(100% - 44rpx);
		overflow: auto;
		.pic_box{
			margin-top: 60rpx;
			text-align: center;
			img{
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}
			.author_name{
				margin-top: 40rpx;
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #F9E0A8;
				line-height: 40rpx;
			}
		}
		.author_des{
			margin-top: 20rpx;
			height: 160rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 40rpx;
		}
	}
}
</style>