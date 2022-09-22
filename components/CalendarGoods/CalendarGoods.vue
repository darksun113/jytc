<template>
	<view class="card-of-object" @click="active">
		<view class="goods-pic-box">
			<image class="goods-pic" :src="item.image" mode="aspectFill"></image>
			<view class="icon" v-if="item.goodsType==1">
				<image v-if="item.materialType==0" class="goods-type" src="@/static/images/type_3D.svg" mode=""></image>
				<image v-else-if="item.materialType==1" class="goods-type" src="@/static/images/type_pic.svg" mode="">
				</image>
				<image v-else-if="item.materialType==2" class="goods-type" src="@/static/images/type_video.svg" mode="">
				</image>
				<image v-else-if="item.materialType==3" class="goods-type" src="@/static/images/type_audio.svg" mode="">
				</image>
				<image v-else class="goods-type" src="@/static/images/type_audio.svg" mode=""></image>
			</view>
		</view>
		<view class="goods-info" :style="{justifyContent:loadType_==1?'space-around' : 'space-between'}">
			<view class="goods-name nowrap_2">
				{{item.name || "正在获取发售日历商品"}}
			</view>
			<view class="goods-code-box">
				<view class="limit">
					限量 {{item.totalNumber||99999}}
				</view>
				<!-- 价格 -->
				<view class="price">
					<text class="num">¥&nbsp;{{(item.price/100||88.88).toFixed(2)}}</text>
					<view class="PreSell" v-if="item.isPreSaleGoods">
						<text class="text">预售</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "CardOfObject",
		props: {
			item: {
				type: Object,
				default: () => {}
			},
			//0 普通藏品  1 盲盒 2 日历模式
			loadType: {
				type: [Number, String],
				default: 0
			}
		},
		data() {
			return {
				loadType_: this.loadType,
				// 商品类型
				goodsType_:this.item.goodsType
			};
		},
		methods: {
			active() {
				if(this.item.goodsType==1){
					const url=`/subpageA/DetailPage/DetailPage?loadType=0&goodsId=${this.item.goodsId}`
					this.$routerTo(url)
				}else{
					const url = `/subpageA/DetailPage/DetailPage?loadType=2&blindboxId=${this.item.goodsId}`
					this.$routerTo(url)
				}
				/* if (this.loadType_ == 2) return;
				if (this.loadType_ == 0) {
					this.toGoodsDetail()
				} else {
					this.$emit("toOpenBlindBox", this.item.instanceId)
				} */
			},
			/* toGoodsDetail() {
				const url =
					`/subpageA/DetailPage/DetailPage?loadType=1&instanceId=${this.item.instanceId}&materialType=${this.item.materialType}`
				this.$routerTo(url)
			} */
		},
		watch: {
			loadType(type) {
				this.loadType_ = type
			}
		}
	}
</script>

<style lang="scss" scoped>
	.card-of-object {
		background: #333;
		height: 252rpx;
		border-radius: 20rpx;
		margin-bottom: 40rpx;
		overflow: hidden;
		padding: 8rpx;
		color: #FFFFFF;
		display: flex;

		.goods-pic-box {
			position: relative;
			width: 236rpx;
			height: 236rpx;
			min-width: 236rpx;
			border-radius: 20rpx;

			.goods-pic {
				width: 100%;
				height: 100%;
				border-radius: 20rpx;
				background: #000000;
			}

			.icon {
				position: absolute;
				width: 40rpx;
				height: 40rpx;
				left: 12rpx;
				bottom: 12rpx;
				background: rgba(0, 0, 0, .4);
				border-radius: 4rpx;
				padding: 0 4rpx;

				.goods-type {
					width: 100%;
					height: 100%;
				}
			}
		}

		.goods-info {
			flex: 1;
			padding: 15rpx;
			display: flex;
			flex-direction: column;

			.goods-name {
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				line-height: 44rpx;
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis; ///超出部分省略号显示
				display: -webkit-box; //弹性盒模型
				-webkit-box-orient: vertical; //上下垂直
				-webkit-line-clamp: 2; //自定义行数
			}

			.goods-code-box {

				// margin-top: 20rpx;
				// display: flex;
				.limit {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
				}


				.price {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 24rpx;

					.num {
						width: 160rpx;
						height: 56rpx;
						overflow-wrap: break-word;
						color: rgba(255, 255, 255, 1);
						font-size: 48rpx;
						font-family: Roboto-Medium;
						text-align: left;
						white-space: nowrap;
						line-height: 56rpx;
						// margin-top: 22rpx;
					}

					.PreSell {
						border-radius: 42rpx;
						border: 1px solid rgba(40, 216, 229, 1);
						width: 100rpx;
						height: 40rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						.text {
							// line-height: 40rpx;
							// margin: auto 0;
							color: rgba(40, 216, 229, 1);
							font-size: 24rpx;
							font-family: SourceHanSansCN-Regular;
						}
					}
				}
			}
		}

	}
</style>
