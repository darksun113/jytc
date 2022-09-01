<template>
	<view class="banner">
		<image class="banner-pic" :src="seriesInfo.seriesImg" mode="aspectFill"></image>
		<view class="sell-info" v-if="seriesInfo.sellTime - curTime > 0">
			将于{{seriesInfo.sellTime | format}} 开售
		</view>
		<view class="sell-info" v-else>
			{{seriesInfo.sellTime | format}} 已开售
		</view>
	</view>
</template>

<script>
	import { formatYearToMinutes } from "@/utils/formatDate.js"
	export default {
		props:{
			seriesInfo:{
				type:Object,
				default:()=>{}
			}
		},
		data(){
			return {
				curTime:parseInt(Date.now()/1000)
			}
		},
		filters:{
			format:formatYearToMinutes
		}
	}
</script>

<style lang="scss" scoped>
	.banner{
		width: 100%;
		height: 540rpx;
		position: relative;
		.banner-pic{
			width: 100%;
			height: 100%;
		}
		.sell-info{
			position:absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 20rpx;
			width: 690rpx;
			height: 80rpx;
			background: rgba(0, 0, 0, .5);
			border-radius: 8rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 80rpx;
			text-align: center;
		}
	}
</style>