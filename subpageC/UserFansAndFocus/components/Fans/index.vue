<template>
	<scroll-view v-if="privacyAuth==0 && hasData" class="list-box" scroll-y="true" @scrolltolower="updateList">
		<view class="item" v-for="(item,index) in fansList" :key="index" @click="toOtherPage(item.buyerId)">
			<view class="user-info">
				<image class="avatar" :src="item.avatar" mode="aspectFill"></image>
				<view class="info">
					<view class="name">{{item.name}}</view>
					<view class="fans-collection">
						<view class="fans-num">粉丝 {{item.fansNumber}}</view>
						<view class="fans-num">藏品数 {{item.goodsInstanceNumber}}</view>
					</view>
				</view>
			</view>
			<view class="operate" v-if="item.buyerId!==userId">
				<view @click.stop="focus(0,item.buyerId,index)" class="btn" v-if="item.relation==0">关注</view>
				<view @click.stop="focus(0,item.buyerId,index)" class="btn" v-if="item.relation==2">相互关注</view>
				<view @click.stop="focus(1,item.buyerId,index)" class="btn" v-else-if="item.relation==1 || item.relation==3">已关注</view>
			</view>
		</view>
		<IsEnd v-if="isLastData"></IsEnd>
		<u-modal :show="show" content='确定取消关注此人吗?' @confirm="confirm" @cancel="show=false" :showCancelButton="true" confirmColor="#fff" cancelColor="#aaa"></u-modal>
	</scroll-view>
	<SecurityControls v-else-if="privacyAuth">
		由于该用户隐私设置，粉丝列表不可见
	</SecurityControls>
	<IsNoData v-else>
		暂无粉丝
	</IsNoData>
</template>

<script>
	import {getFilePath} from "@/utils/tools.js"
	export default{
		props:["userId","viewBuyerId"],
		data(){
			return {
				privacyAuth:0,
				hasData:true,
				isLastData:false,
				fansList:[],
				show:false,
				followId:"",
				type:""
			}
		},
		mounted() {
			this.init()
		},
		methods:{
			init(){
				this.fansList=[]
				this.getFansList(null,list=>{
					if(list==0){
						this.hasData=false
					}else{
						this.fansList=list
					}
				})
			},
			updateList(){
				const createTime= this.fansList[this.fansList.length-1].createTime
				this.getFansList(createTime,list=>{
					if(list==0){
						this.isLastData=true
					}else{
						this.fansList=[...this.fansList,...list]
					}
				})
			},
			async getFansList(createTime,callback){
				try{
					const viewBuyerId=this.viewBuyerId
					const res=await uni.$http("/user/getFollowOrFansList",{viewBuyerId,type:2,size:10,createTime})
					if(res.code==0){
						this.privacyAuth=res.data.privacyAuth
						if(res.data.privacyAuth==1){
							return
						}
						if(res.data.list.length==0){
							callback(0)
						}else{
							res.data.list=await getFilePath(res.data.list,["avatar"])
							callback(res.data.list)
						}
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			toOtherPage(buyerId){
				if(buyerId==this.userId)return
				this.$emit("toOtherPage",buyerId)
			},
			async confirm(){
				try{
					// type 1 取消关注  0 关注
					const res=await uni.$http("/user/follow",{
						followId:this.followId,
						type:this.type
					})
					if(res.code==0){
						this.init()
					}else{
						this.$toast(res.errorMsg)
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			async focus(type,followId,index){
				try{
					if(type==1){
						this.followId=followId
						this.type=type
						this.show=true
					}else{
						// type 1 取消关注  0 关注
						const res=await uni.$http("/user/follow",{
							followId,
							type
						})	
						if(res.code==0){
							this.init()
						}else{
							this.$toast(res.errorMsg)
						}
					}
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-box{
		box-sizing: border-box;
		padding: 40rpx;
		height: 100%;
		overflow: auto;
		.item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 2rpx solid rgba(255, 255, 255, .15);
			padding: 20px 0;
			&:last-child{
				border-bottom: none;
			}
			.user-info{
				display: flex;
				.avatar{
					width: 100rpx;
					min-width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}
				.info{
					display: flex;
					flex-direction: column;
					color: #FFFFFF;
					.name{
						font-size: 32rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						line-height: 44rpx;
					}
					.fans-collection{
						font-size: 24rpx;
						color: #CCCCCC;
						line-height: 34rpx;
						display: flex;
						.fans-num{
							margin-right: 60rpx;
							&:last-child{
								margin-right: 0;
							}
						}
					}
				}
			}
			.operate{
				width: 176rpx;
				height: 60rpx;
				background: #666666;
				border-radius: 30rpx;
				.btn{
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 60rpx;
					text-align: center;
				}
			}
			
		}
	}
</style>