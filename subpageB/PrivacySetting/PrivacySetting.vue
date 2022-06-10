<template>
	<PageTemp class="pricavy-page">
		<view class="pricavy-box">
			<view class="title">
				不允许他/她看我的数字收藏
			</view>
			<view class="pricavy-item">
				<text>陌生人</text>
				<u-switch v-model="pricavyForm.stranger_1" activeColor="#A5A6FF" asyncChange @change="asyncChange" inactiveColor="#2C2E69"></u-switch>
			</view>
			<view class="pricavy-item">
				<text>粉丝</text>
				<u-switch v-model="pricavyForm.fans_1" activeColor="#A5A6FF" inactiveColor="#2C2E69"></u-switch>
			</view>
			<view class="pricavy-item">
				<text>粉丝</text>
				<u-switch v-model="pricavyForm.friend_1" activeColor="#A5A6FF" inactiveColor="#2C2E69"></u-switch>
			</view>
		</view>
		<view class="pricavy-box">
			<view class="title">
				不允许他/她看我的粉丝列表
			</view>
			<view class="pricavy-item">
				<text>陌生人</text>
				<u-switch v-model="pricavyForm.stranger_2" activeColor="#A5A6FF" inactiveColor="#2C2E69"></u-switch>
			</view>
			<view class="pricavy-item">
				<text>粉丝</text>
				<u-switch v-model="pricavyForm.fans_2" activeColor="#A5A6FF" inactiveColor="#2C2E69"></u-switch>
			</view>
			<view class="pricavy-item">
				<text>粉丝</text>
				<u-switch v-model="pricavyForm.friend_2" activeColor="#A5A6FF" inactiveColor="#2C2E69"></u-switch>
			</view>
		</view>
		<view class="pricavy-box">
			<view class="title">
				不允许他/她看我的关注列表
			</view>
			<view class="pricavy-item">
				<text>陌生人</text>
				<u-switch v-model="pricavyForm.stranger_3" activeColor="#A5A6FF" inactiveColor="#2C2E69"></u-switch>
			</view>
			<view class="pricavy-item">
				<text>粉丝</text>
				<u-switch v-model="pricavyForm.fans_3" activeColor="#A5A6FF" inactiveColor="#2C2E69"></u-switch>
			</view>
			<view class="pricavy-item">
				<text>粉丝</text>
				<u-switch v-model="pricavyForm.friend_3" activeColor="#A5A6FF" inactiveColor="#2C2E69"></u-switch>
			</view>
		</view>
	</PageTemp>
</template>

<script>
	export default {
		data() {
			return {
				pricavyForm:{
					stranger_1:false,
					fans_1:false,
					friend_1:false,
					stranger_2:false,
					fans_2:false,
					friend_2:false,
					stranger_3:false,
					fans_3:false,
					friend_3:false
				}
				
			};
		},
		onShow() {
			this.getPrivacySet(item=>{
				let type=""
				switch(item.type){
					case 1: type="stranger_1"
						break;
					case 2: type="fans_1"
						break;
					case 3: type="friend_1"
						break;
					case 4: type="stranger_2"
						break;
					case 5: type="fans_2"
						break;
					case 6: type="friend_2"
						break;
					case 7: type="stranger_3"
						break;
					case 8: type="fans_3"
						break;
					case 9: type="friend_3"
						break;
				}
				this.renderSwitch(type,item.status)
			})
		},
		methods:{
			asyncChange(e){
				uni.showModal({
					content: e ? '确定要打开吗' : '确定要关闭吗',
					success: (res) => {
						if (res.confirm) {
							this.pricavyForm.stranger_1 = e
						}
					}
				})
			},
			async getPrivacySet(callback){
				try{
					const res=await uni.$http("/user/getPrivacySet",{})
					if(res.code==0){
						res.data.list.forEach(item=>{
							callback(item)
						})
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			renderSwitch(type,status){
				this.pricavyForm[type]=status==0?false:true
			}
		}
	}
</script>

<style lang="scss">
	.pricavy-page{
		padding: 40rpx;
		.pricavy-box{
			// height: 510rpx;
			background: #0A0C47;
			border-radius: 32rpx;
			padding: 40rpx;
			padding-bottom: 0;
			color: #FFFFFF;
			margin-bottom: 20rpx;
			.title{
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				line-height: 44rpx;
			}
			.pricavy-item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 140rpx;
				border-bottom: 1px solid rgba(255, 255, 255, .15);
				&:last-child{
					border-bottom:none;
				}
			}
		}
	}
</style>
