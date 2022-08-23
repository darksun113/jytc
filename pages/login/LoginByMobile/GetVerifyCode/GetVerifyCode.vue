<template>
	<PageTemp>
		<view class="login-page">
			<view class="title-box">
				<view class="title-text">
					手机动态密码登录
				</view>
				<view class="title-tip">
					未注册的手机号验证后将自动创建新账号
				</view>
			</view>
			<view style="position: relative;">
				<u--form labelPosition="left" :model="form" :rules="rules" ref="uForm">
					<u-form-item label="" prop="phone" ref="phone">
						<u--input placeholder="请输入手机号码" v-model="form.phone" type="number" suffixIconStyle="color:#000"
							color="#FFFFFF" border="bottom" :customStyle="{marginTop:'90rpx'}" clearable>
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
					同意并遵守<text @click="toUserAgreement">《用户协议》</text>与<text @click="toPrivacyPolicy">《隐私政策》</text>
				</view>
			</view>
			<view :style="{opacity:checkGrop[0]=='agree' && !$store.state.isCount ?'1':'0.5'}"
				class="get-verification-code-btn" @click="getCode">
				{{$store.state.isCount?$store.state.second+'秒后重新获取':'获取验证码'}}
			</view>
			<view class="to-pwd-page" @click="toPwdLogin">
				使用手机号与密码登录
			</view>
		</view>
		<view class="bottom-side-otherLogin" v-if="this.inviter == ''">
			<WxAndQqLogin></WxAndQqLogin>
		</view>
		<PuzzleCode style="z-index:9999999" @resetPuzzle="starCheckRobot" :bind="$attrs" :show="isPuzzleShow"
			success-text="验证成功" fail-text="验证失败" slider-text="拖动滑块完成拼图" @success="puzzleSuccess" @close="puzzleClose"/>
	</PageTemp>
</template>

<script>
	import mixin from "../../mixins/PuzzleCodeMixin.js"
	export default {
		data() {
			return {
				checkGrop: [],
				inviter: "",
				prePurchaseId: "",
				instanceId: "",
				from:"",
				form: {
					phone: null,
				},
				rules: {
					phone: [{
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
							trigger: ['blur', 'change'],
						}
					]
				},
			}
		},
		onLoad(opt) {
			this.inviter = opt.inviter ? opt.inviter : ""
			this.prePurchaseId = opt.prePurchaseId ? opt.prePurchaseId : ""
			this.instanceId = opt.instanceId ? opt.instanceId : ""
			this.from = opt.from ? opt.from : ""
		},
		mixins: [mixin],
		methods: {
			getCode() {
				// this.type=1
				this.$refs.uForm.validate().then(res => {
					if (this.checkGrop[0] !== 'agree') {
						this.$toast('请先阅读并勾选用户协议与隐私政策')
						return
					} else {
						this.starCheckRobot(3, this.form.phone)
					}
				}).catch(errors => {
					// this.$toast('校验失败')
				})
			},
			// 人机验证通过后自定义方法执行
			doSomething() {
				const url =
					`../InputVerifyCode/InputVerifyCode?phone=${this.form.phone}&slidingFigureId=${this.slidingFigureId}&inviter=${this.inviter}&prePurchaseId=${this.prePurchaseId}&instanceId=${this.instanceId}&from=${this.from}`
				this.$routerTo(url)
			},
			toPwdLogin() {
				const url =
					`../../loginByPwd/loginByPwd?inviter=${this.inviter}&prePurchaseId=${this.prePurchaseId}&instanceId=${this.instanceId}&from=${this.from}`
				this.$routerTo(url, "redirect")
			},
			toUserAgreement() {
				const url = "/subpageC/UserAgreement/UserAgreement"
				this.$routerTo(url)
			},
			toPrivacyPolicy() {
				const url = "/subpageC/PrivacyPolicy/PrivacyPolicy"
				this.$routerTo(url)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-page {
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

		.to-pwd-page {
			margin-top: 40rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 44rpx;
		}
	}
	.bottom-side-otherLogin{
		padding: 0 100rpx;
	}
	::v-deep .u-form-item__body__right__message {
		position: absolute;
		bottom: -20rpx;
		left: 0;
		margin-left: 0 !important;
	}
</style>
