/**
 * @author xiaodong
 * @param {*} x
 * @returns {Boolean}
 * @description 检查是否为空
 */
function isEmpty(x) {
    if (Array.isArray(x) || typeof x === 'string' || x instanceof String) {
        return x.length === 0;
    }
    if (x instanceof Map || x instanceof Set) {
        return x.size === 0;
    }
    if (({}).toString.call(x) === '[object Object]') {
        return Object.keys(x).length === 0;
    }
    return false;
}
/**
 * @author xiaodong
 * @param {Number} target
 * @returns {String}
 * @description 检测数据类型
 */
function testing(target) {
    let template = {
        "[object Array]": "array", //数组
        "[object Object]": "object", //对象，
        "[object Number]": "number-object", //包装类数字
        "[object Boolean]": "boolean-object", //包装类布尔
        "[object String]": "string-object" //包装类字符串
    }
    if (target === null) {
        return null
    } else if (typeof (target) == "object") {
        var str = Object.prototype.toString.call(target);
        return template[str];
    } else {
        return typeof target;
    }
}
/**
 * @author xiaodong
 * @description 获取列表中的最后一项
 */
function lastItem(list) {
    if (Array.isArray(list)) {
        console.log(44);
        return list.slice(-1)[0];
    }
    if (list instanceof Set) {
        console.log(222);
        return Array.from(list).slice(-1)[0];
    }
    if (list instanceof Map) {
        console.log(111);
        return Array.from(list.values()).slice(-1)[0];
    }
}
/**
 * @author xiaodong
 * @param {Number} max 
 * @param {Number} min 
 * @returns {Number}
 * @description 获取范围内的随机数
 */
function randomNumber(max = 1, min = 0) {
    if (min >= max) {
        return max;
    }
    return Math.floor(Math.random() * (max - min) + min);
}
/**
 * @author xiaodong
 * @param {Number} randomLength
 * @returns {String}
 * @description 生成唯一ID
 */
function GenNonDuplicateID(randomLength) {
    let randomLen = randomLength || 4;
    return Number(Math.random().toString().substr(3, randomLen) + Date.now()).toString(36)
}
/**
 * @author xiaodong
 * @param {Number} lng1 
 * @param {Number} lat1 
 * @param {Number} lng2 
 * @param {Number} lat2
 * @returns {Number}
 * @description 测算两点之间的距离
 */
