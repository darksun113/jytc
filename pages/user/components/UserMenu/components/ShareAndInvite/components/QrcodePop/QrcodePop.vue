<template>
	<u-popup  :show="popQrshowAccpet" mode="center" close-icon-color="#999999"  @close="closeQr" @open="openQr">
		<view class="content">
			<view class="top">
				<view class="imagest">
					<view @click="saveImage" class="imageXiazai">
						
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
						<!-- 调接口打开 -->
						<!-- <view class="ercontent_right" id="qrBox">
							<canvas id="qrcode" canvas-id="qrcode" :style="{ width: `${size}px`, height: `${size}px` }"></canvas>
						</view> -->
					</view>
				</view>
			</view>
			<view @click="closeQr" class="bottom">
				取消
			</view>
		</view>
	</u-popup>
</template>

<script >
	import FileSave from 'file-saver'
	import uQRCode from 'uqrcodejs'
	import {imgPathToBase64,blobToBase64} from "@/utils/tools.js"
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
				posterUrl:null,
				size:60,	
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
			openQr(){
				// this.initQrCode() 调接口再打开
			},
			initQrCode(){
				if(this.posterUrl){ return}
				this.size=document.getElementById("qrBox").clientWidth
				const ctx=uni.createCanvasContext('qrcode')
				const uqrcode = new uQRCode(
				{
					text:this.posterData.codeUrl,
					size:this.size
				},
				ctx
				);
				uqrcode.make();
				uqrcode.draw();
				this.$nextTick(()=>{
					this.canvasImage.generateImage((val)=>{
						this.posterUrl=val.replace(/[\r\n]/g, '')
					})
				})
			},
			saveImage(){
				FileSave.saveAs(this.posterUrl)
			},
			
		}
	}
</script>
<script lang="renderjs" module="canvasImage">
 import html2canvas from 'html2canvas'	
 export default{
	 methods: {
	 		// 生成图片需要调用的方法
	 		generateImage(callback) {
	 			setTimeout(() => {
	 				const dom = document.getElementById('pagePoster') // 需要生成图片内容的 dom 节点
	 				html2canvas(dom, {
	 					backgroundColor: "rgba(0,0,0,0)",
	 					width: dom.clientWidth, //dom 原始宽度
	 					height: dom.clientHeight,
	 					scrollY: 0, // html2canvas默认绘制视图内的页面，需要把scrollY，scrollX设置为0
	 					scrollX: 0,
	 					useCORS: true, //支持跨域
	 					crossOrigin:"anonymous",
	 					scale: 10, // 设置生成图片的像素比例，默认是1，如果生成的图片模糊的话可以开启该配置项
	 				}).then((canvas) => {
	 					// 生成成功
	 					// html2canvas 生成成功的图片链接需要转成 base64位的url
	 					callback(canvas.toDataURL('image/png'))
	 				}).catch(err => {
	 					// 生成失败 弹出提示弹窗
	 				})
	 			}, 300)
	 		}
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
	width: 120rpx;
	min-width: 120rpx;
	background-color: #FFFFFF;
	border: 4rpx solid #FFF;
	display: flex;
	justify-content: center;
	align-items: center;
	image {
		width: 100%;
		height: 100%;
	
	}
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
