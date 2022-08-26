<template>
	<view>
		<view class="pay-btn">
			<view class="price-box">
				待支付：<text class="price"> ¥ {{(price/100).toFixed(2)}}</text>
			</view>
			<view class="btn" @click="toPay">
				去支付
			</view>
		</view>
		<u-popup class="pop" :show="shows" mode="bottom">
			<view class="head">
				<image @click="closePop" src="../../static/images/return.svg"></image>
				<view class="txt">请输入验证码</view>
			</view>
			<view class="body">
				<u-code-input class="input" v-model="verifyCode" :hairline="true" mode="line" color="#28D8E5" @finish="finish"></u-code-input>
			</view>
			<u-button class="resend" @click="resend">重新发送</u-button>
		</u-popup>
		<u-popup class="pop2" :show="check_shows" :round="10" mode="center">
			<view class="check_head">
				<view class="check_headtxt">支付提示</view>
				<image class="x" @click="closeCpop" src="../../static/images/x.svg"></image>
			</view>
			<view class="check_body">
				<view>因微信支付限制，需关注平台公众号后在微信</view>
				<view>浏览器打开平台才可使用微信进行支付！</view>
				<br>
				<view>第1步：打开微信添加朋友</view>
				<view>第2步：在搜索里输入公众号名称</view>
				<view>第3步：关注公众号即可在公众号开启网页</view>
			</view>
			<view class="copy" >
				<button class="copy-btn" @click="copy">
					点击复制名称
				</button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	let jweixin = require('jweixin-module')
	import {getWeChatAuthorization,checkWeChatCode} from "@/libs/jsm/wx-authorization.js"
	export function isWechatBrowser() {
		let status = navigator.userAgent.toLowerCase();
		if (status.match(/MicroMessenger/i) == "micromessenger") {
			//微信浏览器
			return true
		}else{
			return false
		}
	}

	export default {
		props:{
			payType_:[String,Number],
			orderNo:[String],
			price:[String,Number],
			cardId_:[String,Number],
		},
		data() {
			return {
				appType: "H5",
				payType: this.payType_,
				timer: null,
				shows: false,
				paygateBizSn: null,
				verifyCode:"",
				cardId: this.cardId_,
				isWx:false,
				check_shows: false,
			}
		},
		async mounted(){
			await checkWeChatCode(()=>{
				uni.hideLoading()
				this.wxPay()
			})
		},
		methods: {
			test(){
				console.log(this.cardId)
			},
			toPay() {
				switch (this.payType) {
					case 'bankPay':
						this.bankPay()
						break;
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
			closePop(){
				this.shows=false
			},
			closeCpop(){
				this.check_shows=false
			},
			async bankPay(){
				try{
					const res = await uni.$http("/payment/prepay", {
						orderNo: this.orderNo,
						appType: 'H5',
						payType: "YSKJ",
						ext: this.cardId
					})
					// alert("this.show: ",this.new_Show)
					if (res.code == 0) {
						this.$nextTick(()=>{
							this.shows=true
						})
						// alert("this.show: ",this.new_Show)
						// console.log(res.data.h5YsKj.body)
						uni.removeStorageSync("isWxPay")
						this.paygateBizSn=res.data.h5YsKj.body
					} else {
						uni.showToast({
							title: res.errorMsg,
							icon: "error"
						})
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			// 检查登录平台
			async checkWx(){
				// 是否是微信浏览器
				if (/(micromessenger)/i.test(navigator.userAgent)){
					// 是否电脑微信或者微信开发者工具
					if(/(WindowsWechat)/i.test(navigator.userAgent) || /(wechatdevtools)/i.test(navigator.userAgent)){
						// alert('电脑微信或者微信开发者工具')
						uni.showToast({
							title:"请在手机端微信打开",
							icon:"error"
						})
					}else{
						// 通过验证，确定是手机微信登录
						// 不需要关注公众号，继续支付流程
						this.isWx=true
						
					}
				} else {
					// alert('其他浏览器')
					// 弹窗 pop
					this.check_shows=true
				}
			},

			// 微信
			async wxPay() {
				try {
					this.checkWx()
					if(this.isWx){
						const res = await uni.$http("/payment/prepay", {
							orderNo: this.orderNo,
							appType: 'H5',
							payType: "YSWX"
						})
						const _this = this
						if (res.code == 0) {
							this.visible = true
							function onBridgeReady(){
								WeixinJSBridge.invoke(
								'getBrandWCPayRequest', {
									"appId":res.data.h5YsWx.appId,     //公众号ID，由商户传入     
									"timeStamp":res.data.h5YsWx.timeStamp,         //时间戳，自1970年以来的秒数     
									"nonceStr":res.data.h5YsWx.nonceStr, //随机串     
									"package":res.data.h5YsWx.packageStr,     
									"signType":res.data.h5YsWx.signType,         //微信签名方式：     
									"paySign":res.data.h5YsWx.paySign //微信签名 
								},
								function(res){
									if(res.err_msg == "get_brand_wcpay_request:ok" ){
										// 微信支付成功
										uni.removeStorageSync("isWxPay")
										_this.$emit("updateOrderInfo")
									}
								}); 
							}
							if (typeof WeixinJSBridge == "undefined"){
								if( document.addEventListener ){
									document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
								}else if (document.attachEvent){
									document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
									document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
								}
							}else{
								onBridgeReady();
							}
						}else if(res.code == 9){
							// 未授权
							getWeChatAuthorization()
						}else{
							this.$toast(res.errorMsg)
						}
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
						uni.setStorageSync("orderNo",this.orderNo)
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
				uni.removeStorageSync("isWxPay")
				const formElement = document.createElement("div");
				formElement.style.display = "display:none;";
				formElement.innerHTML = body; //去到from
				if (formElement.firstChild) {
					document.body.appendChild(formElement);
					formElement.firstChild.submit(); //进行跳转
					document.body.removeChild(formElement);
				}
			},
			//银行支付，验证手机验证码
			async finish(){
				try{
					const res = await uni.$http("/payment/confirmPay", {
						"appType": "H5",
						"payType": "YSKUAIJIE",
						"paygateBizSn": this.paygateBizSn, // 授权验证码
						"verifyCode": this.verifyCode ,// 验证码
					})
					this.verifyCode = ""
					if(res.code==0){
						alert("成功")
						this.$routerTo(`/subpageB/MyOrderCenter/MyOrderCenter?type=1`)
					}else{
						alert("支付失败")

					}


				}catch(e){
					//TODO handle the exception
				}
			},
			resend(){
				toPay()
			}
		},
		watch: {
			payType_(type) {
				this.payType = type
			},
			cardId_(id){
				this.cardId = id
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
	.pop{
		display: flex;
		flex-direction: column;
		.head{
			display: flex;
			image{
				width: 38rpx;
				height: 64rpx;
				padding: 20rpx 0rpx 20rpx 20rpx;
			}
			.txt{
				color: #000000;
				padding-top: 26rpx;
				padding-left: 220rpx;
				font-size: 36rpx;
			}
		}
		.body{
			padding:40rpx;
		　　justify-content: center;
			.input{
				padding-left: 90rpx;
			}
		}
		.resend{
			color: royalblue;
			background-color: white;
			border-color: #FFFFFF;
		}
	}
	.pop2{
			width: 600rpx;
			color: black;
			display: flex;
			flex-direction: column;
			font-size: 32rpx;
			border-radius: 20rpx;
			.check_head{
				height: 124rpx;
				display: flex;
				text-align: center;
				border-bottom: 2rpx solid #EEEEEE;
				.check_headtxt{
					font-size: 32rpx;
					font-weight: 500;
					padding: 40rpx 180rpx 40rpx 240rpx;
				}
				.x{
					width: 32rpx;
					height: 32rpx;
					padding: 46rpx 40rpx 0rpx 0rpx;
				}
			}
			.check_body{
				font-size: 28rpx;
				padding: 40rpx 30rpx;
				display: flex;
				flex-direction: column;
			}
			.copy{
				padding: 0rpx 160rpx 40rpx;
				.copy-btn{
					width: 280rpx;
					height: 64rpx;
					font-weight: 500;
					color: #000000;
					background: linear-gradient(180deg, #70D0FF 0%, #D575FF 100%);	
					text-align: center;
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					border-radius: 44rpx;
					background-color: white;
				}
			}
		}
</style>
