<template>
	<view class="order-info">
		<view class="goods">
			<view class="left">
				<image class="goods-pic" :src="orderInfo.goods.image" mode="aspectFill"></image>
			</view>
			<view class="right">
				<view class="goods-name nowrap">
					{{orderInfo.goods.goodsName}}
				</view>
				<view class="author">
					<image class="author-pic" :src="orderInfo.goods.shopIcon" mode=""></image>
					<view class="author-name nowrap">{{orderInfo.goods.shopName}}</view>
				</view>
			</view>
		</view>
		<view class="order-detail-box">
			<view class="pre-oder"  v-if="orderInfo.status>2">
			<!-- <view class="pre-oder"> -->
				<view style="display:flex;padding-top:40rpx">
					<image style="width: 52rpx; height: 52rpx;padding-right:28rpx" src="../../static/images/1r.svg"></image>
					<view  class="step">
						<view v-if="orderInfo.status==3" style="color:#C75943">阶段一：定金（待付款）</view>
						<view v-if="orderInfo.status==4" style="color:#000000">阶段一：定金（已付）</view>
						<view v-if="orderInfo.status==5" style="color:#999999;display:flex;">阶段一：定金<view style="color:#C75943">（待退款）</view></view>
						<view v-if="orderInfo.status==6" style="color:#999999;display:flex;">阶段一：定金<view style="color:#C75943">（退款失败）</view></view>
						<view v-if="orderInfo.status==7" style="color:#999999;display:flex;">阶段一：定金<view style="color:#C75943">（退款成功）</view></view>
						<view>{{}}</view>
					</view>
				</view>
				<view style="margin-bottom: -6rpx">
					<image style="height:60rpx;width:48rpx;padding-top:2rpx" src="../../static/images/dot_line.svg"></image>
				</view>
				<view style="padding-bottom:20rpx; display:flex;">
					<image style="width: 52rpx; height: 52rpx;padding-right:28rpx" src="../../static/images/2g.svg"></image>
					<view class="step">
						<view v-if="orderInfo.status!=4" style="color:#999999">阶段二：尾款（未开始）</view>
						<view v-if="orderInfo.status==4" style="color:#999999;display:flex;">阶段二：尾款（代付款）</view>
						<view>{{}}</view>
					</view>

				</view>
				<view v-if="orderInfo.status==4">
					<view class="pay-time" v-if="onSale" style="padding-left:78rpx; color:#C75943;">{{orderInfo.goods.startTime | formatDate}} 至 {{orderInfo.goods.endTime | formatDate}}</view>
					<view class="pay-time" v-if="!onSale" style="padding-left:78rpx; color:#999999;">{{orderInfo.goods.startTime | formatDate}} 至 {{orderInfo.goods.endTime | formatDate}}</view>
				</view>
			</view>
			<view class="order-detail">
				<view class="title">订单金额：</view>
				<view class="detail price">¥ {{(orderInfo.totalFee/100).toFixed(2)}}</view>
			</view>
			<view class="order-detail">
				<view class="title">订单编号：</view>
				<view class="detail">{{orderInfo.orderNo}}</view>
			</view>
			<view class="order-detail">
				<view class="title">创建时间：</view>
				<view class="detail">{{orderInfo.createTime | format}}</view>
			</view>
		</view>
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
		mounted(){
			this.checkTime()
		},
		data(){
			return {
				status:0,
				onSale:false,
			}
		},
		methods:{
			checkTime(){
				const date = Date.now();
				if(this.orderInfo.goods.startTime<date/1000){
					this.onSale=true;
				}else{
					this.onSale=false;
				}
			},
		},
		filters:{
			format(stamp){
				if(!stamp){
					return ""
				}else{
					const date = new Date(stamp*1000)
					const Y = date.getFullYear() + '-'
					const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
					const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
					const H = date.getHours() + ':'
					const M2 = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
					const S = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
					return Y + M + D + H + M2 + S
				}
			},
			formatDate(value) {
				if(value == undefined){
					return;
				}
				// let date = new Date(value * 1000);
				let date = new Date(value);
				//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM; //月补0
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d; //天补0
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h; //小时补0
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m; //分钟补0
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s; //秒补0
				// return y + '-' + MM + '-' + d; //年月日
				return y + '-' + MM + '-' + d + ' ' + h + ':' + m+ ':' + s; //年月日时分秒
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-info{
		width: 100%;
		background: #fff;
		padding: 0 40rpx 20rpx;
		.goods{
			height: 280rpx;
			padding: 40rpx 0;
			display: flex;
			align-items: center;
			border-bottom: 2rpx dashed #EEEEEE;
			.left{
				height:200rpx;
				width: 200rpx;
				.goods-pic{
					width: 100%;
					height: 100%;
				}
			}
			.right{
				width: calc(100% - 200rpx);
				padding: 20rpx;
				height: 200rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.goods-name{
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 44rpx;
				}
				.author{
					display: flex;
					align-items: center;
					margin-top: 20rpx;
					.author-pic{
						width: 36rpx;
						height: 36rpx;
						min-width: 36rpx;
						min-height: 36rpx;
						border-radius: 50%;
						margin-right: 10rpx;
					}
					.author-name{
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #000000;
						line-height: 34rpx;
					}
				}
			}
		}
		.order-detail-box{
			display: flex;
			flex-direction: column;
			justify-content: center;
			.pre-oder{
				display:flex;
				flex-direction:column;
				font-family: PingFangSC-Regular, PingFang SC;
				.step{
					width:100%;
					display:flex;
					justify-content:space-between;
				}
				.pay-time{
					font-size: 24rpx;
					font-family: SourceHanSansCN-Regular, SourceHanSansCN;
					font-weight: 400;
					color: #C75943;
				}
			}
			.order-detail{
				display: flex;
				justify-content: space-between;
				font-family: PingFangSC-Regular, PingFang SC;
				font-size: 28rpx;
				color: #000000;
				view{
					line-height: 60rpx;
				}
				.price{
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #C75943;
				}
			}
		}
	}
</style>