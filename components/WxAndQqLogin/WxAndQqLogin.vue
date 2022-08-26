<template>
	<view class="login-box" v-if="isWeixin">
		<view class="title">
			———&nbsp;&nbsp;&nbsp;其它方式登录&nbsp;&nbsp;&nbsp;———
		</view>
		<view class="login-module">
			<image src="@/static/images/wechat.svg" v-if="isWeixin" @click="getWeChatAuthorization"></image>
			<!-- <image src="@/static/images/qq.svg" @click="loginQQ"></image> -->
		</view>
	</view>
</template>

<script>
	import {getWeChatAuthorization} from "@/libs/jsm/wx-authorization.js"
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
			getWeChatAuthorization,
			// 判断是否微信浏览器环境
			isWechat() {
				return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
			},
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