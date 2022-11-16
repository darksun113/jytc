<template>
	<view class="nav-bar">
		<view v-for="(item,index) in navBar" :class="{active:index==cur}" @click="changeNav(index)" :key="index">
			{{item}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navBar: ["数字藏品","盲盒物品"],
				cur:0
			}
		},
		methods: {
			changeNav(idx) {
				if(this.cur!==idx){
					this.cur=idx
					this.$emit("changeNav",idx)
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.nav-bar {
		height: 112rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 32rpx;
		line-height: 48rpx;
		font-family: SourceHanSansCN-Medium, SourceHanSansCN;
		color: #999999;
		background: #222;
		z-index: 1;
		position: sticky;
		top: 0;
		.active{
			font-weight: 500;
			color: #FFFFFF;
		}
	}
</style>
