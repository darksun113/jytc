<template>
	<u-popup :show="show" mode="center" @open="open" overlayOpacity="0.8" :closeOnClickOverlay="false"
		bgColor="transparent">
		<view class="poster-page">
			<image v-if="posterData.loadType==3" class="download_pic_icon" src="@/static/新增icon/保存.svg" @click="saveFile"></image>
			<image v-else class="download_pic_icon" src="@/static/images/download_pic_icon.svg" @click="saveFile"></image>
			<image v-if="posterUrl" :src="posterUrl" mode="" style="height: 740rpx;width: 100%;"></image>
			<view class="poster-box" id="pagePoster" v-else>
				<view class="poster-pic">
					<img v-lazy  v-if="posterData.loadType!=3" crossorigin="anonymous" :src="posterData.posterImg + '?' + new Date().getTime()" >
					<img v-lazy v-else  crossorigin="anonymous" src="@/static/新增icon/占位图.png" >
				</view>
				<view class="poster-content" v-if="posterData.loadType==0">
					<view style="max-width: 500rpx;" class="poster-title nowrap_s">
						 {{userName}} 
					</view>
					<view class="poster-detail">
						<view class="left">
							<view class="tip">
								参与拉新活动 有机会获得白名单
							</view>
							<view class="tip-2">
								扫码打开金裕天成数字资产交易平台
								一起玩转数字藏品
							</view>
						</view>
						<view class="right" id="qrBox">
							<canvas id="qrcode" canvas-id="qrcode" :style="{ width: `${size}px`, height: `${size}px`}"/>
						</view>
					</view>
				</view>
				<view style="background: none;background-size: none;" class="poster-content" v-if="posterData.loadType==3">
					<p style="max-width: 600rpx;" class="poster-title nowrap_s">
						 {{userName}} 
					</p>
					<view class="poster-detail">
						<view class="left">
							<view class="tip"> 
								赶紧注册加入我们吧
							</view>
							<view class="tip-3">
								扫码打开数版通，一起玩转数字藏品 
							</view>
						</view>
						<view class="right" id="qrBox">
							<canvas id="qrcode" canvas-id="qrcode" :style="{ width: `${size}px`, height: `${size}px`}"/>
						</view>
					</view>
				</view>
				<view class="poster-goods-content" v-if="posterData.loadType!=0 && posterData.loadType!=3">
					<view class="poster-goods-title">
						<view class="left nowrap">
							{{posterData.goodsName&&posterData.goodsName.length>22? posterData.goodsName.substr(0,12)+'...' : posterData.goodsName}}
						</view>
						<view class="right">
							#{{posterData.goodsCode}}/{{posterData.totalNum}}
						</view>
					</view>
					<view class="poster-goods-detail">
						<view class="left">
							<view class="item">
								<text class="title">持有者：</text>
								<view class="info">
									<img v-lazy crossorigin="anonymous" :src="posterData.avatar+ '?' + new Date().getTime()" >
									<view class="name nowrap">{{posterData.name && posterData.name.length>10? posterData.name.substr(0,8)+'...':posterData.name}}</view>
								</view>
							</view>
							<view class="item">
								<text class="title">发行方：</text>
								<view class="info">
									<img v-lazy crossorigin="anonymous" :src="posterData.shopIcon+ '?' + new Date().getTime()" >
									<view class="name nowrap">{{posterData.shopName && posterData.shopName.length>10? posterData.shopName.substr(0,8)+'...': posterData.shopName}}</view>
								</view>
							</view>
						</view>
						<view class="right" id="qrBox">
							<canvas id="qrcode" canvas-id="qrcode" :style="{ width: `${size}px`, height: `${size}px` }"/>
						</view>
					</view>
				</view>
			</view>
			<view class="note">长按分享或保存至手机相册</view>
			<view class="close-btn" @click="close">
				取消
			</view>
		</view>
		
		<view class="mask" v-if="!posterUrl">
			<u-loading-icon mode="semicircle" size="36"></u-loading-icon>
		</view>
	</u-popup>
</template>

