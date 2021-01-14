//6:1206,6p:1218,5s:1182,mz:1181; ipX:1448; note8:1321;
aw=document.documentElement.clientWidth;
ah=document.documentElement.clientHeight;
$("html,body").css({"width":750,"height":ah});
$(".pagelock").css({"width":750,"height":ah});
$(".pagelock,.tipsTopPage").on("touchmove",function(event){
    event.preventDefault();
});
var loaderList =[];
var pageNum  = 0;
var pt = null;
var canCreate = true;
var myScroll = null;
var testNullNum = 0;
function pagetab(num,callBack){
    var callBack = callBack || function(){};
    if(arguments.length<1){
        index=$(".curt").index();
        index=index+1;
    }else{
        index=arguments[0];
    }
    $(".page").eq(index).fadeIn(400);
    // myScroll.scrollTo(0,0);
    // myScroll.refresh();
    $(".page").eq(index).addClass("curt").siblings().removeClass("curt").hide();
}

(function(){
    var pt=null;
    var srcopp=0;
    $("input,textarea,select").on("focus",function(){
        clearTimeout(pt);
        srcopp= $("html").scrollTop() || $("body").scrollTop();
    }).on("blur",function(){
        pt=setTimeout(function(){
            $("html").scrollTop(srcopp);
            $("body").scrollTop(srcopp);
        },50);
    })
}());

/*
*倒计时
 */
function isPoneNum(poneNum) {
    var myreg=/^[1][0-9]{10}$/;
    if (!myreg.test(poneNum)) {
        return false;
    } else {
        return true;
    }
};
function CountDown(target,obj){
    var obj = obj || {};
    var def = {
        text:"获取验证码",
        time:"60",
        beforeTxt:"请",
        afterTxt:"后重试",
        defClass:"notClickable",
        htmlCont:target,
        bindEvent:function(){},
        endEvent:function(){},
        preventFun:function(){},
    };
    var canClick = true;
    var ops = $.extend(def,obj);
    var defTime = ops.time;
    var _this = this;
    var canCount = true;
    var timer = null;
    //倒计时：
    this.timeCount = function () {
        if(defTime>1){
            defTime -- ;
            var html = ops.beforeTxt + "<span>"+defTime+"</span>s" + ops.afterTxt;
            ops.htmlCont.html(html);
            timer = setTimeout(function(){
                _this.timeCount();
            },1000);
        }else{
            _this.clearTimeOut();
            // defTime = ops.time;
            ops.endEvent();

        }
    }
    //清除倒计时;
    this.clearTimeOut = function(){
        clearTimeout(timer);
        canClick = true;
        target.removeClass(ops.defClass);
        ops.htmlCont.html(ops.text);
    }
    this.canStartTime = function(){
        target.addClass(ops.defClass);
        canClick = false;
        defTime = ops.time;
        _this.timeCount();
        ops.bindEvent();
    }
    //触发倒计时：
    target.click(function(){
        if(canClick){
            ops.preventFun(_this.canStartTime)
        }
    });
};



function initScroll(){
    if($("#scrollPage").size()>0){
       myScroll = new IScroll('#scrollPage',{
            scrollbars: true,
           // click:true
        });
    }
}

function getDay(day){
    var today = new Date();
    var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
    today.setTime(targetday_milliseconds);
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tYear+"-"+tMonth+"-"+tDate;
}
function doHandleMonth(month){
    var m = month;
    if(month.toString().length == 1){
        m = "0" + month;
    }
    return m;
}

//


$(".recordBoxCont a").click(function(){
    $(".degassingBox").addClass("degassingBoxd");
});

$(".clostBoxCont").click(function(){
    $(".degassingBox").removeClass("degassingBoxd");
});


$(".tipsIconBox").click(function(){
    $(".hasMakeJxs").show();
});
$(".cButton").click(function(){
    $(".hasMakeJxs").hide();
})

//音乐事件；
$(".musiced").on("click",function(){
    if($(this).attr("class")=="musiced"){
        $(".msyuddtd").removeClass("kuddtz");
        $(".musiced").addClass("mstop");
        $(".auido_play")[0].pause();
        $(".yifd").hide();
        dunplay=-1;
    }else{
        $(this).removeClass("mstop");
        $(".msyuddtd").addClass("kuddtz");
        $(".auido_play")[0].play();
        $(".yifd").show();
        dunplay=1;
    }
});
document.addEventListener('WeixinJSBridgeReady', function() {
    allAudioPlay();
});


function allAudioPlay(){
    $("audio,video").each(function(){
        if($(this).attr("src")){
            $(this).attr("data-canStop",true);
            $(this)[0].play();
            $(this).on("play",function(){
                if($(this).attr("data-canStop")){
                   // $(this)[0].pause();
                    $(this).attr("data-canStop",false);
                    $(this).off("play");
                }
            })
        }
    });
}

if($(".auido_play").attr("src")!=""&&$(".auido_play").size()>0){
    $(".musiced").removeClass("hide");
    $(".auido_play")[0].play();
}

$(".shareButton").click(function(){
    $(".sharePage").show();
});
$(".sharePage").click(function(){
    $(this).hide();
})