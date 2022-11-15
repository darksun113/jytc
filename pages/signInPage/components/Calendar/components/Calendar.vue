<template>
	<!-- 打卡日历页面 -->
	<view class='all'>
		<view class="header">
			<text>{{cur_year}} 年 {{cur_month}} 月</text>
			<view class="sign-btn" @touchend="toSignUp">
				{{status == 1 ? '今日已签到' : '立即签到'}}
			</view>
		</view>
		<!-- 显示星期 -->
		<view class="myDateTable">
			<view class="week" v-if="langType=='ch'">
				<view v-for="(item,index) in weeks_ch" :key="index">{{item}}</view>
			</view>
			<view class="cell-box">
				<view v-for="(item,j) in days" :key="j" class='dateCell' >
					<view v-if="item.date==undefined||item.date == null" class='cell'>
						<text :decode="true">&nbsp;&nbsp;</text>
					</view>
					<view v-else style="width:100%;height:100%;">
						<!-- 已签到日期 -->
						<view v-if="item.isSign == true" class='cell'>
							<image style="width:100%;height:100%;" src="@/static/images/check_icon.svg"></image>
						</view>
						<!-- 今日未签到-->
						<view class="cell bg-today" v-else-if="item.date==today&&cur_month==toMonth&&cur_year==toYear">
							<text>{{item.date}}</text>
						</view>
						<!-- 当前日期之后 -->
						<view class="cell" v-else>
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
				status:this.signIn
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
			signIn: {
				type : [Number,String],
				require:true
			}
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
			signIn(num){
				this.status = num
			}
		},
		methods: {
			// 签到
			toSignUp(){
				if(this.status == 1)return;
				this.$emit("signUp")
			},
			// 获取当月共多少天
			getThisMonthDays(year, month) {
				return new Date(year, month, 0).getDate()
			},
			// 获取当月第一天星期几
			getFirstDayOfWeek(year, month) {
				return new Date(Date.UTC(year, month - 1, 1)).getDay();
			},
			// 获取当月最后1天星期几
			getLastDayOfWeek(year, month) {
				const getNowMonthLast = () => {
				 	const endDate = new Date(year, month + 2, 0)
				 	return endDate.getDate()
				}
				const lastDate = getNowMonthLast();
				return new Date(Date.UTC(year, month - 1, lastDate)).getDay();
			},
			// 计算当月1号前空了几个格子，把它填充在days数组的前面
			calculateEmptyGrids(year, month) {
				//计算每个月时要清零
				this.days = [];
				const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
				if (firstDayOfWeek > 0) {
					for (let i = 0; i < firstDayOfWeek; i++) {
						const obj = {
							date: null,
							isSign: false
						}
						this.days.push(obj);
					}
				}
			},
			// 计算当月最后一天后空了几个格子，把它填充在days数组的后面
			calculateLastDayEmptyGrids(year, month){
				const lastDayOfWeek = this.getLastDayOfWeek(year, month);
				if (lastDayOfWeek > 0) {
					for (let i = 7; i > lastDayOfWeek; i--) {
						const obj = {
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
				for (let i = 1; i <= thisMonthDays; i++) {
					let obj = {
						date: i,
						isSign: false
					}
					this.days.push(obj);
				}
				//console.log(this.days);
				this.calculateLastDayEmptyGrids(year, month)
			},
			onResChange(newD, oldD) {
				this.SignUp = newD;
				this.onJudgeSign();
			},
			//匹配判断当月与当月哪些日子签到打卡
			onJudgeSign() {
				let signs = this.SignUp;
				let daysArr = this.days;
				for (let i = 0; i < signs.length; i++) {
					let current = new Date(signs[i].replace(/-/g, "/"));
					let year = current.getFullYear();
					let month = current.getMonth() + 1;
					let day = current.getDate();
					day = parseInt(day);
					for (let j = 0; j < daysArr.length; j++) {
						//年月日相同则打卡成功   						
						if (year == this.cur_year && month == this.cur_month && daysArr[j].date ==day) { //&& signs[i].isSign == "今日已打卡"
							daysArr[j].isSign = true;
						}
					}
				}
				this.days = daysArr;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.all {
		width: 100%;
		border-radius: 20rpx;
		background-color: #333;
		.header{
			padding: 40rpx;
			padding-bottom: 0;
			padding-top: 20rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 44rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.sign-btn{
				padding: 10rpx 0;
				width: 200rpx;
				text-align: center;
				background: linear-gradient(90deg, #FFFFFF 0%, #28D8E5 50%, #C058F6 100%);
				border-radius: 40rpx;
				font-size: 28rpx;
				font-family: SourceHanSansCN-Medium, SourceHanSansCN;
				font-weight: 500;
				color: #000000;
			}
		}
		.week {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 40rpx 60rpx;
			font-size: 32rpx;
			color: #999;
			border-radius: 20rpx;
			background-color: #333;
		}

		.myDateTable {
			margin: 2.5vw;
			border-radius: 20rpx;
			background: #333;
			.cell-box{
				padding: 20rpx 40rpx;
				padding-top: 0;
				text-align: justify;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.dateCell {
					width: 80rpx;
					height:80rpx;
					padding: 1vw;
					display: inline-block;
					text-align: center;
					font-size: 32rpx;
					position: relative;
				
					.cell {
						display: flex;
						border-radius: 50%;
						height: 100%;
						width: 100%;
						justify-content: center;
						align-items: center;
						text{
							font-family: PingFangSC-Regular, PingFang SC;
						}
					}
				}
			}
		}
	}
	.bg-today{
		color: #222;
		background: #28D8E5;
	}
</style>
