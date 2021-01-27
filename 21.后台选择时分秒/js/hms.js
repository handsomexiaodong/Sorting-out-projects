var item;
var LkTimeSelect = (function () {
    function LkTimeSelect(name, obj) {
        this.ops = {
            defTime: '',
            isSecond: true,
            domH: 30,
            domNum: 5,
            starthour: '0',
            addDate: 50,
            speed: 100,
            _isUpdate: false,
            _divisionNum: 2,
            _chostDate: '',
            _hour: [],
            _minuite: [],
            _second: [],
            _hourNum: 0,
            _minuteNum: 0,
            _secondNum: 0,
            _setArry: {},
            _isShow:false,
            container: document.querySelector("body"),
            showDateBox: function () {
            },
            selectedDate: function (obj) {
            },
            dateChange: function (obj) {
            }
        };
        for (item in obj) {
            if (item.indexOf("_") != 0) {
                if (obj[item]!='undefined') {
                    this.ops[item] = obj[item];
                }
            }
        }
        this.oDiv = document.querySelector(name);
        this.init();
    }
    LkTimeSelect.prototype.init = function () {
        for (var i = 0; i <= 23; i++) {
            this.ops._hour.push(i);
        }
        for (var i = 0; i <= 59; i++) {
            this.ops._minuite.push(i);
        }
        for (var i = 0; i <= 59; i++) {
            this.ops._second.push(i);
        }
        this.bindEvent();
    };
    LkTimeSelect.prototype.plan = function () {
    	$(".lk_boxContPoptime").remove();
        var _a;
        var _dh;
        var _dm;
        var _ds;
        // this.ops._hour = [];
        // this.ops._minuite = [];
        // this.ops._second = [];
        if(!this.ops.defTime){
            var date = new Date();
            var hour = date.getHours() >= 10 ? date.getHours() : '0'+date.getHours();
            var minute = date.getMinutes()>=10?date.getMinutes() : "0"+date.getMinutes();
            var second = date.getSeconds()>=10 ?  date.getSeconds() : '0' +  date.getSeconds();
            _dh = hour;
            _dm = minute;
            _ds = second;
            this.ops.defTime = _dh + ':' + _dm + ";" + _ds;
        }else{
            var dTime = this.ops.defTime.split(":");
            _dh = dTime[0];
            _dm = dTime[1];
            _ds = dTime[2] || '00';
        }
       // console.log(this.ops.isSecond);
        var _this = this;
        var div = document.createElement('div');
        div.className = 'lk_boxContPoptime';
        // div.addEventListener('touchmove', function (e) {
        //     e.preventDefault();
        // }, false);
       // div.addEventListener("click", this.removeDom.bind(this), false);
        this.ops.container.appendChild(div);
        var height = this.ops.domH * this.ops.domNum;
        $(".lk_boxContPoptime").append("<div class=\"lk_dateBox\">\n<div class=\"lk_dateShowBox\" style=\"height:" + height + "px\">\n <div class=\"lk_itemList\" id=\"hour\"><ul></ul></div>\n<div class=\"lk_itemList\" id=\"minute\"><ul></ul></div>\n <div class=\"lk_itemList\" id=\"seconds\"><ul></ul></div>\n</div> \n </div>\n<div class=\"lk_dateHeadTop\">\n <p class=\"lk_cancel\">\u53D6\u6D88</p>\n <p class=\"lk_sure\">\u786E\u5B9A</p>\n</div>");
        var target = $("#"+this.oDiv.id);
        $(".lk_boxContPoptime").css({
            left:target.offset().left,
            top:target.height() + parseFloat(target.offset().top)
        });
        if(this.ops.isSecond){
            this.renderLists(this.ops._hour,'hour',_dh);
            this.renderLists(this.ops._minuite,'minute',_dm);
            this.renderLists(this.ops._second,'seconds',_ds);
        }else{
            this.renderLists(this.ops._hour,'hour',_dh);
            this.renderLists(this.ops._minuite,'minute',_dm);
            $(".lk_itemList").css("width","50%");
        }
        $(".lk_cancel").click(function () {
            _this.removeDom();
        });
        $(".lk_sure").click(function () {
            _this.sendValue();
        });
        // if (this.ops.defTime) {
        //     _a = this.ops.defTime.split(":"), _dh = _a[0], _dm = _a[1], _ds = _a[2];
        //     hour = _dh;
        //     minute = _dm;
        //     if(this.ops._isSecond){
        //     	second = _ds;
        //     }
        // }
        // else {
        //     _dh = hour;
        //     _dm = minute;
        //     _ds = second;
        // }
        // for (var i = 0; i <= 23; i++) {
        //     this.ops._hour.push(i);
        // }
        // for (var i = 0; i <= 59; i++) {
        //     this.ops._minuite.push(i);
        // }
        // if(this.ops._isSecond){
	    //     for (var i = 0; i <= 59; i++) {
	    //         this.ops._second.push(i);
	    //     }
        // }
        
    };
    LkTimeSelect.prototype.sendValue = function () {
        var obj = {};
       // console.log(this.ops._setArry);
        var hour = this.ops._setArry.hour.val;
        var minute = this.ops._setArry.minute.val;
        var second = '00';
        obj.time = hour + ":" + minute;
        if(this.ops.isSecond){
            second = this.ops._setArry.seconds.val;
            obj.time = hour + ":" + minute + ':' + second;
        }
        this.ops.defTime = hour + ":" + minute + ':' + second;
        this.ops.selectedDate(obj);
        this.removeDom();
    };
    LkTimeSelect.prototype.bindEvent = function () {
        this.oDiv.addEventListener("click", this.clickDom.bind(this), false);
    };
    LkTimeSelect.prototype.clickDom = function (event) {
        e = event || window.event;
        if(!this.ops._isShow){
            this.ops._isUpdate = true;
            this.createDom();
            this.ops._isShow = true;
        }else{
            this.removeDom();
        }

    };
    LkTimeSelect.prototype.removeDom = function () {
       $(".lk_boxContPoptime").remove();
        this.ops._isUpdate = false;
        this.ops._isShow = false;
    };
    LkTimeSelect.prototype.createDom = function () {
        this.plan();
        // var _this = this;
        // var div = document.createElement('div');
        // div.className = 'lk_boxContPoptime';
        // div.addEventListener('touchmove', function (e) {
        //     e.preventDefault();
        // }, false);
        // div.addEventListener("click", this.removeDom.bind(this), false);
        // this.ops.container.appendChild(div);
        // var height = this.ops.domH * this.ops.domNum;
        // $(".lk_boxContPoptime").append("<div class=\"lk_dateBox\">\n<div class=\"lk_dateShowBox\" style=\"height:" + height + "px\">\n <div class=\"lk_itemList\" id=\"hour\"><ul></ul></div>\n<div class=\"lk_itemList\" id=\"minute\"><ul></ul></div>\n <div class=\"lk_itemList\" id=\"seconds\"><ul></ul></div>\n</div> \n </div>\n<div class=\"lk_dateHeadTop\">\n <p class=\"lk_cancel\">\u53D6\u6D88</p>\n <p class=\"lk_sure\">\u786E\u5B9A</p>\n</div>");
        // var target = $("#"+this.oDiv.id);
        // $(".lk_boxContPoptime").css({
        // 	left:target.offset().left,
        // 	top:target.height() + parseFloat(target.offset().top)
        // });
        // this.renderLists(this.ops._hour, 'hour', this.ops._hourNum);
        // this.renderLists(this.ops._minuite, 'minute', this.ops._minuteNum);
        // if(this.ops._isSecond){
        // 	this.renderLists(this.ops._second, 'seconds', this.ops._secondNum);
        // }else{
        // 	$(".lk_itemList").css({
        // 		width:"50%"
        // 	})
        // }
        // $(".lk_dateBox").click(function (e) {
        //     e.stopPropagation();
        // });

    };
    LkTimeSelect.prototype.renderLists = function (arry, name, numr, isNoAn) {
        var num = this.ops._divisionNum;
        var _this = this;
        var length = arry.length;
        var target = $("#" + name).find("ul");
        target.html('');
        for (var i = 0; i < length; i++) {
        	var n = arry[i] > 9 ? arry[i] : '0' + arry[i];
            target.append("<li>" + n + "</li>");
            if(numr == n){
                num = i;
            }
        }
        for (var i = 0; i < this.ops._divisionNum; i++) {
            target.find("li").eq(0).before("<li></li>");
            target.find("li:last").after("<li></li>");
        }
        var maxSize = target.find("li").size();
        var maxH = target.height() - $("#" + name).height();
        var sH = num *  target.find("li").height();
        this.ops._setArry[name] = {};
        this.ops._setArry[name].event = new IScroll("#" + name,{
            mouseWheel: true,
            scrollbars: true,
            snap: 'li'
        });
        this.ops._setArry[name].event.goToPage(0,num,10);
        this.ops._setArry[name].event.on('scrollEnd', function () {
           // console.log(this.y);
            var n = -this.y / target.find("li").height() + _this.ops._divisionNum;
           // console.log(target.find("li").eq(n).html());
            _this.ops._setArry[name].val = target.find("li").eq(n).html();
        });
    };
    return LkTimeSelect;
}());