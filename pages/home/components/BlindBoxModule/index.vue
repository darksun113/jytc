<template>
	<IsNoBlind v-if="!hasData">暂无盲盒，敬请期待！</IsNoBlind>
	<view class="blind-box" v-else>
		<ModelOfListFlow :renderList="renderList" :loadType="2" :isBlind="true"></ModelOfListFlow>
		<IsEnd v-if="isLastItem"></IsEnd>
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
	.blind-box{
		min-height: calc(100vh - 100vw * 140 / 375 - 90rpx);
	}
</style>