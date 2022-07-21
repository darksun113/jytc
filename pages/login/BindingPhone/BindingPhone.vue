<template>
	<PageTemp class="bind-page">
		<view class="tip-text">
			请输入您的账号信息确认后立即绑定，未注册的手机号验证后将自动创建新账号进行绑定！
		</view>
		<view class="form">
			<u--form :model="form" ref="uForms">
				<u-form-item label="" prop="phone" style="position: relative;">
					<u--input placeholder="请输入手机号码" v-model="form.phone" type="number" suffixIconStyle="color:#000"
						color="#FFFFFF" border="bottom" :customStyle="{marginTop:'90rpx'}" :focus="true" clearable>
					</u--input>
				</u-form-item>
				<u-form-item label="" class="pwd" prop="verifyCode" style="position: relative;">
					<u--input placeholder="请输入验证码" v-model="form.verifyCode" type="number" suffixIconStyle="color:#000"
						color="#FFFFFF" border="bottom">
					</u--input>
					<view :style="{opacity:!$store.state.isCount ?'1':'0.5'}" class="get-verification-code-btn"
						@click="getCode">
						{{$store.state.isCount?$store.state.second+'秒后重新获取':'获取验证码'}}
					</view>
				</u-form-item>
			</u--form>
			<u-button text="确认" :custom-style="{color:'#000',marginTop:'150rpx',fontFamily: 'PingFangSC-Regular, PingFang SC',height:'100rpx',
				opacity:form.verifyCode.length==6?'1':'0.5',borderRadius: '16rpx'}" @click="toBindPhone"
				color="linear-gradient(180deg, #70D0FF 0%, #D575FF 100%)"></u-button>
		</view>
	</PageTemp>
</template>

<script>
	import PuzzleCodeMixin from "../mixins/PuzzleCodeMixin.js"
	export default {
		data() {
			return {
				openId: "",
				accessToken: "",
				form: {
					phone: null,
					verifyCode: "",
				},
				rules: {
					phone: [{
							required: true,
							message: '请输入手机号',
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['blur', 'change'],
						}
					],
					verifyCode: [{
						required: true,
						message: '验证码不能为空',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change'],
					}],
				},
				type: 4,
				bindType: 1,
				code: ""
			}
		},
		mixins: [PuzzleCodeMixin],
		onLoad(opt) {
			this.bindType = opt.type
			this.code = opt.code
		},
		mounted() {
			this.$refs.uForms.setRules(this.rules);
		},
		methods: {
			getCode() {
				this.getVerificationCode(this.form.phone)
			},
			// 绑定手机号
			async bindUserPhone() {
				try {
					const res = await uni.$http("/user/bindPhone", {
						...this.form,
						type: this.bindType,
						code: this.code
					})
					if (res.code == 0) {
						uni.setStorageSync("token",res.data.token)
						this.$updateUserInfo()
						this.toHome()
					} else {
						this.$toast(res.errorMsg,"error")
					}
				} catch (error) {
					throw new Error("系统错误", error)
				}
			},
			// 检查qq登录状态
			checkLoginStatus() {
				// 检查是否属于qq已登录成功状态
				if (QC.Login.check()) {
					QC.Login.getMe((openId, accessToken) => {
						this.openId = openId;
						this.accessToken = accessToken;
					})
				} else {
					console.log('QQ未登录')
				}
			},
			toBindPhone() {
				this.$refs.uForms.validate().then(res => {
					if(this.form.verifyCode.length==6){
						this.bindUserPhone()
					}else{
						this.$toast("验证码位数不正确")
					}
				}).catch(errors => {
					// this.$toast('校验失败')
				})
			},
			toHome() {
				this.$toast("绑定成功","success")
				setTimeout(()=>{
					this.$routerTo("../../home/home", "reLaunch")
				},2000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bind-page {
		padding: 100rpx;

		.tip-text {
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #CCCCCC;
			line-height: 48rpx;
			text-align: justify;
		}

		.form {
			.pwd {
				margin-top: 32rpx;
			}

			.get-verification-code-btn {
				margin: 0 auto;
				margin-left: 40rpx;
				width: 260rpx;
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
		}
	}

	::v-deep .u-form-item__body__right__message {
		position: absolute;
		bottom: -20rpx;
		left: 20rpx;
		margin-left: 0 !important;
	}
</style>
