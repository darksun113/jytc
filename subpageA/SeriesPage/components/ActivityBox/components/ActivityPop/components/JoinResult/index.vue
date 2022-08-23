<template>
	<u-popup :show="show" mode="center" @open="open" overlayOpacity="0.8" :closeOnClickOverlay="false" bgColor="transparent">
		<view class="join-res-box">
			<view class="title-box">
				<image src="@/static/images/join_success_icon.svg" mode=""></image>
				<text class="">
					已参与
				</text>
			</view>
			<view class="container">
				获奖结果将于{{rewardTime_ |format}}公布
				邀请好友完成任务，有机会获得白名单
			</view>
			<view class="share-poster-btn" v-if="true" @click="toOpenSharePoster">
				分享我的专属海报
			</view>
			<view class="close-btn" @click="close">
				<image src="@/static/images/close_icon.svg" mode=""></image>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		props:['isShow',"rewardTime"],
	    data() {
	      return {
	        show: this.isShow,
			rewardTime_:this.rewardTime
	      }
	    },
	    methods: {
	      open() {
	        // console.log('open');
	      },
	      close() {
	        this.$emit("close")
	      },
		  toOpenSharePoster(){
			  this.$emit("close")
			  uni.$emit("toOpenSharePoster")
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
					const H = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
					const M2 = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
					return Y + '-' + M + '-' + D + ' ' + H + ":" + M2
				}
			}
		},
		watch:{
			isShow(val){
				this.show=val
			},
			rewardTime(newVal){
				this.rewardTime_=newVal
			}
		}
	  }
</script>

<style lang="scss" scoped>
	view{
		box-sizing: border-box;
	}
	.join-res-box{
		width: 600rpx;
		background: #333;
		border-radius: 20rpx;
		position: relative;
		padding: 60rpx 28rpx;
		.title-box{
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 48rpx;
				height: 48rpx;
				margin-right: 20rpx;
			}
			
		}
		.container{
			margin-top: 40rpx;
			text-align: justify;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			color: #FFFFFF;
			line-height: 52rpx;
		}
		.share-poster-btn{
			margin: 0 auto;
			margin-top: 40rpx;
			width: 496rpx;
			height: 100rpx;
			background: #28D8E5;
			border-radius: 8rpx;
			font-size: 16px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 100rpx;
			text-align: center;
		}
		.close-btn{
			width: 56rpx;
			height: 56rpx;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: -120rpx;
			image{
				width: 52rpx;
				height: 52rpx;
			}
		}
	}
</style>