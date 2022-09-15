<template>
	<view class="list_layout">
		<ListCard :item="item" v-for="(item,index) in renderList" :key="index" :isBlind="isBlind" @toSeriesDetailPage="active" :loadType="loadType"></ListCard>
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
			renderList:{
				type:Array,
				default:()=>[]
			},
			isBlind:{
				type:Boolean,
				default:false
			},
			loadType:[Number,String]
		},
		methods:{
			active(id){
				if(this.isBlind){
					this.toBlindBoxDetail(id)
				}else{
					this.toSeriesDetailPage(id)
				}
			},
			toBlindBoxDetail(blindboxId){
				const url = `/subpageA/DetailPage/DetailPage?loadType=2&blindboxId=${blindboxId}`
				this.$routerTo(url)
			},
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