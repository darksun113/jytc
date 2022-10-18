<template>
	<view class="w100 min100 sign pb-40">
		<view class="bg-white mlr-20 radius-10 ptb-20">
			<model-calendar 
				:sendYear="toYear" 
				:sendMonth="toMonth" 
				:dataSource="signData" :totalNum="sumCount" @signUp="signUp" />
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
				signData: ["2022-10-12", "2022-10-10", "2022-10-11"], 
				// signData: [], 
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
				
			},
			signUp() {
				this.signData.push("2022-10-18")
				uni.showToast({
					title: "签到成功",
					icon: 'success',
					duration: 2000
				});
				this.init()
			},

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

