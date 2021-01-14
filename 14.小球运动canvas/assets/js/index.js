var winH = null; //一屏高度
var winW = null; //窗口宽度
var secN = $("section").length; //滚动的屏数
var index = 0; //当前下标
var isSlide = true; //是否可以滑动
var pos = 50; //设置多少阀值为滚动
var sec2Index = 0; //记录第二部分低级模块
$(function() {
    winH = $("section").height();
    winW = $(window).width();
});

//获取接触屏幕时的X和Y
$('article').bind('touchstart', function(e) {
    startX = e.originalEvent.changedTouches[0].pageX,
        startY = e.originalEvent.changedTouches[0].pageY;
});
$('article').bind('touchmove', function(e) {
    //获取滑动屏幕时的X,Y
    endX = e.originalEvent.changedTouches[0].pageX,
        endY = e.originalEvent.changedTouches[0].pageY;
    //获取滑动距离
    distanceX = endX - startX;
    distanceY = endY - startY;
    //判断滑动方向
    if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX > pos) {
        //往右滑动
    } else if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX < -pos) {
        //往左滑动
    } else if (Math.abs(distanceX) < Math.abs(distanceY) && distanceY < -pos) {
        //往上滑动
		slideUp()
    } else if (Math.abs(distanceX) < Math.abs(distanceY) && distanceY > pos) {
        //往下滑动

        slideDown();
    } else {
        //点击未滑动
    }
});



function slideUp() {
    if (isSlide && index < secN - 1) {
        isSlide = false;

        index++;
        if (index >= secN) {
            index = secN - 1;
        }
        $("article").animate({
            scrollTop: winH * index + "px"
        }, 600, function() {
            isSlide = true;
            // console.log(index);
            addAnimate(index);
        });
    }
    
}

function slideDown() {
    if (isSlide && index > 0) {
        isSlide = false;
        index--;
        if (index < 0) {
            index = 0;
        }
        $("article").animate({
            scrollTop: winH * index + "px"
        }, 600, function() {
            isSlide = true;
            // console.log(index);
            addAnimate(index);
        });
    }
}


// 滑动添加动画
function addAnimate(n) {
//  console.log(n);
    $(".box"+n+"").addClass("on").siblings().removeClass("on");
}

