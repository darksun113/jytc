<template>
	<!-- status:0未支付 1已取消 2已支付 -->
	<view v-if="orderInfo.status > 4" class="topBox">
		<image class="status-icon" src="../../static/images/payIng.svg" mode=""></image>
		<view class="tabRight">
			<view class="" style="font-size: 38rpx"> 待支付 </view>
			<view class="nowrap" style="font-size: 28rpx; display: flex; align-items: center">
				<view class=""> 交易剩余时间 </view>
				<view style="width: 140rpx;padding-left:10rpx;">
					<u-count-down :time="orderInfo.expireTime*1000 - curTime" format="HH:mm:ss" @finish="countEnd"></u-count-down>
				</view>
				<view > ,请及时付款！</view>
			</view>
		</view>
	</view>
	<view v-else-if="orderInfo.status == 2" class="topBox" style="background-color: #f9fff6">
		<image class="status-icon" src="../../static/images/paySuccess.svg" mode=""></image>
		<view class="tabRight">
			<view class="" style="font-size: 38rpx; color: #7ecf55"> 支付成功 </view>
			<view class="" style="font-size: 28rpx; display: flex; color: #7ecf55">
				感谢您对数字藏品的支持
			</view>
		</view>
	</view>
	<view v-else-if="orderInfo.status == 1" class="topBox">
		<u-icon name="close-circle" size="50" color="#999999"></u-icon>
		<view class="tabRight" style="font-size: 38rpx; color: #999999; line-height: 100rpx">
			订单已取消
		</view>
	</view>
	<view v-else-if="orderInfo.status == 4&& onSale==false" class="topBox1">
		<view class="tabRight">
			<view class="" style="font-size: 38rpx"> 尾款支付-未开始 </view>
			<view class="pay-time" style="color:#eca800;">{{orderInfo.goods.startTime | formatDate}} 至 {{orderInfo.goods.endTime | formatDate}}</view>
		</view>
	</view>
	<view v-else-if="orderInfo.status == 5" class="topBox-s5">
		<image class="status-icon" src="../../static/images/x_red.svg" mode=""></image>
		<view class="tabRight">
			<view class="" style="font-size: 38rpx"> 交易失败 </view>
			<view style="color:#333333;">已取消订单，等待商家退款</view>
		</view>
	</view>
	<view v-else-if="orderInfo.status == 6" class="topBox-s6">
		<image class="status-icon" src="../../static/images/x_grey.svg" mode=""></image>
		<view class="tabRight">
			<view class="" style="font-size: 38rpx:color:#999999"> 交易失败 </view>
			<view style="color:#333333;">已取消订单，等待商家退款</view>
		</view>
	</view>
	<view v-else-if="orderInfo.status == 7" class="topBox-s5">
		<image class="status-icon" src="../../static/images/x_red.svg" mode=""></image>
		<view class="tabRight">
			<view class="" style="font-size: 38rpx"> 交易失败 </view>
			<view style="color:#333333;">商家退款失败，请联系客服重新退款</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			orderInfo:{
				type:Object,
				default:()=>{}
			}
		},
		data(){
			return{
				curTime:parseInt(Date.now()),
				onSale:false,
			}
		},
		mounted(){
			this.checkTime()
		},
		methods:{
			countEnd(){
				this.orderInfo.status=1
			},
			checkTime(){
				const date = Date.now();
				if(this.orderInfo.goods.startTime<date/1000){
					this.onSale=true;
				}else{
					this.onSale=false;
				}
				console.log(this.onSale)
			},
		},
		watch:{
			
		},
		filters:{
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
	::v-deep .u-count-down__text{
		color: #ECA800;
		font-size: 28rpx;
	}
	.topBox1{
		width: 100%;
		height: 192rpx;
		background-color: #fffcf2;
		display: flex;
		align-items: center;
		color: #eca800;	
		.tabRight {
			padding-left: 40rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

		}
	}
	.topBox {
		width: 100%;
		height: 192rpx;
		background-color: #fffcf2;
		display: flex;
		padding: 0 40rpx;
		align-items: center;
		.status-icon {
			width: 80rpx;
			height: 80rpx;
		}
		.tabRight {
			padding-left: 40rpx;
			height: 100rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			color: #eca800;
		}
	}
	.pay-time{
		font-size: 14px;
		font-family: SourceHanSansCN-Regular, SourceHanSansCN;
		font-weight: 400;
		padding-top: 30rpx;
	}
	.topBox-s5{
		width: 100%;
		height: 192rpx;
		background-color: #FFF1F0;
		display: flex;
		padding: 0 40rpx;
		align-items: center;
		.status-icon {
			width: 80rpx;
			height: 80rpx;
		}
		.tabRight {
			padding-left: 40rpx;
			height: 100rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}
	.topBox-s6{
		width: 100%;
		height: 192rpx;
		background-color: #F2F2F2;
		display: flex;
		padding: 0 40rpx;
		align-items: center;
		.status-icon {
			width: 80rpx;
			height: 80rpx;
		}
		.tabRight {
			padding-left: 40rpx;
			height: 100rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}
</style>