<template>
	<PageTemp>
		<view class="list" v-if="hasCard">
			<view class="cards">
				<view class="item" v-for="(item,index) in cardList" :key="index" @click="unBindPage(index)">
					<view class="card-info">
						<view class="icon-container">
							<view class="icon-bg">
								<image class="bank-icon" :src="getIcon(item.bankName)" mode=""></image>
							</view>
						</view>
						<view class="info">
							<view class="left-part">
								<view class="name">{{ item.bankName }}</view>
								<view class="card-type">储蓄卡</view>
							</view>
							<view class="right-part">**** {{ four_digit[index] }}</view>
						</view>
					</view>
				</view>
			</view>
			<button class="add-cards-btn" v-show="addBtnShow" @click="addCard">
				<view class="add-container">
					<image class="add-icon" src="../../static/images/plus.svg"></image>
					<view vlass="add-txt">添加银行卡</view>
				</view>
			</button>
		</view>
		
		<IsNoCards v-else>
			<view class="container">
				<image src="../../static/images/no_card.svg"></image>
				<text class="nono-txt">暂无银行卡，快去添加吧</text>
			</view>
			<button class="nono-btn" @click="addCard">添加</button>
		</IsNoCards>
	</PageTemp>

</template>

<script>
	export default {
		data() {
			return {
				hasCard:true,
				isEnd:false,
				cardList:[],
				four_digit:[],
				addBtnShow:false,
				icon:""
			};
		},
		onShow(){
			this.init();
		},
		methods: {
			init(){
				this.cardList=[]
				this.getCardList(list=>{
					if(list==0){
						this.hasCard=false;
					}else{
						this.addBtnShow = true;
						this.cardList=list;
					}
				})
			},	
			async getCardList(callback){
				try{
					const res= await uni.$http("/payment/bankList",{})
					if(res.code==0){
						if(res.data.list.length==0){
							callback(0)
						}else{
							var i=0;
							for(i=0;i<res.data.list.length;i++){
								this.four_digit[i] = res.data.list[i].bankNo.substr(res.data.list.length-5,4)
							}
							this.cardList = res.data.list;
							callback(res.data.list)
						}
					}else{
						this.$toast(res.errorMsg)
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			unBindPage(index){
				const url=`/subpageB/MyCards/components/DelCards/index?p_name=${this.cardList[index].bankName}&p_card_num=${this.four_digit[index]}&p_id=${this.cardList[index].id}`
				this.$routerTo(url)
			},
			addCard(){
				this.$routerTo(`/subpageB/MyCards/components/AddCard2/index`)
			},
			getIcon(icon){
				return require("@/static/bank_images/"+icon+".svg")
			},
		}
	}
</script>


<style lang="scss" scoped>
	.list{
		box-sizing: border-box;
		height: 100%;
		overflow: auto;
		padding-left: 40rpx;
		padding-right: 40rpx;
		.item{
			display: flex;
			flex-direction: column;
			border-radius: 8rpx;
			padding-top: 40rpx;
			.card-info{
				display: flex;
				background: #333;
				margin-bottom:40rpx;
				.icon-container{
					padding: 40rpx 0rpx 40rpx 40rpx;
					.icon-bg{
						width: 100rpx;
						height: 100rpx;
						background-color: white;
						border-radius: 50%;
						.bank-icon{
							padding:16rpx;
							width: 70rpx;
							height: 70rpx;
						}
					}
					
				}
				.info{
					color: #FFFFFF;
					display:flex;
					padding-top: 46rpx;
					.left-part{
						padding-left: 28rpx;
						.name{
							width: 192rpx;
							font-size: 32rpx;
						}
						.card-type{
							font-size: 24rpx;
							padding-top: 12rpx;
							
						}
					}
					.right-part{
						text-align: right;
						padding-left: 180rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
					}
				}
			}			
		}
		.add-cards-btn{
			display: flex;
			color: #000000;
			background: #28D8E5;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 900;
			.add-container{
				display:flex;
				.add-icon{
					width: 32rpx;
					height: 32rpx;
					border-radius: 50%;
					padding: 28rpx 12rpx 28rpx 210rpx;
				}
				.add-txt{
					font-size: 16rpx;
				}
			}
		}
	}
	.container{
		display: flex;
		flex-direction: column;
		padding-bottom: 40rpx;
		image{
			width: 100%;
			height: 280rpx;
			padding-bottom: 40rpx;
		}
		.nono-txt{
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999;
			line-height: 40rpx;
		}
	}
	.nono-btn{
		width: 496rpx;
		background: #28D8E5;
		border-radius: 8rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
	}
</style>
