<template>
	<u-popup    :show="popQrshowAccpet" mode="center" close-icon-color="#999999"  @close="closeQr" @open="openQr">
		<view class="content">
			<view class="top">
				<view class="imagest">
					<view class="imageXiazai">
						
					</view>
				</view>
				<view class="top-erwei">
					<view class="title">
						收藏家xxx邀请您加入蓬莱数藏
					</view>
					<view class="ercontent">
						<view class="ercontent_left">
							<view class="font1">
								赶紧注册加入我们吧
							</view>
							<view class="font2">
								扫码打开蓬莱数藏，一起玩转数字藏品
							</view>
						</view>
						<img src="../static/images/位图.png" class="ercontent_right" />
					</view>
				</view>
			</view>
			<view @click="closeQr" class="bottom">
				取消
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		props:{
			popQrshow:{
				type:Boolean,
				default:()=>{
					return false
				}
			}
		},
		data() {
			return {
				popQrshowAccpet:this.popQrshow,
				
			}
		},
		watch:{
			popQrshow(newVal){
				this.popQrshowAccpet=newVal
			}
		},
		methods: {
			closeQr(){
				this.$emit("closePopQr")
			},
			openQr(){},
		}
	}
</script>

<style lang="less">
.imageXiazai{
	width: 72rpx;
	height: 72rpx;
	position: absolute;
	top: 20rpx;
	right: 20rpx;
	background: url(../static/images/保存.svg) no-repeat;
	background-size: 100% 100%;
}
.ercontent_left{
	height: 120rpx;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	padding-top: 10rpx;
}
.font1{
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #CCCCCC;
	line-height: 34rpx;
}
.font2{
	font-size: 20rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #EFCE91;
	line-height: 28rpx;
}
.ercontent_right{
	height: 120rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}
.ercontent_right{
	width: 120rpx;
	height: 120rpx;
	}
.ercontent{
	margin-top:10rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.title{
	margin-top: 36rpx;
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: #FFFFFF;
	line-height: 44rpx;
}
.top-erwei{
	width:100%;
	height: 240rpx;
	padding:0 20rpx 20rpx 20rpx;
}
.imagest{
	width: 100%;
	height: 500rpx;
	background: url("../static/images/占位图.png") no-repeat;
	background-size: 100% 100%;
	position: relative;
}
.top{
	width: 100%;
	height: 740rpx;
	background: #21201F;
	border-radius: 20rpx;
}
.bottom{
	width: 100%;
	height: 80rpx;
	background: #007980;
	border-radius: 20rpx;
	text-align: center;
	line-height: 80rpx;
	font-size: 36rpx;
	font-family: SourceHanSansCN-Medium, SourceHanSansCN;
	font-weight: 500;
	color: #000000;
}
::v-deep .u-popup__content{
	background: none !important;
	z-index: 9999 !important;
}
.content{
	width: 600rpx;
	height: 60vh;
	background: transparent;
	z-index: 9999;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
}
</style>
