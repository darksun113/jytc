<template>
	<PageTemp>
		<view class="login-page">
			<view class="title-box">
				<view class="title-text">
					帐号密码登录
				</view>
				<view class="title-tip">
					使用已注册手机号登录
				</view>
			</view>
			<view>
				<u--form labelPosition="left" :model="form" :rules="rules" ref="uForm">
					<u-form-item style="position: relative;" label="" prop="phone" ref="phone">
						<u--input placeholder="请输入手机号码" v-model="form.phone" type="number" suffixIconStyle="color:#000"
							color="#FFFFFF" border="bottom" :customStyle="{marginTop:'90rpx'}" :focus="true" clearable>
						</u--input>
					</u-form-item>
					<u-form-item style="position: relative;" label="" prop="pwd" ref="pwd">
						<u--input placeholder="请输入密码" v-model="form.pwd" type="password" suffixIconStyle="color:#000"
							color="#FFFFFF" border="bottom" clearable	>
						</u--input>
					</u-form-item>
				</u--form>
			</view>
			<view class="agreement-check">
				<u-checkbox-group v-model="checkGrop">
					<u-checkbox activeColor="#9A98ED" inactiveColor="#999999" name="agree" iconColor="#000" size="14">
					</u-checkbox>
				</u-checkbox-group>
				<view class="agreement-text">
					同意并遵守<text>《用户协议》</text>与<text>《隐私政策》</text>
				</view>
			</view>
			<view :style="{opacity:checkGrop[0]=='agree'?'1':'0.5'}" class="get-verification-code-btn" @click="getCode">
				立即登录
			</view>
			<view style="display: flex;justify-content: space-between;margin-top: 40rpx;">
				<view class="to-pwd-page" @click="toPhoneLogin">
					手机动态密码登录
				</view>
				<view class="forget" @click="toResetPwd">
					忘记密码？
				</view>
			</view>
		</view>
		<PuzzleCode style="z-index:9999999" @resetPuzzle="starCheckRobot" :bind="$attrs" :show="isPuzzleShow"
			success-text="验证成功" fail-text="验证失败" slider-text="拖动滑块完成拼图" @success="puzzleSuccess" @close="puzzleClose" />
	</PageTemp>
</template>

<script>
	import mixin from "../mixins/PuzzleCodeMixin.js"
	import {getFilePath,rsaEncrypt} from "@/utils/tools.js"
	export default {
		data() {
			return {
				checkGrop: [],
				// 判断是否需要开启人机验证
				isNeedPuzzle:true,
				form:{
					phone: null,
					pwd:null,
				},
				rules: {
					phone:[
						{
							required: true, 
							message: '请输入手机号', 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['blur'],
						},
						{
							// 自定义验证函数
							validator: (rule, value, callback) => {
								// this.$u.test.mobile()就是返回true或者false的
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['blur','change'],
						}
					],
					pwd:[
						{
							required: true, 
							message: '请输入密码', 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['blur','change'],
						},
					]
				},
			}
		},
		mixins: [mixin],
		methods: {
			getCode() {
				this.$refs.uForm.validate().then(res => {
					if (this.checkGrop[0] !== 'agree') {
						uni.$u.toast('请先阅读并勾选用户协议与隐私政策')
						return
					} else {
						if(this.isNeedPuzzle){
							this.starCheckRobot(1)
						}else{
							this.toLogin()
						}
					}
				}).catch(errors => {
					// uni.$u.toast('校验失败')
				})
			},
			toResetPwd(){
				const url="../ResetPwd/ResetPwd"
				this.$routerTo(url)
			},
			// 滑动拼图验证成功
			puzzleSuccess(id) {
			    this.slidingFigureId=id
			    this.isPuzzleShow = false // 通过验证后，需要手动隐藏模态框
			    if (this.loginType && this.loginType == 1) {
			        this.toLogin()
			    } else {
			        this.getVerificationCode(this.phone)
			    }
			},
			toLogin(){
				// #ifdef H5
					this.loginRequest()
				// #endif
			},
			async loginRequest(){
				try{
					const browserCode=uni.getStorageSync("browserCode")
					const pwd=await rsaEncrypt(this.form.pwd)
					const res=await uni.$http("/user/webPwdLogin",{
						browserCode,
						pwd,
						phone:this.form.phone,
						slidingFigureId:this.slidingFigureId
					})
					if(res.code==0){
						uni.setStorageSync("token",res.data.token)
						let timer = setTimeout(()=>{
							clearTimeout(timer)
							uni.$u.toast('登录成功')
							this.$routerTo(1,"back")
						},1000)
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			toPhoneLogin(){
				const url="../LoginByMobile/GetVerifyCode/GetVerifyCode"
				this.$routerTo(url,"redirect")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-page{
		padding: 96rpx 100rpx;
		.title-box {	
			.title-text {
				font-size: 42rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 48rpx;
			}
		
			.title-tip {
				margin-top: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #CCCCCC;
				line-height: 48rpx;
			}
		}
		
		.agreement-check {
			margin-top: 60rpx;
			display: flex;
			align-items: center;
		
			.agreement-text {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				color: #999999;
				line-height: 44rpx;
		
				text {
					color: #FFFFFF;
				}
			}
		}
		
		.get-verification-code-btn {
			margin: 0 auto;
			margin-top: 60rpx;
			width: 550rpx;
			height: 88rpx;
			background: linear-gradient(180deg, #70D0FF 0%, #D575FF 100%);
			border-radius: 16rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 88rpx;
			text-align: center;
		}
		.to-pwd-page{
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 44rpx;
		}
		.forget{
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #6667AB;
			line-height: 44rpx;
		}
	}
	::v-deep .u-form-item__body__right__message {
		position: absolute;
		bottom: -20rpx;
		left: 0;
		margin-left: 0 !important;
	}
</style>