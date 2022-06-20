<template>
	<u-popup :show="show" @close="close" :closeable="true" mode="center" bgColor="transparent">
		<view class="pop-box">
			<view class="main">
				<view class="title">修改头像</view>
				<view class="container-box">
					<image class="avatar" :class="{checked:useAvatar==1}" @click="selectAvatar(1)" src="@/static/avatar/1.png"></image>
					<image class="avatar" :class="{checked:useAvatar==2}" @click="selectAvatar(2)" src="@/static/avatar/2.png"></image>
					<image class="avatar" :class="{checked:useAvatar==3}" @click="selectAvatar(3)" src="@/static/avatar/3.png"></image>
					<image class="avatar" :class="{checked:useAvatar==4}" @click="selectAvatar(4)" src="@/static/avatar/4.png"></image>
					<image class="avatar" :class="{checked:useAvatar==5}" @click="selectAvatar(5)" src="@/static/avatar/5.png"></image>
					<image class="avatar" :class="{checked:useAvatar==6}" @click="selectAvatar(6)" src="@/static/avatar/6.png"></image>
				</view>
			</view>
			<view class="operate-box" @click="comfirmChange">
				确认修改
			</view>
		</view>
	</u-popup>
</template>

<script>
	import {imgPathToBase64,base64toFile,getFileMd5 ,uploadFile} from "@/utils/tools.js"
	export default{
		props:{
			isShow:{
				type:Boolean,
				default:()=>true
			}
		},
		data(){
			return {
				show:this.isShow,
				useAvatar:null,
				ruleForm: {
					coverUrl: "",
					coverFile: ""
				},
			}
		},
		methods:{
			selectAvatar(idx){
				uni.showLoading()
				const Data = new Request(`../../../../static/avatar/${idx}.png`)
				imgPathToBase64(Data.url,async (base)=>{
					this.fileBlob=await base64toFile(base,"头像"+idx)
					this.fileMd5=await getFileMd5(this.fileBlob)
					this.useAvatar=idx
					uni.hideLoading()
				})
			},
			async comfirmChange(){
				try{
					uni.showLoading()
					const res=await uploadFile(this.fileMd5,this.fileBlob)
					if(res.status=='success'){
						const res_= uni.$http("/user/editBuyerInfo",{
							name:this.$store.state.userInfo.name,
							avatar:res.info
						})
						if(res_.code==0){
							this.$updateUserInfo()
							uni.hideLoading()
							this.$toast("修改成功")
							this.$emit("close")
						}else{
							uni.hideLoading()
							this.$toast(res_.errorMsg)
						}
					}else{
						uni.hideLoading()
						this.$toast(res.info)
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			close(){
				this.$emit('close')
			}
		},
		watch:{
			isShow(boo){
				this.show=boo
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pop-box{
		width: 640rpx;
		background: #0A0C47;
		border-radius: 16rpx;
		.main{
			font-size: 28rpx;
			font-weight: 400;
			padding: 32rpx;
			.title{
				font-size: 34rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 48rpx;
				text-align: center;
			}
			.container-box{
				padding: 60rpx 80rpx;
				padding-top: 0;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				.avatar{
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					margin-top: 60rpx;
				}
				.checked{
					position: relative;
					&::after{
						width: 100%;
						height: 100%;
						content: '';
						background: url("../../static/images/check_icon.svg") no-repeat center center rgba(0, 0, 0, .5);
						background-size: 80rpx 60rpx;
						position: absolute;
						left: 0;
						top: 0;
						border-radius: 50%;
						
					}
				}
			}
		}
		.operate-box{
			height: 110rpx;
			border-top: 2rpx solid rgba(255, 255, 255, .2);
			text-align: center;
			line-height: 110rpx;
		}
	}
</style>