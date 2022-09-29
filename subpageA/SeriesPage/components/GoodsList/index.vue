<template>
	<view class="goods-list">
		<view class="list-title">
			<view>该系列下有{{listTotal}}种藏品</view>
			<view class="sort" @click="show = true">
				<text style="margin-right: 20rpx;">{{dropdownTitle}}</text>
				<u-icon name="arrow-down"></u-icon>
			</view>
		</view>
		<view class="list-contnet">
			<template v-for="(item,index) in goodsList">
				<GoodsCards :item="item" :key='index' @countFinish="init"></GoodsCards>
			</template>
			<IsEnd v-if="isLastItem"></IsEnd>
		</view>
		<u-picker :show="show" confirmColor="#fff" :columns="columns" @confirm="confirm" @cancel="show = false"
			@close="show = false" :closeOnClickOverlay="true"></u-picker>
	</view>
</template>
<script>
	import { getFilePath } from "@/utils/tools.js"
	export default {
		props: ["seriesId"],
		data() {
			return {
				isLastItem: false,
				listTotal: 0,
				updatePage: 1,
				show: false,
				goodsList: [],
				goodsList_default: [],
				shouldRequest: true,
				showList: false,
				dropdownTitle: "默认排序",
				value: 0,
				columns: [
					['综合排序', '销量最高', '价格高到低', '价格低到高']
				]
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			confirm(arr) {
				this.dropdownTitle = arr.value[0]
				this.sortGoodsList(arr.value[0])
			},
			sortGoodsList(type) {
				const price_h_to_l = () => {
					this.goodsList = this.goodsList.sort((a, b) => b.goodsPrice - a.goodsPrice)
				}
				const price_l_to_h = () => {
					this.goodsList = this.goodsList.sort((a, b) => a.goodsPrice - b.goodsPrice)
				}
				const sell_h_to_l = () => {
					this.goodsList = this.goodsList.sort((a, b) => {
						return (b.totalNumber - b.remainingNumber) - (a.totalNumber - a.remainingNumber)
					})
				}
				const defaultList = () => {
					this.goodsList = this.goodsList_default
				}
				switch (type) {
					case "销量最高":
						sell_h_to_l()
						break;
					case "价格高到低":
						price_h_to_l()
						break;
					case "价格低到高":
						price_l_to_h()
						break;
					default:
						defaultList()
				}
				this.show = false
			},
			init() {
				this.getSeriesGoodsList((list, total) => {
					this.listTotal = total
					this.goodsList = list
					this.goodsList_default = JSON.parse(JSON.stringify(list))
					this.isLastItem = true
				})
			},
			async getSeriesGoodsList(callback) {
				try {
					const res = await uni.$http("/series/getSeriesGoodsList", {
						seriesId: this.seriesId,
						page: this.updatePage,
						size: 1000
					})
					if (res.code == 0) {
						if (res.data.list.length == 0) {
							callback(0)
						} else {
							const list = await getFilePath(res.data.list, ["image"])
							callback(list, res.data.total)
						}
					}
				} catch (e) {
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-list {
		margin-top: 40rpx;
		position: relative;

		.list-title {
			height: 34rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #28D8E5 ;
			line-height: 34rpx;
			position: relative;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.sort {
				display: flex;
				align-items: center;
				color: #999999;
			}
		}

		.list-contnet {
			margin-top: 40rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}
	}

	::v-deep .u-picker {
		background-color: #333;
		box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1000);
	}

	::v-deep .uni-picker-view-content {
		background-color: #333;
		box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1000);
	}

	::v-deep .uni-picker-view-mask {
		background: none;
	}

	::v-deep .u-picker__view__column__item {
		color: #fff;
		font-family: PingFangSC-Regular, PingFang SC;
		font-size: 28rpx;
	}

	::v-deep .uni-picker-view-indicator {
		color: red;

		&::before {
			border: 2rpx solid rgba(255, 255, 255, .1);
		}

		&::after {
			border: 2rpx solid rgba(255, 255, 255, .1);
		}
	}
</style>
