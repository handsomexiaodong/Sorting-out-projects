//6:1206,6p:1218,5s:1182,mz:1181; ipX:1448; note8:1321;
aw = document.documentElement.clientWidth;
ah = document.documentElement.clientHeight;
$("html,body").css({ "width": 750 });
$(".pagelock").css({ "width": 750, "height": "100vh" });
$(".guide").on("touchmove", function (event) {
	event.preventDefault();
});
$(".h_cover").on("touchmove", function (event) {
	event.preventDefault();
});
$(".mystery_guide").on("touchmove", function (event) {
	event.preventDefault();
});
$(".h_alert").on("touchmove", function (event) {
	event.preventDefault();
});
var canTab = true;
var pageNum = 0;
function pagetab() {
	if (arguments.length < 1) {
		index = $(".curt").index();
		index = index + 1;
	} else {
		index = arguments[0];
	}
	$(".page").eq(index).fadeIn(400);
	setTimeout(function () {
		$(".curt").removeClass("curt");
		$(".page1").eq(0).addClass("curt").siblings().removeClass("curt").hide();
	}, 400);
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

var canplayM = 1;
if (/Android (\d+\.\d+)/.test(navigator.userAgent)) { moused(); moused2(); }

function moused() {
	createjs.Sound.registerSound("../assets/audio/1.mp3", "sound1");
	sond1 = createjs.Sound.play("sound1");
	// createjs.Sound.alternateExtensions = ["mp3"];.
	// createjs.Sound.on("fileload", loadHandler, this);
}
function moused2() {
	createjs.Sound.registerSound("../assets/audio/2.mp3", "sound2");
	sond2 = createjs.Sound.play("sound2");
	// createjs.Sound.alternateExtensions = ["mp3"];.
	// createjs.Sound.on("fileload", loadHandler, this);
}

// $("html,body").on("touchstart", function () {
// 	if (canplayM > 0) {
// 		canplayM = -1;
// 		if (/Android (\d+\.\d+)/.test(navigator.userAgent)) { } else { moused(); moused2(); }
// 	}
// });

/* 补零 */
function addZero(n) {
	if (n < 10) {
		return "0" + n
	} else {
		return n
	}
}
/* 药片运动 */
var randomN = parseInt(Math.random() * 2);
var randomY;
if (randomN < 1) {
	randomY = Math.random() * 46
} else {
	randomY = Math.random() * 75 + 335;
}
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var width = c.width;
var height = c.height;
console.log(width, height);
var x = Math.random() * 461; //药片起始x轴坐标
var y = randomY; //药片起始y轴坐标 
var a = 3; //药片运动速度
var onOff = true;
var onOff2 = true;

var img = new Image();
img.src = '../assets/images/h_tablet.png';
// ctx.beginPath();
// img.onload = function () {
// 	ctx.drawImage(img, x, y);
// }
// ctx.fill();
function changeWz() {
	changeX();
	changeY()
	canva();
	stop = window.requestAnimationFrame(changeWz);
}
function canva() {
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.beginPath();
	ctx.drawImage(img, x, y);
	ctx.fill();
}
function changeX() {
	if (onOff) {
		x += a;
		ctx.drawImage(img, x, y);
		if (x > width - 40) {
			onOff = false;
		}
	} else {
		x -= a;
		ctx.drawImage(img, x, y);
		if (x < 0) {
			onOff = true;
		}
	}
}
function changeY() {
	if (onOff2) {
		y += (a * 2.8);
		ctx.drawImage(img, x, y);
		if (y > height - 40) {
			onOff2 = false;
		}
	} else {
		y -= (a * 2.8);
		ctx.drawImage(img, x, y);
		if (y < 0) {
			onOff2 = true;
		}
	}
}
var time;
var timeNumber = 10; //读秒
var result = 0; //记录成绩
var nextD = 1; //关卡
var arr = [];
/* 倒计时-游戏start */
function countDown(timeNumber, project, btn, num) {
	var Number = num.html();
	if (Number < 1) {
		// 没有游戏次数了
		$(".h_alert").show();
		$(".failure").show();
	} else {
		num.html(Number - 1);
		time = setInterval(() => {
			timeNumber--;
			var addTime = addZero(timeNumber);
			project.html(addTime);
			if (timeNumber == 0) {
				window.cancelAnimationFrame(stop);
				clearInterval(time);
				if (nextD >= 4) {
					// 判断药片是否在95%-105%之间---(神秘关卡)
					if (y >= 90 && y < 295) {
						$(".h_alert").fadeIn(1500);
						$(".congrats").show();
						var resultN = -parseInt(Math.random() * 99);
						arr.push(resultN);
					} else {
						if ($(".surplus span").html() == '1') {
							$(".h_alert").fadeIn(1500);
							$(".carnet_challenge").show();
						} else if ($(".surplus span").html() == '0') {
							$(".h_alert").fadeIn(1500);
							$(".carnet_grade").show();
						}
					}
				} else {
					// 判断药片是否在95%-105%之间---(普通关卡)
					if ($(".surplus span").html() == '0' && nextD == 3) {
						// 剩余次数为0且通过前三关
						if (y >= 90 && y < 295) {
							$(".h_alert").fadeIn(1500);
							$(".win").show();
							// 所用时间(成绩)
							arr.push(1000);
						} else {
							// 五次机会用完，挑战结束
							$(".h_alert").fadeIn(1500);
							$(".failure").show();
						}
					} else {
						if (y >= 90 && y < 295) {
							$(".h_alert").fadeIn(1500);
							$(".Perfect").show();
							arr.push(1000);
						} else {
							$(".h_alert").fadeIn(1500);
							$(".pity").show();
						}
					}
				}
				btn.removeClass("btn02_pause");
			}
		}, 1000)
	}
}
/* 开始游戏 */
$(".btn01").click(function () {
	$(this).parent().removeClass("on").hide().next().addClass("on");
	$(".guide").show();
})
/* 引导页--点击药片 */
// $(".h05").click(function () {
// 	$(this).next().hide();
// 	$(".gotIt").fadeIn("slow");
// })
/* 引导页--我知道了 */
$(".know").click(function () {
	$(this).parent().hide();
	$(this).parent().prev().hide();
	$(".startHand").hide();
	$(".hand").hide();
	$(".countdown").fadeIn("slow");
	if ($(".countdown").hasClass("hide")) {
		var timeNum = 3;
		var timeSet;
		$(".countdown span").html(timeNum);
		timeSet = setInterval(() => {
			timeNum--;
			$(".countdown span").html(timeNum);
			if (timeNum == 0) {
				clearInterval(timeSet);
				$(".btn05").fadeIn(300);
			}
		}, 1000)
	}
})
/* 引导页--挑战开始 */
$(".btn05").on('click', function () {
	$(this).parents(".guide").fadeOut(500);
})
/* 引导页--神秘关卡 */
$(".h19").click(function () {
	$(this).parent().fadeOut("slow");
})
/* 游戏页--点击开始 */
$(".btn02").click(function () {
	if ($(this).hasClass("btn02_pause")) {
		window.cancelAnimationFrame(stop);
		clearInterval(time);
		if (nextD >= 4) {
			// 判断药片是否在95%-105%之间---(神秘关卡)
			if (y >= 90 && y < 295) {
				$(".h_alert").fadeIn(1500);
				$(".congrats").show();
				var resultN = -parseInt(Math.random() * 99);
				arr.push(resultN);
			} else {
				if ($(".surplus span").html() == '1') {
					$(".h_alert").fadeIn(1500);
					$(".carnet_challenge").show();
				} else if ($(".surplus span").html() == '0') {
					$(".h_alert").fadeIn(1500);
					$(".carnet_grade").show();
				}
			}
		} else {
			// 判断药片是否在95%-105%之间---(普通关卡)
			if ($(".surplus span").html() == '0' && nextD == 3) {
				// 剩余次数为0且通过前三关
				if (y >= 90 && y < 295) {
					$(".h_alert").fadeIn(1500);
					$(".win").show();
					// 所用时间(成绩)
					let useTime = 11 - Number($(".theLast span").html()); //所用时间
					arr.push(useTime * 100);
				} else {
					// 五次机会用完，挑战结束
					$(".h_alert").fadeIn(1500);
					$(".failure").show();
				}
			} else {
				if (y >= 90 && y < 295) {
					$(".h_alert").fadeIn(1500);
					$(".Perfect").show();
					// 所用时间(成绩)
					let useTime = 11 - Number($(".theLast span").html()); //所用时间
					arr.push(useTime * 100);
				} else {
					$(".h_alert").fadeIn(1500);
					$(".pity").show();
				}
			}
		}
		$(this).removeClass("btn02_pause");
	} else {
		countDown(10, $(".theLast span"), $(this), $(".surplus span"));
		ctx.beginPath();
		ctx.drawImage(img, x, y);
		ctx.fill();
		window.requestAnimationFrame(changeWz);
		$(this).addClass("btn02_pause");
	}
})
/* Perfect 下一关 */
$(".next").click(function () {
	$(".theLast span").html(10);
	ctx.clearRect(0, 0, 504, 454);
	x = Math.random() * 461;
	y = randomY;
	a += 1;
	nextD++;
	if (nextD > 3 && nextD < 5) {
		$(".mystery_guide").show();
	} else {
		$("body").find(".level li").each(function () {
			if ($(this).attr("data-next") <= nextD) {
				$(this).children(".pass").hide();
				$(this).children(".by").show();
			}
		})
	}
	$(this).parent().hide();
	$(this).parents(".h_alert").hide();
})
/* 太可惜了，再来一次 */
$(".try_again").click(function () {
	$(".theLast span").html(10);
	ctx.clearRect(0, 0, 504, 454);
	x = Math.random() * 461;
	y = randomY;
	$(this).parent().hide();
	$(this).parents(".h_alert").hide();
})
/* 神秘关卡--通关失败--再次挑战 */
$(".defier").click(function () {
	$(".theLast span").html(10);
	ctx.clearRect(0, 0, 504, 454);
	x = Math.random() * 461;
	y = randomY;
	$(this).parent().hide();
	$(this).parents(".h_alert").hide();
})
/* 引导页--神秘关卡 */
$(".h19").click(function () {
	$(this).parent().hide();
	$("body").find(".level li").each(function () {
		if ($(this).attr("data-next") == 4) {
			$(this).children(".pass").hide();
			$(this).children(".by").show();
		}
	})
})
//数组求和
function sum(arr) {
	return eval(arr.join("+"));
};
function jm(count, time) {
	var font = count;
	var num = time;
	var md = new Mdbox5(font);
	let string = md.encryption(num);
	return [font, string];
}



