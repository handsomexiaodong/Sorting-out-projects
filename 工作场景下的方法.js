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
 * @param {String} time
 * @returns {Number}
 * @description 时间转换成秒  '2020-12-30 10:58:00'
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