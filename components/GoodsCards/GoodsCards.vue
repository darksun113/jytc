<template>
	<view class="goods-box" @click="toDetailPage">
		<view class="goods-pic-box">
			<image class="goods-pic" :src="item.image" mode="aspectFill"></image>
			<view class="time-info-box">
				<!-- private int goodsStatus; // 状态 0 上架 1下架 2 未发布 新增: 3 已售罄 4已结束'  5 售卖中 6 预售中 -->
				<text v-if="item.goodsStatus==0 && item.goodsType==3">预售活动：{{item.preSaleTime | format}}</text>
				<text v-else-if="item.goodsStatus==0 && item.goodsType==1">开售时间：{{item.startTime | format}}</text>
				<text v-else-if="item.goodsStatus==3">已售罄</text>
				<text v-else-if="item.goodsStatus==4">已结束</text>
				<text v-else-if="item.goodsStatus==5">在售</text>
				<view class="time-box" v-else-if="item.goodsStatus==6">
					<u-count-down :time="(item.startTime - curTime)*1000" format="HH:mm:ss" @change="onChange" @finish="onFinish">
						<view class="time">
							<text>预售中：</text>
							<view class="time__custom">
								<text class="time__custom__item">{{ (timeData.days*24 + timeData.hours)>10?(timeData.days*24 + timeData.hours):'0'+(timeData.days*24 + timeData.hours)}}</text>
							</view>
							<text class="time__doc">小时</text>
							<view class="time__custom">
								<text class="time__custom__item">{{ timeData.minutes }}</text>
							</view>
							<text class="time__doc">分</text>
							<view class="time__custom">
								<text class="time__custom__item">{{ timeData.seconds }}</text>
							</view>
							<text class="time__doc">秒</text>
						</view>
					</u-count-down>
				</view>
			</view>
			<view>
				<image v-if="item.materialType==0" class="goods-type" src="@/static/images/type_3D.svg"></image>
				<image v-else-if="item.materialType==1" class="goods-type" src="@/static/images/type_pic.svg"></image>
				<image v-else-if="item.materialType==2" class="goods-type" src="@/static/images/type_video.svg"></image>
				<image v-else-if="item.materialType==3" class="goods-type" src="@/static/images/type_audio.svg"></image>
			</view>
		</view>
		<view class="goods-info">
			<view class="goods-title nowrap_2">
				{{item.goodsName}}
			</view>
			<view class="price-box">
				<view class="price">
					<view class="pre-pay-info-box" v-if="item.goodsType==3 && item.goodsStatus !== 3">
						<view class="pre-item">
							<text class="pre-title">预售价：</text>
							<text class="pre-price">¥ {{(item.prepayAmount/100).toFixed(2)}}</text>
						</view>
						<view class="pre-item">
							<text class="pre-title">定金：</text>
							<text class="pre-price">¥ {{(item.deposit/100).toFixed(2)}}</text>
						</view>
					</view>
					<text v-else>¥ {{(item.goodsPrice/100).toFixed(2)}}</text>
				</view>
				<view class="goods-count">
					限量{{item.totalNumber}}份
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {formatMouthToMinutes } from "@/utils/formatDate.js"
	export default {
		name:"GoodsCards",
		props:{
			item:{
				type:Object,
				default:()=>{}
			}
		},
		data() {
			return {
				curTime: parseInt(Date.now()/1000),
				timeData:{}
			}
		},
		filters:{
			format:formatMouthToMinutes
		},
		methods:{
			onChange(e) {
				this.timeData = e
			},
			onFinish(){
				this.$$emit("countFinish")
			},
			toDetailPage(){
				const loadType = 0
				// materialType 类型  0模型 1图片 2视频 3音频
				const url=`/subpageA/DetailPage/DetailPage?loadType=${loadType}&goodsId=${this.item.goodsId}`
				this.$routerTo(url)
			}
		}
	}
</script>

<style lang="scss" scoped>
.goods-box{
	color: #FFFFFF;
	width: 336rpx;
	background: #333;
	border-radius: 8rpx;
	margin-bottom: 20rpx;
	overflow: hidden;
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
		.goods-type{
			width: 36rpx;
			height: 36rpx;
			position: absolute;
			right: 20rpx;
			bottom: 20rpx;
			background: #8E8A8A;
			padding: 4rpx 4rpx;
			border-radius: 8rpx;
		}
		.time-info-box{
			padding: 6rpx 6rpx;
			background: rgba(10, 12, 71, 0.5);
			border-radius: 4rpx;
			font-size: 20rpx;
			font-family: SourceHanSansCN-Regular, SourceHanSansCN;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 30rpx;
			position: absolute;
			left: 10rpx;
			top: 10rpx;
			.time-box {
				.time {
				    @include flex;
				    align-items: center;
				
				    &__custom {
				         width: 32rpx;
				         /* #ifndef APP-NVUE */
				         display: flex;
				         /* #endif */
				         justify-content: center;
				         align-items: center;
				    
				        &__item {
				             color: #fff;
				             text-align: center;
				         }
				    }
				    
				    &__item {
				         color: #606266;
				         margin-right: 8rpx;
				     }
				}
			}
		}
	}
	
	.goods-info{
		padding: 10rpx 20rpx;
		font-weight: 500;
		font-family: PingFangSC-Medium, PingFang SC;
		display: flex;
		height: calc(100% - 336rpx;);
		flex-direction: column;
		justify-content: space-between;
		.goods-title{
			font-size: 28rpx;
			line-height: 40rpx;
		}
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			align-items: flex-end;
			.price{
				font-size: 44rpx;
				line-height: 60rpx;
			}
			.goods-count{
				padding: 6rpx 4rpx;
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 28rpx;
			}
			.pre-pay-info-box{
				margin-top: 20rpx;
				.pre-item{
					display: flex;
					.pre-title{
						font-size: 20rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 38rpx;
					}
					.pre-price{
						font-size: 24rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 38rpx;
					}
				}
			}
		}
	}
	
	
}
</style>