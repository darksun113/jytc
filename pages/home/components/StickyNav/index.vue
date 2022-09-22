<template>
	<view class="nav-box" >
		<view class="nav-show">
			<view class="bar" :style="{left:pattern==0?'0':'64rpx'}"></view>
			<image :src="pattern==0?require('./images/list_s_icon.svg'):require('./images/list_icon.svg')"
				@click="changeNav(0)"></image>
			<image :src="pattern==1?require('./images/waterfall_s_icon.svg'):require('./images/waterfall_icon.svg')"
				@click="changeNav(1)"></image>
		</view>
		<u-tabs style="width: calc(100% - 128rpx);" :list="navList" @click="clickNav" :current="navIdx" lineHeight="0"
			:itemStyle="itemStyle" :scrollable="false" :inactiveStyle="{color:'#999',fontSize: '32rpx',}"
			:activeStyle="activeStyle"></u-tabs>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 显示模式（列表、瀑布流）
				pattern: 0,
				navIdx: 0,
				navList: [{
					name: '数字藏品',
				}, {
					name: '盲盒商城'
				}
				, {
					name: '发售日历'
				},
				],
				itemStyle: {
					fontSize: "32rpx",
					fontFamily: "SourceHanSansCN-Regular, SourceHanSansCN",
					padding: 0,
				},
				activeStyle: {
					fontWeight: 500,
					color: "#fff",
					fontFamily: "SourceHanSansCN-Medium, SourceHanSansCN",
					fontSize: "32rpx",
				}
			}
		},
		methods: {
			clickNav(e) {
				// e.index : 0 数字藏品  1 盲盒商城  2 发售日历
				this.navIdx = e.index
				this.$emit("switchOverNav", e)
			},
			changeNav(type) {
				this.pattern = type
				this.$emit("changeShowType", type)
			},
			// 页面show时，检查是否在"发售日历"，如果在，就重置nav为数字藏品
			/* resetPage() {
				if (this.navIdx == 2) {
					this.navIdx = 0
					this.$emit("resetPage")
				}
			} */
		}
	}
</script>

<style lang="scss" scoped>
	.nav-box {
		padding: 40rpx 0;
		background-color: #222;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.nav-show {
			display: flex;
			position: relative;
			background: #333;
			border-radius: 20rpx;
			width: 128rpx;
			height: 64rpx;
			justify-content: space-around;
			align-items: center;

			image {
				width: 28rpx;
				height: 28rpx;
			}

			.bar {
				width: 64rpx;
				height: 64rpx;
				background: #666;
				position: absolute;
				border-radius: 16rpx;
				transition: all .5s ease;
				top: 0;
				left: 0;
			}
		}
	}
</style>
