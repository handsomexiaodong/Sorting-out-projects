// JavaScript Document
var base_url="../assets/images/";
var loaderList=[base_url+"musice.png"];
var canplayBgm = true;
$(function(){
	if($("body").hasClass("perloader")){
        $("img").each(function(){
            if($(this).attr("src")!=""){
                loaderList.push($(this).attr("src"));
            }
        });
        var loader=new Loader(loaderList);//初始化，传入loading队列;
        loader.progress=function(percent){
           //console.log(percent);
            let opactiy=0.7*(percent/100)+0.3;
            $(".loofd").html(percent+"%");
            $(".dunkerCont").width(486*percent/100);
            $(".tipsBox").css("opacity",opactiy);
            $(".pagelock").css("overflow","auto");
        }
        loader.complete=function(){
            setTimeout(function(){
               finishPage();
              // alert(pageNum);
               $(".box").eq(pageNum).show().addClass("on");
            },500);
        }
	}else{
		$(".load").remove();
	}

});

function finishPage(){
    $(".page").eq(pageNum).siblings().hide();
    $(".load").fadeOut(400);
    setTimeout(function(){
        if(pageNum!=1){
            $(".page").eq(pageNum).addClass("curt");
        }else{
            $(".page1").eq(pageM).addClass("curt").siblings().hide();
        }

        $(".auido_play").attr("data-canStop",false);
        if($(".auido_play").attr("src")!=""&&$(".auido_play").size()>0){
            $(".musiced").removeClass("hide");
            $(".auido_play")[0].play();
        }
        setTimeout(function(){
            //testPage();
            //unlick=true;
        },100);
	},400)
}


//音乐事件；
$(".musiced").on("click",function(){
    if($(this).attr("class")=="musiced"){
        $(".msyuddtd").removeClass("kuddtz");
        $(".musiced").addClass("mstop");
        $(".auido_play")[0].pause();
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
                    $(this)[0].pause();
                    $(this).attr("data-canStop",false);
                    $(this).off("play");
				}
			})
		}
	});
}

if($(".auido_play").attr("src")!=""&&$(".auido_play").size()>0){
	//$(".musiced").removeClass("hide");
}

