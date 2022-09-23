/*! pabank.js v1.0.0 (c) 2019-2022 PABank */
(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global = global || self, global.pabank = factory());
}(this, function() {
	'use strict';

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */

	var __assign = function() {
		__assign = Object.assign || function __assign(t) {
			for (var s, i = 1, n = arguments.length; i < n; i++) {
				s = arguments[i];
				for (var p in s)
					if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
			}
			return t;
		};
		return __assign.apply(this, arguments);
	};

	var ua = navigator.userAgent;
	var _hybridVersion = '';
	var _appName = '';
	var _appVersion = '';
	var infos = /PaobHybrid\/(\d+\.\d+\.?\d*.*?) \((.*?) (\d+\.\d+\.?\d*.*?)\)/i.exec(ua);
	if (Array.isArray(infos)) {
		_hybridVersion = infos[1];
		_appName = infos[2];
		_appVersion = infos[3];
	}
	var env = {
		/** 娣峰悎妗嗘灦鐗堟湰 */
		hybridVersion: _hybridVersion,
		/** 瀹夸富 App 鍚嶇О */
		appName: _appName,
		/** 瀹夸富 App 鐗堟湰 */
		appVersion: _appVersion,
		/** 鏄惁绉诲姩璁惧 */
		isMobile: /Mobile/i.test(ua),
		/** 鏄惁 Android 璁惧 */
		isAndroid: /Android/i.test(ua),
		/** 鏄惁 iOS 璁惧 */
		isiOS: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i),
		/** 鏄惁 iPhone 璁惧 */
		isiPhone: /iPhone/i.test(ua),
		/** 鏄惁 iPad 璁惧 */
		isiPad: /iPad/i.test(ua),
		/** 鏄惁 iPod 璁惧 */
		isiPod: /iPod/i.test(ua),
		/** 鏄惁 AladdinHybrid 杩愯 */
		isHybrid: !!_hybridVersion,
		/** 鏄惁娴忚鍣ㄤ腑杩愯 */
		isBrowser: !_hybridVersion
	};

	/**
	 * 鍝嶅簲瀵硅薄
	 *
	 * @param {Object} res 鍘熺敓杩斿洖鐨勫搷搴斿璞�
	 */
	function Response(res) {
		var this$1 = this;
		for (var name in res) {
			this$1[name] = res[name];
		}
	}
	/**
	 * 鑾峰彇鍝嶅簲鐨� json 瀵硅薄
	 *
	 * @return {Object}
	 */
	Response.prototype.json = function() {
		if (!this.body) {
			return {};
		}
		return JSON.parse(this.body);
	};
	/**
	 * 鑾峰彇鍝嶅簲鐨勬枃鏈�
	 *
	 * @return {String}
	 */
	Response.prototype.text = function() {
		return this.body;
	};
	/**
	 * 鑾峰彇鎸囧畾鐨勭浉搴斿ご鍐呭
	 *
	 * @param {String} header
	 * @return {String} header
	 */
	Response.prototype.header = function(header) {
		var this$1 = this;
		header = header.toLowerCase();
		if (!this.headers) {
			return '';
		}
		for (var name in this$1.headers) {
			if (name.toLowerCase() === header) {
				return this$1.headers[name];
			}
		}
		return '';
	};

	function ajaxRequest(options) {
		var xhr = new XMLHttpRequest();
		var abortTimeout = null;
		xhr.withCredentials = options.withCredentials === undefined ? true : options.withCredentials;
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				clearTimeout(abortTimeout);
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					var headerString = xhr.getAllResponseHeaders().split('\n'),
						headers = {},
						h = void 0,
						headerMatch = void 0;
					for (h in headerString) {
						if (headerString[h]) {
							headerMatch = headerString[h].match(/^([^:]+):\s?([^:]+)/);
							if (headerMatch && headerMatch.length === 3) {
								// 鏇挎崲鎺夌┖鏍�
								headers[headerMatch[1]] = (headerMatch[2] || '').replace(/\s/g, '');
							}
						}
					}
					options.success && options.success(new Response({
						body: xhr.responseText,
						status: xhr.status,
						readyState: xhr.readyState,
						headers: headers
					}));
				} else {
					options.fail && options.fail({
						message: '鎺ュ彛璇锋眰寮傚父'
					});
				}
				xhr.onreadystatechange = null;
			}
		};
		xhr.open(options.method, options.url);
		for (var name in options.headers)
			xhr.setRequestHeader(name, options.headers[name]);
		if (options.timeout > 0)
			abortTimeout = setTimeout(function() {
				xhr.onreadystatechange = null;
				xhr.abort();
				options.fail && options.fail({
					message: '鎺ュ彛璇锋眰瓒呮椂'
				});
			}, options.timeout);
		xhr.send(options.body);
	}

	function versionCompare(version1, version2) {
		var version_bits = function(version) {
			version = version.replace(/(\d+)([^\d.]+)/, '$1.$2');
			version = version.replace(/([^\d.]+)(\d+)/, '$1.$2');
			var parts = version.split('.'),
				rmap = {
					rc: -1,
					pre: -2,
					beta: -3,
					b: -3,
					alpha: -4,
					a: -4
				},
				v, n;
			var bits = [];
			for (var i = 0; i < parts.length; ++i) {
				v = parts[i];
				n = parseInt(v, 10);
				if (isNaN(n)) {
					n = rmap[v] || -1;
				}
				bits.push(n);
			}
			return bits;
		};
		var v1parts = version_bits(version1);
		var v2parts = version_bits(version2);
		var v2, v1;
		for (var i = 0; i < Math.max(v1parts.length, v2parts.length); ++i) {
			v1 = v1parts[i] || 0;
			v2 = v2parts[i] || 0;
			if (v2 > v1) {
				return 1;
			} else if (v1 > v2) {
				return -1;
			}
		}
		return 0;
	}

	function readonlyProperty(obj, name, value) {
		Object.defineProperty(obj, name, {
			value: value,
			writable: false
		});
	}

	/**
	 * 鏍￠獙蹇呴』涓烘寚瀹氱被鍨嬩笖鏈夊€肩殑鍙傛暟
	 *
	 * @param {any} name 鍙傛暟鍚嶇О
	 * @param {any} val 鍙傛暟鍊�
	 * @param {any} type 鍙傛暟绫诲瀷
	 */
	function required(name, val, type) {
		if (type === void 0) {
			type = 'string';
		}
		if (val === undefined || typeof val !== type) {
			throw new TypeError("The " + name + " must be a " + type + " and a value");
		}
	}

	function throwError(message) {
		throw new Error(message);
	}

	/* 涓€浜涘叕鐢ㄦ柟娉� */
	/**
	 * 鑾峰彇鏁版嵁鐨勭被鍨�
	 * */
	function getType(value) {
		return Object.prototype.toString.call(value).toLowerCase().slice(8, -1);
	}
	/* 鏄惁涓哄璞� */
	function isObject(value) {
		var type = getType(value);
		return type === 'object';
	}
	/* 鏄惁涓篺unction */
	function isFunction(value) {
		return getType(value) === 'function';
	}
	/* 鏄惁涓虹┖ */
	function isEmpty(value) {
		return value === '' || value === null || value === undefined;
	}
	/* 鏍￠獙鍙傛暟鐨勫繀濉睘鎬� */
	function validateParams(params, fileds) {
		var res = '';
		for (var i = 0; i < fileds.length; i++) {
			var filed = fileds[i];
			if (!params.hasOwnProperty(filed)) {
				res = {
					code: '1001',
					messge: filed + " must not be empty"
				};
				break;
			}
		}
		return res;
	}
	/* 鎵ц鍥炶皟 */
	function excecuteCb(cb, message) {
		if (isFunction(cb)) {
			cb(message);
		}
	}

	/* 灏忕▼搴忔敮浠樻敹閾跺彴鍏ュ彛 */
	var PAY_URL = 'https://test-b-fat.pingan.com.cn/is/mpcoms/pay/index.html#/';
	/* 灏忕▼搴忓厤瀵嗙绾﹀叆鍙� */
	var SIGN_URL = 'https://test-b-fat.pingan.com.cn/is/mpcoms/sign/index.html#/';
	/* 鍙傛暟寮傚父 */
	var PARAMS_ERROR = {
		code: "1001",
		message: "鍙傛暟寮傚父"
	};

	// 椤甸潰鍚姩鏃剁殑鏃堕棿鎴�
	var _ts = new Date().getTime();
	// 璋冪敤鍘熺敓缁勪欢澶勭悊鍣�
	var _handlers = {};
	// 浜嬩欢鐩戝惉鍣�
	var _subscribers = {};
	// 鍥炶皟绱㈠紩
	var _fnIdx = 0;
	// 璋冪敤鍘熺敓缁勪欢娆℃暟
	var _callTimes = 0;
	/**
	 * PABank
	 * @constructor
	 */
	var PABank = /** @class */ (function() {
		function PABank() {}
		/**
		 * 鐩戝惉浜嬩欢
		 *
		 * @param {String} eventName 浜嬩欢鍚嶇О
		 * @param {(data: any) => void} listener 浜嬩欢鐩戝惉绋嬪簭
		 * @returns this
		 */
		PABank.prototype.on = function(eventName, listener) {
			required('event name', eventName);
			required('event listener', listener, 'function');
			(_subscribers[eventName] || (_subscribers[eventName] = []))
			.push(listener);
			return this;
		};
		/**
		 * 浠呰皟鐢ㄤ竴娆＄殑浜嬩欢
		 *
		 * @param {String} eventName 浜嬩欢鍚嶇О
		 * @param {(data: any) => void} listener 浜嬩欢鐩戝惉绋嬪簭
		 * @returns this
		 */
		PABank.prototype.once = function(eventName, listener) {
			var self = this;
			var on = function() {
				self.off(eventName, on);
				listener.apply(this, arguments);
			};
			on.listener = listener;
			this.on(eventName, on);
			return this;
		};
		/**
		 * 鍙栨秷鐩戝惉
		 *
		 * @param {String} eventName 浜嬩欢鍚嶇О
		 * @param {(data: any) => void} listener 浜嬩欢鐩戝惉绋嬪簭
		 * @returns this
		 */
		PABank.prototype.off = function(eventName, listener) {
			if (!arguments.length) {
				for (eventName in _subscribers) {
					delete _subscribers[eventName];
				}
				return this;
			}
			required('event name', eventName);
			if (!listener && _subscribers[eventName]) {
				delete _subscribers[eventName];
				return this;
			}
			// 鍙栨秷鎸囧畾鐨� listener
			var listeners = _subscribers[eventName];
			if (!listeners)
				return this;
			var lis;
			var i = listeners.length;
			while (i--) {
				lis = listeners[i];
				if (lis === listener || lis.listener === listener) {
					_subscribers[eventName].splice(i, 1);
					break;
				}
			}
			return this;
		};
		/**
		 * 瑙﹀彂浜嬩欢
		 *
		 * @param {String} eventName 浜嬩欢鍚嶇О
		 * @param {Array} args 浜嬩欢鍙傛暟
		 * @returns this
		 */
		PABank.prototype.emit = function(eventName) {
			var args = [];
			for (var _i = 1; _i < arguments.length; _i++) {
				args[_i - 1] = arguments[_i];
			}
			required('event name', eventName);
			this._emit('event', [{
				eventName: eventName,
				args: args
			}]);
			this._emit(eventName, args);
			return this;
		};
		PABank.prototype._emit = function(eventName, args) {
			var subscriber = _subscribers[eventName];
			if (subscriber) {
				for (var i = 0; i < subscriber.length; i++) {
					typeof subscriber[i] === 'function' && subscriber[i].apply(null, args);
				}
			}
			return this;
		};
		/**
		 * 骞挎挱浜嬩欢
		 *
		 * @return this
		 */
		PABank.prototype.broadcast = function(options) {
			required('event name', options.eventName);
			this.call('broadcast', options);
			return this;
		};
		/**
		 * 妫€娴嬫槸鍚︽敮鎸佹寚瀹氱殑琛屼负
		 *
		 * @param {String} action
		 * @param {Function} cb
		 * @return this
		 */
		PABank.prototype.support = function(options) {
			required('action', options.action);
			this.call('support', options);
			return this;
		};
		/**
		 * 杞寲 function 鍒� handler
		 *
		 * @param {String} action 琛屼负
		 * @param {Array|Object} args 鍙傛暟鍒楄〃
		 * @param {String} callId 璋冪敤 Id
		 * @private
		 */
		PABank.prototype._transformHandlers = function(action, args, callId) {
			for (var name in args) {
				var val = args[name];
				if (!val)
					continue;
				var type = Object.prototype.toString.call(val);
				if (type === '[object Object]' || type === '[object Array]') {
					this._transformHandlers(action, val, callId);
				}
				if (type === '[object Function]') {
					// @ts-ignore
					var handlerKey = callId + "_fn_" + ++_fnIdx + "_" + action + "_" + (isNaN(
						name) ? name : 'cb');
					args[name] = handlerKey;
					_handlers[handlerKey] = val;
				}
			}
		};
		/**
		 * 璋冪敤鍘熺敓缁勪欢琛屼负
		 *
		 * @param {String} action 琛屼负
		 * @param {Array} args 璋冪敤鍙傛暟
		 * @returns this
		 */
		PABank.prototype.call = function(action, options) {
			var ctx = {
				action: action,
				options: options,
				callId: (_ts + ++_callTimes).toString(16)
			};
			this.emit('call', ctx);
			_fnIdx = 0;
			this._transformHandlers(ctx.action, ctx.options, ctx.callId);
			console.log(ctx.options);
			if (env.isAndroid) {
				window.pabankMiniApp.postMessage(action, JSON.stringify(ctx.options));
			} else if (env.isiOS) {
				window.webkit.messageHandlers.pabankMiniApp.postMessage({
					action: action,
					object: ctx.options
				});
			} else {
				throwError('Unknown platform');
			}
		};
		/**
		 * 鍘熺敓鍥炶皟
		 *
		 * @param {String} handlerKey 鍥炶皟 key
		 * @param {Array} args 鍥炶皟鍙傛暟
		 */
		PABank.prototype.callback = function(handlerKey) {
			var args = [];
			for (var _i = 1; _i < arguments.length; _i++) {
				args[_i - 1] = arguments[_i];
			}
			if (!handlerKey)
				return;
			var handler = _handlers[handlerKey];
			this.emit('callback', {
				handlerKey: handlerKey,
				handler: handler,
				args: args
			});
			if (handler && typeof handler === 'function') {
				handler.apply(null, args);
				// 濡傛灉娌℃湁璁剧疆涓轰繚鎸佷綇锛屽垯浼氶噴鏀炬澶勭悊绋嬪簭
				if (!handler.keep) {
					delete _handlers[handlerKey];
				}
			}
		};
		return PABank;
	}());
	/**
	 * 鑾峰彇褰撳墠鐗堟湰鍙�
	 *
	 * @returns {String}
	 */
	readonlyProperty(PABank.prototype, 'version', '1.0.0');
	readonlyProperty(PABank.prototype, 'env', env);
	var actions = [
		'getLocation',
		'showNavigationBarLoading',
		'setNavigationBarTitle',
		'setNavigationBarColor',
		'hideNavigationBarLoading',
		'makePhoneCall',
		'getSystemInfo',
		'getInitData',
		'reLaunch',
		'redirectTo',
		'navigateTo',
		'navigateBack',
		'exit',
		'showToast',
		'showLoading',
		'hideToast',
		'hideLoading',
		'login',
		'checkSession',
		'authorize',
		'authorizeList',
		'navigateToMiniProgram',
		'getCurrentPages',
		'onKeyboardHeightChange',
		'getSelectedTextRange',
		'onNetworkStatusChange',
		'offNetworkStatusChange',
		'getNetworkType',
		'gotoPay',
		'getImage',
		'share',
		'scanCode',
		'selectContact',
		'getPhoneContacts',
		'setScreenBrightness',
		'saveImageToPhotosAlbum',
		'setNavigationBarConfig',
		'scopeList',
		'currentPageShareImage',
		'currentPageShareUrl',
		'getImageBase64',
		'getShareUrl',
		'setNavigationBarBack',
		'bankCardAuthorizationScan',
		'creditAuthorization',
		'upload',
		'gotoSystemSetting',
		'getStepData',
		'request',
		'stopStepsCount',
		'activationStepsCount',
		'swhitchHealthNotification',
		'startNFC',
		'stopNFC',
		'transceive',
		'onNFCMessage',
		'openNFCSetting',
		'hideShareIcon',
		'launchLogin',
		'synLogout',
		'safeExit',
		'copy',
		'getRealTimeLocation',
		'stopLocation',
		'openPocketWebView',
		'softCertSignData',
		'softCertQuery',
		'startAccelerometer',
		'stopAccelerometer',
		'onAccelerometerChange',
		'offAccelerometerChange',
		'signSmallPay',
		'setNavigationBarVisible',
		'authorizeMultiple',
		'authorizeAddress',
		'addGlobalParameter',
		'getGlobalParameter',
		'removeGlobalParameter',
		'trackEvent',
		'trackPageBrowse',
		'trackPageDuration',
		'trackAreaExpose',
		'trackContentExpose',
		'trackException',
		'getMGMFlowId'
	];
	// 鍙傛暟搴忓垪鍖�
	function a(t, e) {
		if (void 0 === e && (e = !1), !t || "object" != typeof t)
			return "";
		var n = [];
		for (var i in t) {
			var a = t[i];
			if (Array.isArray(a))
				for (var o in a)
					n.push((e ? i : i + "[]") + "=" + encodeURIComponent(a[o]));
			else
				n.push(i + "=" + encodeURIComponent(a));
		}
		return n.join("&");
	}
	// 鎷兼帴url鍙傛暟
	function o(t, e, n) {
		void 0 === n && (n = !1);
		var i = a(e, n);
		return '' !== i && (i = (/\?/.test(t) ? '&' : '?') + i),
			t + i;
	}
	var _e = Object.prototype.toString;
	// 澶勭悊request options
	function c(t) {
		return t = t || {}, t.method = t.method ? t.method.toLowerCase() : "get", t.headers || (t.headers = {}),
			"post" !== t.method && "put" !== t.method && "patch" !== t.method && "delete" !== t.method || t
			.headers["Content-Type"] || (t.headers["Content-Type"] =
				"application/x-www-form-urlencoded;charset=UTF-8"), t.qs && "[object Object]" === _e.call(t
				.qs) && (t.url = o(t.url, t.qs, t.traditional)), t.body && "[object Object]" === _e.call(t
			.body) &&
			(/x-www-form-urlencoded/.test(t.headers["Content-Type"]) ? t.body = a(t.body, t.traditional) : t
				.body = JSON.stringify(t.body)), t;
	}
	var _loop_1 = function(action) {
		PABank.prototype[action] = function(options) {
			if (action === 'request') {
				options = c(options);
				options.success = (function(cb) {
					return function(res) {
						// 鍖呰鍘熺敓杩斿洖鐨勫搷搴斿璞�
						cb && cb(new Response(res));
					};
				})(options.success);
			} else if (action === 'onAccelerometerChange' && options.success) {
				options.success.keep = true;
			} else if (action === 'upload' && options.onProgress) {
				options.onProgress.keep = true;
			} else if (action === 'gotoPay') {
				// options蹇呴』涓哄璞�
				if (!isObject(options))
					return;
				var newOptions = __assign({}, options);
				if (isObject(newOptions.params)) {
					var params = newOptions.params;
					// 鏍￠獙params涓殑瀛楁锛屽繀椤昏瀛樺湪锛屼笉鏍￠獙鏍煎紡
					var res = validateParams(params, ['appId', 'payOrderNo', 'source', 'outerSource']);
					// 鏍￠獙涓嶉€氳繃锛屾墽琛宖ail
					if (!isEmpty(res)) {
						excecuteCb(newOptions.fail, res);
						excecuteCb(newOptions.complete);
						return;
					}
					var url = o(PAY_URL, params, true);
					delete newOptions.params;
					// openPocketWebView鎵撳紑閾炬帴
					this.call('openPocketWebView', __assign({}, newOptions, {
						url: url
					}));
					return;
				} else {
					excecuteCb(newOptions.fail, PARAMS_ERROR);
					excecuteCb(newOptions.complete);
				}
				return;
			} else if (action === 'signSmallPay') {
				// options蹇呴』涓哄璞★紝涓攐ptions涓繀椤绘湁appId瀛楁锛屽惁鍒欑洿鎺ヨ皟鐢╪ative鐨勬柟娉�
				if (isObject(options) && options.hasOwnProperty('appId')) {
					// 鏍￠獙options涓殑瀛楁锛屽繀椤昏瀛樺湪锛屼笉鏍￠獙鏍煎紡
					var res = validateParams(options, ['callbackUrl']);
					if (!isEmpty(res)) {
						excecuteCb(options.fail, res);
						excecuteCb(options.complete);
						return;
					}
					var url = o(SIGN_URL, {
						appId: options.appId,
						callbackUrl: options.callbackUrl
					}, true);
					// openPocketWebView鎵撳紑閾炬帴
					this.call('openPocketWebView', __assign({}, options, {
						url: url
					}));
					return;
				}
			} else if (action === 'authorizeList' && options.success) {
				options.success = (function(cb) {
					return function(res) {
						// 濡傛灉鏄痠os
						if (env.isiOS) {
							// 妫€娴媟es.responseCode鏄惁涓�000000锛屽惁鍒欒皟鐢╢ail鍥炶皟
							if (res && res.responseCode === '000000' && res.scopes) {
								cb && cb(res.scopes);
							} else {
								options.fail && options.fail(new Error(res && res
									.responseMsg));
							}
						} else {
							// 鍖呰鍘熺敓杩斿洖鐨勫搷搴斿璞�
							cb && cb(res);
						}
					};
				})(options.success);
			}
			// request鏂规硶锛屽湪android涓婣PP鐗堟湰灏忎簬4.38.0鎴栬€卛os涓婣PP鐨勭増鏈皬浜�4.31.0鏃朵娇鐢╝jax璇锋眰
			if (action === 'request' && ((env.isAndroid && versionCompare('4.38.0', env.appVersion) ===
					-1) || (env.isiOS && versionCompare('4.31.0', env.appVersion) === -1))) {
				console.log('[ajaxRequest] options', options);
				ajaxRequest(options);
			} else {
				console.log("[pabank.call] " + action, options);
				this.call(action, options);
			}
		};
	};
	for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
		var action = actions_1[_i];
		_loop_1(action);
	}

	function nextTick(fn) {
		setTimeout(fn);
	}

	/// <reference path = "./global.d.ts" />
	function installGlobalApi(pabank) {
		// 鍏ㄥ眬鍥炶皟
		window.__PABANK_CALLBACK__ = function() {
			var args = arguments;
			nextTick(function() {
				pabank.callback.apply(pabank, args);
			});
		};
		// 鍏ㄥ眬浜嬩欢瑙﹀彂
		window.__PABANK_EVENT_EMIT__ = function() {
			var args = arguments;
			nextTick(function() {
				pabank.emit.apply(pabank, args);
			});
		};
	}

	function firePABankReadEvent(pabank) {
		var evt;
		try {
			evt = new Event('pabankReady');
		} catch (_) {
			evt = document.createEvent('Event');
			evt.initEvent('pabankReady');
		}
		evt.pabank = pabank;
		document.dispatchEvent(evt);
	}

	function init() {
		var pabank = new PABank();
		installGlobalApi(pabank);
		firePABankReadEvent(pabank);
		return pabank;
	}
	var index = window.pabank || init();

	return index;

}));
