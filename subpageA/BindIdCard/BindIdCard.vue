<template>
	<PageTemp class="bind-card-page">
		<view class="box">
			<image class="iset" src="@/static/images/idCord.png" mode=""></image>
			<view class="font12" style="padding-top: 60rpx">
				应工信部要求，平台服务需要进行真实身份信息认证。我们将会全力保护用户隐私，您提供的身份信息仅用于判断是否满足平台购买、出售、上传、转赠作品服务等要求，不会用于其他用途。
			</view>
			<view class="font12">
				<view class="yihang" v-for="(item, index) in list" :key="index">
					<view class="">{{ index + 1 + "." }}</view>
					<view style="text-align: left">{{ item }}</view>
				</view>
			</view>
			<view class="form">
				<view class="flexForm" @click="getname">
					<view style="flex: 3">姓名</view>
					<view class="input" style="flex: 8">
						<input style="width: 354rpx;"  label="姓名" placeholder="请输入姓名" type="text" value="" v-model="name" />
						<image @click="igname" v-if="current" src="../static/images/clear.svg" mode=""></image>
					</view>
				</view>
				<view class="flexForm" @click="getIdcard">
					<view style="flex: 3">身份证号</view>
					<view class="input" style="flex: 8">
						<input  style="width: 350rpx;"  label="身份证号" placeholder="请输入身份证号码" type="text" value="" v-model="idCard" />
						<image @click="igIdcard" v-if="current1" src="../static/images/clear.svg" mode="">
						</image>
					</view>
				</view>
			</view>
			<view class="flexsel" style="">
				<image @click="queren" v-if="querenif" style="width: 28rpx; height: 28rpx" src="../static/images/xuanzhong.svg" mode=""></image>
				<image v-else @click="queren" style="width: 28rpx; height: 28rpx" src="../static/images/xuanzhongno.svg" mode=""></image>
				<view v-if="tipShow" class="gouxuan" :style="{display:querenif?'none':'block'}">请先勾选协议</view>
				<text style="margin-left: 20rpx; font-size: 28rpx; color: #cccccc">我确定认证信息属实本人真实信息</text>
			</view>
			<button v-if="querenif" @click="renzheng" class="buttonb" style="opacity: 1;margin-top: 28rpx;">
				确认
			</button>
			<button v-else @click="warningTip" class="buttonb">
				确认
			</button>
		</view>
	</PageTemp>
</template>

<script>
	export default {
		name: "BindIdCard",
		data() {
			return {
				tipShow: false,
				querenif: false,
				current1: false,
				current: false,
				show: false,
				name: "",
				idCard: "",
				list: [
					"请使用真实姓名及有效身份证号进行实名",
					"身份信息提交后不可进行修改",
					"若绑定他人身份证可能会导致该账号无法购买收款，务必使用本人身份证信息",
					"一个身份证最多只能绑定一个平台账号",
					'任何未满18周岁的未成年人均不得注册帐号或实名验证。本平台将依赖您提供的个人信息判断用户是否为未成年人。此外，如果您不具有完全民事行为能力，请在法定监护人（以下简称"监护人"）的陪同下判断是否实名认证。您点击确认或其他类似按钮并继续实名认证即视为您已经取得监护人的必要同意。'
				],
			};
		},
		onLoad(opt){
			this.$checkAI(2)
		},
		methods: {
			warningTip() {
				this.tipShow = true;
			},
			getname() {
				if (this.name != "") {
					this.current = true;
				}
			},
			getIdcard() {
				if (this.idCard != "") {
					this.current1 = true;
				}
			},
			igname() {
				this.current = false;
				this.name = "";
			},
			igIdcard() {
				this.current1 = false;
				this.idCard = "";
			},
			queren() {
				this.querenif = !this.querenif;
			},
			renzheng() {
				if (this.name == "") {
					uni.showToast({
						title: "姓名不能为空",
						icon: "none",
						duration: 3000,
					});
					return;
				}
				if (this.idCard == "") {
					uni.showToast({
						title: "身份证不能为空",
						icon: "none",
						duration: 3000,
					});
					return;
				}
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if (reg.test(this.idCard) == false) {
					uni.showToast({
						title: "身份证输入不合法",
						icon: "none",
						duration: 3000,
					});
					return;
				}
				var slitTwo = this.idCard.split("", 2);
				var slitTwos = Number(slitTwo.join(""));
				var regList = [
					16, 17, 18, 19, 20, 24, 25, 26, 27, 28, 29, 30, 38, 39, 40, 47, 48, 49,
					55, 56, 57, 58, 59, 60, 66, 67, 68, 69, 70, 72, 73, 74, 75, 76, 77, 78,
					79, 80, 83, 84, 85, 86, 87, 88, 89, 90, 92, 93, 94, 95, 96, 97, 98, 99,
				];
				if (regList.includes(slitTwos)) {
					uni.showToast({
						title: "身份证输入不合法",
						icon: "none",
						duration: 3000,
					});
					return;
				}
				this.sendRequest()
			},
			async sendRequest(){
				try{
					const res = await uni.$http("/user/bindIdCard",{
						fullName:this.name,
						idCard:this.idCard
					})
					if(res.code==0){
						this.$updateUserInfo()
						this.$routerTo("../BindCardSuccess/BindCardSuccess")
					}else{
						this.$routerTo(`../BindCardFail/BindCardFail?errMsg=${res.errorMsg}`)
					}
				}catch(e){
					//TODO handle the exception
				}
			}
		},
	};
