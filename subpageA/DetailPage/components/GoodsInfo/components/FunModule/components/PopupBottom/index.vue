<template>
	<u-popup :show="show" mode="bottom" close-icon-color="#999999" :closeable="true" @close="close" @open="open">
		<view class="content">
			<BlockInfo v-if="loadType==1" :popupData="popupData"></BlockInfo>
			<Author v-else-if="loadType==2" :popupData="popupData"></Author>
			<BuyerList v-else-if="loadType==3" :popupData="popupData" @openTokenPop="$emit('openTokenPop')"></BuyerList>
			<BlockHashCard v-else-if="loadType==4" :popupData="popupData"></BlockHashCard>
			<TransferHistory v-else :popupData="popupData"></TransferHistory>
		</view>
	</u-popup>
</template>

<script>
	import BlockInfo from "./components/BlockInfo.vue"
	import Author from "./components/Author.vue"
	import BuyerList from "./components/BuyerList.vue"
	import BlockHashCard from "./components/BlockHashCard.vue"
	import TransferHistory from "./components/TransferHistory.vue"
	export default {
		name:"PopupBottom",
		props:{
			isShow:[Boolean],
			// 1 链上信息 2 发行方 3 最近购买 4 区块链信息 5 流转历史
			loadType:[Number],
			popupData:{
				type:Object,
				default:()=>{}
			}
		},
		components:{
			BlockInfo,
			Author,
			BuyerList,
			TransferHistory,
			BlockHashCard
		},
	    data() {
	      return {
	        show: this.isShow
	      }
	    },
	    methods: {
	      open() {
	        // console.log('open');
	      },
	      close() {
	        this.$emit("close")
	        // console.log('close');
	      }
	    },
		watch:{
			isShow(show){
				this.show=show
			}
		}
	  }
</script>

<style lang="scss" scoped>
.content{
	height: 60vh;
	background: #21201F;
	padding: 40rpx;
	padding-top: 30rpx;
}
</style>