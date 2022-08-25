<template>
	<view class="search-module">
		<view class="scarch-box">
			<u-search shape="square" placeholder="数学通识"
				placeholderColor="#666" 
				:searchIcon="searchIcon" 
				@change="search"
				:clearabled="true"
				bgColor="#333333" :showAction="false"></u-search>
			<view class="msg-box">
				<image class="msg-icon" src="@/static/images/msg-icon.svg" mode=""></image>
				<u-badge :isDot="true" class="dot"></u-badge>
			</view>
		</view>
		<view class="res-list" v-show="hasRes">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchIcon:require("../../../../static/images/search-icon.svg"),
				hasRes:true
			}
		},
		methods: {
			search(value) {
				console.log(value)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.search-module{
		padding-top :40rpx;
		position: relative;
		.scarch-box{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.msg-box{
				width: 48rpx;
				height: 48rpx;
				position: relative;
				.msg-icon{
					width: 48rpx;
					height: 48rpx;
				}
				.dot{
					position: absolute;
					right: 0;
					top: 0;
				}
			}
		}
		.res-list{
			position: absolute;
			width: 580rpx;
			height: 200rpx;
			background-color: #333333;
			top: 120rpx;
			left: 0;
			border-radius: 16rpx;
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