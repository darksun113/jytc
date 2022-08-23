<template>
	<view class="main">
		<view class="item">
			<view class="card-info">
				<view class="icon-container">
					<view class="icon-bg">
						<image class="bank-icon" :src="getIcon(p_name)" mode=""></image>
					</view>
				</view>
				<view class="info">
					<view class="left-part">
						<view class="name">{{ p_name }}</view>
						<view class="card-type">储蓄卡</view>
					</view>
					<view class="right-part">**** {{ p_card_num }}</view>
				</view>
			</view>
		</view>
		<button class="unbind-btn" @click="open">解除绑定</button>
		<u-popup class="pop" :show="shows" mode="center">
			<view class="txt">是否要解绑银行卡</view>
			<view class="choice">
				<view class="left" @click="cancel">取消</view>
				<view class="right" @click="unbind()">确定</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				p_name:null,
				p_card_num:null,
				p_id:null,
				shows:false
			}
		},
		onLoad(opt) {
			this.p_name= opt.p_name
			this.p_card_num= opt.p_card_num
			this.p_id=opt.p_id
			this.shows=false
		},
		methods: {
			open(){
				this.shows=true
			},
			cancel(){
				this.shows=false
			},
			async unbind(){
				try{
					const res=await uni.$http("/payment/cancelProtocol",{
						"id": this.p_id,
					})
					console.log(res)
					if(res.code==0){
						alert("解除绑定成功")
						this.$routerTo(`/subpageB/MyCards/MyCards`)
					}else{
						alert("发生错误")
					}
				}catch(e){
					alert("alsjfoweihf")
				}
				
			},
			getIcon(icon){
				return require("@/static/bank_images/"+icon+".svg")
			},
		}
	}
</script>

<style lang="less">
	.main{
		height: 100vh;
		overflow: auto;
		color: #FFFFFF;
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		overflow: auto;
		padding: 40rpx 40rpx 0rpx 40rpx;
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
		.pop{
			display: flex;
			flex-direction: column;
			font-size: 32rpx;
			border-radius: 30rpx;
			.txt{
				padding-top: 36rpx;
				text-align: center;
				align-items: center;
				width: 640rpx;
				height: 128rpx;
				background-color: #0A0C47;
			}
			.choice{
				border-top: rgba(255,255,255,0.2) solid 1rpx;
				text-align: center;
				width: 640rpx;
				height: 110rpx;
				background-color: #0A0C47;;
				display: flex;
				.left{
					padding-top: 30rpx;
					width: 320rpx;
					border-right: rgba(255,255,255,0.2) solid 1rpx;
				}
				.right{
					padding-top: 30rpx;
					width: 320rpx;
				}
			}
		}
	}
	.unbind-btn{
		width: 100%;
		color: #000000;
		background: #28D8E5;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 900;
		text-align: center;
	}
</style>
