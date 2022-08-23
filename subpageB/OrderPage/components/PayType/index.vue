<template>
	<view class="pay-type">
		<view class="title">请选择支付方式</view>
		<view class="type-item-bank" @click="selectPayType('bankPay')">
			<image src="../../static/images/ccb.svg" mode=""></image>
			<view class="card-info">
				<view class="txt1">银行卡支付</view>
				<view class="txt2" v-if="this.cardList.length!==0"> 
					{{ selected_card_name }} 储蓄卡 ({{ selected_card_num }})
				</view>
			</view>
			<view class="change">
				<view class="bg" @click="changeCard">
					<view class="bg-txt">更改</view>
				</view>
			</view>
			<image v-show="payType=='bankPay'" class="check-icon" style="width: 28rpx;height: 24rpx;" src="../../static/images/check.svg"></image>
		</view>
		<view class="type-item" @click="selectPayType('aliPay')">
			<image src="../../static/images/ali_pay.svg" mode=""></image>
			<view>支付宝</view>
			<image v-show="payType=='aliPay'" class="check-icon" style="width: 28rpx;height: 24rpx;" src="../../static/images/check.svg"></image>
		</view>
		<view class="type-item" @click="selectPayType('wxPay')">
			<image src="../../static/images/wx_pay.svg" mode=""></image>
			<view>微信支付</view>
			<image v-show="payType=='wxPay'" class="check-icon" style="width: 28rpx;height: 24rpx;" src="../../static/images/check.svg"></image>
		</view>
		<view @click="tst">test2</view>
		<u-popup class="pop" :show="Shows" mode="bottom">
			<view class="head">
				<image @click="closePop" src="../../static/images/return.svg"></image>
				<view class="txt">请选择银行卡</view>
			</view>
			<scroll-view class="list" scroll-y="true" @scrolltolower="updateList">
				<view class="cards" v-for="(item,index) in cardList" :key="index" >
					<view class="card-info">
						<image class="fixed-icon" src="../../static/images/ccb.svg" mode=""></image>
						<view class="info" v-if="cardList.length!==0">
							{{ cardList[index].bankName }}储蓄卡({{ four_digit[index]}})
						</view>
						<image v-show="payType=='aliPay'" class="check-icon" style="width: 28rpx;height: 24rpx;" src="../../static/images/check.svg"></image>
					</view>
					<u-radio-group>
					   <u-radio class="radio" @click="selectCard(index)"></u-radio>
					</u-radio-group>
				</view>
				<button class="add-cards-btn" @click="addCard">
					<image class="add-icon" src="../../static/images/plus.svg"></image>
					<view vlass="add-txt">添加银行卡</view>
					<image class="arrow" src="../../static/images/right_arrow.svg"></image>
				</button>
			</scroll-view>
		</u-popup>
		
		<!--view class="type-item" @click="selectPayType('uniPay')">
			<image src="../../static/images/uni_pay.svg" mode=""></image>
			<view>银联支付</view>
			<image v-show="payType=='uniPay'" class="check-icon" style="width: 28rpx;height: 24rpx;" src="../../static/images/check.svg"></image>
		</view> -->
	</view>
</template>

