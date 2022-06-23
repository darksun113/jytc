<template>
	<view class="control-box">
		<view class="control"  @click="toOpenModelPre" >
			<img src="@/static/images/control_icon.svg" alt="">
		</view>
		<view class="control"  @click="toShare" style="margin-left: 80rpx;" v-if="buyerName == userName">
			<img src="@/static/images/share_icon.svg" alt="">
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			buyerName:[String]
		},
		data(){
			return{
				userName:uni.getStorageSync("userInfo").name
			}
		},
		methods:{
			toOpenModelPre(){
				this.$emit("preview")
			},
			toShare(){
				this.$emit("share")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.control-box{
		display: flex;
		width: 220rpx;
		justify-content: center;
		position: absolute;
		left: 50%;
		bottom: 20rpx;
		transform: translateX(-50%);
		.control{
			width: 60rpx;
			height: 60rpx;
			background: linear-gradient(180deg, #70D0FF 0%, #D575FF 100%);;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			img{
				width: 28rpx;
				height: 28rpx;
			}
		}
	}
</style>