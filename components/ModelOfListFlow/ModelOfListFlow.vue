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
			toSeriesDetailPage(){
				this.$routerTo("../../subpageA/SeriesPage/SeriesPage")
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>