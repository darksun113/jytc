<template>
	<view class="water_layout">
		<view>
			<WaterFallCard :item="item" v-for="(item,index) in seriesList" :key="index" v-if="index % 2 ==0" @toSeriesDetailPage="toSeriesDetailPage"></WaterFallCard>
		</view>
		<view>
			<WaterFallCard :item="item" v-for="(item,index) in seriesList" :key="index" v-if="index % 2 !==0" @toSeriesDetailPage="toSeriesDetailPage"></WaterFallCard>
		</view>
	</view>
</template>

<script>
	import WaterFallCard from "./components/WaterFallCard.vue"
	export default {
		name:"ModelOfWaterFall",
		props:{
			seriesList:{
				type:Array,
				default:()=>[]
			}
		},
		components:{
			WaterFallCard
		},
		methods:{
			toSeriesDetailPage(goodsType){
				const seriesId="7a7e5413004940d8b6d3ca27398f0a0d"
				const url=`../../subpageA/SeriesPage/SeriesPage?seriesId=${seriesId}`
				this.$routerTo(url)
			}
		}
	}
</script>

<style lang="scss" scoped>
.water_layout{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
</style>