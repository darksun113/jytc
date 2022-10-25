<template>
	<view>
		<IsNoBlind v-if="!hasData">暂无盲盒，敬请期待！</IsNoBlind>
		<view class="goods-box" v-else>
			<ModelOfListFlow :renderList="renderList" :loadType="2" :isBlind="true"></ModelOfListFlow>
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
			isLastItem:Boolean,
			hasData:Boolean
		},
	}
</script>
<style scoped lang="scss">
	.goods-box{
		min-height: 100vh;
	}
</style>