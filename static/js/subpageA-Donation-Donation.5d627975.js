(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["subpageA-Donation-Donation"],{1290:function(t,n,e){var i=e("a599");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=e("4f06").default;o("3d5a6682",i,!0,{sourceMap:!1,shadowMode:!1})},1417:function(t,n,e){var i=e("a0e8");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=e("4f06").default;o("e8bafc52",i,!0,{sourceMap:!1,shadowMode:!1})},1563:function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* uni.scss */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.slot-content[data-v-6ae17ca8]{font-size:%?28?%;color:#606266;padding-left:%?30?%;text-align:center;background:#21201f;font-family:PingFangSC-Regular,PingFang SC;color:#ccc;line-height:%?48?%;padding:%?48?% 0;position:relative}.slot-content .re-send[data-v-6ae17ca8]{z-index:100000;font-size:%?24?%;font-weight:400;color:#28d8e5;line-height:%?48?%;margin-bottom:%?40?%}.slot-content .close[data-v-6ae17ca8]{z-index:100000;position:absolute;right:%?0?%;top:%?-70?%}[data-v-6ae17ca8] .inherit-box-modal-2 .u-popup__content,[data-v-6ae17ca8] .inherit-box-modal .u-popup__content{background:#21201f}[data-v-6ae17ca8] .inherit-box-modal-2 .u-line,[data-v-6ae17ca8] .inherit-box-modal .u-line{border-bottom:none!important}[data-v-6ae17ca8] .inherit-box-modal-2 .u-transition,[data-v-6ae17ca8] .inherit-box-modal .u-transition{z-index:10075!important}[data-v-6ae17ca8] .inherit-box-modal-2 .u-modal__title,[data-v-6ae17ca8] .inherit-box-modal .u-modal__title{font-size:%?36?%;font-family:SourceHanSansCN-Medium,SourceHanSansCN;font-weight:500;color:#fff}[data-v-6ae17ca8] .inherit-box-modal .u-modal__button-group__wrapper--hover{background:#444}[data-v-6ae17ca8] .inherit-box-modal .u-line{border-bottom:%?2?% solid hsla(0,0%,100%,.2)!important;border-left:%?2?% solid hsla(0,0%,100%,.2)!important}[data-v-6ae17ca8] .inherit-box-modal-2{z-index:100000!important}',""]),t.exports=n},"15d3":function(t,n,e){"use strict";e.r(n);var i=e("ee33"),o=e("981b");for(var a in o)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(a);e("edfb");var r=e("f0c5"),s=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"6ae17ca8",null,!1,i["a"],void 0);n["default"]=s.exports},"16d8":function(t,n,e){"use strict";e("7a82");var i=e("4ea4").default;Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=i(e("c7eb")),a=i(e("1da1"));e("ac1f"),e("00b4");var r=i(e("c38e")),s={props:["instanceId","goodsId"],components:{ResultPop:r.default},data:function(){return{isShow:!1,searchPhone:"",buyerInfo:{},searchStyle:{background:"#393939",color:"#eeeeee",borderRadius:"16rpx",padding:"28rpx 40rpx",fontSize:"32rpx"}}},methods:{toFindBuyer:function(){/^1[3456789]\d{9}$/.test(this.searchPhone)?this.searchBuyerInfo():uni.showToast({title:"请输入正确的手机号",icon:"none"})},searchBuyerInfo:function(){var t=this;return(0,a.default)((0,o.default)().mark((function n(){var e;return(0,o.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,uni.$http("/user/getInfoByPhone",{phone:t.searchPhone});case 3:e=n.sent,0==e.code?(t.buyerInfo=e.data,t.isShow=!0):t.$toast(e.errorMsg),n.next=9;break;case 7:n.prev=7,n.t0=n["catch"](0);case 9:case"end":return n.stop()}}),n,null,[[0,7]])})))()}}};n.default=s},"1bae":function(t,n,e){"use strict";e.r(n);var i=e("fa5e"),o=e.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=o.a},"1d47":function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}));var i={uPopup:e("1c24").default},o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("u-popup",{attrs:{show:t.show,mode:"bottom","mask-close-able":!1,closeable:!0},on:{close:function(n){arguments[0]=n=t.$handleEvent(n),t.close.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"res-box"},[e("v-uni-view",{staticClass:"user-name"},[t._v("转赠对象："+t._s(t.buyerInfo.fullName))]),e("v-uni-view",{staticClass:"text-tip"},[t._v("是否将该藏品转赠给对方，转赠完成后无法撤销")]),e("v-uni-view",{staticClass:"btn",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.toInhert.apply(void 0,arguments)}}},[t._v("确认转赠")])],1)],1)},a=[]},"1de5":function(t,n,e){"use strict";t.exports=function(t,n){return n||(n={}),t=t&&t.__esModule?t.default:t,"string"!==typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),n.hash&&(t+=n.hash),/["'() \t\n]/.test(t)||n.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},"1e3c4":function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}));var i={"u-Input":e("2f0b").default},o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"search-box"},[e("u--input",{attrs:{placeholder:"请输入手机号码",color:"#fff","custom-style":t.searchStyle,border:"none",type:"number",maxlength:"11","placeholder-style":"color: #666666"},model:{value:t.searchPhone,callback:function(n){t.searchPhone=n},expression:"searchPhone"}}),e("v-uni-view",{staticClass:"search-btn",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.toFindBuyer.apply(void 0,arguments)}}},[t._v("发起转增")]),e("ResultPop",{attrs:{isShow:t.isShow,searchPhone:t.searchPhone,buyerInfo:t.buyerInfo,instanceId:t.instanceId,goodsId:t.goodsId},on:{close:function(n){arguments[0]=n=t.$handleEvent(n),t.isShow=!1}}})],1)},a=[]},2498:function(t,n,e){"use strict";e("7a82");var i=e("4ea4").default;Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,e("a9e3"),e("99af"),e("ac1f"),e("5319");var o=i(e("e4bc")),a={name:"u-code-input",mixins:[uni.$u.mpMixin,uni.$u.mixin,o.default],data:function(){return{inputValue:"",isFocus:this.focus}},watch:{value:{immediate:!0,handler:function(t){this.inputValue=String(t).substring(0,this.maxlength)}}},computed:{codeLength:function(){return new Array(Number(this.maxlength))},itemStyle:function(){var t=this;return function(n){var e=uni.$u.addUnit,i={width:e(t.size),height:e(t.size)};return"box"===t.mode&&(i.border="".concat(t.hairline?.5:1,"px solid ").concat(t.borderColor),0===uni.$u.getPx(t.space)&&(0===n&&(i.borderTopLeftRadius="3px",i.borderBottomLeftRadius="3px"),n===t.codeLength.length-1&&(i.borderTopRightRadius="3px",i.borderBottomRightRadius="3px"),n!==t.codeLength.length-1&&(i.borderRight="none"))),n!==t.codeLength.length-1?i.marginRight=e(t.space):i.marginRight=0,i}},codeArray:function(){return String(this.inputValue).split("")},lineStyle:function(){var t={};return t.height=this.hairline?"2px":"4px",t.width=uni.$u.addUnit(this.size),t.backgroundColor=this.borderColor,t}},methods:{inputHandler:function(t){var n=this,e=t.detail.value;this.inputValue=e,this.disabledDot&&this.$nextTick((function(){n.inputValue=e.replace(".","")})),this.$emit("change",e),this.$emit("input",e),String(e).length>=Number(this.maxlength)&&this.$emit("finish",e)}}};n.default=a},2900:function(t,n,e){"use strict";var i=e("d5cb"),o=e.n(i);o.a},"2c20":function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* uni.scss */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-view[data-v-844ebd5c], uni-scroll-view[data-v-844ebd5c], uni-swiper-item[data-v-844ebd5c]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}.u-code-input[data-v-844ebd5c]{display:flex;flex-direction:row;position:relative;overflow:hidden}.u-code-input__item[data-v-844ebd5c]{display:flex;flex-direction:row;justify-content:center;align-items:center;position:relative}.u-code-input__item__text[data-v-844ebd5c]{font-size:15px;color:#606266}.u-code-input__item__dot[data-v-844ebd5c]{width:7px;height:7px;border-radius:100px;background-color:#606266}.u-code-input__item__line[data-v-844ebd5c]{position:absolute;bottom:0;height:4px;border-radius:100px;width:40px;background-color:#606266}.u-code-input__item__cursor[data-v-844ebd5c]{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:1px;height:40%;-webkit-animation:1s u-cursor-flicker-data-v-844ebd5c infinite;animation:1s u-cursor-flicker-data-v-844ebd5c infinite}.u-code-input__input[data-v-844ebd5c]{position:absolute;left:%?-750?%;width:%?1500?%;top:0;background-color:initial;text-align:left}@-webkit-keyframes u-cursor-flicker-data-v-844ebd5c{0%{opacity:0}50%{opacity:1}100%{opacity:0}}@keyframes u-cursor-flicker-data-v-844ebd5c{0%{opacity:0}50%{opacity:1}100%{opacity:0}}',""]),t.exports=n},3108:function(t,n,e){"use strict";e.r(n);var i=e("c4cf"),o=e("c5d8");for(var a in o)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(a);e("2900");var r=e("f0c5"),s=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"033a4588",null,!1,i["a"],void 0);n["default"]=s.exports},"46c7":function(t,n,e){var i=e("1563");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=e("4f06").default;o("1267045a",i,!0,{sourceMap:!1,shadowMode:!1})},"47d5":function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){}));var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"u-code-input"},[t._l(t.codeLength,(function(n,i){return e("v-uni-view",{key:i,staticClass:"u-code-input__item",style:[t.itemStyle(i)]},[t.dot&&t.codeArray.length>i?e("v-uni-view",{staticClass:"u-code-input__item__dot"}):e("v-uni-text",{style:{fontSize:t.$u.addUnit(t.fontSize),fontWeight:t.bold?"bold":"normal",color:t.color}},[t._v(t._s(t.codeArray[i]))]),"line"===t.mode?e("v-uni-view",{staticClass:"u-code-input__item__line",style:[t.lineStyle]}):t._e(),t.isFocus&&t.codeArray.length===i?e("v-uni-view",{staticClass:"u-code-input__item__cursor",style:{backgroundColor:t.color}}):t._e()],1)})),e("v-uni-input",{staticClass:"u-code-input__input",style:{height:t.$u.addUnit(t.size)},attrs:{disabled:t.disabledKeyboard,type:"number",focus:t.focus,value:t.inputValue,maxlength:t.maxlength},on:{input:function(n){arguments[0]=n=t.$handleEvent(n),t.inputHandler.apply(void 0,arguments)},focus:function(n){arguments[0]=n=t.$handleEvent(n),t.isFocus=!0},blur:function(n){arguments[0]=n=t.$handleEvent(n),t.isFocus=!1}}})],2)},o=[]},4923:function(t,n,e){"use strict";e.r(n);var i=e("47d5"),o=e("de5f");for(var a in o)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(a);e("b4de");var r=e("f0c5"),s=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"844ebd5c",null,!1,i["a"],void 0);n["default"]=s.exports},"4f4c":function(t,n,e){"use strict";e("7a82");var i=e("4ea4").default;Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,e("d9e2"),e("d401");var o=i(e("c7eb")),a=i(e("1da1")),r=i(e("549a")),s={mixins:[r.default],data:function(){return{userPhoneStr:uni.getStorageSync("userInfo").phone,phone:uni.getStorageSync("userInfo").fullPhone,inhritConfirm:!1,inhritInput:!1,transInfo:{},content:"",type:5,titleStyle:{fontSize:"34rpx",color:"#FFF",background:"#21201F",paddingTop:"48rpx"},cancelStyle:{color:"#aaa",background:"#21201F"},confirmStyle:{color:"#fff",background:"#21201F"}}},mounted:function(){var t=this;uni.$on("toInherit",(function(n){t.transInfo=n,t.content="系统将会发送验证短信至绑定手机<br/>".concat(t.userPhoneStr),t.inhritConfirm=!0}))},unmounted:function(){uni.$off("toInherit")},methods:{reSend:function(){60===this.$store.state.second&&this.confirm()},confirm:function(){this.starCheckRobot(2,this.phone)},cancel:function(){this.inhritConfirm=!1},closeModal:function(){this.inhritInput=!1},afterGetCode:function(){this.inhritConfirm=!1,this.inhritInput=!0},toMyObject:function(){uni.redirectTo({url:"/subpageB/MyObject/MyObject"})},toInhert:function(t){var n=this;return(0,a.default)((0,o.default)().mark((function e(){var i;return(0,o.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,uni.$http("/goods/transfer",{goodsId:n.transInfo.goodsId,instanceId:n.transInfo.instanceId,to:n.transInfo.buyerId,phone:n.phone,code:t});case 3:i=e.sent,0==i.code?(uni.showToast({title:"转赠成功",icon:"success"}),n.inhritConfirm=!1,n.inhritInput=!1,setTimeout((function(){n.toMyObject()}),1e3)):uni.showToast({title:i.errorMsg,icon:"error"}),e.next=10;break;case 7:throw e.prev=7,e.t0=e["catch"](0),new Error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()}}};n.default=s},"51aa":function(t,n,e){"use strict";var i=e("7a670"),o=e.n(i);o.a},"52de":function(t,n,e){"use strict";e.r(n);var i=e("1e3c4"),o=e("755a");for(var a in o)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(a);e("e3f2");var r=e("f0c5"),s=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"249d44ee",null,!1,i["a"],void 0);n["default"]=s.exports},"5f20":function(t,n,e){"use strict";e.r(n);var i=e("e93a"),o=e("fb3b");for(var a in o)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(a);e("8d58");var r=e("f0c5"),s=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"12c9d190",null,!1,i["a"],void 0);n["default"]=s.exports},6139:function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* uni.scss */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.tip-box[data-v-033a4588]{margin-top:%?60?%;font-size:%?28?%;font-family:PingFangSC-Regular,PingFang SC;color:#eee;line-height:%?40?%;text-align:justify}.tip-box .item[data-v-033a4588]{margin-top:%?60?%}',""]),t.exports=n},"61ae":function(t,n,e){"use strict";var i=e("1417"),o=e.n(i);o.a},"67f6":function(t,n,e){"use strict";e("7a82"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={props:{goodsData:{type:Object,default:function(){}}}};n.default=i},"74f7":function(t,n,e){var i=e("24fb"),o=e("1de5"),a=e("b845");n=i(!1);var r=o(a);n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* uni.scss */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */[data-v-249d44ee] .u-input--square{position:relative}[data-v-249d44ee] .u-input--square::before{width:%?40?%;height:%?40?%;content:"";background:url('+r+") no-repeat 50%;background-size:contain;position:absolute;left:%?40?%;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}[data-v-249d44ee] .uni-input-input{padding-left:%?60?%;width:90%}[data-v-249d44ee] .uni-input-placeholder{padding-left:%?60?%}.search-btn[data-v-249d44ee]{width:100%;height:%?88?%;margin-top:%?40?%;-webkit-user-select:none;user-select:none;background:#28d8e5;border-radius:%?16?%;font-size:%?32?%;font-family:PingFangSC-Regular,PingFang SC;color:#000;line-height:%?88?%;text-align:center}",""]),t.exports=n},"755a":function(t,n,e){"use strict";e.r(n);var i=e("16d8"),o=e.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=o.a},"7a670":function(t,n,e){var i=e("9d92");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=e("4f06").default;o("33ab7925",i,!0,{sourceMap:!1,shadowMode:!1})},8571:function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}));var i={PageTemp:e("92f9").default},o=function(){var t=this.$createElement,n=this._self._c||t;return n("PageTemp",{staticClass:"Donation-page"},[n("DonationCard",{attrs:{goodsData:this.goodsData}}),n("Search",{attrs:{instanceId:this.instanceId,goodsId:this.goodsId}}),n("TextTip"),n("DonationCheckModal")],1)},a=[]},"8d58":function(t,n,e){"use strict";var i=e("1290"),o=e.n(i);o.a},"981b":function(t,n,e){"use strict";e.r(n);var i=e("4f4c"),o=e.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=o.a},"9d92":function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* uni.scss */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.Donation-page[data-v-432bf020]{padding:%?40?%}',""]),t.exports=n},a0e8:function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* uni.scss */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.res-box[data-v-807af5b0]{height:%?440?%;background:#21201f;padding:%?80?% %?40?%;box-sizing:border-box;font-family:PingFangSC-Regular,PingFang SC}.res-box .user-name[data-v-807af5b0]{font-size:%?32?%;color:#28d8e5;line-height:%?44?%}.res-box .text-tip[data-v-807af5b0]{margin-top:%?20?%;font-size:%?28?%;line-height:20px;color:#fff}.res-box .btn[data-v-807af5b0]{width:100%;height:%?84?%;background:#28d8e5;border-radius:%?20?%;font-size:%?32?%;font-family:PingFangSC-Medium,PingFang SC;font-weight:500;color:#000;line-height:%?84?%;text-align:center;margin-top:%?92?%}',""]),t.exports=n},a599:function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* uni.scss */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.item_box[data-v-12c9d190]{background-color:#21201f;padding:%?2?%;overflow:hidden;width:100%;height:%?252?%;margin-bottom:%?40?%;padding:%?8?%;border-radius:%?32?%;display:flex;align-items:center}.item_box .box_left[data-v-12c9d190]{width:%?236?%;height:%?236?%;min-width:%?236?%;min-height:%?236?%;border-radius:%?32?%;position:relative}.item_box .box_left .left_img[data-v-12c9d190]{width:100%;height:100%;border-radius:%?32?%}.item_box .three_img[data-v-12c9d190]{width:16px;height:16px;position:absolute;top:98px;left:120px}.item_box .box_right[data-v-12c9d190]{padding:%?20?% %?30?%;display:flex;flex-direction:column;justify-content:space-between;height:100%}.item_box .box_right .right_text1[data-v-12c9d190]{color:#fff;font-size:%?32?%}.item_box .box_right .right_tab[data-v-12c9d190]{height:%?50?%;font-size:%?24?%}.item_box .box_right .right_tab .goodsCode[data-v-12c9d190]{height:%?50?%;font-size:%?24?%;padding:%?6?% %?18?%;border-radius:0 %?4?% %?4?% 0;font-family:PingFangSC-Semibold,PingFang SC;font-weight:600;color:#28d8e5;line-height:%?40?%;min-width:%?120?%}.item_box .box_right .right_bot[data-v-12c9d190]{width:100%;display:flex;color:#fff;font-size:12px}.item_box .box_right .right_bot .avater[data-v-12c9d190]{width:18px;height:18px;border-radius:50%}',""]),t.exports=n},b4de:function(t,n,e){"use strict";var i=e("d86d"),o=e.n(i);o.a},b845:function(t,n,e){t.exports=e.p+"static/img/phone.326d81af.svg"},c38e:function(t,n,e){"use strict";e.r(n);var i=e("1d47"),o=e("d60b");for(var a in o)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(a);e("61ae");var r=e("f0c5"),s=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"807af5b0",null,!1,i["a"],void 0);n["default"]=s.exports},c4cf:function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){}));var i=function(){var t=this.$createElement,n=this._self._c||t;return n("v-uni-view",{staticClass:"tip-box"},[this._v("温馨提示，一旦发起数字藏品转赠，即代表你同意以下条件:"),n("v-uni-view",{staticClass:"item"},[this._v("1.一旦发起转赠操作将无法撤销，且转赠成功后，与数字藏品相关的权利将同步且毫无保留地转移至受赠人;")]),n("v-uni-view",{staticClass:"item"},[this._v("2.您与受赠人均为中国大陆居民身份且已年满18周岁，双方均已通过平台的实名认证。")]),n("v-uni-view",{staticClass:"item"},[this._v("3.我们不支持任何形式的有偿转赠，请警惕欺诈风险。一旦发现异常行为，我们会对相关账户采取限制措施。")])],1)},o=[]},c5d8:function(t,n,e){"use strict";e.r(n);var i=e("cca68"),o=e.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=o.a},cca68:function(t,n){},cd29:function(t,n,e){"use strict";e.r(n);var i=e("8571"),o=e("1bae");for(var a in o)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(a);e("51aa");var r=e("f0c5"),s=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"432bf020",null,!1,i["a"],void 0);n["default"]=s.exports},d5cb:function(t,n,e){var i=e("6139");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=e("4f06").default;o("2ce7f3a0",i,!0,{sourceMap:!1,shadowMode:!1})},d60b:function(t,n,e){"use strict";e.r(n);var i=e("faf5"),o=e.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=o.a},d86d:function(t,n,e){var i=e("2c20");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=e("4f06").default;o("196e2804",i,!0,{sourceMap:!1,shadowMode:!1})},de5f:function(t,n,e){"use strict";e.r(n);var i=e("2498"),o=e.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=o.a},e3f2:function(t,n,e){"use strict";var i=e("eeae"),o=e.n(i);o.a},e4bc:function(t,n,e){"use strict";e("7a82"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,e("a9e3");var i={props:{maxlength:{type:[String,Number],default:uni.$u.props.codeInput.maxlength},dot:{type:Boolean,default:uni.$u.props.codeInput.dot},mode:{type:String,default:uni.$u.props.codeInput.mode},hairline:{type:Boolean,default:uni.$u.props.codeInput.hairline},space:{type:[String,Number],default:uni.$u.props.codeInput.space},value:{type:[String,Number],default:uni.$u.props.codeInput.value},focus:{type:Boolean,default:uni.$u.props.codeInput.focus},bold:{type:Boolean,default:uni.$u.props.codeInput.bold},color:{type:String,default:uni.$u.props.codeInput.color},fontSize:{type:[String,Number],default:uni.$u.props.codeInput.fontSize},size:{type:[String,Number],default:uni.$u.props.codeInput.size},disabledKeyboard:{type:Boolean,default:uni.$u.props.codeInput.disabledKeyboard},borderColor:{type:String,default:uni.$u.props.codeInput.borderColor},disabledDot:{type:Boolean,default:uni.$u.props.codeInput.disabledDot}}};n.default=i},e93a:function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){}));var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"item_box"},[e("v-uni-view",{staticClass:"box_left"},[e("v-uni-image",{staticClass:"left_img",attrs:{src:t.goodsData.image,mode:"aspectFill"}})],1),e("v-uni-view",{staticClass:"box_right"},[e("v-uni-view",{staticClass:"right_text1 nowrap_2"},[t._v(t._s(t.goodsData.goodsName))]),e("v-uni-view",{staticClass:"right_tab"},[e("v-uni-view",{staticClass:"goodsCode"},[t._v("#"+t._s(t.goodsData.goodsCode))])],1),e("v-uni-view",{staticClass:"right_bot"},[e("v-uni-image",{staticClass:"avater",attrs:{src:t.goodsData.shopIcon,mode:""}}),e("v-uni-view",{staticClass:"nowrap",staticStyle:{"margin-left":"10rpx",width:"340rpx"}},[t._v(t._s(t.goodsData.shopName))])],1)],1)],1)},o=[]},edfb:function(t,n,e){"use strict";var i=e("46c7"),o=e.n(i);o.a},ee33:function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}));var i={uModal:e("ac27").default,uIcon:e("6bfd").default,uCodeInput:e("4923").default,PuzzleCode:e("8c5c").default},o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"inherit-box"},[e("u-modal",{staticClass:"inherit-box-modal",attrs:{show:t.inhritConfirm,"show-cancel-button":!0,width:"640rpx",title:"操作认证",confirmColor:"#fff",cancelColor:"#aaa","title-style":t.titleStyle},on:{confirm:function(n){arguments[0]=n=t.$handleEvent(n),t.confirm.apply(void 0,arguments)},cancel:function(n){arguments[0]=n=t.$handleEvent(n),t.cancel.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"slot-content"},[e("v-uni-rich-text",{attrs:{nodes:t.content}})],1)],1),e("u-modal",{staticClass:"inherit-box-modal-2",attrs:{show:t.inhritInput,width:"640rpx",title:"输入验证码","show-confirm-button":!1,"cancel-style":t.cancelStyle,"confirm-style":t.confirmStyle,"title-style":t.titleStyle},on:{confirm:function(n){arguments[0]=n=t.$handleEvent(n),t.confirm.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"slot-content"},[e("u-icon",{staticClass:"close",attrs:{name:"close"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.closeModal.apply(void 0,arguments)}}}),e("v-uni-view",{staticClass:"re-send",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.reSend.apply(void 0,arguments)}}},[t._v("重新发送"),e("v-uni-text",{directives:[{name:"show",rawName:"v-show",value:60!==t.$store.state.second,expression:"$store.state.second!==60"}]},[t._v("("+t._s(t.$store.state.second)+")")])],1),e("v-uni-view",{staticClass:"code-box"},[e("u-code-input",{attrs:{hairline:!0,mode:"line",color:"#28D8E5"},on:{finish:function(n){arguments[0]=n=t.$handleEvent(n),t.toInhert.apply(void 0,arguments)}}})],1)],1)],1),e("PuzzleCode",{staticStyle:{"z-index":"99999"},attrs:{bind:t.$attrs,show:t.isPuzzleShow,phone:t.phone,verifyType:2,loadType:4},on:{resetPuzzle:function(n){arguments[0]=n=t.$handleEvent(n),t.starCheckRobot.apply(void 0,arguments)},success:function(n){arguments[0]=n=t.$handleEvent(n),t.puzzleSuccess.apply(void 0,arguments)},close:function(n){arguments[0]=n=t.$handleEvent(n),t.puzzleClose.apply(void 0,arguments)}}})],1)},a=[]},eeae:function(t,n,e){var i=e("74f7");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=e("4f06").default;o("0dab8152",i,!0,{sourceMap:!1,shadowMode:!1})},fa5e:function(t,n,e){"use strict";e("7a82");var i=e("4ea4").default;Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,e("e9c4");var o=i(e("5f20")),a=i(e("52de")),r=i(e("3108")),s=i(e("15d3")),u={components:{DonationCard:o.default,Search:a.default,TextTip:r.default,DonationCheckModal:s.default},data:function(){return{instanceId:"",goodsId:"",goodsData:{}}},onLoad:function(t){this.instanceId=t.instanceId,this.goodsId=t.goodsId,this.getGoodsInfo()},onUnload:function(){uni.removeStorageSync("donationGoods")},methods:{getGoodsInfo:function(){this.goodsData=uni.getStorageSync("donationGoods"),"{}"==JSON.stringify(this.goodsData)&&uni.reLaunch({url:"/pages/MyObject/MyObject"})}}};n.default=u},faf5:function(t,n,e){"use strict";e("7a82");var i=e("4ea4").default;Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=i(e("5530")),a={props:["isShow","searchPhone","instanceId","buyerInfo","goodsId"],data:function(){return{show:this.isShow}},methods:{toInhert:function(){var t=(0,o.default)({goodsId:this.goodsId,instanceId:this.instanceId},this.buyerInfo);uni.$emit("toInherit",t)},close:function(){this.$emit("close")}},watch:{isShow:function(t){this.show=t}}};n.default=a},fb3b:function(t,n,e){"use strict";e.r(n);var i=e("67f6"),o=e.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=o.a}}]);