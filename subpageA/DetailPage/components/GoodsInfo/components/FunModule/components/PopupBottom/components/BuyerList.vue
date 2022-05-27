<template>
	<view class="buyer_popup" ontouchstart>
		<view class="title">
			最近购买
		</view>
		<view class="buyer_content">
			<view class="no_trans_box" v-if="isNone">
				<image class="no_trans" src="@/static/images/none.png" mode=""></image>
				<view> 暂无购买者 </view>
			</view>
			<scroll-view v-else class="box" scroll-y="true" @scrolltolower="updateBuyerList">
				<view @click="toOtherPage(item.recipient)" v-for="(item, index) in buyerList" :key="index" class="boxsmall">
					<image class="avater" :src="item.recipientIcon" mode=""></image>
					<view class="boxRight">
						<view class="right_top">
							<view class="name">
								{{ item.recipientName }}
							</view>
							<view style="color: #CCCCCC;">
								{{ item.createTime | format }}
							</view>
						</view>
						<view class="right_top1">
							<view style="width: 140rpx;color: #CCCCCC;"> 交易hash： </view>
							<view class="nowrap_s" style="width: calc(100% - 100rpx);color: #CCCCCC;">
								{{ item.hash }}
							</view>
						</view>
					</view>
				</view>
				<view v-if="isLastItem" style="text-align: center;color: #888;height:300rpx;padding-top: 100rpx;">
					-----到底啦-----
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {getFilePath} from "@/utils/tools.js"
	export default {
		props:{
			popupData:{
				type:Object
			},
		},
		data(){
			return {
				buyerList:[],
				isNone:false,
				isLastItem:true,
				isUpdate:true
			}
		},
		filters:{
			format(stamp){
				if(!stamp){
					return ""
				}else{
					const date = new Date(stamp*1000)
					const Y = date.getFullYear() + '.'
					const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.'
					const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
					const H = date.getHours() + ':'
					const M2 = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
					return Y + M + D + H + M2 + "00"
				}
			}
		},
		created() {
			this.init()
		},
		destroyed() {
			this.buyerList=[]
		},
		methods:{
			async getBuyers(createTime, callback) {
				try{
					const res=await uni.$http("/goods/getBuyers", {goodsId: this.popupData.goodsId,size: 10,createTime,optType:0})
					if (res.code == 0) {
						if(res.data.list.length==0){
							callback(0)
						}else{
							res.data.list.forEach(item=>{
								getFilePath(item.recipientIcon,path=>{
									item.recipientIcon=path
								})
							})
							callback(res.data.list,res.data.count)
						}
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			updateBuyerList(e) {
				if(this.isUpdate){
					this.getBuyers(this.buyerList[this.buyerList.length - 1].createTime,(list,count) => {
							if(list==0){
								this.isUpdate=false
							}else{
								this.buyerList = [...this.buyerList, ...list];
								this.buyerList.length==count?this.isLastItem=true:this.isLastItem=false
								uni.hideLoading();
							}
							
						}
					);
				}
			},
			init(){
				this.getBuyers(parseInt(Date.now()/1000),(list,count)=>{
					if(list==0){
						this.isNone=true
					}else{
						this.buyerList=list
						list.length==count?this.isLastItem=true:this.isLastItem=false
					}
				})
			},
			toOtherPage(e){
				if(this.checkLogin()){
					uni.setStorageSync("otherId", e);
					uni.navigateTo({
						url: `/subPagesB/otherPage/otherPage?otherId=${e}`,
					})
				}else{
					this.$emit("openTokenPop")
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
.buyer_popup{
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
	.buyer_content{
		height: calc(100% - 44rpx);
		overflow: auto;
		.box{
			height: 100%;
			overflow: auto;
			.boxsmall {
				width: 100%;
				display: flex;
				overflow: auto;
				border-bottom: 2rpx rgba(255, 255, 255, 0.15) solid;
				align-items: center;
				justify-content: space-between;
				.avater {
					width: 80rpx;
					height: 80rpx;
					margin-right: 20rpx;
					border-radius: 50%;
				}
				.boxRight {
					width: 85%;
					height: 140rpx;
					padding: 18rpx 0;
					.right_top {
						width: 100%;
						height: 50rpx;
						line-height: 50rpx;
						display: flex;
						justify-content: space-between;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #ffffff;
					}
					.right_top1 {
						width: 100%;
						height: 50rpx;
						line-height: 50rpx;
						display: flex;
						justify-content: space-between;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #ffffff;
					
						.hash {
							flex: 1;
						}
					}
				}
			}
		}
		.no_trans_box {
			text-align: center;
		
			.no_trans {
				width: 280rpx;
				height: 280rpx;
				margin: 300rpx auto 0 auto;
			}
		
			view {
				color: #999999;
				margin-top: 20rpx;
				font-size: 28rpx;
			}
		}
	}
}

</style>
