<template>
	<view class="nav-box">
		<view class="nav-bar">
			<view class="bar" :style="{left:navType==0?'0':'64rpx'}"></view>
			<image :src="navType==0?require('./images/list_s_icon.svg'):require('./images/list_icon.svg')" @click="changeNav(0)"></image>
			<image :src="navType==1?require('./images/waterfall_s_icon.svg'):require('./images/waterfall_icon.svg')" @click="changeNav(1)"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				navType:0
			}
		},
		methods:{
			changeNav(type){
				this.navType=type
				this.$emit("changeShowType",type)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-box{
		padding: 40rpx 0;
		background-color: #222;
		.nav-bar{
			display: flex;
			position: relative;
			background: #333;
			border-radius: 20rpx;
			width: 128rpx;
			height: 64rpx;
			justify-content: space-around;
			align-items: center;
			image{
				width: 28rpx;
				height: 28rpx;
			}
			.bar{
				width: 64rpx;
				height: 64rpx;
				background: #666;
				position: absolute;
				border-radius: 16rpx;
				transition: all .5s ease; 
				top: 0;
				left: 0;
			}
		}
	}
</style>