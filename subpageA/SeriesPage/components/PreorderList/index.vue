<template>
	<view class="prePage">
		<view class="prePage_left">
			<view class="">
			   {{leftTextStatus}}
			</view>
			<view class="numberSty">
				{{participateNumber}}人参与
			</view>
			<!-- <view class="numberSty">
				开启预购活动
			</view> -->
		</view>
		<!-- 未开启的话背景色 opacity: 0.5;-->
		<view class="prePage_right">
			{{statusBtnText}}
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				statusBtnText:'查看', //参与,已参与 
				participateNumber:2311231,
				leftTextStatus:'查看获得预购资格名单', //预购活动已开启 //开启预购活动 //时间年月日时分秒2022-07-01 10:00
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="less">
	.prePage{
		margin: 0 auto;
		width: 690rpx;
		margin-top: 40rpx;
		height: 180rpx;
		background: #333333;
		border-radius: 20rpx;
		padding:  40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.prePage_left{
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			height: 100%;
		}
		.prePage_right{
			width: 200rpx;
			height: 64rpx;
			background: #28D8E5;
			border-radius: 20rpx;
			text-align: center;
			line-height: 64rpx;
			font-size: 28rpx;
			font-family: SourceHanSansCN-Medium, SourceHanSansCN;
			font-weight: 500;
			color: #000000;
		}
	}
	.numberSty{
		font-size: 24rpx;
		font-family: Roboto-Regular, Roboto;
		font-weight: 400;
		color: #FFFFFF;
	}
</style>