function getDistance(lng1, lat1, lng2, lat2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(
        Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s;
}
/**
 * @author xiaodong
 * @param {Number} lng 
 * @param {Number} lat
 * @returns {Object}
 * @description 腾讯的经纬度转换成百度的经纬度
 */
function qqMapTransBMap(lng, lat) {
    let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    let x = lng;
    let y = lat;
    let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    let lngs = z * Math.cos(theta) + 0.0065;
    let lats = z * Math.sin(theta) + 0.006;
    return {
        lng: lngs,
        lat: lats
    }
}
/**
 * @author xiaodong
 * @param {Number} lng 
 * @param {Number} lat
 * @returns {Object}
 * @description 百度的经纬度转换成腾讯的经纬度
 */
function bMapTransQQMap(lng, lat) {
    let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    let x = lng - 0.0065;
    let y = lat - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    let lngs = z * Math.cos(theta);
    let lats = z * Math.sin(theta);
    return {
        lng: lngs,
        lat: lats
    }
}
/**
 * @author xiaodong
 * @param {*} name 
 * @description 获取Url中的值
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}
/**
 * @author xiaodong
 * @returns {String}
 * @description 获取年月日
 */
function getDay() {
    let date = new Date();
    let year = date.getFullYear();
    let mouth = date.getMonth() + 1;
    let day = date.getDate();
    let time = `${year}.${mouth}.${day}`;
    return time;
}
/**
 * @author xiaodong
 * @returns {String}
 * @description 获取时间对象集合
 */
function getDateTime() {
    let date = new Date();
    let year = date.getFullYear();
    let mouth = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let obj = {};
    if (mouth < 10) {
        mouth = "0" + mouth;
    }
    if (day < 10) {
        day = "0" + day;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    obj.year = year;
    obj.mouth = mouth;
    obj.day = day;
    obj.hour = hour;
    obj.min = min;
    obj.sec = sec;
    obj.reuslt = `${year}-${mouth}-${day} ${hour}:${min}:${sec}`;
    return obj;
}
/**
 * @author xiaodong
 * @returns {Number}
 * @description 获取时间戳-精确到秒
 */
function getCreetTime() {
    let time = new Date().getTime();
    return Math.floor(time / 1000);
}
/**
 * @author xiaodong
 * @param {String} time '2020-12-30 10:58:00'
 * @returns {Number}
 * @description 时间转换成秒  
 */
function dataTime(time) {
    let [year, month, day] = time.split(" ")[0].split("-");
    let [h, m, s] = time.split(" ")[1].split(":");
    let timeS = new Date(year, month - 1, day).getTime();
    timeS = timeS / 1000 + Number(h) * 3600 + Number(m) * 60 + Number(s);
    return timeS;
}
/**
 * @author xiaodong
 * @param {Number} n
 * @returns {Number} 小于10的数字输出的是String
 * @description 补零操作
 */
function addZero(n) {
    if (n < 10) {
        return "0" + n
    } else {
        return n
    }
}
/**
 * @author xiaodong
 * @returns {String}
 * @description 判断IE浏览器版本
 */
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    console.log(userAgent)
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        console.log("ie浏览器版本" + fIEVersion);
        if (fIEVersion >= 10) {
            return false;
        } else {
            return true;
        }
    } else if (isEdge) {
        if (userAgent.indexOf("rv:11.0") > -1) {
            return false
        } else {
            return true
        }
    } else if (isIE11) {
        console.log('IE11');
        return false;
    } else {
        console.log('不是ie浏览器');
        return false;
    }
}
/**
 * @author xiaodong
 * @returns {Boolean}
 * @description 判断pc还是移动端
 */
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
/**
 * @author xiaodong
 * @returns {Boolean}
 * @description 判断是否是微信浏览器
 */
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
/**
 * @author xiaodong
 * @param {String} txt 要复制的内容
 * @param {String} id 输入框的id
 * @description 一键复制
 */
function copy(txt, id) {
    var target = document.getElementById(id);
    target.value = txt;
    target.select();
    document.execCommand("Copy");
}
/**
 * @author xiaodong
 * @param {String/Number} target 获取的节点
 * @param {String/Number} num 最小数值
 * @param {String/Number} maxNum 最大数值
 * @param {String/Number} addNum 要增加的数值
 * @description 数字自增效果
 */
function rollNum(target, num, maxNum, addNum) {
    num = num || 0;
    num = parseInt(num) + addNum * parseInt(Math.random() * 5 + 1);
    if (num > maxNum) {
        num = maxNum;
    }
    $(target).html(num);
    if (num < maxNum) {
        setTimeout(function () {
            rollNum(target, num, maxNum, addNum);
        }, 50)
    }
}
/**
 * @author xiaodong
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {Boolean} 
 * @description 判断2个数组是否相等
 */
function ArrayIsEqual(arr1, arr2) {
    if (arr1 === arr2) { //如果2个数组对应的指针相同，那么肯定相等，同时也对比一下类型
        return true;
    } else {
        if (arr1.length != arr2.length) {
            return false;
        } else { //长度相同
            let arr3 = arr2.sort();
            for (let i in arr1) { //循环遍历对比每个位置的元素
                if (arr1[i] != arr3[i]) { //只要出现一次不相等，那么2个数组就不相等
                    return false;
                }
            } //for循环完成，没有出现不相等的情况，那么2个数组相等
            return true;
        }
    }
}
/**
 * @author xiaodong
 * @param {Array} arr
 * @returns {Boolean} 
 * @description 数组求和
 */
function sumArr(arr) {
    return eval(arr.join("+"));
};
/**
 * @author xiaodong
 * @param {Array} arr 一维数组
 * @param {Number} size 小数组的长度
 * @returns {Array} 
 * @description 数组分割
 */
