<template>
	<u-swiper bgColor="transparent" :circular="true" :list="bannerList" @click="toBannerLink" imgMode="aspectFill"
		keyName="url" :height="screenWidth*140/375" @change="e => current = e.current" :autoplay="true" indicator
		indicatorMode="dot">
		<view slot="indicator" class="indicator">
			<view class="indicator__dot" v-for="(item, index) in bannerList" :key="index"
				:class="[index === current && 'indicator__dot--active']"></view>
		</view>
	</u-swiper>
</template>

<script>
	import {
		getFilePath
	} from "@/utils/tools.js"
	export default {
		data() {
			return {
				current: 0,
				bannerList: [],
				screenWidth: uni.getSystemInfoSync().screenWidth
			}
		},
		methods: {
			async getBanner() {
				try {
					const res = await uni.$http("/homepage/getBannerList", {})
					if (res.code == 0) {
						const list = await getFilePath(res.data.list, ["url"])
						this.bannerList = list
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			toBannerLink(idx) {
				const item = this.bannerList[idx]
				if (item.link) {
					// #ifdef H5
					window.location = item.link
					// #endif
				}
			},
			init() {
				this.getBanner()
				// console.log(uni.getSystemInfoSync())
			}
		},
		mounted() {
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
	.indicator {
		@include flex(row);
		justify-content: center;

		&__dot {
			height: 6px;
			width: 6px;
			border-radius: 100px;
			background-color: rgba(255, 255, 255, 0.35);
			margin: 0 5px;
			transition: background-color 0.3s;

			&--active {
				background-color: #ffffff;
			}
		}
	}

	.indicator-num {
		padding: 2px 0;
		background-color: rgba(0, 0, 0, 0.35);
		border-radius: 100px;
		width: 35px;
		@include flex;
		justify-content: center;

		&__text {
			color: #FFFFFF;
			font-size: 12px;
		}
	}
	.u-swiper{
		border-radius: 30rpx !important;
	}
</style>
