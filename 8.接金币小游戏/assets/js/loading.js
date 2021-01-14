// JavaScript Document
var base_url = "../assets/images/";
var loaderList = [`${base_url}bg1.png`, `${base_url}bg2.png`];
// for (var i = 0; i < 18; i++) {
//     var src = base_url + `game2_${i}.png`;
//     loaderList.push(src);
// }
var pageNum = 0;
$(function () {
    if ($("body").hasClass("perloader")) {
        $("img").each(function () {
            if ($(this).attr("src") != "") {
                loaderList.push($(this).attr("src"));
            }
        });
        var loader = new Loader(loaderList);//初始化，传入loading队列;
        loader.progress = function (percent) {
            // console.log(percent);
            $(".loofd").html(percent + "%");
        }
        loader.complete = function () {
            setTimeout(function () {
                finishPage();
            }, 500);
        }
    } else {
        $(".load").remove();
    }
});


function finishPage() {
    $(".page").eq(pageNum).siblings().hide();
    $(".load").fadeOut(400);
    setTimeout(function () {
        $(".page").eq(pageNum).addClass("on");
        // changeTitle(pageNum);
        $(".auido_play").attr("data-canStop", false);
        if ($(".auido_play").attr("src") != "" && $(".auido_play").size() > 0) {
            $(".musiced").removeClass("hide");
            $(".auido_play")[0].play();
        }
        setTimeout(function () {
            // testPage();
            // unlick=true;
        }, 100);
    }, 400)
}


//音乐事件；
$(".musiced").on("click", function () {
    if ($(this).attr("class") == "musiced") {
        $(".msyuddtd").removeClass("kuddtz");
        $(".musiced").addClass("mstop");
        $(".auido_play")[0].pause();
        $(".yifd").hide();
        dunplay = -1;
    } else {
        $(this).removeClass("mstop");
        $(".msyuddtd").addClass("kuddtz");
        $(".auido_play")[0].play();
        $(".yifd").show();
        dunplay = 1;
    }
});
document.addEventListener('WeixinJSBridgeReady', function () {
    allAudioPlay();
});


function allAudioPlay() {
    $("audio,video").each(function () {
        if ($(this).attr("src")) {
            $(this).attr("data-canStop", true);
            $(this)[0].play();
            $(this).on("play", function () {
                if ($(this).attr("data-canStop")) {
                    // $(this)[0].pause();
                    $(this).attr("data-canStop", false);
                    // $(this).off("play");
                }
            })
        }
    });
}

if ($(".auido_play").attr("src") != "" && $(".auido_play").size() > 0) {
    // $(".musiced").removeClass("hide");
}