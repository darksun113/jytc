<template>
	<view class="block_popup">
		<view class="title">
			流转历史
		</view>
		<view class="item_box">
			<view class="transfer_box">
				<view class="transform_template">
					<view class="transfer_item" v-for="(item,index) in popupData.transferList" :key="index">
						<view class="item_info">
							<view class="sender">
								<img class="sender_logo" :src="item.transferIcon" style="border-radius: 50%;"/>
								<view class="sender_name nowrap">
									{{item.transferName}}
								</view>
							</view>
							<view class="transfer_type" v-if="item.type==1">
								出售 {{popupData.goodsPrice | filterPrice}}
							</view>
							<view class="transfer_type" v-else-if="item.type==2">
								转赠
							</view>
							<view class="recipient">
								<img class="recipient_logo" style="border-radius: 50%;" :src="item.recipientIcon" />
								<view class="recipient_name nowrap">
									{{item.recipientName}}
								</view>
							</view>
						</view>
						<view class="item_hash">
							<view class="hash">
								<view style="width: 240rpx;">
									流转hash：
								</view> 
								<view class="nowrap_s">
									{{item.hash}}
								</view>
							</view>
							<view class="time">
								{{item.createTime | formatDate_2}}
							</view>
						</view>
					</view>
					<IsEnd></IsEnd>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getFilesPath} from "@/utils/tools.js"
	export default {
		props:{
			popupData:{
				type:Object,
				default:()=>{}
			}
		},
		filters:{
			formatDate_2(stamp) {
				if (!stamp) {
					return ""
				} else {
					const date = new Date(stamp * 1000)
					const Y = date.getFullYear() + '-'
					const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
					const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
					const H = date.getHours() + ':'
					const M2 = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
					const S = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
					return Y + M + D + H + M2 + S
				}
			},
			filterPrice(val) {
				return "￥" + (val / 100).toFixed(2)
			},
			
		},
		methods:{
			getListPic(){
				this.popupData.transferList.forEach(item=>{
					const temp={
						recipientIcon:item.recipientIcon,
						transferIcon:item.transferIcon
					}
					getFilesPath(temp,data=>{
						Object.keys(data).forEach(key=>{
							item[key]=data[key]
						})
					})
				})
			}
		},
		created(){
			// this.getListPic()
		},
	}
</script>

<style lang="scss" scoped>
.block_popup{
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
	.item_box{
		height: calc(100% - 104rpx);
		overflow: auto;
		margin-top: 60rpx;
		.transfer_box {
			position: relative;
			border-radius: 0px 0px 32rpx 32rpx;
			margin-bottom: 50rpx;
			overflow-y: hidden;
		
			.transform_template {
				margin: 0 20rpx;
				height: 100%;
				overflow-y: auto;
			}
		
			.transfer_item {
				border-bottom: 2rpx solid rgba(255, 255, 255, 0.1);
				padding: 36rpx 18rpx;
				font-size: 24rpx;
				color: #ffffff;
		
				&:last-child {
					border: none;
				}
		
				.item_info {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 68rpx;
		
					.sender {
						flex: 6;
						display: flex;
		
						.sender_logo {
							width: 36rpx;
							height: 36rpx;
							margin-right: 10rpx;
						}
					}
		
					.transfer_type {
						flex: 2;
						width: 76rpx;
						text-align: center;
						color: #ffd690;
					}
		
					.recipient {
						flex: 6;
						display: flex;
						justify-content: flex-end;
		
						.recipient_logo {
							width: 36rpx;
							height: 36rpx;
							margin-right: 10rpx;
						}
					}
				}
		
				.item_hash {
					margin-top: 20rpx;
					.hash{
						display: flex;
					}
					.time {
						color: #cccccc;
						margin-top: 10rpx;
					}
				}
			}
		}
	}
	
}
</style>