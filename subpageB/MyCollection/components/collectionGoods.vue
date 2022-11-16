<template>
	<view class="goods-list">
		<view class="list-contnet">
			<template v-for="(item,index) in renderList">
				<GoodsCards :item="item" :key='index' @countFinish="$emit('resetGoodsList')" />
			</template>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			renderList:{
				type:Array,
				default:()=>[]
			}
		}
	}
</script>

<style lang="scss" scoped>
.goods-list {
	position: relative;

	.list-contnet {
		margin-bottom: 40rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
}
</style>
