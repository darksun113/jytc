<template>
	<view class="inherit-box">
		<u-modal :show = "inhritConfirm" class="inherit-box-modal" :show-cancel-button="true" width="640rpx" 
			title="操作认证"  confirmColor="#fff"
			cancelColor="#aaa" :title-style="titleStyle"
			@confirm="confirm" @cancel="cancel">
			<view class="slot-content">
				<rich-text :nodes="content"></rich-text>
			</view>
		</u-modal>
		<u-modal :show ="inhritInput" class="inherit-box-modal-2" width="640rpx" title="输入验证码" :show-confirm-button="false" @confirm="confirm" :cancel-style="cancelStyle"
			:confirm-style="confirmStyle" :title-style="titleStyle">
			<view class="slot-content">
				<u-icon class="close" name="close" @click="closeModal"></u-icon>
				<view class="re-send" @click="reSend">
					重新发送<text v-show="$store.state.second!==60">({{$store.state.second}})</text>
				</view>
				<view class="code-box">
					<u-code-input :hairline="true" mode="line" color="#28D8E5" @finish="toInhert"></u-code-input>
				</view>
			</view>
		</u-modal>
		<PuzzleCode style="z-index:99999"
			@resetPuzzle="starCheckRobot" 
			:bind="$attrs" :show="isPuzzleShow" 
			:phone="phone" :verifyType="2" :loadType="4"
			@success="puzzleSuccess" @close="puzzleClose" />
	</view>
</template>

<script>
	import PuzzleCodeMixin from "@/libs/mixins/PuzzleCodeMixin.js"
	export default {
		mixins:[PuzzleCodeMixin],
		data (){
			return{
				userPhoneStr: uni.getStorageSync("userInfo").phone,
				// phone:uni.getStorageSync("phone"),
				phone:17302694611,
				inhritConfirm: false,
				inhritInput:false,
				transInfo:{},
				content: "",
				type:5,
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
				if(this.$store.state.second!==60)return;
				this.confirm()
			},
			confirm(){
				this.starCheckRobot(2,this.phone)
			},
			cancel(){
				this.inhritConfirm=false
			},
			closeModal(){
				this.inhritInput = false;
			},
			// 人机验证通过，发送验证码后执行
			afterGetCode(){
				this.inhritConfirm=false
				this.inhritInput=true
			},
			toMyObject(){
				uni.reLaunch({
					url:"/pages/MyObject/MyObject"
				})
			},
			async toInhert(code){
				try{
					const res = await uni.$http("/goods/transfer",{
						goodsId:this.transInfo.goodsId,
						instanceId:this.transInfo.instanceId,
						to:this.transInfo.buyerId,
						phone:this.phone,
						code
					})
					if(res.code==0){
						uni.showToast({
							title:"转赠成功",
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
			z-index: 100000;
			font-size: 24rpx;
			font-weight: 400;
			color: #28D8E5;
			line-height: 48rpx;
			margin-bottom: 40rpx;
		}
		.close{
			z-index: 100000;
			position: absolute;
			right: 0rpx;
			top: -70rpx;
		}
	}
	::v-deep .inherit-box-modal-2,::v-deep .inherit-box-modal{
		.u-popup__content{
			background: #21201F;
			
		}
		.u-line{
			border-bottom: none !important;
		}
		.u-transition{
			z-index: 10075 !important;
		}
		.u-modal__title{
			font-size: 36rpx;
			font-family: SourceHanSansCN-Medium, SourceHanSansCN;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
	::v-deep .inherit-box-modal{
		.u-modal__button-group__wrapper--hover{
			background: #444;
		}
		.u-line{
			border-bottom: 2rpx solid rgba(255,255,255,0.2) !important;
			border-left: 2rpx solid rgba(255,255,255,0.2) !important;
		}
	} 
	::v-deep .inherit-box-modal-2{
		z-index: 100000 !important;
	}
</style>