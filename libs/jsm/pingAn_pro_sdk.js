/*! pabank.js v1.0.0 (c) 2019-2022 PABank */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).pabank=t()}(this,function(){"use strict";var p=function(){return(p=Object.assign||function(e){for(var t,o=1,n=arguments.length;o<n;o++)for(var r in t=arguments[o])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)},e=navigator.userAgent,t="",o="",n="",r=/PaobHybrid\/(\d+\.\d+\.?\d*.*?) \((.*?) (\d+\.\d+\.?\d*.*?)\)/i.exec(e);Array.isArray(r)&&(t=r[1],o=r[2],n=r[3]);var l={hybridVersion:t,appName:o,appVersion:n,isMobile:/Mobile/i.test(e),isAndroid:/Android/i.test(e),isiOS:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i),isiPhone:/iPhone/i.test(e),isiPad:/iPad/i.test(e),isiPod:/iPod/i.test(e),isHybrid:!!t,isBrowser:!t};function u(e){for(var t in e)this[t]=e[t]}function d(e,t){for(var o,n,r=function(e){for(var t,o,n=(e=(e=e.replace(/(\d+)([^\d.]+)/,"$1.$2")).replace(/([^\d.]+)(\d+)/,"$1.$2")).split("."),r={rc:-1,pre:-2,beta:-3,b:-3,alpha:-4,a:-4},a=[],i=0;i<n.length;++i)t=n[i],o=parseInt(t,10),isNaN(o)&&(o=r[t]||-1),a.push(o);return a},a=r(e),i=r(t),s=0;s<Math.max(a.length,i.length);++s){if((n=a[s]||0)<(o=i[s]||0))return 1;if(o<n)return-1}return 0}function a(e,t,o){Object.defineProperty(e,t,{value:o,writable:!1})}function i(e,t,o){if(void 0===o&&(o="string"),void 0===t||typeof t!==o)throw new TypeError("The "+e+" must be a "+o+" and a value")}function s(e){return Object.prototype.toString.call(e).toLowerCase().slice(8,-1)}function f(e){return"object"===s(e)}function h(e){return""===e||null==e}function g(e,t){for(var o="",n=0;n<t.length;n++){var r=t[n];if(!e.hasOwnProperty(r)){o={code:"1001",messge:r+" must not be empty"};break}}return o}function m(e,t){"function"===s(e)&&e(t)}u.prototype.json=function(){return this.body?JSON.parse(this.body):{}},u.prototype.text=function(){return this.body},u.prototype.header=function(e){if(e=e.toLowerCase(),!this.headers)return"";for(var t in this.headers)if(t.toLowerCase()===e)return this.headers[t];return""};var v={code:"1001",message:"\u53c2\u6570\u5f02\u5e38"},c=(new Date).getTime(),y={},b={},w=0,C=0,k=function(){function e(){}return e.prototype.on=function(e,t){return i("event name",e),i("event listener",t,"function"),(b[e]||(b[e]=[])).push(t),this},e.prototype.once=function(e,t){var o=this,n=function(){o.off(e,n),t.apply(this,arguments)};return n.listener=t,this.on(e,n),this},e.prototype.off=function(e,t){if(!arguments.length){for(e in b)delete b[e];return this}if(i("event name",e),!t&&b[e])return delete b[e],this;var o,n=b[e];if(!n)return this;for(var r=n.length;r--;)if((o=n[r])===t||o.listener===t){b[e].splice(r,1);break}return this},e.prototype.emit=function(e){for(var t=[],o=1;o<arguments.length;o++)t[o-1]=arguments[o];return i("event name",e),this._emit("event",[{eventName:e,args:t}]),this._emit(e,t),this},e.prototype._emit=function(e,t){var o=b[e];if(o)for(var n=0;n<o.length;n++)"function"==typeof o[n]&&o[n].apply(null,t);return this},e.prototype.broadcast=function(e){return i("event name",e.eventName),this.call("broadcast",e),this},e.prototype.support=function(e){return i("action",e.action),this.call("support",e),this},e.prototype._transformHandlers=function(e,t,o){for(var n in t){var r=t[n];if(r){var a=Object.prototype.toString.call(r);if("[object Object]"!==a&&"[object Array]"!==a||this._transformHandlers(e,r,o),"[object Function]"===a){var i=o+"_fn_"+ ++w+"_"+e+"_"+(isNaN(n)?n:"cb");t[n]=i,y[i]=r}}}},e.prototype.call=function(e,t){var o={action:e,options:t,callId:(c+ ++C).toString(16)};this.emit("call",o),w=0,this._transformHandlers(o.action,o.options,o.callId),l.isAndroid?window.pabankMiniApp.postMessage(e,JSON.stringify(o.options)):l.isiOS?window.webkit.messageHandlers.pabankMiniApp.postMessage({action:e,object:o.options}):function(e){throw new Error(e)}("Unknown platform")},e.prototype.callback=function(e){for(var t=[],o=1;o<arguments.length;o++)t[o-1]=arguments[o];if(e){var n=y[e];this.emit("callback",{handlerKey:e,handler:n,args:t}),n&&"function"==typeof n&&(n.apply(null,t),n.keep||delete y[e])}},e}();a(k.prototype,"version","1.0.0"),a(k.prototype,"env",l);function S(e,t){if(void 0===t&&(t=!1),!e||"object"!=typeof e)return"";var o=[];for(var n in e){var r=e[n];if(Array.isArray(r))for(var a in r)o.push((t?n:n+"[]")+"="+encodeURIComponent(r[a]));else o.push(n+"="+encodeURIComponent(r))}return o.join("&")}function P(e,t,o){void 0===o&&(o=!1);var n=S(t,o);return""!==n&&(n=(/\?/.test(e)?"&":"?")+n),e+n}var A,N,T=Object.prototype.toString;for(var O=function(c){k.prototype[c]=function(t){if("request"===c)(s=(s=t)||{}).method=s.method?s.method.toLowerCase():"get",s.headers||(s.headers={}),"post"!==s.method&&"put"!==s.method&&"patch"!==s.method&&"delete"!==s.method||s.headers["Content-Type"]||(s.headers["Content-Type"]="application/x-www-form-urlencoded;charset=UTF-8"),s.qs&&"[object Object]"===T.call(s.qs)&&(s.url=P(s.url,s.qs,s.traditional)),s.body&&"[object Object]"===T.call(s.body)&&(/x-www-form-urlencoded/.test(s.headers["Content-Type"])?s.body=S(s.body,s.traditional):s.body=JSON.stringify(s.body)),(t=s).success=(i=t.success,function(e){i&&i(new u(e))});else if("onAccelerometerChange"===c&&t.success)t.success.keep=!0;else if("upload"===c&&t.onProgress)t.onProgress.keep=!0;else{if("gotoPay"===c){if(!f(t))return;var e=p({},t);if(f(e.params)){var o=e.params;if(!h(r=g(o,["appId","payOrderNo","source","outerSource"])))return m(e.fail,r),void m(e.complete);var n=P("https://b.pingan.com.cn/is/mpcoms/pay/index.html#/",o,!0);return delete e.params,void this.call("openPocketWebView",p({},e,{url:n}))}return m(e.fail,v),void m(e.complete)}if("signSmallPay"===c){if(f(t)&&t.hasOwnProperty("appId")){var r;if(!h(r=g(t,["callbackUrl"])))return m(t.fail,r),void m(t.complete);n=P("https://b.pingan.com.cn/is/mpcoms/sign/index.html#/",{appId:t.appId,callbackUrl:t.callbackUrl},!0);return void this.call("openPocketWebView",p({},t,{url:n}))}}else"authorizeList"===c&&t.success&&(t.success=(a=t.success,function(e){l.isiOS?e&&"000000"===e.responseCode&&e.scopes?a&&a(e.scopes):t.fail&&t.fail(new Error(e&&e.responseMsg)):a&&a(e)}))}var a,i,s;"request"===c&&(l.isAndroid&&-1===d("4.38.0",l.appVersion)||l.isiOS&&-1===d("4.31.0",l.appVersion))?function(r){var a=new XMLHttpRequest,i=null;for(var e in a.withCredentials=void 0===r.withCredentials||r.withCredentials,a.onreadystatechange=function(){if(4===a.readyState){if(clearTimeout(i),200<=a.status&&a.status<300||304==a.status){var e=a.getAllResponseHeaders().split("\n"),t={},o=void 0,n=void 0;for(o in e)e[o]&&(n=e[o].match(/^([^:]+):\s?([^:]+)/))&&3===n.length&&(t[n[1]]=(n[2]||"").replace(/\s/g,""));r.success&&r.success(new u({body:a.responseText,status:a.status,readyState:a.readyState,headers:t}))}else r.fail&&r.fail({message:"\u63a5\u53e3\u8bf7\u6c42\u5f02\u5e38"});a.onreadystatechange=null}},a.open(r.method,r.url),r.headers)a.setRequestHeader(e,r.headers[e]);0<r.timeout&&(i=setTimeout(function(){a.onreadystatechange=null,a.abort(),r.fail&&r.fail({message:"\u63a5\u53e3\u8bf7\u6c42\u8d85\u65f6"})},r.timeout)),a.send(r.body)}(t):this.call(c,t)}},_=0,j=["getLocation","showNavigationBarLoading","setNavigationBarTitle","setNavigationBarColor","hideNavigationBarLoading","makePhoneCall","getSystemInfo","getInitData","reLaunch","redirectTo","navigateTo","navigateBack","exit","showToast","showLoading","hideToast","hideLoading","login","checkSession","authorize","authorizeList","navigateToMiniProgram","getCurrentPages","onKeyboardHeightChange","getSelectedTextRange","onNetworkStatusChange","offNetworkStatusChange","getNetworkType","gotoPay","getImage","share","scanCode","selectContact","getPhoneContacts","setScreenBrightness","saveImageToPhotosAlbum","setNavigationBarConfig","scopeList","currentPageShareImage","currentPageShareUrl","getImageBase64","getShareUrl","setNavigationBarBack","bankCardAuthorizationScan","creditAuthorization","upload","gotoSystemSetting","getStepData","request","stopStepsCount","activationStepsCount","swhitchHealthNotification","startNFC","stopNFC","transceive","onNFCMessage","openNFCSetting","hideShareIcon","launchLogin","synLogout","safeExit","copy","getRealTimeLocation","stopLocation","openPocketWebView","softCertSignData","softCertQuery","startAccelerometer","stopAccelerometer","onAccelerometerChange","offAccelerometerChange","signSmallPay","setNavigationBarVisible","authorizeMultiple","authorizeAddress","addGlobalParameter","getGlobalParameter","removeGlobalParameter","trackEvent","trackPageBrowse","trackPageDuration","trackAreaExpose","trackContentExpose","trackException","getMGMFlowId"];_<j.length;_++){O(j[_])}function L(e){setTimeout(e)}return window.pabank||(N=new k,A=N,window.__PABANK_CALLBACK__=function(){var e=arguments;L(function(){A.callback.apply(A,e)})},window.__PABANK_EVENT_EMIT__=function(){var e=arguments;L(function(){A.emit.apply(A,e)})},function(e){var t;try{t=new Event("pabankReady")}catch(e){(t=document.createEvent("Event")).initEvent("pabankReady")}t.pabank=e,document.dispatchEvent(t)}(N),N)});