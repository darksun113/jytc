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
			toSeriesDetailPage(seriesId){
				const url=`../../subpageA/SeriesPage/SeriesPage?seriesId=${seriesId}`
				this.$routerTo(url)
			}
		}
	}
</script>

<style lang="scss" scoped>
.list_layout{
	margin: 0 auto;
	display: flex;
	flex-direction: column;
}
</style>