</script>

<style lang="scss" scoped>
	.bind-card-page{
		padding: 40rpx;
		overflow: auto;
	}
	.box {
		text-align: center;
		padding-top: 80rpx;
		width: 100%;
		
		.form {
			width: 100%;
			padding: 0 40rpx;
			padding-top: 20rpx;
			margin-top: 60rpx;
		
			.flexForm {
				width: 100%;
				display: flex;
				align-items: center;
				height: 100rpx;
				line-height: 104rpx;
				text-align: left;
				color: #FFFFFF;
				font-size: 32rpx;
				border-bottom: 2rpx solid rgba(238, 238, 238, 1);
		
				.input {
					margin-left: 16rpx;
					height: 100%;
					line-height: 100%;
					font-size: 32rpx;
					display: flex;
					color: #CCCCCC;
					justify-content: space-between;
		
					input {
						height: 100%;
						font-size: 28rpx;
					}
				}
		
				image {
					width: 32rpx;
					height: 32rpx;
					margin-top: 36rpx;
				}
			}
		}
	}

	.textcss {
		color: rgba(136, 136, 136, 1);
		font-size: 28rpx;
	}

	.succText {
		color: rgba(76, 184, 46, 1);
		font-size: 32rpx;
	}

	.failText {
		color: rgba(245, 34, 45, 1);
		font-size: 32rpx;
	}

	.succsstyle {
		width: 120rpx;
		height: 120rpx;
	}

	.boxsu {
		width: 600rpx;
		height: 600rpx;
		background-color: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 20rpx rgba(0, 0, 0, 0.08);
		border-radius: 12rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	button::after {
		border: none;
	}

	.u-hairline-border:after {
		border: none
	}

	.yihang {
		display: flex;
	}

	.chahao {
		margin-top: 36rpx;
		text-align: center;
		line-height: 28rpx;
		color: rgba(247, 247, 247, 1);
		width: 32rpx;
		height: 32rpx;
		border-radius: 24rpx;
		background-color: #888888;
	}

	.buttonb {
		width: 570rpx;
		height: 88rpx;
		background: #28D8E5;
		line-height: 88rpx;
		color: #000;
		margin: 28rpx auto;
		opacity: 0.5;
	}

	.duihao {
		width: 28rpx;
		height: 28rpx;
		background-color: #28D8E5;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		color: #ffffff;
		justify-content: center;
		cursor: pointer;
	}

	.duihao1 {
		cursor: pointer;
		width: 28rpx;
		height: 28rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		color: rgba(0, 0, 0, 1);
		border: 2rpx rgba(0, 0, 0, 1) solid;
		justify-content: center;
	}

	.flexsel {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 56rpx;
		margin-top: 80rpx;
		position: relative;
	}

	.gouxuan {
		background-color: rgba(189, 65, 76, 1);
		border-radius: 8px 8px 8px 0px;
		font-weight: 400;
		padding: 8rpx 20rpx;
		line-height: 30rpx;
		font-size: 20rpx;
		font-family: SourceHanSansCN-Regular, SourceHanSansCN;
		color: #ffffff;
		text-align: center;
		position: absolute;
		left: 120rpx;
		top: -40rpx;
	}

	.uni-button {
		color: #000000
	}

	.iset {
		width: 200rpx;
		height: 150rpx;
		box-sizing: content-box;
		padding: 0 40rpx;
	}

	.font12 {
		color: #CCCCCC;
		text-align: justify;
		font-size: 24rpx;
		line-height: 40rpx;
		padding: 0px 40rpx;

		&:nth-child(3) {
			padding-top: 30rpx;
		}
	}

	.u-default-hover {
		color: #000000;
	}
</style>
