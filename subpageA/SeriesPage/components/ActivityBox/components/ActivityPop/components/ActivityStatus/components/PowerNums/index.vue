<template>
	<view class="power-num-box">
		<swiper class="number-of-power" :current="curDot" @change="swiperChange" :circular='true' :display-multiple-items="5">
			<swiper-item v-for="i in list" :key="i">
				<image src="@/static/images/default_avatar.png" mode=""></image>
			</swiper-item>
		</swiper>
		<view class="left-right-icon">
			<view class="left-back" @click.stop="leftImg">
				<u-icon name="arrow-left" color="#666666"></u-icon>
			</view>
			<view class="right-forword" @click.stop="rightImg">
				<u-icon name="arrow-right" color="#666666"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curDot:0,
				circular:true,
				list:[1,2,3,4,5,6,7,8,9,10]
			}
		},
		mounted() {
		},
		methods: {
			swiperChange(e){
				this.curDot = e.detail.current;
			},
			leftImg(){
				this.circular = false
				let num = this.list.length - 1
				if (this.curDot <= 0) {
					this.circular = true
					// this.curDot = num
					return
				} else {
					this.curDot--
				}
			},
			rightImg(){
				this.circular = true
				let num = this.list.length - 1
				if (this.curDot >= num) {
					return
					// this.curDot = 0
				} else {
					this.curDot++
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	uni-swiper{
		height: 80rpx;
	}
	.power-num-box{
		position: relative;
		height: 80rpx;
		.number-of-power{
			margin: 0 auto;
			width: 496rpx;
			margin-top: 20rpx;
			text-align: center;
			overflow: auto;
			white-space: nowrap;
			image{
				width: 80rpx;
				height:80rpx;
				margin-right: 20rpx;
				border-radius: 50%;
				&:last-child{
					margin-right: 0;
				}
			}
		}
		.left-right-icon{
			width: 100%;
			position: absolute;
			display: flex;
			justify-content: space-between;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
		}
	}
</style>
