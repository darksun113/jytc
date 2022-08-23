<template>
	<view>
		<view class="btn-box">
			<view class="price">
				¥ {{(goodsData.goodsPrice/100).toFixed(2)}}
			</view>
			<view class="">
				<view class="btn" style="background: #007980;" v-if="goodsData.remainingNumber <= 0">
					已售罄
				</view>
				<!-- 预购白名单 -->
				<view class="btn" @click="toOrder" v-else-if="goodsData.selling==1">
					购买
				</view>
				<view class="btn" style="background: #007980;" v-else-if="curTime - goodsData.startTime < 0">
					即将开售
				</view>
				<view class="btn" @click="toOrder" v-else>
					购买
				</view>
			</view>
		</view>
		<LoginTipPop name="goodsDetail" :isShow="isShow" @close="isShow=false"></LoginTipPop>
		<IdentityAuthPopup :show="identityShow" @close="identityShow=false"></IdentityAuthPopup>
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
				isShow: false,
				identityShow:false,
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
						this.identityShow=true
					}
				}else{
					this.isShow=true
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
			background: #28D8E5;
			border-radius: 20rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			line-height: 84rpx;
			color: #000000;
		}
	}
	
</style>