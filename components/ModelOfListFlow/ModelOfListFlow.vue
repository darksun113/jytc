<template>
	<view class="list_layout">
		<ListCard :item="item" v-for="(item,index) in seriesList" :key="index" @toSeriesDetailPage="toSeriesDetailPage"></ListCard>
	</view>
</template>

<script>
	import ListCard from "./components/ListCard.vue"
	export default {
		name:"ModelOfListFlow",
		components:{
			ListCard
		},
		props:{
			seriesList:{
				type:Array,
				default:()=>[]
			}
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
.list_layout{
	margin: 0 auto;
}
</style>