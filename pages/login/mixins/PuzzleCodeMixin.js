
export default {
    data() {
        return {
            isPuzzleShow: false,
            bgImg: "",
            sliderImg: '',
            slidingFigureId: '',
            type: 2,
            phone: null
        };
    },
    methods: {
        // 获取验证码前开启人机拼图验证
        async starCheckRobot(Type, phone) {
            if (this.$store.state.isCount) return;
            this.loginType = Type
            if (Type == 1) {
                this.isPuzzleShow=true
            } else {
                if (this.checkPhone(phone)) {
					uni.showLoading()
                    this.phone = phone
                    this.isPuzzleShow=true
                }
            }
        },
        checkPhone(phone) {
            let reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
            return reg_tel.test(phone) ? true : false
        },
        countdown() {
			this.$store.commit("countdown")
        },
        async getVerificationCode(phone) {
            try {
                if (this.checkPhone(phone)) {
					uni.showLoading()
					// type 类型 1注册 2登录 3重置密码
                    const res = await uni.$http("/notification/sms/sendVerifyCode", { type: this.type, phone})
                    if (res.code == 0) {
						uni.hideLoading()
                        this.countdown()
						uni.showToast({
							title:'发送成功',
							icon:"success"
						})
						this.doSomething()
                    } else if (res.code == 20004) {
						uni.hideLoading()
						uni.showToast({
							title:"短信验证码次数已达上限,请24小时后操作!",
							icon:"error"
						})
                    } else {
						uni.hideLoading()
						uni.showToast({
							title:res.errorMsg,
							icon:"error"
						})
                    }
                }
           } catch (error) {
                throw new Error("系统错误",error)
           } 
        },
        // 滑动拼图,用户点击遮罩层，应该关闭模态框
        puzzleClose() {
            this.isPuzzleShow = false // 通过验证后，需要手动隐藏模态框
        },
		puzzleSuccess(id){
			this.slidingFigureId=id
			this.isPuzzleShow = false
			this.getVerificationCode(this.phone)
		},
        doSomething(){}
    },
}