<script>
	import uQRCode from "../../libs/jsm/uqrcode.js";
	import FileSaver from 'file-saver'
	import {imgPathToBase64,blobToBase64} from "@/utils/tools.js"
	export default {
		name:"SharePoster",
		props: {
			posterData: {
				type: Object,
				default: () => {}
			},
			isOpenPoster: [Boolean]
		},
		data() {
			return {
				userName:uni.getStorageSync("userInfo").name,
				show: this.isOpenPoster,
				size: 60,
				posterUrl:null,
			}
		},
		methods: {
			initQrCode(){
				if(this.posterUrl)return
				this.size=document.getElementById("qrBox").clientWidth
				const ctx = uni.createCanvasContext('qrcode');
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: this.posterData.codeUrl,
					size: this.size,
					margin: 0,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
					errorCorrectLevel: uQRCode.errorCorrectLevel.H,
					success: () => {
						this.$nextTick(()=>{
							this.canvasImage.generateImage((val)=>{
								this.posterUrl = val.replace(/[\r\n]/g, ''); // 去除base64位中的空格
							})
						})
					}
				})
			},
			// 保存图片至本地
			saveFile(){
				FileSaver.saveAs(this.posterUrl)
			},
			open() {
				this.initQrCode()
			},
			close() {
				this.$emit("close")
			}
		},
		watch: {
			isOpenPoster(val) {
				this.show = val
			}
		}
	}
</script>
<script lang="renderjs" module="canvasImage">
	import html2canvas from 'html2canvas'
	export default {
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
						dpi:300,//处理模糊问题
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

<style lang="scss" scoped>
	.note{
		text-align: center;
        margin-top: 20rpx;
		font-size: 28rpx;
		font-family: SourceHanSansCN-Regular, SourceHanSansCN;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 21rpx;
	}
	.nowrap_s {
		overflow: hidden;       /* 隐藏溢出 */
		word-break: break-all;  /* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;  /* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 1; /** 显示的行数 **/
		font-size: 32rpx;
	}
	view {
		box-sizing: -box;
	}
	.mask{
		width: 100%;
		height: 100vh;
		position: fixed;
		background: #04030A;
		z-index: 2;
		left: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tip-3{
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #EFCE91;
		line-height: 28rpx;
	}
	.poster-page {
		position: relative;
		width: 588rpx;
		.download_pic_icon {
			width: 72rpx;
			height: 72rpx;
			border-radius: 50%;
			position: absolute;
			right: 40rpx;
			top: 20rpx;
			z-index: 1;
		}

		.poster-box {
			width: 588rpx;
			height: 740rpx;
			background: #333;
			border-radius: 20rpx;
			overflow: auto;
			.poster-pic {
				width: 100%;
				height: 516rpx;
				background: #000000;
				border-radius: 20rpx 20rpx 0 0;
				overflow: hidden;
				display: flex;
				justify-content: center;
				align-items: center;
				img{
					width:100% ;
					height: 100%;
					object-fit: cover;
					overflow: auto;
				}
			}


			.poster-content {
				padding: 20rpx;
				padding-top: 10rpx;
				background: url("../../static/images/card_bg.png") no-repeat right center;
				background-size: auto 160%; 
				.poster-title {
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 44rpx;
				}

				.poster-detail {
					height: 120rpx;
					margin-top: 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.left {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						height: 120rpx;
						font-family: PingFangSC-Regular, PingFang SC;

						.tip {
							width: 420rpx;
							font-size: 24rpx;
							font-weight: 400;
							color: #CCCCCC;
							line-height: 34rpx;
						}

						.tip-2 {
							width: 380rpx;
							font-size: 20rpx;
							font-weight: 400;
							color: #28D8E5;
							line-height: 34rpx;
						}
					}

					.right {
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
				}
			}

			.poster-goods-content{
				padding: 20rpx;
				padding-top: 10rpx;
				background: url("../../static/images/card_bg.png") no-repeat right center;
				background-size: auto 160%; 
				.poster-goods-title{
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 44rpx;
					view{
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 44rpx;
					}
				}
				.poster-goods-detail{
					height: 120rpx;
					margin-top: 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.left {
						height: 120rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						display: flex;
						flex-direction: column;
						justify-content: flex-end;
						.item{
							margin-top: 10px;
							display: flex;
							align-items: center;
							.title{
								width: 100rpx;
								min-width: 50px;
								font-size: 24rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #CCCCCC;
								line-height: 34rpx;
							}
							.info{
								display: flex;
								align-items: center;
								text-align: left;
								img{
									width: 32rpx;
									min-width: 32rpx;
									height: 32rpx;
									border-radius: 50%;
									margin-right: 10rpx;
								}
								view{
									font-size: 24rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #CCCCCC;
									line-height: 34rpx;
									text-align: left;
								}
								.name{
									max-width: 260rpx;
									font-size: 24rpx;
								}
							}
						}
					}
					.right {
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
				}
			}
		}

		.close-btn {
			margin-top: 60rpx;
			width: 620rpx;
			height: 84rpx;
			background: #007980;
			border-radius: 20rpx;
			font-size: 18px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 84rpx;
			text-align: center;
		}
	}
</style>
