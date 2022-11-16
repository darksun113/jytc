<template>
	<PageTemp class="information-page">
		<scroll-view class="page-content" scroll-y="true" @scrolltolower="update">
			<template v-for="(item,index) in msgList">
				<MessageCard :item="item" :key="index" @click.native="toDetailPage(item)" />
			</template>
		</scroll-view>
	</PageTemp>
</template>

<script>
	import MessageCard from "./components/MassageCard.vue"
	export default {
		data() {
			return {
				updatePage:1,
				msgList:[]
			};
		},
		components:{
			MessageCard
		},
		onLoad() {
			this.getMsgList();
		},
		methods:{
			update(){
				this.getMsgList()
			},
			toDetailPage(item){
				if(item.type == 1){
					this.toGoodsDetailPage(item.goodsId)
				}else if(item.type == 2){
					this.toSeriesDetailPage(item.seriesId)
				}
			},
			toGoodsDetailPage(goodsId){
				// materialType 类型  0模型 1图片 2视频 3音频
				const url=`/subpageA/DetailPage/DetailPage?loadType=0&goodsId=${goodsId}`
				this.$routerTo(url)
			},
			toSeriesDetailPage(seriesId){
				const url=`/subpageA/SeriesPage/SeriesPage?seriesId=${seriesId}`
				this.$routerTo(url)
			},
			async getMsgList (){
				const {code,errorMsg,data:{list}} = await uni.$http("/user/message/list",{
					page:this.updatePage,
					size:10,
					unread:0
				},false)
				if(code == 0){
					this.msgList = list;
					this.updatePage++;
				}else{
					this.$toast(errorMsg);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.information-page{
	padding: 40rpx;
	.page-content{
		height: 100%;
		width: 100%;
		overflow: auto;
	}
}
</style>
