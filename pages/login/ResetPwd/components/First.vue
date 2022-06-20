<template>
	<view class="content">
		<view class="title">
			重置密码
		</view>
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
				<view :style="{opacity:!$store.state.isCount ?'1':'0.5'}" class="get-verification-code-btn" @click="getCode">
					{{$store.state.isCount?$store.state.second+'秒后重新获取':'获取验证码'}}
				</view>
			</u-form-item>
		</u--form>
		<u-button text="下一步" :custom-style="{color:'#000',marginTop:'150rpx',fontFamily: 'PingFangSC-Regular, PingFang SC',height:'100rpx',
		opacity:form.verifyCode.length==6?'1':'0.5',borderRadius: '16rpx'}" @click="toSubmitCheck" color="linear-gradient(180deg, #70D0FF 0%, #D575FF 100%)"></u-button>
	</view>	
</template>

<script>
	import {rsaEncrypt} from "@/utils/tools.js"
	import PuzzleCodeMixin from "../../mixins/PuzzleCodeMixin.js"
	export default {
		mixins:[PuzzleCodeMixin],
		data(){
			return{
				form:{
					phone:null,
					verifyCode:"",
				},
				rules:{
					phone:[
						{
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
							trigger: ['blur','change'],
						}
					],
					verifyCode:[
						{
							required: true, 
							message: '验证码不能为空', 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change'],
						}
					],
				},
				type:3
			}
		},
		mounted() {
			this.$refs.uForms.setRules(this.rules);
		},
		methods:{
			toSubmitCheck(){
				this.$refs.uForms.validate().then(res => {
					this.checkVerifyCode()
				}).catch(errors => {
					// this.$toast('校验失败')
				})
			},
			getCode(){
				this.getVerificationCode(this.form.phone)
			},
			// 获取手机+验证码匹配结果
			async checkVerifyCode () {
			  try {
				const res = await uni.$http("/user/webResetPwdCheckVerifyCode", { ...this.form })
				if (res.code == 0) {
				  this.$emit("checkPhoneSuccess",res.data.resetPwdProof)
				} else {
					uni.showToast({
						title:res.errorMsg,
						icon:"error"
					})
				}
			  } catch (error) {
				throw new Error("系统错误", error)
			  }
			}
		}
		
	};
</script>

<style lang="scss" scoped>
	@import "./common.scss";
	.pwd{
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
</style>
