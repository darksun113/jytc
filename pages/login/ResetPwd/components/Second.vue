<template>
	<view class="content">
		<view class="title">
			设置新密码
		</view>
		<u--form :model="form" ref="uForms">
			<u-form-item label="" class="pwd" prop="pwd" style="position: relative;">
				<u--input placeholder="设置8-20位登录密码" @input="pwdInput" v-model="form.pwd" :type="pwdType" suffixIconStyle="color:#000"
					color="#FFFFFF" border="bottom" :customStyle="{marginTop:'90rpx'}"  :focus="true" clearable>
				</u--input>
			</u-form-item>
			<u-form-item label="" class="pwd" prop="repeatPwd" style="position: relative;"	>
				<u--input placeholder="确认密码" v-model="form.repeatPwd"  @input="repeatPwdInput" :type="repeatPwdType" suffixIconStyle="color:#000"
					color="#FFFFFF" border="bottom" clearable>
				</u--input>
			</u-form-item>
		</u--form>
		<u-button text="下一步" :custom-style="{color:'#000',marginTop:'150rpx',fontFamily: 'PingFangSC-Regular, PingFang SC',height:'100rpx',
		opacity:form.pwd==form.repeatPwd && form.pwd!==''?'1':'0.5',borderRadius: '16rpx'}" @click="toSubmitCheck" color="#28D8E5"></u-button>
	</view>	
</template>

<script>
	import {rsaEncrypt} from "@/utils/tools.js"
	export default {
		props:{
			resetPwdProof:[String]
		},
		data(){
			return{
				form:{
					pwd:'',
					repeatPwd:""
				},
				rules:{
					pwd:[
						{
							required: true, 
							message: '请输入密码', 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['blur'],
						},
						{
							// 自定义验证函数
							validator: (rule, value, callback) => {
								const reg_pws = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{8,20})$/
								return reg_pws.test(value) ? true : false
							},
							message: '请设置8-20位,并同时包含字母和数字的密码',
							// 触发器可以同时用blur和change
							trigger: ['blur','change'],
						}
					],
					repeatPwd:[
						{
							required: true, 
							message: '验证码不能为空', 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['blur'],
						},
						{
							// 自定义验证函数
							validator: (rule, value, callback) => {
								if (!this.form.pwd) {
									return callback("请先输入密码");
								} else if (this.form.pwd != value) {
									return callback("两次密码不同，请重新输入")
								} else {
									return true
								}
							},
							message: '两次密码不同',
							// 触发器可以同时用blur和change
							trigger: ['blur','change'],
						}
					],
				},
				repeatPwdType:"",
				pwdType:""
			}
		},
		mounted() {
			this.$refs.uForms.setRules(this.rules);
		},
		methods:{
			repeatPwdInput(val){
				val?this.repeatPwdType="password":this.repeatPwdType=""
			},
			pwdInput(val){
				val?this.pwdType="password":this.pwdType=""
			},
			toSubmitCheck(){
				this.$refs.uForms.validate().then(res => {
					this.sendRequest()
				}).catch(errors => {
					// this.$toast('校验失败')
				})
			},
			// 获取手机+验证码匹配结果
			async sendRequest () {
				try {
					this.form.resetPwdProof=this.resetPwdProof
					const reqFormData = JSON.parse(JSON.stringify(this.form))
					reqFormData.pwd = rsaEncrypt(reqFormData.pwd)
					reqFormData.repeatPwd = reqFormData.pwd
					const res = await uni.$http("/user/webResetPwd", { ...reqFormData })
					res.code == 0 ? this.$emit("resetSuccess") : uni.showToast({
						title:res.errorMsg,
						icon:"error"
					})
				} catch (error) {
					throw new Error("系统错误", error)
				}
			},
		}
		
	};
</script>

<style lang="scss" scoped>
	@import "./common.scss";
</style>
