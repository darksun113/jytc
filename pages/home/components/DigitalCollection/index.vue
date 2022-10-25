<template>
	<view>
		<IsNoData v-if="!hasData">暂无数据</IsNoData>
		<view class="goods-box" v-else>
			<ModelOfListFlow :renderList="renderList" v-show="showType==0" :loadType="0"></ModelOfListFlow>
			<ModelOfWaterFall :renderList="renderList" v-show="showType==1"></ModelOfWaterFall>
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

<style scoped lang="scss">
	.goods-box{
		min-height: 100vh;
	}
</style>