<script>
	export default{
		data(){
			return {
				payType:"aliPay",
				hasCard:true,
				isEnd:false,
				isCanReq:true,
				cardList:[],
				four_digit:[],
				Shows:false,
				p_ext:"",
				selected_card_name:"default",
				selected_card_num:"default"
			}
		},
		mounted() {
			this.init();
		},
		onLoad(){
		},
		methods:{
			selectPayType(type){
				this.payType=type
				this.$emit("setPayType",type)
			},
			init(){
				this.cardList=[]
				this.getCardList()
				// console.log(this.cardList)
				// //set default card value
				// if(this.cardList.length>0){
				// 	this.selected_card_name=this.cardList[0].bankName
				// 	this.selected_card_num=this.cardList[0].bankNo
				// 	this.p_ext=this.cardList[0].ext
				// }
			},
			updateList(){
				if(this.isCanReq)return;
				this.getCardList()
				if(this.cardList.length>0){
					// console.log(this.cardList,'this.cardList')
				}
			},
			closePop(){
				this.Shows=false
			},
			changeCard(){
				this.Shows=true
			},
			selectCard(index){
				this.$emit("setCard",this.cardList[index].id)
			},
			async getCardList(){
				try{
					const res= await uni.$http("/payment/bankList",{
					})
					if(res.code==0){
						// this.cardList = res.data.list
						// this.selected_card_name=this.cardList[0].bankName
						// this.selected_card_num=this.cardList[0].bankNo
						// console.log(this.cardList,'this.cardList')
						if(res.data.list.length==0){
							this.cardList = res.data.list
						}else{
							this.cardList = res.data.list
							this.$emit("setCard",this.cardList[0].id)
							var i=0;
							for(i=0;i<res.data.list.length;i++){
								this.four_digit[i] = res.data.list[i].bankNo.substr(res.data.list.length-5,4)
							}
							this.selected_card_name=this.cardList[0].bankName
							this.selected_card_num=this.four_digit[0]
						}
					}else{
						this.$toast(res.errorMsg)
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			addCard(){
				this.$routerTo(`/subpageB/MyCards/components/AddCard2/index`)
			},
		}
	}
</script>

<style lang="scss" socped>
	.pay-type{
		margin-top: 40rpx;
		width: 750rpx;
		padding: 0 40rpx;
		background: #FFFFFF;
		.title{
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 120rpx;
		}
		.type-item-bank{
			display: flex;
			box-sizing: border-box;
			line-height: 30px;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			color: #000000;
			border-top: 2rpx solid #EEE;
			position: relative;
			image{
				width: 48rpx;
				height: 48rpx;
				padding-top: 20rpx;
			}
			.card-info{
				padding-top: 18rpx;
				padding-left: 40rpx;
				padding-right: 20rpx;
				.txt1{
					font-size: 28rpx;
				}
				.txt2{
					font-size: 24rpx;
					padding-bottom: 20rpx;
				}
			}
			.change{
				font-size: 24rpx;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 34rpx;
				padding-top: 36rpx;
				.bg{
					width: 80rpx;
					height: 64rpx;
					background: #999999;
					border-radius: 10px 10px 10px 0px;
					.bg-txt{
						padding: 16rpx
					}
				}
			}
			.check-icon {
				position: absolute;
				right: 20rpx;
				top: 50%;
				transform: translateY(-50%);
				margin: 0;
			}
		}
		.type-item{
			height: 120rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			color: #000000;
			line-height: 30px;
			border-top: 2rpx solid #EEE;
			position: relative;
			image{
				width: 48rpx;
				height: 48rpx;
				margin-right: 36rpx;
			}
			.check-icon {
				position: absolute;
				right: 20rpx;
				top: 50%;
				transform: translateY(-50%);
				margin: 0;
			}
		}
		.pop{
			display: flex;
			flex-direction: column;
			.head{
				display: flex;
				image{
					width: 38rpx;
					height: 64rpx;
					padding: 20rpx 0rpx 20rpx 20rpx;
				}
				.txt{
					color: #000000;
					padding-top: 26rpx;
					padding-left: 220rpx;
					font-size: 36rpx;
				}
			}
			.list{
				height: 30vh;
				.cards{
					display: flex;
					padding:30rpx;
					.card-info{
						display: flex;
						.info{
							padding-left: 30rpx;
							color: #000000;
						}
						.fixed-icon{
							width: 40rpx;
							height: 40rpx;
						}
					}
					.radio{
						padding-left: 260rpx;
					}
				}
				.add-cards-btn{
					text-align: left;
					display: flex;
					color: #000000;
					font-family: PingFangSC-Medium, PingFang SC;
					border-color: #FFFFFF;
					background-color: white;
					padding: 0rpx;
					.add-txt{
						display: flex;
					}
					.add-icon{
						width: 40rpx;
						height: 40rpx;
						padding: 30rpx;
					}
					.arrow{
						width: 40rpx;
						height: 40rpx;
						padding: 30rpx 0rpx 30rpx 392rpx
					}
				}
			}
		}
	}
</style>