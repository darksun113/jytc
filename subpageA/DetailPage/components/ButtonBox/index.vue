<template>
	<view class="btn-box">
		<view class="btn" @click="toOrder">
			购买
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
				identityShow:false
			}
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
						uni.$u.toast(res.errorMsg)
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
		height: 208;
		background: #0A0C47;
		padding: 20rpx 40rpx;
		padding-bottom: 80rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		.btn{
			width: 100%;
			height: 84rpx;
			text-align: center;
			background: linear-gradient(180deg, #70D0FF 0%, #D575FF 100%);
			border-radius: 8rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			line-height: 84rpx;
			color: #000000;
		}
	}
</style>