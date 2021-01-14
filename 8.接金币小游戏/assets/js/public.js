//6:1206,6p:1218,5s:1182,mz:1181; ipX:1448; note8:1321;
aw = document.documentElement.clientWidth;
ah = document.documentElement.clientHeight;
$("html,body").css({ "width": 750 });
$(".pagelock").css({ "width": 750, "height": "100vh" });
var sace = ah / 1334;
if (sace > 1) {
    $(".canvas").css("transform", "scale(" + sace + ")");
}
$(".pagelock").on("touchmove", function (event) {
    event.preventDefault();
});

var canMovemouse = false;
var hasTouch = 'ontouchstart' in window,
    startEvent = hasTouch ? 'touchstart' : 'mousedown',
    moveEvent = hasTouch ? 'touchmove' : 'mousemove',
    endEvent = hasTouch ? 'touchend' : 'mouseup';

$(".box1,.box2,.box4,.box5,.end_of_term").on("touchmove", function (event) {
    event.preventDefault();
});
function pagetab() {
    if (arguments.length < 1) {
        index = $(".curt").index();
        index = index + 1;
    } else {
        index = arguments[0];
    }
    $(".page").eq(index).fadeIn(400);
    $(".page").eq(index).addClass("on").siblings().removeClass("on").hide();
    // setTimeout(function () {
       
    // }, 400);
}

(function () {
    var pt = null;
    var srcopp = 0;
    $("input,textarea,select").on("focus", function () {
        clearTimeout(pt);
        srcopp = $("html").scrollTop() || $("body").scrollTop();
    }).on("blur", function () {
        pt = setTimeout(function () {
            $("html").scrollTop(srcopp);
            $("body").scrollTop(srcopp);
        }, 50);
    })
}());
/* 主题页 */
(function () {
    
}());
