<template>
	<view class="w100 min100 sign pb-40">
		<view style="">
			<view class="gray-2 text-center">已连续签到</view>
			<view class="text-center mt-30 "><text style="font-size: 50rpx;margin-right: 10rpx;" class="yellow bold">{{sumCount}}</text>天</view>
		</view>
		<view class="bg-white mlr-20 radius-10 ptb-20">
			<model-calendar :sendYear="toYear" :sendMonth="toMonth" :dataSource="signData" :totalNum="sumCount" @dateChange="getRecord">
			</model-calendar>
			<view class="plr-40">
				<u-button type="warning" @click="clickSign" :disabled="status" class="w100">{{!status?'立即签到':'今日已签到'}}</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import modelCalendar from './components/Calendar.vue';

	export default {
		data() {
			return {
				toYear: parseInt(new Date().getFullYear()), //本日
				toMonth: parseInt(new Date().getMonth() + 1), //本月
				sumCount: 0,
				signData: ["2021-01-13", "2021-01-12", "2021-01-11"], //["2021-01-13", "2021-01-12", "2021-01-11"]
				status: false,
				set: {},
				month: '',
			};
		},
		components: {
			modelCalendar
		},
		onLoad() {
			this.init()
			this.setSign()
		},
		methods: {
			init() {
				this.$http('/addons/ddshop/signin/signin_record', {
					month: this.month
				}).then(data => {
					this.signData = data.signin_record
					this.sumCount = data.succession_signin
					this.status = data.is_signin_day
				})
			},
			setSign() {
				this.$http('/addons/ddshop/signin/signin_set').then(data => {
					this.set = data.signin_set
				})
			},
			getRecord(data) {
				this.month = data
				this.init()
			},
			clickSign() {
				this.$http("/addons/ddshop/signin/signin").then(res => { //可以通过后台接口添加当前用户当日打卡记录，
					uni.showToast({
						title: "签到成功",
						icon: 'success',
						duration: 2000
					});
					this.init()
				})
			},
			//当模板的时候可以直接引入，然后触发子组件事件到父界面去控制数据

			//获取当前用户该任务的签到数组
			getData(val) {
				let y = val.split('-')[0];
				let m = val.split('-')[1];
				//this.$http.postHttp("Comment/GetRecord", {//可以通过后台接口去获取你的打卡数据
				// 	Year: y,
				// 	Month: m,
				// }, (res) => {
				//console.log(res);
				this.sumCount = 88; //res.SumCount

				if (y == this.toYear && m == this.toMonth) {
					//这是我造的假数据！！！
					let num = ["2", "3", "6", "8", "12", "15"],
						newSign = [],
						today = new Date().getDate();
					for (let i = 0; i < 6; i++) {
						if (parseInt(num[i]) > today) {
							break;
						}
						newSign.push(y + "-" + m + "-" + num[i])
					}

					//console.log(newSign);//最后传给组件的格式看这里-------------
					this.signData = newSign;
					console.log(this.signData);
				} else {
					this.signData = [];
				}
				// })
			},
		}
	}
</script>

<style lang='scss'>
</style>

