<template>
	<view style="margin-top: 40rpx;">
		<view class="power-tip">
			完成以下操作立即帮TA助力
		</view>
		<view class="share-poster-btn" :style="{background:isRegister?'#5C5A88':'linear-gradient(180deg, #70D0FF 0%, #D575FF 100%)'}" v-if="true" @click="toRegister">
			{{$store.state.token?"已完成注册":"立即注册"}}
		</view>
		<view class="share-poster-btn" v-if="true" @click="toBlindIdCard">
			立即实名认证
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			prePurchaseInfo:{
				type:Object,
				default:()=>{}
			},
		},
		data(){
			return {
				// 是否已完成注册
				isRegister:false
			}
		},
		methods:{
			toRegister(){
				const prePurchaseId = this.prePurchaseInfo.prePurchaseId
				const inviter=this.prePurchaseInfo.buyerId
				const url=`/pages/login/LoginByMobile/GetVerifyCode/GetVerifyCode?name=share&inviter=${inviter}&prePurchaseId=${prePurchaseId}`
				this.$routerTo(url)
			},
			toBlindIdCard(){
				const url = `/subpageA/BindIdCard/BindIdCard`
				this.$routerTo(url)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.power-tip{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		line-height: 34rpx;
		text-align: center;
	}
	.share-poster-btn{
		margin: 0 auto;
		margin-top: 24rpx;
		width: 496rpx;
		height: 100rpx;
		background: linear-gradient(180deg, #70D0FF 0%, #D575FF 100%);
		border-radius: 8rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 100rpx;
		text-align: center;
		&:last-child{
			margin-top: 40rpx;
		}
	}
</style>