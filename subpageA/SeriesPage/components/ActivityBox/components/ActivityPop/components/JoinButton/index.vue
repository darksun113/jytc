<template>
	<view class="join-btn-box">
		<view class="tip-check">
			<image @click="isChecked=false" v-if="isChecked" class="chick-icon" src="@/static/images/check_icon.svg" mode=""></image>
			<image @click="isChecked=true" v-else  class="chick-icon" src="@/static/images/un_check_icon.svg" mode=""></image>
			<view class="chick-text">
				我已了解活动规则且自愿参与
			</view>
		</view>
		<view class="btn" @click="toJoinActivity">
			确认
		</view>
		<JoinResult :isShow='isShow' @close="isShow=false"></JoinResult>
	</view>
</template>

<script>
	import JoinResult from "./components/JoinResult"
	export default {
		components:{
			JoinResult
		},
		data(){
			return {
				isChecked:true,
				isShow:false
			}
		},
		methods:{
			toJoinActivity(){
				this.isShow=true
				// this.$emit("joinSuccess")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.join-btn-box{
		.tip-check{
			display: flex;
			justify-content: center;
			align-items: center;
			.chick-icon{
				width: 30rpx;
				height: 30rpx;
				border-radius: 50%;
			}
			.chick-text{
				margin-left: 20rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 56rpx;
			}
		}
		.btn{
			margin: 0 auto;
			margin-top: 20rpx;
			width: 570rpx;
			height: 88rpx;
			background: linear-gradient(180deg, #70D0FF 0%, #D575FF 100%);
			border-radius: 8rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 88rpx;
			text-align: center;
		}
	}
</style>