function arrAplit(arr, size) {
    let arr2 = []
    for (var i = 0; i < arr.length; i = i + size) {
        arr2.push(arr.slice(i, i + size))
    }
    let lastArr = arr2[arr2.length - 1];
    let lastLength = arr2[arr2.length - 1].length;
    if (lastLength < size) {
        for (var j = size - 1; j >= 0; j--) {
            if (j >= lastLength) {
                lastArr.unshift(arr2[arr2.length - 2][j]);
            }
        }
    }
    return arr2
}
/**
 * @author xiaodong
 * @param {String} str
 * @returns {Number} 
 * @description 检测中英文长度
 */
function checkLength(str) {
    var i, sum;
    sum = 0;
    for (i = 0; i < str.length; i++) {
        if ((str.charCodeAt(i) >= 0) && (str.charCodeAt(i) <= 255)) {
            sum = sum + 1;
        } else {
            sum = sum + 2;
        }
    }
    return sum;
}
/**
 * 获取前后n年的年份下拉
 * n 当前往前n年，过去
 * m 当前往后m年，未来
 */
function selectYear(n, m) {
    if (m === '' || m === undefined)
        m = 0;
    var myDate = new Date();
    var startYear = myDate.getFullYear() - n; //起始年份 
    var endYear = myDate.getFullYear() + m; //结束年份
    var arr = new Array();
    for (var i = startYear; i <= endYear; i++) {
        var obj = {
            "id": i,
            "text": i + "年"
        };
        arr.push(`${i}年`);
    }
    return arr;
}
/**
 * @author xiaodong
 * @param {String} fontSize 要检测字体的像素值
 * @param {String} fontFamily 文字的字体
 * @param {String} text 要检测的文字
 * @returns {Object} 
 * @description 检测字体的宽高
 */
function textSize(fontSize, fontFamily, text) {
    var span = document.createElement("span");
    var result = {};
    result.width = span.offsetWidth;
    result.height = span.offsetHeight;
    span.style.visibility = "hidden";
    span.style.fontSize = fontSize;
    span.style.fontFamily = fontFamily;
    span.style.display = "inline-block";
    document.body.appendChild(span);
    if (typeof span.textContent != "undefined") {
        span.textContent = text;
    } else {
        span.innerText = text;
    }
    result.width = parseFloat(window.getComputedStyle(span).width) - result.width;
    result.height = parseFloat(window.getComputedStyle(span).height) - result.height;
    return result;
}
/**
 * @author xiaodong
 * @param {function} fn 要做的事
 * @param {Number} delay 
 * @description 某个时间期限内(200毫秒)事情处理函数只执行一次【防抖】
 */
function debance(fn, delay = 200) {
    let timer = null
    return () => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn()
        }, delay)
    }
}
/**
 * @author xiaodong
 * @param {function} fn 要做的事
 * @param {Number} delay 
 * @description 每隔一段时间(300毫秒)执行一次函数【节流】
 */
function throttle(fn, delay = 300) {
    let flag = true
    return () => {
        if (!flag) return
        flag = false
        setTimeout(() => {
            fn();
            flag = true
        }, delay)
    }
}
/**
 * @author xiaodong
 * @param {data} 时间对象
 * @returns {Object}
 * @description 获取时间
 */
function dealWithTime(data) { // 获取当前时间
    let Y = data.getFullYear();
    let M = data.getMonth() + 1;
    let D = data.getDate();
    let H = data.getHours();
    let Min = data.getMinutes();
    let S = data.getSeconds();
    let W = data.getDay();
    let obj = new Object();
    H = H < 10 ? "0" + H : H;
    Min = Min < 10 ? "0" + Min : Min;
    S = S < 10 ? "0" + S : S;
    switch (W) {
      case 0:
        W = "日";
        break;
      case 1:
        W = "一";
        break;
      case 2:
        W = "二";
        break;
      case 3:
        W = "三";
        break;
      case 4:
        W = "四";
        break;
      case 5:
        W = "五";
        break;
      case 6:
        W = "六";
        break;
      default:
        break;
    }
    obj.nowDate = Y + "年" + M + "月" + D + "日 ";
    obj.nowWeek = "周" + W ;
    obj.nowTime = H + ":" + Min + ":" + S;
    return obj;
}
