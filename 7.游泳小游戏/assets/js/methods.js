"use strict";
    /*
     *圣杯继承;
     */
    var inherit=(function(){
        function Buffer(){};
        return function (target,original){
            Buffer.prototype = original.prototype;
            target.prototype = new Buffer();
            target.prototype.constructor = target; //令目标记得自己本质是谁
            target.prototype.gene = original; //令目标记得自己继承的原型是谁
        }
    })();
    /*
     *获取数据类型;
     */
    function type(target){
        var template={
            "[object Array]":"array",//数组
            "[object Object]":"object",//对象，
            "[object Number]":"number-object",//包装类数字
            "[object Boolean]":"boolean-object",//包装类布尔
            "[object String]":"string-object" //包装类字符串
        }
        if(target === null){
            return null
        }else if(typeof (target) == "object"){
            var str=Object.prototype.toString.call(target);
            return template[str];
        }else {
            return typeof target;
        }
    }
    /*
     * 深度拷贝;
     */
    function deepClone(target,original){
        var target=target || {},
            toStr=Object.prototype.toString.call,
            arrStr="[object Array]";
        for(var prop in original){
            if(original[prop]!== null && typeof (original[prop]) == "object"){
                if(toStr(original[prop])==arrStr){
                    target[prop] = [];
                }else{
                    target[prop] = {};
                }
                deepClone(target[prop],original[prop]);//递归；
            }else{
                target[prop] = original[prop];
            }
        }
    }
    /*
     *数组去重
     */
     Array.prototype.unRemoval=function () {
         var temp={},
             arr=[],
             leng=this.length;
         for(var i = 0; i<leng; i++ ){
             if(temp[this[i]]==undefined){
                 temp[this[i]]="seat";
                 arr.push(this[i]);
             }
         }
         return arr;
     }
     /*
      *手机号验证;
      */
    function isPoneNum(poneNum) {
        var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (!myreg.test(poneNum)) {
            return false;
        } else {
            return true;
        }
    }
    /*
     *邮箱验证;
     */
    function isEmail(email) {
        var myreg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        if (!myreg.test(email)) {
            return false;
        } else {
            return true;
        }
    }
    /*
     *判断pc还是移动端
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
    /*
    *判断是否是微信浏览器;
     */
    function isWeiXin(){
        //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    }
    /*
     *点击获取倒计时;
     */