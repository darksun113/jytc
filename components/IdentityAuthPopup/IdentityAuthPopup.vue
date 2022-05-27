<template>
	<u-popup :show="isShow" mode="center" @close="closePopup" bgColor="transparent">
		<view class="boxcenter">
			<image class="iset" src="@/static/images/idCord.png" mode=""></image>
			<view class="font16">
				<p>应工信部要求</p>
				<p>购买内容需要进行身份认证</p>
			</view>
			<button @click="toAutonym" class="renStyle">立即认证</button>
			<view @click="$emit('close')" class="font16" style="margin-top:20px;cursor: pointer;">稍后再去</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name:"IdentityAuthPopup",
		props:{
			show:{
				type:Boolean,
				default:()=>{
					return true
				}
			}
		},
		data(){
			return {
				isShow: this.show,
			}
		},
		methods:{
			closePopup() {
				this.$emit("close")
				uni.setStorageSync("certificationStatus", 3);
			},
			// 前往实名认证
			toAutonym(){
				this.$emit("close")
				const url = "/subpageA/BindIdCard/BindIdCard"
				this.$routerTo(url)
			}
		},
		watch:{
			show(val){
				this.isShow=val
			}
		}
	}
</script>

<style lang="scss">
	.boxcenter {
		width: 600rpx;
		height: 696rpx;
		flex-direction: column;
		background-color: #0A0C47;
		display: flex;
		justify-content: center;
		border-radius: 20rpx;
		align-items: center;
		.font16 {
			margin-top: 40rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
		}
		
		.display {
			display: none;
		}
		
		.renStyle {
			margin-top: 60rpx;
			width: 496rpx;
			height: 100rpx;
			background: linear-gradient(180deg, #70D0FF 0%, #D575FF 100%);
			border-radius: 8rpx;
			line-height: 100rpx;
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
		}
		
		.iset {
			width: 152rpx;
			height: 108rpx;
		}
	}
</style>
