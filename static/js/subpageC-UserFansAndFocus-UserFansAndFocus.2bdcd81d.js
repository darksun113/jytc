(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["subpageC-UserFansAndFocus-UserFansAndFocus"],{"02a6":function(t,n,e){"use strict";e.r(n);var a=e("9a8a"),i=e.n(a);for(var s in a)["default"].indexOf(s)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(s);n["default"]=i.a},"0618":function(t,n,e){var a=e("24fb");n=a(!1),n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* uni.scss */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.fans-focus[data-v-d1e95c52]{height:100vh;background:#04030a}.fans-focus .main[data-v-d1e95c52]{height:calc(100% - %?100?%)}',""]),t.exports=n},"082c":function(t,n,e){"use strict";e.r(n);var a=e("619b"),i=e.n(a);for(var s in a)["default"].indexOf(s)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(s);n["default"]=i.a},"08f2":function(t,n,e){"use strict";e("7a82");var a=e("4ea4").default;Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,e("99af");var i=a(e("c7eb")),s=a(e("1da1")),o=a(e("2909")),r=e("d990"),c={props:["userId","viewBuyerId"],data:function(){return{privacyAuth:0,hasData:!0,isLastData:!1,fansList:[],show:!1,followId:"",type:""}},mounted:function(){this.init()},methods:{init:function(){var t=this;this.fansList=[],this.getFansList(null,(function(n){0==n?t.hasData=!1:t.fansList=n}))},updateList:function(){var t=this,n=this.fansList[this.fansList.length-1].createTime;this.getFansList(n,(function(n){0==n?t.isLastData=!0:t.fansList=[].concat((0,o.default)(t.fansList),(0,o.default)(n))}))},getFansList:function(t,n){var e=this;return(0,s.default)((0,i.default)().mark((function a(){var s,o;return(0,i.default)().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,s=e.viewBuyerId,a.next=4,uni.$http("/user/getFollowOrFansList",{viewBuyerId:s,type:2,size:10,createTime:t});case 4:if(o=a.sent,0!=o.code){a.next=17;break}if(e.privacyAuth=o.data.privacyAuth,1!=o.data.privacyAuth){a.next=9;break}return a.abrupt("return");case 9:if(0!=o.data.list.length){a.next=13;break}n(0),a.next=17;break;case 13:return a.next=15,(0,r.getFilePath)(o.data.list,["avatar"]);case 15:o.data.list=a.sent,n(o.data.list);case 17:a.next=21;break;case 19:a.prev=19,a.t0=a["catch"](0);case 21:case"end":return a.stop()}}),a,null,[[0,19]])})))()},toOtherPage:function(t){t!=this.userId&&this.$emit("toOtherPage",t)},confirm:function(){var t=this;return(0,s.default)((0,i.default)().mark((function n(){var e;return(0,i.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,uni.$http("/user/follow",{followId:t.followId,type:t.type});case 3:e=n.sent,0==e.code?t.init():t.$toast(e.errorMsg),n.next=9;break;case 7:n.prev=7,n.t0=n["catch"](0);case 9:case"end":return n.stop()}}),n,null,[[0,7]])})))()},focus:function(t,n,e){var a=this;return(0,s.default)((0,i.default)().mark((function e(){var s;return(0,i.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,1!=t){e.next=7;break}a.followId=n,a.type=t,a.show=!0,e.next=11;break;case 7:return e.next=9,uni.$http("/user/follow",{followId:n,type:t});case 9:s=e.sent,0==s.code?a.init():a.$toast(s.errorMsg);case 11:e.next=15;break;case 13:e.prev=13,e.t0=e["catch"](0);case 15:case"end":return e.stop()}}),e,null,[[0,13]])})))()}}};n.default=c},"14b0":function(t,n,e){var a=e("6928");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=e("4f06").default;i("1313c028",a,!0,{sourceMap:!1,shadowMode:!1})},1639:function(t,n,e){var a=e("24fb");n=a(!1),n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* uni.scss */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.list-box[data-v-0c7017d6]{box-sizing:border-box;padding:%?40?%;height:100%;overflow:auto}.list-box .item[data-v-0c7017d6]{display:flex;align-items:center;justify-content:space-between;border-bottom:%?2?% solid hsla(0,0%,100%,.15);padding:20px 0}.list-box .item[data-v-0c7017d6]:last-child{border-bottom:none}.list-box .item .user-info[data-v-0c7017d6]{display:flex}.list-box .item .user-info .avatar[data-v-0c7017d6]{width:%?100?%;min-width:%?100?%;height:%?100?%;border-radius:50%;margin-right:%?20?%}.list-box .item .user-info .info[data-v-0c7017d6]{display:flex;flex-direction:column;color:#fff}.list-box .item .user-info .info .name[data-v-0c7017d6]{font-size:%?32?%;font-family:PingFangSC-Medium,PingFang SC;font-weight:500;line-height:%?44?%}.list-box .item .user-info .info .fans-collection[data-v-0c7017d6]{font-size:%?24?%;color:#ccc;line-height:%?34?%;display:flex}.list-box .item .user-info .info .fans-collection .fans-num[data-v-0c7017d6]{margin-right:%?60?%}.list-box .item .user-info .info .fans-collection .fans-num[data-v-0c7017d6]:last-child{margin-right:0}.list-box .item .operate[data-v-0c7017d6]{width:%?176?%;height:%?60?%;background:#666;border-radius:%?30?%}.list-box .item .operate .btn[data-v-0c7017d6]{font-size:%?28?%;font-family:PingFangSC-Medium,PingFang SC;font-weight:500;color:#fff;line-height:%?60?%;text-align:center}',""]),t.exports=n},"1e36":function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){}));var a=function(){var t=this.$createElement,n=this._self._c||t;return n("v-uni-view",{staticClass:"end"},[this._v("—— 到底了 ——")])},i=[]},2432:function(t,n,e){t.exports=e.p+"static/img/reject_icon.acf4dcb1.png"},2605:function(t,n,e){var a=e("24fb");n=a(!1),n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* uni.scss */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.no-data[data-v-51fa4122]{width:100%;text-align:center;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.no-data uni-image[data-v-51fa4122]{width:%?200?%;height:%?160?%}.no-data .none-text[data-v-51fa4122]{margin-top:%?40?%;font-size:%?28?%;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#999;line-height:%?40?%}',""]),t.exports=n},"34ae":function(t,n,e){"use strict";e.r(n);var a=e("8704"),i=e("77c4");for(var s in i)["default"].indexOf(s)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(s);e("f7568");var o=e("f0c5"),r=Object(o["a"])(i["default"],a["b"],a["c"],!1,null,"d1e95c52",null,!1,a["a"],void 0);n["default"]=r.exports},"39b7":function(t,n,e){var a=e("24fb");n=a(!1),n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* uni.scss */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.end[data-v-4682ac6e]{width:100%;text-align:center;line-height:%?100?%;font-size:%?24?%;overflow:hidden;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#666}',""]),t.exports=n},"3c79":function(t,n,e){"use strict";e.r(n);var a=e("78b3"),i=e("a658");for(var s in i)["default"].indexOf(s)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(s);e("7f9d");var o=e("f0c5"),r=Object(o["a"])(i["default"],a["b"],a["c"],!1,null,"0c7017d6",null,!1,a["a"],void 0);n["default"]=r.exports},"3cd3":function(t,n,e){"use strict";e.r(n);var a=e("a5e4"),i=e.n(a);for(var s in a)["default"].indexOf(s)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(s);n["default"]=i.a},"3fa7":function(t,n,e){var a=e("24fb");n=a(!1),n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* uni.scss */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.nav-box[data-v-8d4bee0e]{height:%?100?%;padding:%?24?% 0;position:relative}.nav-box .back[data-v-8d4bee0e]{width:%?24?%;height:%?32?%;position:absolute;left:%?40?%;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.nav-box .nav-bar[data-v-8d4bee0e]{width:%?232?%;margin:0 auto;display:flex;justify-content:space-between;align-items:center;font-size:%?36?%;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#888;line-height:%?50?%}.nav-box .cur[data-v-8d4bee0e]{font-weight:500;color:#fff;transition:all .3s ease}',""]),t.exports=n},4399:function(t,n,e){"use strict";var a=e("14b0"),i=e.n(a);i.a},"4b1c":function(t,n,e){"use strict";e.r(n);var a=e("bc05"),i=e("6a7c");for(var s in i)["default"].indexOf(s)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(s);e("cc94");var o=e("f0c5"),r=Object(o["a"])(i["default"],a["b"],a["c"],!1,null,"c7ad20c4",null,!1,a["a"],void 0);n["default"]=r.exports},"5ab2":function(t,n,e){"use strict";var a=e("f6cd"),i=e.n(a);i.a},"619b":function(t,n,e){"use strict";e("7a82"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;n.default={name:"IsEnd",data:function(){return{}}}},6928:function(t,n,e){var a=e("24fb");n=a(!1),n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* uni.scss */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.list-box[data-v-587ab948]{box-sizing:border-box;padding:%?40?%;height:100%;overflow:auto}.list-box .item[data-v-587ab948]{display:flex;align-items:center;justify-content:space-between;border-bottom:%?2?% solid hsla(0,0%,100%,.15);padding:20px 0}.list-box .item[data-v-587ab948]:last-child{border-bottom:none}.list-box .item .user-info[data-v-587ab948]{display:flex}.list-box .item .user-info .avatar[data-v-587ab948]{width:%?100?%;min-width:%?100?%;height:%?100?%;border-radius:50%;margin-right:%?20?%}.list-box .item .user-info .info[data-v-587ab948]{display:flex;flex-direction:column;justify-content:space-around;color:#fff}.list-box .item .user-info .info .name[data-v-587ab948]{font-size:%?32?%;font-family:PingFangSC-Medium,PingFang SC;font-weight:500;line-height:%?44?%}.list-box .item .user-info .info .fans-collection[data-v-587ab948]{font-size:%?24?%;color:#ccc;line-height:%?34?%;display:flex}.list-box .item .user-info .info .fans-collection .fans-num[data-v-587ab948]{margin-right:%?60?%}.list-box .item .user-info .info .fans-collection .fans-num[data-v-587ab948]:last-child{margin-right:0}.list-box .item .operate[data-v-587ab948]{width:%?176?%;height:%?60?%;background:#666;border-radius:%?30?%}.list-box .item .operate .btn[data-v-587ab948]{font-size:%?28?%;font-family:PingFangSC-Medium,PingFang SC;font-weight:500;color:#fff;line-height:%?60?%;text-align:center}[data-v-587ab948] .u-popup__content{background:#333}[data-v-587ab948] .u-popup__content .u-modal__content__text{text-align:center;font-size:%?32?%;font-family:SourceHanSansCN-Regular,SourceHanSansCN;font-weight:400;color:#fff;line-height:%?48?%}[data-v-587ab948] .u-popup__content .u-line{border-color:hsla(0,0%,100%,.2)!important}[data-v-587ab948] .u-popup__content .u-modal__button-group__wrapper__text{font-size:%?36?%;font-family:SourceHanSansCN-Medium,SourceHanSansCN;font-weight:500;line-height:%?54?%}[data-v-587ab948] .u-popup__content .u-modal__button-group__wrapper--hover{background-color:#333}',""]),t.exports=n},"6a7c":function(t,n,e){"use strict";e.r(n);var a=e("c5b5"),i=e.n(a);for(var s in a)["default"].indexOf(s)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(s);n["default"]=i.a},"6ea6":function(t,n,e){"use strict";e.r(n);var a=e("9ae3"),i=e("bd8f");for(var s in i)["default"].indexOf(s)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(s);e("d94f");var o=e("f0c5"),r=Object(o["a"])(i["default"],a["b"],a["c"],!1,null,"8d4bee0e",null,!1,a["a"],void 0);n["default"]=r.exports},"70e0":function(t,n,e){"use strict";e.r(n);var a=e("1e36"),i=e("082c");for(var s in i)["default"].indexOf(s)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(s);e("5ab2");var o=e("f0c5"),r=Object(o["a"])(i["default"],a["b"],a["c"],!1,null,"4682ac6e",null,!1,a["a"],void 0);n["default"]=r.exports},"77c4":function(t,n,e){"use strict";e.r(n);var a=e("8b5e"),i=e.n(a);for(var s in a)["default"].indexOf(s)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(s);n["default"]=i.a},"78b3":function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return s})),e.d(n,"a",(function(){return a}));var a={IsEnd:e("70e0").default,uModal:e("ac27").default,SecurityControls:e("936c").default,IsNoData:e("4b1c").default},i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return 0==t.privacyAuth&&t.hasData?e("v-uni-scroll-view",{staticClass:"list-box",attrs:{"scroll-y":"true"},on:{scrolltolower:function(n){arguments[0]=n=t.$handleEvent(n),t.updateList.apply(void 0,arguments)}}},[t._l(t.fansList,(function(n,a){return e("v-uni-view",{key:a,staticClass:"item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toOtherPage(n.buyerId)}}},[e("v-uni-view",{staticClass:"user-info"},[e("v-uni-image",{staticClass:"avatar",attrs:{src:n.avatar,mode:"aspectFill"}}),e("v-uni-view",{staticClass:"info"},[e("v-uni-view",{staticClass:"name"},[t._v(t._s(n.name))]),e("v-uni-view",{staticClass:"fans-collection"},[e("v-uni-view",{staticClass:"fans-num"},[t._v("粉丝 "+t._s(n.fansNumber))]),e("v-uni-view",{staticClass:"fans-num"},[t._v("藏品数 "+t._s(n.goodsInstanceNumber))])],1)],1)],1),n.buyerId!==t.userId?e("v-uni-view",{staticClass:"operate"},[0==n.relation?e("v-uni-view",{staticClass:"btn",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.focus(0,n.buyerId,a)}}},[t._v("关注")]):t._e(),2==n.relation?e("v-uni-view",{staticClass:"btn",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.focus(0,n.buyerId,a)}}},[t._v("相互关注")]):1==n.relation||3==n.relation?e("v-uni-view",{staticClass:"btn",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.focus(1,n.buyerId,a)}}},[t._v("已关注")]):t._e()],1):t._e()],1)})),t.isLastData?e("IsEnd"):t._e(),e("u-modal",{attrs:{show:t.show,content:"确定取消关注此人吗?",showCancelButton:!0,confirmColor:"#fff",cancelColor:"#aaa"},on:{confirm:function(n){arguments[0]=n=t.$handleEvent(n),t.confirm.apply(void 0,arguments)},cancel:function(n){arguments[0]=n=t.$handleEvent(n),t.show=!1}}})],2):t.privacyAuth?e("SecurityControls",[t._v("由于该用户隐私设置，粉丝列表不可见")]):e("IsNoData",[t._v("暂无粉丝")])},s=[]},"7d76":function(t,n,e){t.exports=e.p+"static/img/none.f154117c.png"},"7f9d":function(t,n,e){"use strict";var a=e("b460"),i=e.n(a);i.a},8002:function(t,n,e){var a=e("0618");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=e("4f06").default;i("03348dcc",a,!0,{sourceMap:!1,shadowMode:!1})},8704:function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){}));var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"fans-focus"},[e("NavBar",{attrs:{current:t.curTab},on:{changeTab:function(n){arguments[0]=n=t.$handleEvent(n),t.changeTab.apply(void 0,arguments)}}}),e("v-uni-view",{staticClass:"main"},[0==t.curTab?e("Fans",{attrs:{userId:t.userId,viewBuyerId:t.viewBuyerId},on:{toOtherPage:function(n){arguments[0]=n=t.$handleEvent(n),t.toOtherPage.apply(void 0,arguments)}}}):e("Focus",{attrs:{userId:t.userId,viewBuyerId:t.viewBuyerId},on:{toOtherPage:function(n){arguments[0]=n=t.$handleEvent(n),t.toOtherPage.apply(void 0,arguments)}}})],1)],1)},i=[]},"8b5e":function(t,n,e){"use strict";e("7a82");var a=e("4ea4").default;Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e("6ea6")),s=a(e("3c79")),o=a(e("f6e0")),r={components:{NavBar:i.default,Focus:o.default,Fans:s.default},data:function(){return{curTab:0,viewBuyerId:"",userId:uni.getStorageSync("userInfo").buyerId}},onShow:function(){},onLoad:function(t){this.curTab=t.type,this.viewBuyerId=t.viewBuyerId},methods:{changeTab:function(t){this.curTab=t},toOtherPage:function(t){var n="../OtherPage/OtherPage?otherId=".concat(t);this.$routerTo(n)}}};n.default=r},"936c":function(t,n,e){"use strict";e.r(n);var a=e("fcb7"),i=e("3cd3");for(var s in i)["default"].indexOf(s)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(s);e("cce9");var o=e("f0c5"),r=Object(o["a"])(i["default"],a["b"],a["c"],!1,null,"51fa4122",null,!1,a["a"],void 0);n["default"]=r.exports},"9a8a":function(t,n,e){"use strict";e("7a82");var a=e("4ea4").default;Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,e("99af");var i=a(e("c7eb")),s=a(e("1da1")),o=a(e("2909")),r=e("d990"),c={props:["userId","viewBuyerId"],data:function(){return{focusList:[],hasData:!0,isLastData:!1,privacyAuth:0,followId:"",type:"",show:!1}},mounted:function(){this.init()},methods:{init:function(){var t=this;this.focusList=[],this.getFocusList(null,(function(n){0==n?t.hasData=!1:t.focusList=n}))},updateList:function(){var t=this,n=this.focusList[this.focusList.length-1].createTime;this.getFocusList(n,(function(n){0==n?t.isLastData=!0:t.focusList=[].concat((0,o.default)(t.focusList),(0,o.default)(n))}))},getFocusList:function(t,n){var e=this;return(0,s.default)((0,i.default)().mark((function a(){var s,o;return(0,i.default)().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,s=e.viewBuyerId,a.next=4,uni.$http("/user/getFollowOrFansList",{viewBuyerId:s,type:1,size:10,createTime:t});case 4:if(o=a.sent,0!=o.code){a.next=17;break}if(e.privacyAuth=o.data.privacyAuth,1!=o.data.privacyAuth){a.next=9;break}return a.abrupt("return");case 9:if(0!=o.data.list.length){a.next=13;break}n(0),a.next=17;break;case 13:return a.next=15,(0,r.getFilePath)(o.data.list,["avatar"]);case 15:o.data.list=a.sent,n(o.data.list);case 17:a.next=21;break;case 19:a.prev=19,a.t0=a["catch"](0);case 21:case"end":return a.stop()}}),a,null,[[0,19]])})))()},toOtherPage:function(t){t!=this.userId&&this.$emit("toOtherPage",t)},confirm:function(){var t=this;return(0,s.default)((0,i.default)().mark((function n(){var e;return(0,i.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,uni.$http("/user/follow",{followId:t.followId,type:t.type});case 3:e=n.sent,0==e.code?t.init():t.$toast(e.errorMsg),n.next=9;break;case 7:n.prev=7,n.t0=n["catch"](0);case 9:case"end":return n.stop()}}),n,null,[[0,7]])})))()},focus:function(t,n,e){var a=this;return(0,s.default)((0,i.default)().mark((function e(){var s;return(0,i.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,1!=t){e.next=7;break}a.followId=n,a.type=t,a.show=!0,e.next=11;break;case 7:return e.next=9,uni.$http("/user/follow",{followId:n,type:t});case 9:s=e.sent,0==s.code?a.init():a.$toast(s.errorMsg);case 11:e.next=15;break;case 13:e.prev=13,e.t0=e["catch"](0);case 15:case"end":return e.stop()}}),e,null,[[0,13]])})))()}}};n.default=c},"9ae3":function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){}));var a=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("v-uni-view",{staticClass:"nav-box"},[a("v-uni-image",{staticClass:"back",attrs:{src:e("c2d1"),mode:"aspectFill"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.back.apply(void 0,arguments)}}}),a("v-uni-view",{staticClass:"nav-bar"},[a("v-uni-view",{staticClass:"fans",class:{cur:0==t.curTab},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.$emit("changeTab",0)}}},[t._v("粉丝")]),a("v-uni-view",{staticClass:"focus",class:{cur:1==t.curTab},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.$emit("changeTab",1)}}},[t._v("关注")])],1)],1)},i=[]},a3bd:function(t,n,e){var a=e("ae2b");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=e("4f06").default;i("98ef1446",a,!0,{sourceMap:!1,shadowMode:!1})},a5e4:function(t,n,e){"use strict";e("7a82"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;n.default={name:"SecurityControls"}},a658:function(t,n,e){"use strict";e.r(n);var a=e("08f2"),i=e.n(a);for(var s in a)["default"].indexOf(s)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(s);n["default"]=i.a},ae2b:function(t,n,e){var a=e("24fb");n=a(!1),n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* uni.scss */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.no-data[data-v-c7ad20c4]{width:100%;text-align:center;position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.no-data uni-image[data-v-c7ad20c4]{width:%?200?%;height:%?160?%}.no-data .none-text[data-v-c7ad20c4]{margin-top:%?40?%;font-size:%?28?%;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#999;line-height:%?40?%}',""]),t.exports=n},b460:function(t,n,e){var a=e("1639");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=e("4f06").default;i("0ae90fbe",a,!0,{sourceMap:!1,shadowMode:!1})},bc05:function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){}));var a=function(){var t=this.$createElement,n=this._self._c||t;return n("v-uni-view",{staticClass:"no-data"},[n("v-uni-image",{attrs:{src:e("7d76"),mode:""}}),n("v-uni-view",{staticClass:"none-text"},[this._t("default")],2)],1)},i=[]},bd8f:function(t,n,e){"use strict";e.r(n);var a=e("ec9e"),i=e.n(a);for(var s in a)["default"].indexOf(s)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(s);n["default"]=i.a},c2d1:function(t,n,e){t.exports=e.p+"static/img/nav_vack_icon.03103fc6.svg"},c5b5:function(t,n,e){"use strict";e("7a82"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;n.default={name:"IsNoData",data:function(){return{}}}},cc94:function(t,n,e){"use strict";var a=e("a3bd"),i=e.n(a);i.a},cce9:function(t,n,e){"use strict";var a=e("dbbe"),i=e.n(a);i.a},d94f:function(t,n,e){"use strict";var a=e("e947"),i=e.n(a);i.a},dbbe:function(t,n,e){var a=e("2605");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=e("4f06").default;i("7e230070",a,!0,{sourceMap:!1,shadowMode:!1})},e89e:function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return s})),e.d(n,"a",(function(){return a}));var a={IsEnd:e("70e0").default,uModal:e("ac27").default,SecurityControls:e("936c").default,IsNoData:e("4b1c").default},i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return 0==t.privacyAuth&&t.hasData?e("v-uni-scroll-view",{staticClass:"list-box",attrs:{"scroll-y":"true"},on:{scrolltolower:function(n){arguments[0]=n=t.$handleEvent(n),t.updateList.apply(void 0,arguments)}}},[t._l(t.focusList,(function(n,a){return e("v-uni-view",{key:a,staticClass:"item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toOtherPage(n.buyerId)}}},[e("v-uni-view",{staticClass:"user-info"},[e("v-uni-image",{staticClass:"avatar",attrs:{src:n.avatar,mode:"aspectFill"}}),e("v-uni-view",{staticClass:"info"},[e("v-uni-view",{staticClass:"name"},[t._v(t._s(n.name))]),e("v-uni-view",{staticClass:"fans-collection"},[e("v-uni-view",{staticClass:"fans-num"},[t._v("粉丝 "+t._s(n.fansNumber))]),e("v-uni-view",{staticClass:"fans-num"},[t._v("藏品数 "+t._s(n.goodsInstanceNumber))])],1)],1)],1),n.buyerId!==t.userId?e("v-uni-view",{staticClass:"operate"},[0==n.relation?e("v-uni-view",{staticClass:"btn",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.focus(0,n.buyerId,a)}}},[t._v("关注")]):t._e(),2==n.relation?e("v-uni-view",{staticClass:"btn",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.focus(0,n.buyerId,a)}}},[t._v("相互关注")]):1==n.relation||3==n.relation?e("v-uni-view",{staticClass:"btn",on:{click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.focus(1,n.buyerId,a)}}},[t._v("已关注")]):t._e()],1):t._e()],1)})),t.isLastData?e("IsEnd"):t._e(),e("u-modal",{attrs:{show:t.show,content:"确定取消关注此人吗?",showCancelButton:!0,confirmColor:"#fff",cancelColor:"#aaa"},on:{confirm:function(n){arguments[0]=n=t.$handleEvent(n),t.confirm.apply(void 0,arguments)},cancel:function(n){arguments[0]=n=t.$handleEvent(n),t.show=!1}}})],2):1==t.privacyAuth?e("SecurityControls",[t._v("由于该用户隐私设置，关注列表不可见")]):e("IsNoData",[t._v("暂无关注")])},s=[]},e947:function(t,n,e){var a=e("3fa7");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=e("4f06").default;i("392f6b4e",a,!0,{sourceMap:!1,shadowMode:!1})},ec9e:function(t,n,e){"use strict";e("7a82"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,e("a9e3");var a={props:{current:[Number,String]},data:function(){return{curTab:this.current}},methods:{back:function(){this.$routerTo(1,"back")}},watch:{current:function(t){this.curTab=t}}};n.default=a},f6cd:function(t,n,e){var a=e("39b7");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=e("4f06").default;i("25c279d4",a,!0,{sourceMap:!1,shadowMode:!1})},f6e0:function(t,n,e){"use strict";e.r(n);var a=e("e89e"),i=e("02a6");for(var s in i)["default"].indexOf(s)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(s);e("4399");var o=e("f0c5"),r=Object(o["a"])(i["default"],a["b"],a["c"],!1,null,"587ab948",null,!1,a["a"],void 0);n["default"]=r.exports},f7568:function(t,n,e){"use strict";var a=e("8002"),i=e.n(a);i.a},fcb7:function(t,n,e){"use strict";e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){}));var a=function(){var t=this.$createElement,n=this._self._c||t;return n("v-uni-view",{staticClass:"no-data"},[n("v-uni-image",{attrs:{src:e("2432"),mode:""}}),n("v-uni-view",{staticClass:"none-text"},[this._t("default")],2)],1)},i=[]}}]);