<template>
	<view>
		<IsNoData v-if="!hasData">暂无数据</IsNoData>
		<view class="goods-box" v-else>
			<view v-for="(item,index) in renderList" :key="item.goodsId">
				<view v-if="Date.now() < item.startTime">
					<view class="sell-time">
						{{ parseInt(item.startTime/1000) || parseInt(Date.now()/1000) | format}}
						<!-- {{parseInt(Date.now()/1000) | format}} -->
					</view>
					<view v-for="(it,id) in item.doneList" :key="item.goodsId">
						<CalendarGoods :item="it" :loadType="2"></CalendarGoods>
					</view>
				</view>
			</view>
			<IsEnd v-if="isLastItem"></IsEnd>
		</view>
	</view>
</template>

<script>
	import { formatMouthToMinutes } from "@/utils/formatDate.js"
	export default {
		props: {
			renderList: {
				type: Array,
				default: () => []
			},
			isLastItem: Boolean,
			hasData: Boolean
		},
		filters: {
			format: formatMouthToMinutes
		},
	}
</script>

<style scoped lang="scss">
	.goods-box{
		min-height: 100vh;
	}
</style>
