<template>
	<view class="btn-box">
		<view class="time-box">
			<view v-if="true">预付活动：09月18日 13:00</view>
			<view style="display: flex;align-items: center;" v-else-if="false">
				<text>预付时间：</text>
				<u-count-down :time="30 * 60 * 60 * 1000" format="HH:mm:ss" @change="onChange" @finish="onFinish">
					<view class="time">
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}</text>
						</view>
						<text class="time__doc">小时</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.minutes }}</text>
						</view>
						<text class="time__doc">分</text>
						<view class="time__custom">
							<text class="time__custom__item">{{ timeData.seconds }}</text>
						</view>
						<text class="time__doc">秒</text>
					</view>
				</u-count-down>
			</view>
		</view>
		<view class="">
			<view class="btn" style="opacity: 0.65;" v-if="goodsData.remainingNumber <= 0">
				已售罄
			</view>
			<view class="btn" style="opacity: 0.65;" v-else-if="false">
				{{false?'立即购买':'支付尾款'}}
			</view>
			<view class="btn" @click="toOrder" v-else>
				{{false?'立即购买':'支付尾款'}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goodsData: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				curTime: parseInt(Date.now() / 1000),
				timeData: {}
			}
		},
		mounted() {},
		methods: {
			onFinish(){
				
			},
			onChange(e) {
				this.timeData = e
			},
			toOrder() {
				const boo = this.$checkLogin()
				if (boo) {
					const certificationStatus = uni.getStorageSync("userInfo").certificationStatus
					certificationStatus == 1 ? this.getOrderNo() : this.$emit("showIdentityShow")
				} else {
					this.$emit("showLoginTip")
				}
			},
			async getOrderNo() {
				try {
					const goodsId = this.goodsData.goodsId
					const res = await uni.$http("/order/place", {
						goodsId
					})
					if (res.code == 0) {
						const url = `/subpageB/OrderPage/OrderPage?orderNo=${res.data.orderNo}`
						this.$routerTo(url, 'redirect')
					} else {
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
	.btn-box {
		width: 100%;
		height: 156rpx;
		background: #333;
		padding: 0 40rpx;
		// padding-bottom: 80rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: 500;

		.time-box {
			font-size: 28rpx;
			font-family: SourceHanSansCN-Regular, SourceHanSansCN;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 56rpx;
			.time {
			    @include flex;
			    align-items: center;
			
			    &__custom {
			         width: 32rpx;
			         height: 44rpx;
			         /* #ifndef APP-NVUE */
			         display: flex;
			         /* #endif */
			         justify-content: center;
			         align-items: center;
			    
			        &__item {
			             color: #fff;
			             font-size: 24rpx;
			             text-align: center;
			         }
			    }
			    
			    &__item {
			         color: #606266;
			         font-size: 30rpx;
			         margin-right: 8rpx;
			     }
			}
		}

		.btn {
			width: 300rpx;
			height: 80rpx;
			text-align: center;
			background: linear-gradient(90deg, #FFFFFF 0%, #28D8E5 50%, #C058F6 100%);
			border-radius: 20rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			line-height: 80rpx;
			color: #000000;
		}
	}
</style>
