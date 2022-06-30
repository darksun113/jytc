<template>
	<PageTemp>
		<view class="login-page">
			<view class="title-box">
				<view class="title-text">输入验证码</view>
				<view class="title-tip">
					<view class="tip-phone">
						已发送到 {{phone}}
					</view>
					<view class="count" @click="getCode">
						重新发送<text v-show="$store.state.isCount">({{$store.state.second}})</text>
					</view>
				</view>
			</view>
			<view class="code-box">
				<u-code-input v-model="verifyCode" :hairline="true" mode="line" color="#9A98ED" @finish="finish"></u-code-input>
			</view>
		</view>
		<PuzzleCode style="z-index:9999999" @resetPuzzle="starCheckRobot" :bind="$attrs" :show="isPuzzleShow"
			success-text="验证成功" fail-text="验证失败" slider-text="拖动滑块完成拼图" @success="puzzleSuccess" @close="puzzleClose" />
	</PageTemp>
</template>

<script>
	import mixin from "../../mixins/PuzzleCodeMixin.js"
	export default {
		data() {
			return {
				verifyCode:"",
				phone:null,
				inviter:"",
				prePurchaseId:"",
				// 分享把玩实例id
				instanceId:""
			}
		},
		onLoad(opt) {
			this.phone=opt.phone
			this.slidingFigureId=opt.slidingFigureId
			this.inviter=opt.inviter?opt.inviter:""
			this.prePurchaseId=opt.prePurchaseId?opt.prePurchaseId:""
			this.instanceId=opt.instanceId?opt.instanceId:""
		},
		mixins:[mixin],
		methods: {
			finish(){
				// #ifdef H5
					this.login()
				// #endif
			},
			async login(){
				try{
					const browserCode=uni.getStorageSync("browserCode")
					const res=await uni.$http("/user/webVerifyCodeLogin",{
						browserCode,
						phone:this.phone,
						verifyCode:this.verifyCode,
						slidingFigureId:this.slidingFigureId,
						inviter:this.inviter,
						prePurchaseId:this.prePurchaseId
					})
					if(res.code==0){
						uni.setStorageSync("token",res.data.token)
						this.$store.commit("getToken",res.data.token)
						this.$toast('登录成功')
						this.$updateUserInfo()
						let timer = setTimeout(()=>{
							clearTimeout(timer)
							if(this.instanceId){
								// 存在instanceId表明要跳转邀请者藏品详情页页
								const url=`/subpageA/DetailPage/DetailPage?instanceId=${this.instanceId}&loadType=1`
								this.$routerTo(url,'redirect')
							}else{
								if(this.inviter && this.$store.state.userInfo.certificationStatus==1){
									// 如果有inviter，且已实名，表面是老用户，不能参加预购助力
									uni.reLaunch({
										url:"/pages/home/home"
									})
								}else{
									const routes = getCurrentPages()
									if(routes.length>2){
										this.$routerTo(2,"back")
									}else{
										uni.reLaunch({
											url:"/pages/home/home"
										})
									}
								}
							}
						},1000)
					}else{
						this.$toast(res.errorMsg)
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			getCode() {
				this.verifyCode=""
				this.starCheckRobot(3, this.phone)
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
				display: flex;
				.tip-phone{
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #CCCCCC;
					line-height: 48rpx;
					margin-right: 40rpx;
				}
				.count{
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #A5A6FF;
					line-height: 48rpx;
				}
			}
			
		}
		.code-box{
			margin-top: 96rpx;
		}
	}
</style>
