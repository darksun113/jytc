// import wxj from "jweixin-module" // 引入js文件， 复制代码时需要检查文件路径是否正确
var wxj = require('jweixin-module')
/**   
 * 分享封装
 * 一般正常情况下，都会出现一些问题，例如签名错误啊之类的，下面是官网文档，有你想要的答案
 * 官方文档地址： https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#1
 * list 分享数据 包括（title、desc、imgUrl）共三个参数足够，分别时 标题、描述与图片
 */
export async function myshare() {
	try {
		const link = "http://h5.jytc-test.binavy.com/" // 获取当前页面的地址参数
		const res = uni.$http("/share/checkShareAuthor", {
			url: link
		})
		if(res.code==0){
			wxj.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: res.data.appId, // 必填，公众号的唯一标识
				timestamp: Number(res.data.timestamp), // 必填，生成签名的时间戳
				nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
				signature: res.data.signature, // 必填，签名
				jsApiList: [
					"checkJsApi",
					'onMenuShareTimeline',						//分享到微信朋友圈
					'onMenuShareAppMessage',					//分享给微信朋友
					'onMenuShareQQ',							//分享到QQ
					'onMenuShareQZone',							//分享到QQ空间
					"updateAppMessageShareData",  //分享到微信及QQ（新接口）
					"updateTimelineShareData"    //分享到朋友圈”及“分享到QQ空间（新接口）
				] // 必填，需要使用的JS接口列表
			});
			const shareData={
				title:"“数版通”数字作品展示、收藏与交流平台", // 分享标题
				desc:"数版通”平台是由金裕天成创设与打造的数字作品展示、收藏与交流平台。平台积极响应国家文化数字化战略，坚持合规合法，探索和建立文化艺术数字资产确权、确真和有序流转的标准。立足于国家级、全国资背景的权威与担当，面向全国，赋能实体经济，布局web3.0，致力于打造具有权威性、专业性和开创性的集优质文化艺术资源数字内容生产、数字产业应用、数字生态建构为一体的文化数字艺术品的综合试验基地。" , // 分享描述
				link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl:require("../../static/images/jytc_share_pic.jpg"), // 分享图标
				success: function(res) {},
				fail: function(res) {}
			}
			wxj.ready(function() {
				// 自定义“分享到朋友”及“分享到QQ好友”按钮的分享内容（1.4.0）
				if(wxj.updateAppMessageShareData) {
				 	wxj.updateAppMessageShareData({...shareData})
				} else if(wxj.onMenuShareAppMessage) {
					wxj.onMenuShareAppMessage({...shareData})
				}
				// 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
				if(wxj.updateTimelineShareData){
					wxj.updateTimelineShareData({...shareData})
				}else{
					wxj.onMenuShareTimeline({...shareData})
				}
			});
		}
	} catch (e) {
		//TODO handle the exception
	}
}
export function isWechat() {
	return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
}
