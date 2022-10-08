<template>
	<view class="btn-box">
		<view class="price">
			¥ {{(goodsData.goodsPrice/100).toFixed(2)}}
		</view>
		<view class="">
			<view class="btn" style="opacity: 0.65;" v-if="goodsData.goodsStatus == 3">
				已售罄
			</view>
			<view class="btn" style="opacity: 0.65;" v-else-if="goodsData.goodsStatus == 4">
				已结束
			</view>
			<!-- 预购白名单 -->
			<view class="btn" @click="toOrder" v-else-if="goodsData.selling==1 && goodsData.goodsStatus == 0">
				购买
			</view>
			<view class="btn" style="opacity: 0.65;" v-else-if="goodsData.goodsStatus == 0">
				即将开售
			</view>
			<view class="btn" @click="toOrder" v-else>
				购买
			</view>
		</view>
	</view>
</template>

<script>
	export  default {
		props:{
			goodsData:{
				type:Object,
				default:()=>{}
			}
		},
		data() {
			return {
				curTime:parseInt(Date.now()/1000)
			}
		},
		mounted() {
		},
		methods:{
			toOrder(){
				const boo=this.$checkLogin()
				if(boo){
					const certificationStatus=uni.getStorageSync("userInfo").certificationStatus
					if(certificationStatus==1){
						this.getOrderNo()
					}else{
						this.$emit("showIdentityShow")
					}
				}else{
					this.$emit("showLoginTip")
				}
			},
			async getOrderNo(){
				try{
					const goodsId = this.goodsData.goodsId
					const res = await uni.$http("/order/place",{goodsId})
					if(res.code==0){
						const url = `/subpageB/OrderPage/OrderPage?orderNo=${res.data.orderNo}`
						this.$routerTo(url,'redirect')
					}else{
						this.$toast(res.errorMsg)
					}
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn-box{
		width: 100%;
		height: 156rpx;
		background: #333;
		padding: 0 40rpx;
		// padding-bottom: 80rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: 500;
		.price{
			font-size: 48rpx;
			font-family: Roboto-Medium, Roboto;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 56rpx;
		}
		.btn{
			width: 400rpx;
			height: 80rpx;
			text-align: center;
			background: linear-gradient(90deg, #FFFFFF 0%, #28D8E5 50%, #C058F6 100%);
			border-radius: 20rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			line-height: 80rpx;
			color: #000000;
		}
	}
	
</style>