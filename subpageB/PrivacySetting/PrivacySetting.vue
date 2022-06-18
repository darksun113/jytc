<template>
	<PageTemp class="pricavy-page">
		<view class="pricavy-box" v-if="show">
			<view class="title">
				不允许他/她看我的数字收藏
			</view>
			<view class="pricavy-item">
				<text>陌生人</text>
				<u-switch v-model="pricavyForm.stranger_1" activeColor="#A5A6FF" asyncChange
					@change="change('stranger_1',4)" inactiveColor="#2C2E69"></u-switch>
			</view>
			<view class="pricavy-item">
				<text>粉丝</text>
				<u-switch v-model="pricavyForm.fans_1" asyncChange @change="change('fans_1',5)" activeColor="#A5A6FF"
					inactiveColor="#2C2E69"></u-switch>
			</view>
			<view class="pricavy-item">
				<text>粉丝</text>
				<u-switch v-model="pricavyForm.friend_1" asyncChange @change="change('friend_1',6)"
					activeColor="#A5A6FF" inactiveColor="#2C2E69"></u-switch>
			</view>
		</view>
		<view class="pricavy-box" v-if="show">
			<view class="title">
				不允许他/她看我的粉丝列表
			</view>
			<view class="pricavy-item">
				<text>陌生人</text>
				<u-switch v-model="pricavyForm.stranger_2" asyncChange @change="change('stranger_2',7)"
					activeColor="#A5A6FF" inactiveColor="#2C2E69"></u-switch>
			</view>
			<view class="pricavy-item">
				<text>粉丝</text>
				<u-switch v-model="pricavyForm.fans_2" asyncChange @change="change('fans_2',8)" activeColor="#A5A6FF"
					inactiveColor="#2C2E69"></u-switch>
			</view>
			<view class="pricavy-item">
				<text>粉丝</text>
				<u-switch v-model="pricavyForm.friend_2" asyncChange @change="change('friend_2',9)"
					activeColor="#A5A6FF" inactiveColor="#2C2E69"></u-switch>
			</view>
		</view>
		<view class="pricavy-box" v-if="show">
			<view class="title">
				不允许他/她看我的关注列表
			</view>
			<view class="pricavy-item">
				<text>陌生人</text>
				<u-switch v-model="pricavyForm.stranger_3" asyncChange @change="change('stranger_3',10)"
					activeColor="#A5A6FF" inactiveColor="#2C2E69"></u-switch>
			</view>
			<view class="pricavy-item">
				<text>粉丝</text>
				<u-switch v-model="pricavyForm.fans_3" asyncChange @change="change('fans_3',11)" activeColor="#A5A6FF"
					inactiveColor="#2C2E69"></u-switch>
			</view>
			<view class="pricavy-item">
				<text>粉丝</text>
				<u-switch v-model="pricavyForm.friend_3" asyncChange @change="change('friend_3',12)"
					activeColor="#A5A6FF" inactiveColor="#2C2E69"></u-switch>
			</view>
		</view>
	</PageTemp>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				pricavyForm: {
					stranger_1: false,
					fans_1: false,
					friend_1: false,
					stranger_2: false,
					fans_2: false,
					friend_2: false,
					stranger_3: false,
					fans_3: false,
					friend_3: false
				}
			};
		},
		onShow() {
			this.getPrivacySet(item => {
				let type = ""
				switch (item.type) {
					case 4:
						type = "stranger_1"
						break;
					case 5:
						type = "fans_1"
						break;
					case 6:
						type = "friend_1"
						break;
					case 7:
						type = "stranger_2"
						break;
					case 8:
						type = "fans_2"
						break;
					case 9:
						type = "friend_2"
						break;
					case 10:
						type = "stranger_3"
						break;
					case 11:
						type = "fans_3"
						break;
					case 12:
						type = "friend_3"
						break;
				}
				this.renderSwitch(type, item.status)
			})
		},
		methods: {
			async change(key, type) {
				try {
					const status = this.pricavyForm[key] ? 0 : 1
					const res = await uni.$http("/user/setPrivacy", {
						status,
						type
					})
					if (res.code == 0) {
						this.pricavyForm[key] = !this.pricavyForm[key]
						uni.$u.toast("操作成功")
					} else {
						uni.$u.toast(res.errorMsg)
					}
				} catch (e) {
					//TODO handle the exception
				}

			},
			async getPrivacySet(callback) {
				try {
					const res = await uni.$http("/user/getPrivacySet", {})
					if (res.code == 0) {
						res.data.list.forEach(item => {
							callback(item)
						})
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			renderSwitch(type, status) {
				this.pricavyForm[type] = status == 0 ? false : true
				if (type == "friend_3") this.show = true
			}
		}
	}
</script>

<style lang="scss">
	.pricavy-page {
		padding: 40rpx;

		.pricavy-box {
			// height: 510rpx;
			background: #0A0C47;
			border-radius: 32rpx;
			padding: 40rpx;
			padding-bottom: 0;
			color: #FFFFFF;
			margin-bottom: 20rpx;

			.title {
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				line-height: 44rpx;
			}

			.pricavy-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 140rpx;
				border-bottom: 1px solid rgba(255, 255, 255, .15);

				&:last-child {
					border-bottom: none;
				}
			}
		}
	}
</style>
