<template>
	<view class="nav-box">
		<image class="back" src="@/static/images/nav_vack_icon.svg" @click="back" mode="aspectFill"></image>
		<view class="nav-bar">
			<view class="fans"  :class="{cur:curTab==0}" @click="$emit('changeTab',0)">粉丝</view>
			<view class="focus" :class="{cur:curTab==1}" @click="$emit('changeTab',1)">关注</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			current:[Number,String]
		},
		data(){
			return {
				curTab:this.current
			}
		},
		methods:{
			back(){
				this.$routerTo(1,'back')
			}
		},
		watch:{
			current(boo){
				this.curTab=boo
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-box{
		height: 100rpx;
		padding: 24rpx 0;
		position: relative;
		.back{
			width: 24rpx;
			height: 32rpx;
			position: absolute;
			left: 40rpx;
			top: 50%;
			transform: translateY(-50%);
		}
		.nav-bar{
			width: 232rpx;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 36rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #888888;
			line-height: 50rpx;
		}
		.cur{
			font-weight: 500;
			color: #FFFFFF;
			transition: all .3s ease;
		}
	}
</style>