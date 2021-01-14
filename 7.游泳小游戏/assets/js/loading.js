// JavaScript Document
var canPlayMsond = window.sessionStorage.getItem("muStage");
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
           // var width=547*(percent/100)+30;
            $(".cityBox p").css("left",percent+"%");
            $(".loadNum span").html(percent);
            // $(".tipsBox").css("opacity",opactiy);
        }
        loader.complete=function(){
            setTimeout(function(){
               finishPage();
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
        $(".page").eq(pageNum).addClass("paged");
        $(".page").eq(pageNum).addClass("curt");
        $(".auido_play").attr("data-canStop",false);
        if($(".auido_play").attr("src")!=""&&$(".auido_play").size()>0 ){
            if(canPlayMsond>0){
                $(".musiced").removeClass("hide");
                $(".auido_play")[0].play();
            }else{
                $(".musiced").addClass("musicet");
            }

        }
        addLight();
        initScroll();
	},400)
}


//音乐事件；
$(".musice").on("click",function(){
    if(!$(this).hasClass("musicet")){
        $(this).addClass("musicet");
        $(".auido_play")[0].pause();
        dunplay=-1;
        window.sessionStorage.setItem("muStage","-1");
    }else{
        $(this).removeClass("musicet");
        $(".auido_play")[0].play();
        $(".yifd").show();
        dunplay=1;
        window.sessionStorage.setItem("muStage","1");
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

