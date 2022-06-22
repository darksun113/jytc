<template>
	<view class="pay-btn">
		<view class="price-box">
			待支付：<text class="price"> ¥ {{(price/100).toFiexd(2)}}</text>
		</view>
		<view class="btn" @click="toPay">
			去支付
		</view>
	</view>
</template>

<script>
	export default {
		props: ["payType_","orderNo","price"],
		data() {
			return {
				appType: "H5",
				payType: this.payType_
			}
		},
		methods: {
			toPay() {
				switch (this.payType) {
					case 'wxPay':
						this.wxPay()
						break;
					case 'aliPay':
						this.aliPay()
						break;
					case 'uniPay':
						this.uniPay()
				}
			},
			// 微信
			async wxPay() {
				try {
					const res = await uni.$http("/payment/prepay", {
						orderNo: this.orderNo,
						appType: 'H5',
						payType: "WX"
					})
					if (res.code == 0) {
						this.visible = true
						this.createQr(res.data.nativeWx.qrCodeUrl)
					} else {
						uni.showToast({
							title: res.errorMsg,
							icon: "error"
						})
					}
				} catch (error) {
					throw new Error("系统错误", error)
				}
			},
			// 银联
			async uniPay() {
				try {
					const res = await uni.$http("/payment/prepay", {
						orderNo: this.orderNo,
						appType: 'H5',
						payType: "UNION"
					})
					if (res.code == 0) {
						this.openPayWeb(res.data.webUnion.body)
					} else {
						uni.showToast({
							title: res.errorMsg,
							icon: "error"
						})
					}
				} catch (error) {
					throw new Error("系统错误", error)
				}
			},
			// 支付宝
			async aliPay() {
				try {
					const res = await uni.$http("/payment/prepay", {
						orderNo: this.orderNo,
						appType: 'H5',
						payType: "ZFB"
					})
					if (res.code == 0) {
						this.openPayWeb(res.data.h5Zfb.body)
					} else {
						uni.showToast({
							title: res.errorMsg,
							icon: "error"
						})
					}
				} catch (error) {
					throw new Error("系统错误", error)
				}
			},
			// 支付宝支付
			openPayWeb(body) {
				const formElement = document.createElement("div");
				formElement.style.display = "display:none;";
				formElement.innerHTML = body; //去到from
				if (formElement.firstChild) {
					document.body.appendChild(formElement);
					formElement.firstChild.submit(); //进行跳转
					document.body.removeChild(formElement);
					this.isToPay = true
				}
			},

		},
		watch: {
			payType_(type) {
				this.payType = type
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pay-btn {
		width: 100%;
		height: 188rpx;
		background: #FFFFFF;
		position: fixed;
		padding: 32rpx 40rpx;
		left: 0;
		bottom: 0;
		color: #000;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-family: PingFangSC-Medium, PingFang SC;

		.price {
			font-size: 44rpx;
			font-weight: 500;
			color: #C75943;
		}

		.btn {
			width: 240rpx;
			height: 84rpx;
			background: #C75943;
			border-radius: 44rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 84rpx;
			text-align: center;
		}
	}
</style>
