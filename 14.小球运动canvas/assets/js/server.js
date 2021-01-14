/**
 * Created by skychen on 2018/1/26.
 */
window.backserver = 'http://a1.inh5.cn/common/';//后台server地址


analytics.init();//初始化流量统计
//analytics.addla('webio');//自定义统计参数
//analytics.addlaaction('index2', 'click');//自定义统计行为
//analytics.addla('dq');//自定义统计参数
//analytics.addlaaction('videotest','analytic');//自定义统计参数
/**
 * 初始化分享
 */
var url="http://a1.inh5.cn/york_villa_h5";
$.ajax({
    url: window.backserver+'getsignature',
    type:'get',
    data:{'activeType' : window.activeType, 'frontKey' : window.frontKey, 'shareCode' :'','lasturl' : document.location.href},
    dataType:'json',
    success:function(ret){
        if(ret.result=='ok'){
            //console.log(ret.msg.signature);
            //console.log(ret.msg.shareinfo);
            window.signPackage = ret.msg.signature;
            var wxcallback = function() {
                return {
                    debug : false,//是否调试
                    title : "别墅中央空调再添实力玩家——约克YES-villa别墅系列蓄势而来",
                    desc : "墅适人生，只需一墅一YES-Villa",
                    imgUrl : url+"/assets/images/100x100.png",
                   // link : ret.msg.shareinfo.url==""?document.location.href:ret.msg.shareinfo.url,+
				    link : url+"/html/index.html",
                    success :function () {
                        //document.location.href="http://www.baidu.com"
                        //alert('success');//分享成功后回调函数
                    },
                    cancel :function () {
                        //alert('cancel');//分享取消后回调函数
                    },
                };
            };

            lkwxconfig.init(null , wxcallback());
        }else{
            alert(ret.msg);
        }
    }
});



