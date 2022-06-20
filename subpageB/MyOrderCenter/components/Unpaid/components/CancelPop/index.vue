<template>
	<u-popup :show="show" mode="center" bgColor="transparent">
		<view class="pop-box">
			<view class="main">
				<view class="title">确认要取消订单吗</view>
				<view class="tip-info">
					订单取消后可能会发生限量藏品库存不足无法再购买的情况
				</view>
			</view>
			<view class="operate-box">
				<view class="left" @click="$emit('close')">
					取消
				</view>
				<view class="right" @click="cancelOrder">
					确认
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default{
		props:{
			isShow:{
				type:Boolean,
				default:()=>false
			},
			orderNo:[Number,String]
		},
		data(){
			return {
				show:this.isShow,
				renameValue:""
			}
		},
		methods:{
			async cancelOrder(){
				try{
					this.$emit("cancelSuccess")
					const res=await uni.$http("/order/cancel",{orderNo:this.orderNo})
					if(res.code==0){
						this.$emit("cancelSuccess")
					}else{
						this.$toast(res.errorMsg)
					}
				}catch(e){
					//TODO handle the exception
				}
			}
		},
		watch:{
			isShow(boo){
				this.show=boo
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pop-box{
		width: 640rpx;
		background: #0A0C47;
		overflow: hidden;
		border-radius: 16rpx;
		.main{
			padding: 40rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			color: #FFFFFF;
			line-height: 48rpx;
			text-align: center;
			.title{
				font-size: 34rpx;
				font-weight: 500;
				margin-top: 8rpx;
			}
			.tip-info{
				width: 544rpx;
				margin: 0 auto;
				margin-top: 20rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #CCCCCC;
				line-height: 48rpx;
				text-align: center;
			}
		}
		.operate-box{
			height: 110rpx;
			border-top: 2rpx solid rgba(255, 255, 255, .2);
			display: flex;
			justify-content: space-between;
			view{
				flex:1;
				text-align:center;
				line-height:110rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-size: 34rpx;
				&:first-child{
					color: #AAAAAA;
					border-right: 2rpx solid rgba(255, 255, 255, .2);
				}
			}
		}
	}
</style>