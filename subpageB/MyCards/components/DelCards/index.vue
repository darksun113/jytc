<template>
	<view class="main">
		<view class="item">
			<view class="card-info">
				<image class="bank-icon" src="../../../../static/images/qq.svg" mode=""></image>
				<view class="info">
					<view class="left-part">
						<view class="name">{{ p_name }}</view>
						<view class="card-type">储蓄卡</view>
					</view>
					<view class="right-part">**** {{ p_card_num }}</view>
				</view>
			</view>
		</view>
	<button class="unbind-btn" @click="unbind">解除绑定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				p_name:null,
				p_card_num:null,
				p_id:null
			}
		},
		onLoad(opt) {
			this.p_name= opt.p_name
			this.p_card_num= opt.p_card_num
			this.p_id=opt.p_id
		},
		methods: {
			async unbind(){
				try{
					const res= await uni.$http("payment/cancelProtocol",{
						"id": this.p_id,
					})
					if(res.code==0){
						alert("解除绑定成功")
						this.$routerTo(`/subpageB/MyCards/MyCards`)
					}else{
						alert("发生错误")
					}
				}catch(e){
					
				}
				
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
				.bank-icon{
					border-radius: 50%;
					width: 100rpx;
					height: 100rpx;
					padding: 40rpx 0rpx 40rpx 40rpx;
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
