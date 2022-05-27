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
		data() {
			return {
				isShow: false,
				identityShow:false
			}
		},
		methods:{
			toOrder(){
				const boo=this.$checkLogin()
				const certificationStatus=uni.getStorageSync("certificationStatus")
				if(boo){
					if(certificationStatus==1){
						const url = "/subpageB/OrderPage/OrderPage"
						this.$routerTo(url,'redirect')
					}else{
						this.identityShow=true
					}
				}else{
					this.isShow=true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn-box{
		width: 100%;
		height: 124rpx;
		background: #0A0C47;
		padding: 20rpx 40rpx;
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