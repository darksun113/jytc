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
				msgList:[
					{
						msgType:1,
						createTime:parseInt(Date.now()/1000),
						msgInfo:"很遗憾未抽中钢铁侠预购活动白名单资格",
						infoType:1,
						isRead:0
					},{
						msgType:0,
						createTime:parseInt(Date.now()/1000),
						msgInfo:"钢铁侠藏品转赠成功",
						infoType:1,
						isRead:1
					},
				]
			};
		},
		components:{
			MessageCard
		},
		methods:{
			update(){
				console.log(5588)
			},
			toDetailPage(){
				
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
