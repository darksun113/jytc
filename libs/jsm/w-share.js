var jweixin = require('jweixin-module')


export default {
    //判断是否在微信中  
    isWechat: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/micromessenger/i) == 'micromessenger') {
            // console.log(‘是微信客户端‘)
            return true;
        } else {
            // console.log(‘不是微信客户端‘)
            return false;
        }
    },
    //初始化sdk配置  
    initJssdkShare: function (callback, url) {

        uni.request({
            url: 'http://licai.youma.me/index/wechat/',
            method: 'GET',
            data: {
                url: 'http://licaifrot.youma.me/'
            }, //这里不是统一的，看你们后端
            success: (res) => {
                console.log(res)

                if (res.statusCode == 200) {
                    let result = res.data.Data
                    console.log(result)
                    jweixin.config({
                        debug: false,
                        appId: result.appId,
                        timestamp: result.timestamp,
                        nonceStr: result.nonceStr,
                        signature: result.signature,
                        jsApiList: [
                            'checkJsApi',
                            'updateTimelineShareData',
                            'updateAppMessageShareData'
                        ]
                    });
                    //配置完成后，再执行分享等功能  
                    if (callback) {
                        callback(result);
                    }
                }
            }
        });



    },
    //在需要自定义分享的页面中调用  
    share: function (data, url) {
        url = url ? url : window.location.href;
        console.log("url:" + url)
        if (!this.isWechat()) {
            return;
        }
        //每次都需要重新初始化配置，才可以进行分享  
        this.initJssdkShare(function (signData) {
            jweixin.ready(function () {
                var shareData = {
                    title: data && data.title ? data.title : signData.site_name,
                    desc: data && data.desc ? data.desc : signData.site_description,
                    link: url,
                    imgUrl: data && data.img ? data.img : signData.site_logo,
                    success: function (res) {
                        // 分享后的一些操作,比如分享统计等等
                    },
                    cancel: function (res) {}
                };
                //分享给朋友接口  
                jweixin.updateAppMessageShareData(shareData);
                //分享到朋友圈接口  
                // jweixin.updateTimelineShareData(shareData);
            });
        }, url);
    },
}
