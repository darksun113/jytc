<template>
	<u-popup :show="show" mode="bottom" @close="close" :mask-close-able="false" :closeable="true">
		<view class="res-box">
			<view class="user-name">
				转赠对象：{{buyerInfo.fullName}}
			</view>
			<view class="text-tip">是否将该藏品转赠给对方，转赠完成后无法撤销</view>
			<view class="btn" @click="toInhert">确认转赠</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		props:["isShow","searchPhone","instanceId","buyerInfo","goodsId"],
		data(){
			return {
				show:this.isShow,
			}
		},
		methods:{
			toInhert(){
				const data={
					goodsId:this.goodsId,
					instanceId:this.instanceId,
					...this.buyerInfo
				}
				uni.$emit("toInherit",data)
			},
			close(){
				this.$emit("close")
			},
		},
		watch:{
			isShow(boo){
				this.show=boo
			}
		}
	}
</script>

<style lang="scss" scoped>
	.res-box{
		height: 440rpx;
		background: #21201F;
		padding: 80rpx 40rpx;
		box-sizing: border-box;
		font-family: PingFangSC-Regular, PingFang SC;
		.user-name{
			font-size: 32rpx;
			color: #28D8E5 ;
			line-height: 44rpx;
		}
		.text-tip{
			margin-top: 20rpx;
			font-size: 28rpx;
			line-height: 20px;
			color: #FFFFFF;
		}
		.btn{
			width: 100%;
			height: 84rpx;
			background: #28D8E5;
			border-radius: 20rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 84rpx;
			text-align: center;
			margin-top: 92rpx;
		}
	}
</style>