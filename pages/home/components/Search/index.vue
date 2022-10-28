<template>
	<view class="search-module">
		<view class="scarch-box">
			<u-search shape="square" placeholder="数学通识" placeholderColor="#666" :searchIcon="searchIcon" @change="searchKeyWords" :clearabled="true" @clear="clear"
				color="#fff"
				v-model="keyWords"
				bgColor="#333333" :showAction="false"></u-search>
			<MassageBadge />
		</view>
		<view class="res-list" v-show="searchResList.length>0">
			<view class="res-item" :style="{background:idx==curSelect?'#565656' : '#333'}" 
				v-for="(item,idx) in searchResList" :key="idx" @click="searchGoods(item,idx)">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchIcon:require("../../../../static/images/search-icon.svg"),
				curSelect:0,
				keyWords:"",
				searchResList:[
					// {
					// 	title:"钢铁侠藏品"
					// },
					// {
					// 	title:"钢铁侠预购活动"
					// },
					// {
					// 	title:"钢铁侠预付活动"
					// },
					// {
					// 	title:"钢铁侠预付活动"
					// }
				]
			}
		},
		methods: {
			searchKeyWords(value) {
				console.log(value.trim())
			},
			searchGoods(item,idx){
				this.curSelect = idx
			},
			clear(){
				this.keyWords=""
			}
		},
	}
</script>

<style lang="scss" scoped>
	.search-module{
		padding :40rpx 0;
		position: relative;
		.scarch-box{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.res-list{
			position: absolute;
			width: 580rpx;
			height: 240rpx;
			background-color: #333333;
			top: 110rpx;
			left: 0;
			border-radius: 16rpx;
			z-index: 1;
			overflow: auto;
			.res-item{
				height: 80rpx;
				border-radius: 16rpx;
				padding-left: 72rpx;
				line-height: 80rpx;
			}
		}
	}
	.u-search{
		width: 580rpx;
		height: 64rpx;
		background: #333333;
		border-radius: 16rpx;
		flex: none;
	}
	::v-deep .u-icon__img{
		width: 32rpx !important;
		height: 32rpx !important;
	}
</style>