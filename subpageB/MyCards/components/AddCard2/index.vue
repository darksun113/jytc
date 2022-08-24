<template>
	<PageTemp>
		<view class="main">
			<u--form class="input-form">
				<view class="line">
					<view class="left">卡号</view>
					<view class="right">
						<u-form-item  label="" prop="card_num" ref="card_num">
							<u--input class="u-input" placeholder="银行卡卡号" v-model="form.card_num" type="number" suffixIconStyle="color:#000"
								color="#FFFFFF" border="" clearable>
							</u--input>
						</u-form-item>
					</view>
				</view>
				<hr>
				<view class="line">
					<view class="left">持卡人</view>
					<view class="right">
						<u-form-item  label="" prop="name" ref="name">
							<u--input class="u-input" placeholder="持卡人姓名" v-model="form.name" type="text" suffixIconStyle="color:#000"
								color="#FFFFFF" border="" clearable>
							</u--input>
						</u-form-item>
					</view>
				</view>
				<hr>
				<view class="line">
					<view class="left">身份证号</view>
					<view class="right">
						<u-form-item  label="" prop="id" ref="id">
							<u--input class="u-input" placeholder="持卡人身份证号码" v-model="form.id" type="text" suffixIconStyle="color:#000"
								color="#FFFFFF" border="" clearable>
							</u--input>
						</u-form-item>
					</view>
				</view>
				<hr>
				<view class="line">
					<view class="left">手机号</view>
					<view class="right">
						<u-form-item  label="" prop="phone" ref="phone">
							<u--input class="u-input" placeholder="银行预留手机号" v-model="form.phone" type="text" suffixIconStyle="color:#000"
								color="#FFFFFF" border="" clearable>
							</u--input>
						</u-form-item>
					</view>
				</view>
				<hr>
				<view class="line">
					<view class="verify-left-input">
						<u-form-item class="verify-left-form-item" label="" prop="code" ref="code">
							<u--input class="verify-left-u-input" placeholder="请输入验证码" type="text" suffixIconStyle="color:#000"
								color="#FFFFFF" border="" v-model:value="verifyCode" clearable>
							</u--input>
						</u-form-item>
						<hr>
					</view>
					<button :style="{opacity:!second ?'1':'0.5'}" v-bind:disabled="disb" class="verify-right" @click="verify">
						{{ second ? timer +'秒后重新获取' :"获取验证码" }}
					</button >
				</view>
			</u--form>
		
			<view class="done-btn" @click="done">完成</view>
		</view>
	</PageTemp>
</template>

<script>
	import {rsaEncrypt} from "@/utils/tools.js"
	export default {
		data() {
			return {
				requestNo:"",
				disb: false,
				timer: "获取验证码",
				verifyCode:"",
				second:0,
				form:{
					card_num:"",
					name:"",
					id:"",
					phone:""
				},
				rules:{
					card_num:[
						{
							required: true,
							message: '请输入银行卡卡号', 
							trigger: ['blur'],
						},
						{
							max: 18
						}
					],
					name:[
						{
							required: true,
							message: '请输入持卡人姓名', 
							trigger: ['blur'],
						}
					],
					id:[
						{
							required: true,
							message: '请输入身份证号', 
							trigger: ['blur'],
						}
					],
					phone:[
						{
							required: true,
							message: '请输入预留手机号', 
							trigger: ['blur'],
						}
					],
				}
			}
		},
		beforeDestroy() {
			this.init()
		},
		methods: {
			init(){
				this.form={
					card_num:null,
					name:null,
					id:null,
					phone:null,
					disb: false
				}	
			},
			async done(){
				try{
					const verifyCode = this.form.code
					const res=await uni.$http("/payment/signConfirm",{
						"requestNo": this.requestNo, // 业务请求号，入参回传
						"verifyCode": this.verifyCode// 手机验证码
					})
					if(res.code==0){
						//res.data.state 值为 SUCCESS
						uni.showToast({
							title: "绑定成功",
							icon: 'success'
						})
						this.$routerTo(`/subpageB/MyCards/MyCards`)
					}else{
						//res.data.state 值为 FAIL
						uni.showToast({
							title: "绑定失败",
							icon: 'error'
						})
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			async verify(){
				try{
					const bankNo=await rsaEncrypt(this.form.card_num)
					const userName= this.form.name
					const idCard=await rsaEncrypt(this.form.id)
					const phone=await rsaEncrypt(this.form.phone)
					const res=await uni.$http("/payment/signProtocol",{
						"bankNo": bankNo, // 银行卡号
						"userName": userName,// 用户名
						"idCard": idCard,// 身份证号
						"phone": phone // 手机号
					})
					if(res.code==0){
						var c = 60
						this.disb = true
						this.requestNo = res.data.requestNo
						uni.showToast({
							title: "验证码已发送",
							icon: 'success'
						})
						const authTimer = setInterval(() => {
							c--
							this.timer= c
							this.second = c
							if (this.timer <= 0) {
							  this.disb = false
							  this.timer = "重新获取"
							  clearInterval(authTimer)
							  console.log(this.second)
							}
						}, 1000)
					}else{
						this.$toast(res.errorMsg)
					}
				}catch(e){
					uni.showToast({
						title: res.errorMsg,
						icon: 'error'
					})
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss">
	hr{
		opacity:0.2;
	}
	
	.main{
		font-size: 32rpx;
		height: 100%;
		color: white;
		display: flex;
		flex-direction: column;
		overflow: auto;
		font-family: PingFangSC-Regular, sans-serif;
		box-sizing: border-box;
		padding: 160rpx 40rpx 0rpx 40rpx;
		
		.input-form{
			display: flex;
			flex-direction: column;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			line-height: 22px;
			.line{
				display: flex;
				padding-top: 30rpx;
				padding-bottom: 30rpx;
				.left{
					width: 128rpx;
					padding-top: 10rpx;
				}
				.right{
					display:flex;
					padding-left: 84rpx;
					
					//v-deep
					/deep/ .u-form-item__body{
						padding: 0rpx;
					}
					/deep/ .u-input.u-input.u-input--square{
						padding: 0rpx;
					}
				}
				
				//
				.verify-left-input{
					font-size: 32rpx;
					width: 460rpx;
					padding-bottom: 40rpx;
					padding-right: 40rpx;
					.verify-left-form-item{
						padding-bottom: 20rpx;
					}
					/deep/ .u-form-item__body{
						padding: 0rpx;
					}
				}
				.verify-right{
					text-align: center;
					width:380rpx;
					height: 88rpx;
					color:black;
					background: #28D8E5;
					margin-left: 20rpx;
					padding: 0rpx 22rpx 20rpx 20rpx;
					border-radius: 8rpx;
				}
			}
		}
		.done-btn{
			color:black;
			height: 88rpx;
			text-align: center;
			font-weight: 500;
			background: #28D8E5;
			border-radius: 8rpx;
			margin-top: 60rpx;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
		}
	}
</style>
