(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-LoginByMobile-GetVerifyCode-GetVerifyCode~pages-login-LoginByMobile-InputVerifyCode-Inpu~d50f32ac"],{"387e":function(e,t,a){"use strict";a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){}));var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{class:["vue-puzzle-vcode",{show_:e.show}],attrs:{id:e.id},on:{mousedown:function(t){arguments[0]=t=e.$handleEvent(t),e.onCloseMouseDown.apply(void 0,arguments)},mouseup:function(t){arguments[0]=t=e.$handleEvent(t),e.onCloseMouseUp.apply(void 0,arguments)},touchstart:function(t){arguments[0]=t=e.$handleEvent(t),e.onCloseMouseDown.apply(void 0,arguments)},touchend:function(t){arguments[0]=t=e.$handleEvent(t),e.onCloseMouseUp.apply(void 0,arguments)}}},[a("div",{staticClass:"vue-auth-box_",style:{"border-radius":e.borderRadius+"px",display:e.show?"block":"none"},on:{mousedown:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t)},touchstart:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t)}}},[a("div",{staticClass:"auth-body_",style:"height: "+e.canvasHeight+"px"},[e.image1?e._e():a("div",{staticStyle:{width:"300px",height:"150px",background:"#000000"}}),a("img",{directives:[{name:"lazy",rawName:"v-lazy"}],ref:"img1",attrs:{src:e.image1,alt:"",width:e.canvasWidth,height:e.canvasHeight}}),a("img",{directives:[{name:"lazy",rawName:"v-lazy"}],ref:"img2",staticClass:"auth-canvas2_",style:"transform:translateX("+(e.styleWidth-e.sliderBaseSize)+"px)",attrs:{src:e.image2,height:e.canvasHeight,alt:""}}),a("div",{class:["loading-box_",{hide_:!e.loading}]},[e._m(0)]),a("div",{class:["info-box_",{show:e.infoBoxShow},{fail:e.infoBoxFail}]},[e._v(e._s(e.infoText))]),a("div",{class:["flash_",{show:e.isSuccess}],style:"transform: translateX("+(e.isSuccess?e.canvasWidth+.578*e.canvasHeight+"px":"-"+.578*e.canvasHeight+"px")+") skew(-30deg, 0);"}),a("img",{directives:[{name:"lazy",rawName:"v-lazy"}],staticClass:"reset_",attrs:{src:e.resetSvg},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.reset.apply(void 0,arguments)}}})]),a("div",{staticClass:"auth-control_"},[a("div",{staticClass:"range-box",style:"height:"+e.sliderBaseSize+"px"},[a("div",{staticClass:"range-text"},[e._v(e._s(e.sliderText))]),a("div",{ref:"range-slider",staticClass:"range-slider",style:"width:"+e.styleWidth+"px"},[a("div",{class:["range-btn",{isDown:e.mouseDown}],style:"width:"+e.sliderBaseSize+"px",on:{mousedown:function(t){arguments[0]=t=e.$handleEvent(t),e.onRangeMouseDown(t)},touchstart:function(t){arguments[0]=t=e.$handleEvent(t),e.onRangeMouseDown(t)}}},[a("div"),a("div"),a("div")])])])])])])},n=[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"loading-gif_"},[t("span"),t("span"),t("span"),t("span"),t("span")])}]},"46ec":function(e,t,a){"use strict";var o=a("6214"),n=a.n(o);n.a},"4e0c":function(e,t,a){"use strict";a.r(t);var o=a("a3cd"),n=a.n(o);for(var i in o)["default"].indexOf(i)<0&&function(e){a.d(t,e,(function(){return o[e]}))}(i);t["default"]=n.a},"549a":function(e,t,a){"use strict";a("7a82");var o=a("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("ac1f"),a("00b4"),a("d9e2"),a("d401");var n=o(a("c7eb")),i=o(a("1da1")),s={data:function(){return{isPuzzleShow:!1,bgImg:"",sliderImg:"",slidingFigureId:"",type:2,phone:null}},methods:{starCheckRobot:function(e,t){var a=this;return(0,i.default)((0,n.default)().mark((function o(){return(0,n.default)().wrap((function(o){while(1)switch(o.prev=o.next){case 0:if(!a.$store.state.isCount){o.next=2;break}return o.abrupt("return");case 2:a.loginType=e,1==e?a.isPuzzleShow=!0:a.checkPhone(t)&&(uni.showLoading(),a.phone=t,a.isPuzzleShow=!0);case 4:case"end":return o.stop()}}),o)})))()},checkPhone:function(e){return!!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(e)},countdown:function(){this.$store.commit("countdown")},getVerificationCode:function(e){var t=this;return(0,i.default)((0,n.default)().mark((function a(){var o;return(0,n.default)().wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(a.prev=0,!t.checkPhone(e)){a.next=7;break}return uni.showLoading(),a.next=5,uni.$http("/notification/sms/sendVerifyCode",{type:t.type,phone:e});case 5:o=a.sent,0==o.code?(uni.hideLoading(),t.countdown(),uni.showToast({title:"发送成功",icon:"success"}),t.isPuzzleShow=!1,t.afterGetCode()):20004==o.code?(uni.hideLoading(),uni.showToast({title:"短信验证码次数已达上限,请24小时后操作!",icon:"error"})):(uni.hideLoading(),uni.showToast({title:o.errorMsg,icon:"error"}));case 7:a.next=12;break;case 9:throw a.prev=9,a.t0=a["catch"](0),new Error("系统错误",a.t0);case 12:case"end":return a.stop()}}),a,null,[[0,9]])})))()},puzzleClose:function(){this.isPuzzleShow=!1},puzzleSuccess:function(e){this.slidingFigureId=e,this.isPuzzleShow=!1,this.getVerificationCode(this.phone)},afterGetCode:function(){}}};t.default=s},6214:function(e,t,a){var o=a("a035");o.__esModule&&(o=o.default),"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var n=a("4f06").default;n("532701bb",o,!0,{sourceMap:!1,shadowMode:!1})},"8c5c":function(e,t,a){"use strict";a.r(t);var o=a("387e"),n=a("4e0c");for(var i in n)["default"].indexOf(i)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(i);a("46ec");var s=a("f0c5"),r=Object(s["a"])(n["default"],o["b"],o["c"],!1,null,"e7563e84",null,!1,o["a"],void 0);t["default"]=r.exports},a035:function(e,t,a){var o=a("24fb");t=o(!1),t.push([e.i,".vue-puzzle-vcode[data-v-e7563e84]{z-index:99999;position:fixed;top:0;left:0;bottom:0;right:0;background-color:rgba(0,0,0,.3);opacity:0;pointer-events:none;transition:opacity .2s}.vue-puzzle-vcode.show_[data-v-e7563e84]{opacity:1;pointer-events:auto}img[data-v-e7563e84]{pointer-events:auto}.vue-auth-box_[data-v-e7563e84]{position:absolute;top:40%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);padding:20px;background:#fff;-webkit-user-select:none;user-select:none;border-radius:3px;box-shadow:0 1px 3px rgba(0,0,0,.3)}.vue-auth-box_ .auth-body_[data-v-e7563e84]{position:relative;overflow:hidden;border-radius:3px}.vue-auth-box_ .auth-body_ .loading-box_[data-v-e7563e84]{position:absolute;top:0;left:0;bottom:0;right:0;background-color:rgba(0,0,0,.8);z-index:20;opacity:1;transition:opacity .2s;display:flex;align-items:center;justify-content:center}.vue-auth-box_ .auth-body_ .loading-box_.hide_[data-v-e7563e84]{opacity:0;pointer-events:none}.vue-auth-box_ .auth-body_ .loading-box_.hide_ .loading-gif_ span[data-v-e7563e84]{-webkit-animation-play-state:paused;animation-play-state:paused}.vue-auth-box_ .auth-body_ .loading-box_ .loading-gif_[data-v-e7563e84]{flex:none;height:5px;line-height:0}@-webkit-keyframes load-data-v-e7563e84{0%{opacity:1;-webkit-transform:scale(1.3);transform:scale(1.3)}100%{opacity:.2;-webkit-transform:scale(.3);transform:scale(.3)}}@keyframes load-data-v-e7563e84{0%{opacity:1;-webkit-transform:scale(1.3);transform:scale(1.3)}100%{opacity:.2;-webkit-transform:scale(.3);transform:scale(.3)}}.vue-auth-box_ .auth-body_ .loading-box_ .loading-gif_ span[data-v-e7563e84]{display:inline-block;width:5px;height:100%;margin-left:2px;border-radius:50%;background-color:#888;-webkit-animation:load-data-v-e7563e84 1.04s ease infinite;animation:load-data-v-e7563e84 1.04s ease infinite}.vue-auth-box_ .auth-body_ .loading-box_ .loading-gif_ span[data-v-e7563e84]:nth-child(1){margin-left:0}.vue-auth-box_ .auth-body_ .loading-box_ .loading-gif_ span[data-v-e7563e84]:nth-child(2){-webkit-animation-delay:.13s;animation-delay:.13s}.vue-auth-box_ .auth-body_ .loading-box_ .loading-gif_ span[data-v-e7563e84]:nth-child(3){-webkit-animation-delay:.26s;animation-delay:.26s}.vue-auth-box_ .auth-body_ .loading-box_ .loading-gif_ span[data-v-e7563e84]:nth-child(4){-webkit-animation-delay:.39s;animation-delay:.39s}.vue-auth-box_ .auth-body_ .loading-box_ .loading-gif_ span[data-v-e7563e84]:nth-child(5){-webkit-animation-delay:.52s;animation-delay:.52s}.vue-auth-box_ .auth-body_ .info-box_[data-v-e7563e84]{position:absolute;bottom:0;left:0;width:100%;height:24px;line-height:24px;text-align:center;overflow:hidden;font-size:13px;background-color:#83ce3f;opacity:0;-webkit-transform:translateY(24px);transform:translateY(24px);transition:all .2s;color:#fff;z-index:10}.vue-auth-box_ .auth-body_ .info-box_.show[data-v-e7563e84]{opacity:.95;-webkit-transform:translateY(0);transform:translateY(0)}.vue-auth-box_ .auth-body_ .info-box_.fail[data-v-e7563e84]{background-color:#ce594b}.vue-auth-box_ .auth-body_ .auth-canvas2_[data-v-e7563e84]{position:absolute;top:0;left:0;z-index:2}.vue-auth-box_ .auth-body_ .auth-canvas3_[data-v-e7563e84]{position:absolute;top:0;left:0;opacity:0;transition:opacity .6s;z-index:3}.vue-auth-box_ .auth-body_ .auth-canvas3_.show[data-v-e7563e84]{opacity:1}.vue-auth-box_ .auth-body_ .flash_[data-v-e7563e84]{position:absolute;top:0;left:0;width:30px;height:100%;background-color:hsla(0,0%,100%,.1);z-index:3}.vue-auth-box_ .auth-body_ .flash_.show[data-v-e7563e84]{transition:-webkit-transform .6s;transition:transform .6s;transition:transform .6s,-webkit-transform .6s}.vue-auth-box_ .auth-body_ .reset_[data-v-e7563e84]{position:absolute;top:2px;right:2px;width:35px;height:auto;z-index:12;cursor:pointer;transition:-webkit-transform .2s;transition:transform .2s;transition:transform .2s,-webkit-transform .2s;-webkit-transform:rotate(0deg);transform:rotate(0deg)}.vue-auth-box_ .auth-body_ .reset_[data-v-e7563e84]:hover{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.vue-auth-box_ .auth-control_ .range-box[data-v-e7563e84]{position:relative;width:100%;background-color:#eef1f8;margin-top:20px;border-radius:3px;box-shadow:0 0 8px hsla(0,0%,94.1%,.6) inset}.vue-auth-box_ .auth-control_ .range-box .range-text[data-v-e7563e84]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);font-size:14px;color:#b7bcd1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center;width:100%}.vue-auth-box_ .auth-control_ .range-box .range-slider[data-v-e7563e84]{position:absolute;height:100%;width:50px;background-color:rgba(106,160,255,.8);border-radius:3px}.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn[data-v-e7563e84]{position:absolute;display:flex;align-items:center;justify-content:center;right:0;width:50px;height:100%;background-color:#fff;border-radius:3px;box-shadow:0 0 4px #ccc;cursor:pointer}.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn > div[data-v-e7563e84]{width:0;height:40%;transition:all .2s;border:solid 1px #6aa0ff}.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn > div[data-v-e7563e84]:nth-child(2){margin:0 4px}.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn:hover > div[data-v-e7563e84]:first-child,\n.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn.isDown > div[data-v-e7563e84]:first-child{border:solid 4px transparent;height:0;border-right-color:#6aa0ff}.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn:hover > div[data-v-e7563e84]:nth-child(2),\n.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn.isDown > div[data-v-e7563e84]:nth-child(2){border-width:3px;height:0;border-radius:3px;margin:0 6px;border-right-color:#6aa0ff}.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn:hover > div[data-v-e7563e84]:nth-child(3),\n.vue-auth-box_ .auth-control_ .range-box .range-slider .range-btn.isDown > div[data-v-e7563e84]:nth-child(3){border:solid 4px transparent;height:0;border-left-color:#6aa0ff}.vue-puzzle-overflow[data-v-e7563e84]{overflow:hidden!important}",""]),e.exports=t},a3cd:function(e,t,a){"use strict";a("7a82");var o=a("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(a("c7eb")),i=o(a("1da1"));a("a9e3"),a("d9e2"),a("d401");var s=a("d6b0"),r={name:"PuzzleCode",props:{id:{type:String,default:void 0},canvasWidth:{type:Number,default:300},canvasHeight:{type:Number,default:150},show:{type:Boolean,default:!1},sliderSize:{type:Number,default:35},successText:{type:String,default:"验证通过！"},failText:{type:String,default:"验证失败，请重试"},sliderText:{type:String,default:"拖动滑块完成拼图"},borderRadius:{type:Number,default:10},loadType:{type:Number,default:1}},data:function(){return{image1:"",image2:"",roundId:"",mouseDown:!1,startWidth:50,startX:0,newX:0,loading:!0,isCanSlide:!1,error:!1,infoBoxShow:!1,infoText:"",infoBoxFail:!1,timer1:null,closeDown:!1,isSuccess:!1,resetSvg:s,isSubmit:!1}},computed:{styleWidth:function(){var e=this.startWidth+this.newX-this.startX;return e<this.sliderBaseSize?this.sliderBaseSize:e>this.canvasWidth?this.canvasWidth:e},sliderBaseSize:function(){return Math.max(Math.min(Math.round(this.sliderSize),Math.round(.5*this.canvasWidth)),10)}},watch:{show:function(e){e?(document.body.classList.add("vue-puzzle-overflow"),this.reset()):document.body.classList.remove("vue-puzzle-overflow")}},mounted:function(){document.body.appendChild(this.$el),document.addEventListener("mousemove",this.onRangeMouseMove,!1),document.addEventListener("mouseup",this.onRangeMouseUp,!1),document.addEventListener("touchmove",this.onRangeMouseMove,{passive:!1}),document.addEventListener("touchend",this.onRangeMouseUp,!1)},beforeDestroy:function(){clearTimeout(this.timer1),document.body.removeChild(this.$el),document.removeEventListener("mousemove",this.onRangeMouseMove,!1),document.removeEventListener("mouseup",this.onRangeMouseUp,!1),document.removeEventListener("touchmove",this.onRangeMouseMove,{passive:!1}),document.removeEventListener("touchend",this.onRangeMouseUp,!1)},methods:{onClose:function(){this.mouseDown||(clearTimeout(this.timer1),this.$emit("close"))},onCloseMouseDown:function(){this.closeDown=!0},onCloseMouseUp:function(){this.closeDown&&this.onClose(),this.closeDown=!1},onRangeMouseDown:function(e){this.isCanSlide&&(this.mouseDown=!0,this.startWidth=this.$refs["range-slider"].clientWidth,this.newX=e.clientX||e.changedTouches[0].clientX,this.startX=e.clientX||e.changedTouches[0].clientX)},onRangeMouseMove:function(e){this.mouseDown&&(e.preventDefault(),this.newX=e.clientX||e.changedTouches[0].clientX)},onRangeMouseUp:function(){this.mouseDown&&(this.mouseDown=!1,this.submit())},getPuzzleData:function(){var e=this;return(0,i.default)((0,n.default)().mark((function t(){var a;return(0,n.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,uni.$http("/puzzle/get",{type:1});case 3:a=t.sent,0==a.code?(e.image1=a.data.background.url,e.image2=a.data.slide.url,e.roundId=a.data.id,e.loading=!1,e.isCanSlide=!0):uni.showToast({title:a.errorMsg,icon:"error"}),t.next=10;break;case 7:throw t.prev=7,t.t0=t["catch"](0),new Error("系统错误",t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},submit:function(){var e=this;this.isCanSlide=!1,this.isSubmit=!0;var t=this.newX-this.startX;this.loading=!0,setTimeout((function(){e.check(!1,t)}),500)},check:function(e,t){var a=this;return(0,i.default)((0,n.default)().mark((function e(){var o;return(0,n.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,uni.$http("/puzzle/verify",{x:t,id:a.roundId,type:a.loadType});case 3:o=e.sent,o.data?(a.infoText=a.successText,a.infoBoxFail=!1,a.infoBoxShow=!0,a.isCanSlide=!1,a.isSuccess=!0,clearTimeout(a.timer1),a.timer1=setTimeout((function(){a.$emit("update:show",!1),a.$emit("success",a.roundId)}),800)):(a.infoText=a.failText,a.infoBoxFail=!0,a.infoBoxShow=!0,a.isCanSlide=!1,a.$emit("fail",t),clearTimeout(a.timer1),a.timer1=setTimeout((function(){a.reset()}),800)),e.next=10;break;case 7:throw e.prev=7,e.t0=e["catch"](0),new Error("系统错误",e.t0);case 10:a.isSubmit=!1,a.loading=!1;case 12:case"end":return e.stop()}}),e,null,[[0,7]])})))()},reset:function(){this.image1="",this.image2="",this.roundId="",this.infoBoxFail=!1,this.infoBoxShow=!1,this.isCanSlide=!1,this.loading=!0,this.isSuccess=!1,this.startWidth=this.sliderBaseSize,this.startX=0,this.newX=0,this.getPuzzleData()}}};t.default=r},d6b0:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAELklEQVRYR+2YW2wUZRTH//9vtlCoF9IoIklT3PqgPGi326hoetuaGEhIr9SgCYkkgt2WGOQVCca+GavWdr0GjD4YhG3RB3hply1LQA1tEQIxEXapGI2pEkys9LIzx2ylYWfY6e5sF0oi+7hzzvl+3/9855xvhrjNf7zN+XAHcL4Z+n8o6JWTeYt++W25S596AIZy6TB+n3yo+Nchlk8vmIIVowdXU9c3Q1gDSilBlQwjgBAYFGDvdF58/4milqvZwDpOcXWsb5Uh8hmBqkwXFMhlCN8aX5LXNbRy/T+Z+iXsHAFWRXs3QGQPyLucLDJrK5DgUXdTsxPfjAEro8E3Ce50EtxsKxPTwCPH3U2jTmJkBJgWTnAMxDeGMEoa0xQ+LJQnCD4HYFkCyAC3RdwN3U7gMkpxRTTYrMD91sCJIgCxV5R6O1Jcfy7VwonqLoj9/CqB2kF341qncGkBvRe+ureAWpRgoalCBecMFzcdK24YymZRJz5zprgq1tsJwXYL3CVZGvdGHmwZc7JQtra2gE+f712ep2QUYP714DJhaJrXLqXZQszlZwtYdSHoB9ljVk/ePVrSZFL0ZkAlxzQBVseCT8WhZhRThtFB8plk9Zi/qCi8cv0fNxvKFrDy4oF11NXXIFy2EII4iBcG3Y03VLZT8OqRd5aFPduvOEpxRayvXolxAKB2g6NgEhobBlc1HHYKY7WvHf5wtVAPgegIlbbZ9seUZ7AyFnwewi9pGoUyDmhrB931kfnC1ZwOeKlLP8GZJi6QLSFP2yep4toXSbT3ZQAfX3O6omt8Nhd9r/aHQAUMOQywYBZo5uZD2ThQ2rbPCjlnH6yI9rUryE5DU75ctJaake46Be4DuDjF8dFBNA94/AdtiySVxIlpMlTS8td801o70vMigM9huTda2lhcKHVHPO2HZv/P6LIwX7hk/+qzPSvUJGMkrg8AQYTkroRdXMlE+HH/twsG6BsOdJHYZlaO/lBZ6weOiiSXqs3Gqj0TeAxx+T75DIpgwjC0onD51pQD4JaluPrkR/cpFT9DcoVp84LOgTL/DjtBbglgou+puHwB8lEznPxJw1XSX77VtgizBvQNBw4RMqB7xt4Lc3c8lQKJaQHoO4R8ydz0/7MWoCXk8c85MrMC9J3qaafw/WtQlwXST+F3BnAeYB4obgJ1BJIuG+YtiKAjVOZ/Pd1ZdwzoG+4uBtSPpjaRbhXLcwF3hzytb2TilgVgT5BkYybBrTYC+Rvg5nRpdTRJrIs8+VPXPQXj2i4ItxC4O2NQQUQnN4U9rRcz9nH64p4ceM2lziX5Y4s3KHCdUHwE77ecMkMEp6BwhIa2Z6DslZRvfulgHafYLuCas58WLp2aLCFUga70qxOFU6dPFL2W1feYeaU43Y5z/TxnCuYabMEuC043ckdBp4pZ7f8FE5psOI1g6fwAAAAASUVORK5CYII="}}]);