<template>
	<u-popup :show="show" class="popup" @close="cancel" :closeable="true" bgColor="transparent" mode="center" >
		<view class="tokenbox">
			<view class="token_tip">
				<view>请先登录而使用平台所有功能</view>
			</view>
			<button @click="toLogin" class="btn">立即登录</button>
		</view>
	</u-popup>
</template>

<script>
	import {PingAn_login} from "../../libs/jsm/PingAn-app.js"
	export default{
		name:"LoginTipPop",
		props:{
			isShow:{
				type:Boolean,
				default:()=>{
					return false
				}
			},
			name:{
				type:String,
				require:true
			}
		},
		data(){
			return{
				show:this.isShow
			}
		},
		mounted() {
			
		},
		watch:{
			isShow(newVal){
				this.show=newVal
			}
		},
		methods:{
			getLogin(callback) {
				uni.login({
					success: (res) => {
						callback(res.code);
					},
				});
			},
			cancel(){
				this.$emit("close")
			},
			toLogin() {
				uni.removeStorageSync("token")
				this.$emit("close")
				if(this.$isMap_PingAn){
					PingAn_login(()=>{
						this.$emit("loginSuccess")
					})
				}else{
					const url =  "/pages/login/LoginByMobile/GetVerifyCode/GetVerifyCode?name=user"
					this.$routerTo(url)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
		.tokenbox {
			width: 640rpx;
			flex-direction: column;
			color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
			background:#333;
			border-radius: 16rpx;
			text-align: center;
			.token_tip{
				padding: 30rpx;
				height: 252rpx;
				display: flex;
				align-items: center;
				view{
					height: 48rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #CCCCCC;
					line-height: 48rpx;
				}
			}
			.btn {
				width: 100%;
				line-height: 100rpx;
				background: rgba(0, 0, 0, 0);
				color: #FFFFFF;
				border:solid 0px #000000;
				border-top: 2rpx solid rgba(255,255,255,.15);
			}
		}
</style>
