<template>
	<view class="search-box">
		<u--input v-model="searchPhone" placeholder="请输入手机号码" color="#fff" :custom-style="searchStyle" border="none"  type="number" maxlength="11" placeholder-style="color: #666666"></u--input>
		<view class="search-btn" @click="toFindBuyer">发起转增</view>
		<ResultPop :isShow="isShow" :searchPhone="searchPhone" :buyerInfo="buyerInfo" @close="isShow=false" :instanceId="instanceId" :goodsId="goodsId"></ResultPop>
	</view>
</template>

<script>
	import ResultPop from "./components/ResultPop"
	export default {
		props: ["instanceId","goodsId"],
		components: {
			ResultPop
		},
		data() {
			return {
				isShow: false,
				searchPhone: "",
				buyerInfo: {},
				searchStyle: {
					background: '#393939',
					color: '#eeeeee',
					borderRadius: '16rpx',
					padding: '28rpx 40rpx',
					fontSize: '32rpx'
				}
			}
		},
		methods: {
			toFindBuyer() {
				if (!/^1[3456789]\d{9}$/.test(this.searchPhone)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					});
					return
				}
				this.searchBuyerInfo()
				
			},
			// 搜索用户
			async searchBuyerInfo() {
				try {
					const res = await uni.$http("/user/getInfoByPhone", {
						phone: this.searchPhone
					})
					if (res.code == 0) {
						this.buyerInfo=res.data
						this.isShow = true
					}else{
						this.$toast(res.errorMsg)
					}
				} catch (e) {
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .u-input--square {
		position: relative;

		&::before {
			width: 40rpx;
			height: 40rpx;
			content: "";
			background: url("../../../static/images/phone.svg") no-repeat center center;
			background-size: contain;
			position: absolute;
			left: 40rpx;
			top: 50%;
			transform: translateY(-50%);
		}
	}

	::v-deep .uni-input-input {
		padding-left: 60rpx;
		width: 90%;
	}

	::v-deep .uni-input-placeholder {
		padding-left: 60rpx;
	}

	.search-btn {
		width: 100%;
		height: 88rpx;
		margin-top: 40rpx;
		user-select: none;
		background: #28D8E5 ;
		border-radius: 16rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		color: #000000;
		line-height: 88rpx;
		text-align: center;
	}
</style>
