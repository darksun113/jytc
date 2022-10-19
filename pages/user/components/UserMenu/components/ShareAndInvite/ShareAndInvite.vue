<template>
	<u-popup  :show="popUpshowAccept" mode="bottom" close-icon-color="#999999" :closeable="true" @close="close"
		@open="open">
		<SharePoster :isOpenPoster="isOpenPoster" @close="isOpenPoster=false" :posterData="posterData"></SharePoster>
		<view class="content">
			<view class="header">
				分享名单
			</view>
			<view class="forText">
				<view class="headerTip">
					<view class="">
						用户昵称
					</view>
					<view class="">
						是否实名
					</view>
					<view class="">
						注册时间
					</view>
				</view>
				<scroll-view v-if="hasData"  scroll-y="true" @scrolltolower="updateList">
					<view class="scrollSt">
						<view v-for="(item,index) in shareList" :key="index" class="oneText">
							<view style="width:284rpx;" class="font78 nowrap_s">
								{{item.name}}
							</view>
							<view style="height:30rpx; text-align: center;width:100rpx;">
								<img v-lazy v-if="item.certification==1" style="width:26rpx;height:30rpx;display: inline-block;"
									src="../../../../../../static/新增icon/认证.svg" alt="">
							</view>
							<view style="width:274rpx;text-align: right;" class="font78 nowrap_s">
								{{item.createTime | format}}
							</view>
						</view>
						<IsEnd v-if="isLastItem"></IsEnd>
					</view>
				</scroll-view>
				<IsNoData v-else>
					暂无数据
				</IsNoData>
				<view class="bottom">
					<view @click="toQrcode" class="buttons">
						生成专属邀请海报
					</view>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		filters:{
			format(stamp){
				if(!stamp){
					return ""
				}else{
					const date = new Date(stamp*1000)
					const Y = date.getFullYear() + '-'
					const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
					const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
					const H = date.getHours() + ':'
					const M2 = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
					const S = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
					return Y + M + D + H + M2 + S
				}
			}
		},
		props: {
			popUpshow: {
				type: Boolean,
				default: () => {
					return false
				}
			}
		},
		data() {
			return {
				show: false,
				popUpshowAccept: this.popUpshow,
				isOpenPoster:false,
				posterData:{},
				shareList:[],
				hasData:true,
				shouldRequest:true,
				isLastItem:false,
				updatePage:1,
			}
		},
		watch: {
			popUpshow(newVal) {
				this.popUpshowAccept = newVal
			}
		},
		mounted() {
			uni.$on("toOpenSharePoster",()=>{
				const name=uni.getStorageSync("userInfo").name
				const userId=uni.getStorageSync("userInfo").buyerId 
				const baseCodeUrl = process.env.NODE_ENV=="development" ? "http://192.168.2.15:8082":"https://h5.jialex.cn"
				this.posterData={
					codeUrl : `${baseCodeUrl}/pages/home/home?share=platform&userId=${userId}`,
					name,
					loadType:3 // 0 邀请分享  1 分享把玩
				}
				this.isOpenPoster=true
			})
		},
		beforeDestroy() {
			uni.$off("toOpenSharePoster")
		},
		methods: {
			updateList(){
				if(this.shouldRequest){
					this.getShareList(list=>{
						if(list==0){
							this.isLastItem=true
							this.shouldRequest=false
						}else{
							this.shareList=[...this.shareList,...list]
						}
					})
				}
			},
			close() {
				this.$emit('closePop')
				this.updatePage=1
			},
			open() {
				this.getShareList((list)=>{
					if(list==0){
						this.hasData=false
					}else{
					    this.hasData=true
						this.shareList=list
					}
				})
				console.log(this.shareList,'this.shareList')
			},
			async getShareList(callback){
				try{
					const res=await uni.$http("/share/inviteList",{
						state:3,
						page:this.updatePage,
						size:10
					})
					if(res.code==0){
						if(res.data.list.length==0){
							callback(0)
						}else{
							this.updatePage++
							callback(res.data.list)
						}
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			toQrcode() {
				uni.$emit("toOpenSharePoster")
			},
		},
	}
</script>

<style lang="less">
	.font78{
		font-size: 28rpx;
		font-family: SourceHanSansCN-Regular, SourceHanSansCN;
		font-weight: 400;
		color: #CCCCCC;
		line-height: 40rpx;
	}
	::v-deep .u-popup__content {
		z-index: 9998 !important;
	}

	.oneText {
		width: 100%;
		height: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		font-family: SourceHanSansCN-Regular, SourceHanSansCN;
		font-weight: 400;
		color: #CCCCCC;
		line-height: 42rpx;
		margin-bottom: 24rpx;
	}

	.buttons {
		width: 100%;
		height: 80rpx;
		background: #28D8E5;
		border-radius: 20rpx;
		font-size: 32rpx;
		font-family: SourceHanSansCN-Medium, SourceHanSansCN;
		font-weight: 500;
		color: #000000;
		line-height: 80rpx;
		text-align: center;
	}

	.bottom {
		position: absolute;
		bottom: 0rpx;
		height: 160rpx;
		width: 100%;
		transform: translateX(-50%);
		left: 50%;
		padding: 0 20rpx;
	}

	.scrollSt {
		width: 100%;
		height: calc(100vh - 1060rpx);
		margin-top: 20rpx;
	}

	.content {
		height: 60vh;
		padding-top: 20rpx;
		background: #222222;
        z-index: 9998 !important;
		::v-deep .u-popup__content__close--top-right {
			top: 16rpx !important;
		}

		position: relative;
	}

	.headerTip {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		font-family: SourceHanSansCN-Regular, SourceHanSansCN;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 42rpx;
	}

	.header {
		width: 100%;
		height: 100rpx;
		border-bottom: 2rpx solid rgba(255, 255, 255, 0.1);
		font-size: 36rpx;
		font-family: SourceHanSansCN-Medium, SourceHanSansCN;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 80rpx;
		text-align: center;
	}

	.forText {
		width: 100%;
		height: calc(100vh - 100rpx);
		padding: 40rpx;
	}
</style>
