<template>
	<view>
		<IsNoData v-if="!hasData">暂无数据</IsNoData>
		<view v-else>
			<ModelOfListFlow :renderList="renderList" v-if="showType==0" :loadType="0"></ModelOfListFlow>
			<ModelOfWaterFall :renderList="renderList" v-else></ModelOfWaterFall>
			<IsEnd v-if="isLastItem"></IsEnd>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			renderList:{
				type:Array,
				default:()=>[]
			},
			showType:[Number,String],
			isLastItem:Boolean,
			hasData:Boolean
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>