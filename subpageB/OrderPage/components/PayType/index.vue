<template>
	<view class="pay-type">
		<view class="title">请选择支付方式</view>
		<view class="type-item-bank" @click="selectPayType('bankPay')">
			<image src="../../static/images/ys_logo.png" mode=""></image>
			<view class="cardinfo-box">
				<view class="txt1">银行卡支付</view>
				<view class="change-box">
					<view class="txt2" v-if="this.cardList.length!==0">
						{{ selected_card_name }} 储蓄卡 ({{ selected_card_num }})
					</view>
					<view class="change">
						<view class="bg" @click="changeCard">
							<view class="bg-txt">添加/更换银行卡</view>
						</view>
					</view>
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
		<u-popup class="pop" :show="Shows" mode="bottom">
			<view class="head">
				<view class="txt">选择银行卡</view>
				<image @click="closePop" src="@/static/images/x.svg"></image>
			</view>
			<scroll-view class="list" scroll-y="true" @scrolltolower="updateList">
				<view class="cards" v-for="(item,index) in cardList" :key="index" @click.stop="selectCard(index)">
					<view class="card-info">
						<image class="fixed-icon" :src="getIcon(item.bankName)" mode=""></image>
						<view class="info" v-if="cardList.length!==0">
							{{ cardList[index].bankName }}储蓄卡({{ four_digit[index]}})
						</view>
					</view>
					<image v-show="index == curSelect"  class="check-icon" style="width: 28rpx;height: 24rpx;" src="../../static/images/check.svg"></image>
				</view>
				<view class="add-cards-btn" >
					<image class="add-icon" @click.stop="addCard" src="../../static/images/plus2.svg"></image>
					<view vlass="add-txt" @click.stop="addCard">添加银行卡</view>
				</view>
			</scroll-view>
		</u-popup>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				payType:"bankPay",
				hasCard:true,
				isEnd:false,
				isCanReq:true,
				cardList:[],
				four_digit:[],
				Shows:false,
				p_ext:"",
				selected_card_name:"default",
				selected_card_num:"default",
				curSelect:0
			}
		},
		mounted() {
			this.init();
		},
		methods:{
			selectPayType(type){
				this.payType=type
				this.$emit("setPayType",type)
			},
			init(){
				const wxPay = uni.getStorageSync("isWxPay")
				if(wxPay=='wxPay'){
					this.payType = "wxPay"
					this.$emit("setPayType",this.payType)
				}
				this.cardList=[]
				this.getCardList()
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
			getIcon(icon){
				return require("@/static/bank_images/"+icon+".svg")
			},
			selectCard(index){
				this.curSelect = index;
				this.selected_card_name=this.cardList[index].bankName;
				this.selected_card_num=this.four_digit[index];
				this.closePop();
				this.$emit("setCard",this.cardList[index].id);
			},
			async getCardList(){
				try{
					const res= await uni.$http("/payment/bankList",{
					})
					if(res.code==0){
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
		margin: 40rpx 0;
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
			.cardinfo-box{
				padding: 18rpx 20rpx 0rpx 40rpx;
				display: flex;
				flex-direction: column;
				.txt1{
					font-size: 28rpx;
				}
				.change-box{
					width: 556rpx;
					display: flex;
					padding-bottom: 20rpx;
					.txt2{
						font-size: 24rpx;
						padding-right: 52rpx;
					}
					.change{
						font-size: 24rpx;
						font-weight: 400;
						color: #FFFFFF;
						.bg{
							.bg-txt{
								color: #4C88BD;
							}
						}
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
				border-bottom: 2rpx solid #EEEEEE;
				padding: 40rpx 40rpx 40rpx 296rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #000000;
				line-height: 44rpx;
				image{
					width: 36rpx;
					height: 36rpx;
					padding: 0rpx 0rpx 0rpx 222rpx;
				}
			}
			.list{
				height: 30vh;
				padding:20rpx 40rpx;
				width: 100%;
				box-sizing: border-box;
				.cards{
					border-bottom: 2rpx solid #EEEEEE;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
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
					.check-icon{
						width: 32rpx;
						height: 32rpx;
					}
				}
				.add-cards-btn{
					text-align: left;
					display: flex;
					align-items: center;
					color: #000000;
					font-family: PingFangSC-Medium, PingFang SC;
					border-color: #FFFFFF;
					background-color: white;
					border-bottom: 2rpx solid #EEEEEE;
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