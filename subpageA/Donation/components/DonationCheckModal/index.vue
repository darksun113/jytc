<template>
	<view class="inherit-box">
		<u-modal :show = "inhritConfirm" :show-cancel-button="true" width="640" title="操作认证" @confirm="confirm" :cancel-style="cancelStyle"
			:confirm-style="confirmStyle" :title-style="titleStyle">
			<view class="slot-content">
				<rich-text :nodes="content"></rich-text>
			</view>
		</u-modal>
		<u-modal :show ="inhritInput" width="640" title="输入验证码" :show-confirm-button="false" @confirm="confirm" :cancel-style="cancelStyle"
			:confirm-style="confirmStyle" :title-style="titleStyle">
			<view class="slot-content">
				<u-icon class="close" name="close" @click="inhritInput=false"></u-icon>
				<view class="re-send" @click="reSend">
					重新发送<text v-show="second!==60">({{second}})</text>
				</view>
				<u-code-input v-model="verifyCode" :hairline="true" mode="line" color="#28D8E5" @finish="finish"></u-code-input>
				<!-- <u-message-input mode="bottomLine" :bold="false" :focus="true" active-color="#aaa"  :maxlength="6" @finish="toInhert_"></u-message-input> -->
			</view>
		</u-modal>
		<PuzzleCode style="z-index:9999999"
			@resetPuzzle="starCheckRobot" 
			:bind="$attrs" :show="isPuzzleShow" 
			:phone="phone" verifyType="2" loadType="4"
			@success="puzzleSuccess" @close="puzzleClose" />
	</view>
</template>

<script>
	import PuzzleCodeMixin from "@/libs/mixins/PuzzleCodeMixin.js"
	export default {
		mixins:[PuzzleCodeMixin],
		data (){
			return{
				userPhoneStr: JSON.parse(uni.getStorageSync("userInfo")).phone,
				phone:uni.getStorageSync("phone"),
				inhritConfirm: false,
				inhritInput:false,
				transInfo:{},
				content: "",
				titleStyle: {
					fontSize: '34rpx',
					color: '#FFF',
					background: '#21201F',
					paddingTop:'48rpx'
				},
				cancelStyle:{
					color:"#aaa",
					background: '#21201F',
				},
				confirmStyle:{
					color:"#fff",
					background: '#21201F',
				}
			}
		},
		mounted() {
			uni.$on("toInherit", (transInfo) => {
				this.transInfo=transInfo
				this.content = `系统将会发送验证短信至绑定手机<br/>${this.userPhoneStr}`
				this.inhritConfirm = true
			})
		},
		unmounted() {
			uni.$off("toInherit")
		},
		methods:{
			reSend(){
				if(this.second!==60)return;
				this.confirm()
			},
			confirm(){
				this.starCheckRobot(2,this.phone)
			},
			// 人机验证通过，发送验证码后执行
			toDoSomething(){
				this.inhritConfirm=false
				this.inhritInput=true
			},
			toMyObject(){
				uni.reLaunch({
					url:"/pages/MyObject/MyObject"
				})
			},
			async toInhert_(code){
				try{
					const res = await uni.$http("goods/transfer",{
						goodsId:this.transInfo.goodsId,
						instanceId:this.transInfo.instanceId,
						to:this.transInfo.buyerId,
						phone:this.phone,
						code
					})
					if(res.code==0){
						uni.showToast({
							title:"传承成功",
							icon:"success"
						})
						this.inhritConfirm=false
						this.inhritInput=false
						setTimeout(()=>{
							this.toMyObject()
						},1000)
					}else{
						uni.showToast({
							title:res.errorMsg,
							icon:"error"
						})
					}
				}catch(e){
					//TODO handle the exception
					throw new Error(e)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.slot-content {
		font-size: 28rpx;
		color: $u-content-color;
		padding-left: 30rpx;
		text-align: center;
		background: #21201F;
		font-family: PingFangSC-Regular, PingFang SC;
		color: #CCCCCC;
		line-height: 48rpx;
		padding:48rpx 0;
		position: relative;
		.re-send{
			font-size: 24rpx;
			font-weight: 400;
			color: #FEE0A0;
			line-height: 48rpx;
			margin-bottom: 40rpx;
		}
		.close{
			position: absolute;
			right: 40rpx;
			top: -50rpx;
		}
	}
	::v-deep .u-model{
		background: none;
		.u-model__footer{
			.hairline-left{
				border-left: 2rpx solid rgba(255,255,255,0.1000);
			}
			&::after{
				border: 2rpx solid rgba(255,255,255,0.1000);
			}
		}
	}::v-deep .u-placeholder-line{
		background: #EFCE91;
	}
</style>