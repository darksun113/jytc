<template>
	<view class="banner">
		<!-- <image class="banner-pic" :src="seriesInfo.seriesImg" mode="aspectFill"></image> -->
		<image class="banner-pic" src="@/static/images/demo1.png" mode="aspectFill"></image>
		<view class="sell-info" v-if="curTime - seriesInfo.sellTime > 0">
			<!-- 将于{{seriesInfo.sellTime | format}}开售 -->
			将于{{curTime | format}} 开售
		</view>
		<view class="sell-info" v-else>
			<!-- 将于{{seriesInfo.sellTime | format}}开售 -->
			{{curTime | format}} 已开售
		</view>
	</view>
</template>

<script>
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
			format(stamp){
				if(!stamp){
					return ""
				}else{
					const date = new Date(stamp*1000)
					const Y = date.getFullYear()
					const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) 
					const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
					return Y + '年' + M + '月' + D + '日'
				}
			}
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
			background: rgba(10, 12, 71, .5);
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