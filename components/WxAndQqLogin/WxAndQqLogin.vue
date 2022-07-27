<template>
	<view class="login-box" v-if="isWeixin">
		<view class="title">
			———&nbsp;&nbsp;&nbsp;其它方式登录&nbsp;&nbsp;&nbsp;———
		</view>
		<view class="login-module">
			<image src="@/static/images/wechat.svg" v-if="isWeixin" @click="getWeChatLogin"></image>
			<!-- <image src="@/static/images/qq.svg" @click="loginQQ"></image> -->
		</view>
	</view>
</template>

<script>
	import {getWeChatLogin} from "@/libs/jsm/wx-login.js"
	export default{
		name:"WxAndQqLogin",
		data(){
			return {
				isWeixin: false,
			}
		},
		mounted() {
			this.isWeixin=this.isWechat()
		},
		methods:{
			getWeChatLogin,
			// 判断是否微信浏览器环境
			isWechat() {
				return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
			},
			// loginQQ(){
			// 	QC.Login.showPopup({
			// 		appId:"1112149835",
			// 		redirectURI:"http://192.168.2.27:8080/pages/home/home"
			// 	})
			// 	// uni.navigateTo({
			// 	// 	url:"/pages/login/BindingPhone/BindingPhone"
			// 	// })
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.login-box{
		.title{
			font-size: 28rpx;
			text-align: center;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #DDDDDD;
			line-height: 44rpx;
		}
		.login-module{
			width: 380rpx;
			margin: 0 auto;
			margin-top: 40rpx;
			display: flex;
			justify-content: space-around;
			image{
				width: 100rpx;
				height: 100rpx;
			}
		}
	}
</style>