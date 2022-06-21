<template>
	<u-popup :show="show" mode="center" @open="open" overlayOpacity="0.8" :closeOnClickOverlay="false"
		bgColor="transparent">
		<view class="poster-page">
			<image class="download_pic_icon" src="@/static/images/download_pic_icon.svg" @click="saveFile"></image>
			<image v-if="posterUrl" :src="posterUrl" mode="" style="height: 740rpx;width: 100%;"></image>
			<view class="poster-box" id="pagePoster" v-else>
				<image class="poster-pic" src="@/static/images/demo3.png" mode="aspectFill"></image>
				<view class="poster-content">
					<view class="poster-title nowrap">
						收藏家 {{userName}} 邀请你助力抽中白名单机会
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
							<canvas id="qrcode" canvas-id="qrcode" :style="{ width: `${size}px`, height: `${size}px` }"></canvas>
						</view>
					</view>
				</view>
			</view>
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
	import uQRCode from 'u-qrcode';
	import FileSaver from 'file-saver'
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
				userName:uni.getStorageSync("userInfo").fullName,
				show: this.isOpenPoster,
				size: 60,
				backgroundColor:"#FFFFFF",
				foregroundColor:"#000000",
				posterUrl:null
			}
		},
		methods: {
			initQrCode(){
				const prePurchaseId=this.posterData.prePurchaseId
				const userId=this.posterData.userId
				// const codeUrl = "http://web.penglainft.com/#/goods_detail?=3a7425333ee4419094e13c381d0c9086&instanceId&loadType=1&materialType=1"
				const codeUrl = `http://192.168.2.29:8080/#/subpageA/SharePage/SharePage?prePurchaseId=${prePurchaseId}$userId=${userId}`
				this.size=document.getElementById("qrBox").clientWidth
				const ctx = uni.createCanvasContext('qrcode');
				const uqrcode = new uQRCode(
				  {
				    text: codeUrl,
				    size: this.size
				  },
				  ctx
				);
				uqrcode.make();
				uqrcode.draw();
				this.$nextTick(()=>{
					this.canvasImage.generateImage((val)=>{
						this.posterUrl = val.replace(/[\r\n]/g, ''); // 去除base64位中的空格
					})
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
	view {
		box-sizing: border-box;
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
	.poster-page {
		position: relative;
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
			margin: 0 auto;
			height: 740rpx;
			background: #0A0C47;
			border-radius: 20rpx;
			position: relative;
			.poster-pic {
				width: 100%;
				height: 516rpx;
				background: #000000;
				border-radius: 20rpx 20rpx 0 0;
			}


			.poster-content {
				padding: 20rpx;
				padding-top: 10rpx;

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
							font-size: 24rpx;

							font-weight: 400;
							color: #CCCCCC;
							line-height: 34rpx;
						}

						.tip-2 {
							width: 320rpx;
							font-size: 20rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #A5A6FF;
							line-height: 34rpx;
						}
					}

					.right {
						width: 120rpx;
						// height: 120rpx;
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
			background: #5C5A88;
			border-radius: 8rpx;
			font-size: 18px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 84rpx;
			text-align: center;
		}
	}
</style>
