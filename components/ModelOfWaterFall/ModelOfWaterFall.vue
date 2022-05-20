<template>
	<view class="water_layout" v-else>
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
			toSeriesDetailPage(){
				this.$routerTo("../../subpageA/SeriesPage/SeriesPage")
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