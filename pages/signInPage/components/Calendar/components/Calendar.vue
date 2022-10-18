<template>
	<!-- 打卡日历页面 -->
	<view class='all'>
		<!-- 显示星期 -->
		<view class="myDateTable">
			<view class="week" v-if="langType=='ch'">
				<view v-for="(item,index) in weeks_ch" :key="index">{{item}}</view>
			</view>
			<view class="cell-box">
				<view v-for="(item,j) in days" :key="j" class='dateCell'>
					<view v-if="item.date==undefined||item.date == null" class='cell'>
						<text :decode="true">&nbsp;&nbsp;</text>
					</view>
					<view v-else style="width:100%;height:100%;">
						<!-- 已签到日期 -->
						<view v-if="item.isSign == true" class='cell'>
							<image style="width:100%;height:100%;display: inline" src="@/static/images/check_icon.svg" mode=""></image>
						</view>
						<!-- 漏签 -->
						<!-- <view @click="clickSignUp(item.date,0)" class="cell redColor bgGray" 
						v-else-if="cur_year<toYear||(cur_year==toYear&&cur_month<toMonth)||(cur_year==toYear&&cur_month==toMonth&&item.date<today)">
							小程序不兼容这个 v-else-if="(new Date(cur_year+'-'+cur_month+'-'+item.date))<(new Date())">
							<text>{{item.date}}</text>
						</view> -->
						<!-- 今日未签到-->
						<view @click="clickSignUp(item.date)" class="cell white bg-red"
							v-else-if="item.date==today&&cur_month==toMonth&&cur_year==toYear">
							<text>今日</text>
						</view>
						<!-- 当前日期之后 -->
						<view class="whiteColor cell" v-else>
							<text>{{item.date}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				days: [],
				SignUp: [],
				cur_year: 0, //当前选的年
				cur_month: 0, //当前选的月
				today: parseInt(new Date().getDate()), //本日
				toMonth: parseInt(new Date().getMonth() + 1), //本月
				toYear: parseInt(new Date().getFullYear()), //本年
				weeks_ch: ['日', '一', '二', '三', '四', '五', '六'],
				weeks_en: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
			};
		},
		props: {
			sendYear: {
				type: Number,
				default: new Date().getFullYear()
			},
			sendMonth: {
				type: Number,
				default: new Date().getMonth() + 1
			},
			dataSource: { //已签到的数据源
				type: Array,
				default: () => {
					return []
				}
			},
			langType: { //只是示例一个翻译而已，要想所有都翻译自己可以再加加
				type: String,
				default: "ch"
			},
		},
		created() {
			this.cur_year = this.sendYear;
			this.cur_month = this.sendMonth;
			this.SignUp = this.dataSource;

			this.calculateEmptyGrids(this.cur_year, this.cur_month);
			this.calculateDays(this.cur_year, this.cur_month);
			this.onJudgeSign();
		},
		watch: {
			dataSource: 'onResChange',
		},
		methods: {
			// 获取当月共多少天
			getThisMonthDays(year, month) {
				return new Date(year, month, 0).getDate()
			},
			// 获取当月第一天星期几
			getFirstDayOfWeek(year, month) {
				return new Date(Date.UTC(year, month - 1, 1)).getDay();
			},
			// 计算当月1号前空了几个格子，把它填充在days数组的前面
			calculateEmptyGrids(year, month) {
				//计算每个月时要清零
				this.days = [];
				const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
				if (firstDayOfWeek > 0) {
					for (let i = 0; i < firstDayOfWeek; i++) {
						var obj = {
							date: null,
							isSign: false
						}
						this.days.push(obj);
					}
				}
			},

			// 绘制当月天数占的格子，并把它放到days数组中
			calculateDays(year, month) {

				const thisMonthDays = this.getThisMonthDays(year, month);
				// this.columnsLen=Math.ceil(thisMonthDays/7);
				// console.log(this.columnsLen);
				for (let i = 1; i <= thisMonthDays; i++) {
					var obj = {
						date: i,
						isSign: false
					}
					this.days.push(obj);
				}
				//console.log(this.days);

			},

			onResChange(newD, oldD) {
				this.SignUp = newD;
				this.onJudgeSign();
			},
			//匹配判断当月与当月哪些日子签到打卡
			onJudgeSign() {
				var signs = this.SignUp;
				var daysArr = this.days;
				for (var i = 0; i < signs.length; i++) {
					var current = new Date(signs[i].replace(/-/g, "/"));
					var year = current.getFullYear();
					var month = current.getMonth() + 1;
					var day = current.getDate();
					day = parseInt(day);
					for (var j = 0; j < daysArr.length; j++) {
						//年月日相同则打卡成功   						
						if (year == this.cur_year && month == this.cur_month && daysArr[j].date ==
							day) { //&& signs[i].isSign == "今日已打卡"
							// console.log(daysArr[j].date, day);
							daysArr[j].isSign = true;
						}
					}
				}
				this.days = daysArr;
			},

			clickSignUp(date, type) { //type=0补签，type=1当日签到		

				// var str = "签到";
				// if (type == 0) {//如果不需要补签功能直接在这阻止不执行后面的代码就行。
				// 	str = "补签";
				// }
				// uni.showToast({
				// 	title: str + "成功" + date + "号",
				// 	icon: 'success',
				// 	duration: 2000
				// });
				// this.SignUp.push(this.cur_year + "-" + this.cur_month + "-" + date); //自动加假数据，写了接口就不用了

				// console.log(this.SignUp);
				// this.$forceUpdate();

				// this.$emit('clickChange', this.cur_year + "-" + this.cur_month + "-" + date); //传给调用模板页面
				// this.$emit('clickChange'); //传给调用模板页面

				//refresh
				this.onJudgeSign();

			}
		}
	}
</script>

<style lang="scss" scoped>
	.all {
		width: 100%;
		border-radius: 20rpx;
		background-color: #333;
		.week {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 40rpx;
			padding-left: 78rpx;
			font-size: 32rpx;
			color: #999;
			padding-right: 85rpx;
			border-radius: 20rpx;
			background-color: #333;
		}

		.myDateTable {
			margin: 2.5vw;
			border-radius: 20rpx;
			background: #333;
			.cell-box{
				padding: 0 50rpx;
				text-align: justify;
				.dateCell {
					width: 80rpx;
					height:80rpx;
					padding: 1vw;
					display: inline-block;
					text-align: center;
					font-size: 32rpx;
				
					.cell {
						display: flex;
						border-radius: 50%;
						height: 100%;
						width: 100%;
						justify-content: center;
						align-items: center;
					}
				}
			}
		}
	}

	.bgGray {
		background-color: rgba(255, 255, 255, 0.42);
	}

	.redColor {
		color: #ff0000;
	}
</style>
