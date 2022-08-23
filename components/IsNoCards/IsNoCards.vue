<template>
	<view class="no-data">
		<view class="none-text">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"IsNoCards",
		data() {
			return {
				
			}
		},
		methods: { 

			
		}
	}
</script>

<style>
.no-data{
	width: 100%;
	margin-top: 300rpx;
	text-align: center;
	image{
		width: 200rpx;
		height: 160rpx;
	}
	.none-text{
		margin-top: 40rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #28D8E5;
		line-height: 40rpx;
	}
}
</style>
