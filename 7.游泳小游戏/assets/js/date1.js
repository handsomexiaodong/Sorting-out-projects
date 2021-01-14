var item;
var LkDateSet = (function () {
    function LkDateSet(name, obj) {
        this.ops = {
            weeksList: ["日", "一", "二", "三", "四", "五", "六"],
            monthList: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            format: "-",
            maxDate: "",
            minDate: "",
            clockTimeLists: ["上午", "下午"],
            dateStyle: "default",
            todayName: "todayBox",
            daySelected: "selectDay",
            changeMonth: true,
            isRepair: true,
            fristDays: "fristDay",
            animation: false,
            openSolt: false,
            timeSlot: [],
            liH: 80,
            expiration:false,
            _isCanTab: true,
            swiperLTime: 400,
            swiperHtime: 400,
            container: document.querySelector("body"),
            showDateBox: function () {
            },
            selectedDate: function (obj) {
            },
            dateChange: function (obj) {
            }
        };
        this.date = new Date();
        for (item in obj) {
            if (item.indexOf("_") != 0) {
                if (obj[item]) {
                    this.ops[item] = obj[item];
                }
            }
        }
        this.oDiv = document.querySelector(name);
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        this.day = this.date.getDate();
        this.todayTime = new Date(this.year, this.month - 1, this.day).getTime();
        this.selectedDTime = this.todayTime;
        this.toDate = this.year + "-" + this.month + "-" + this.day;
        this.selectDate = this.toDate;
        this.idName = "dateBox" + this.date.getTime();
        this.changeHtmlBox = this.oDiv;
        this.chnageHeadDate = this.year + "-" + this.month;
        this.moveObj = {};
        this.init();
    }
    LkDateSet.prototype.init = function () {
        if (this.ops.dateStyle == "default") {
            this.createDom();
        }
        if (this.ops.dateStyle == "downUp") {
            this.initAttrStyle(0);
        }
        this.oDiv.addEventListener("click", this.fnEvent.bind(this), false);
    };
    LkDateSet.prototype.fnEvent = function (e) {
        if (this.ops.dateStyle == "downUp") {
            this.createDownUpDom();
        }
    };
    LkDateSet.prototype.initAttrStyle = function (style) {
        if (!style) {
            this.oDiv.setAttribute("data-date", "" + this.toDate);
            this.oDiv.setAttribute("data-time", this.todayTime);
        }
        else if (style == 1) {
            this.oDiv.setAttribute("data-date", "" + this.selectDate);
            this.oDiv.setAttribute("data-time", this.selectedDTime);
            var _a = this.oDiv.getAttribute("data-date").split("-"), y = _a[0], m = _a[1];
            this.chnageHeadDate = y + "-" + m;
        }
        else if (style == -1) {
            this.selectDate = this.oDiv.getAttribute("data-date");
            this.selectedDTime = this.oDiv.getAttribute("data-time");
            var _b = this.oDiv.getAttribute("data-date").split("-"), y = _b[0], m = _b[1];
            this.chnageHeadDate = y + "-" + m;
        }
    };
    LkDateSet.prototype.createDom = function () {
        var mouthShow = this.ops.monthList[this.month - 1];
        var html = "<div class=\"lk_dateTable\" id=\"" + this.idName + "\">\n                                <div class=\"lk_dateHead\">\n                                     <div class=\"lk_dateTabPrev\"></div>\n                                     <h3>\n                                         <span class=\"monthBox\">" + mouthShow + "</span>\n                                         <span class=\"yearNox\">" + this.year + "</span>\n                                     </h3>\n                                     <div class=\"lk_dateTabNext\"></div>  \n                                </div>\n                                <div class=\"lk_dateBody\">\n                                    <div class=\"lk_weekLists\"><ul class=\"\"></ul></div>\n                                    <div class=\"lk_dayBox\"></div>\n                                </div>\n                            </div>";
        this.oDiv.innerHTML = html;
        var week = this.oDiv.querySelector(".lk_weekLists ul");
        var weekHtml = "";
        var container = this.oDiv.querySelector(".lk_dayBox");
        for (var i = 0; i < 7; i++) {
            weekHtml += "<li>" + this.ops.weeksList[i] + "</li>";
        }
        week.innerHTML = weekHtml;
        this.oDiv.setAttribute("data-date", this.toDate);
        this.oDiv.setAttribute("data-num", this.year + "-" + this.month);
        if (this.ops.animation) {
            container.style.height = this.ops.liH * 6 + "px";
            container.classList.add("swiperDate");
            container.innerHTML = "<ul class='dateLists'></ul><ul class='dateLists'></ul><ul class='dateLists'></ul>";
            var setTargets = container.querySelectorAll(".dateLists");
            var _a = this.getNewYear(this.year, this.month, 0), ly = _a[0], lm = _a[1];
            var _b = this.getNewYear(this.year, this.month, 1), ny = _b[0], nm = _b[1];
            setTargets[1].classList.add("chostUl");
            this.addDays(setTargets[0], ly, lm);
            this.addDays(setTargets[1], this.year, this.month);
            this.addDays(setTargets[2], ny, nm);
        }
        else {
            container.innerHTML = "<ul class='dateLists'></ul>";
            var target = container.querySelector("ul");
            this.changeHtmlBox = target;
            this.addDays(target, this.year, this.month);
        }
        var obj = { year: this.year, month: this.month };
        this.ops.dateChange(obj);
        this.oDiv.querySelector(".lk_dateTabPrev").addEventListener("click", this.dateTabPrev.bind(this), false);
        this.oDiv.querySelector(".lk_dateTabNext").addEventListener("click", this.dateTabNext.bind(this), false);
    };
    LkDateSet.prototype.createDownUpDom = function () {
        this.idName = "downDateBox" + new Date().getTime();
        var div = document.createElement("div");
        div.className = "lk_dateBoxPop";
        div.id = this.idName;
        div.addEventListener("touchmove", function (e) {
            e.preventDefault();
        }, false);
        div.innerHTML = "<div class=\"clostDatePop\"></div><div class=\"lk_footDateBox\"><div class=\"lk_upHead\"></div><div class=\"lk_dateBody\">\n<div class=\"lk_weekLists\"><ul class=\"\"></ul></div> <div class=\"lk_dayBox\"></div></div> </div>";
        document.querySelector("body").appendChild(div);
        document.querySelector(".clostDatePop").addEventListener("click", this.delateDatePop.bind(this), false);
        if (this.ops.dateStyle == "downUp") {
            var box = document.querySelector(".lk_upHead");
            box.innerHTML = "<p class='clostBtn lk_btn'>取消</p><p class='sureBtn lk_btn'>确定</p>";
            document.querySelector(".clostBtn").addEventListener("click", this.delateDatePop.bind(this), false);
            document.querySelector(".sureBtn").addEventListener("click", this.sureBtnDatePop.bind(this), false);
        }
        var week = document.querySelector("#" + this.idName).querySelector(".lk_weekLists ul");
        var weekHtml = "";
        for (var i = 0; i < 7; i++) {
            weekHtml += "<li>" + this.ops.weeksList[i] + "</li>";
        }
        week.innerHTML = weekHtml;
        this.createHtml();
        document.querySelector("#" + this.idName).querySelector(".lk_dayBox").addEventListener("touchstart", this.dateTouchStart.bind(this), false);
        document.querySelector("#" + this.idName).querySelector(".lk_dayBox").addEventListener("touchmove", this.dateTouchMove.bind(this), false);
        document.querySelector("#" + this.idName).querySelector(".lk_dayBox").addEventListener("touchend", this.dateTouchEnd.bind(this), false);
    };
    LkDateSet.prototype.dateTouchStart = function (e) {
        if (this.ops._isCanTab) {
            this.moveObj.startY = e.touches[0].clientY;
        }
    };
    LkDateSet.prototype.dateTouchMove = function (e) {
        if (this.ops._isCanTab) {
            this.moveObj.moveY = e.touches[0].clientY;
            this.moveObj.disY = this.moveObj.moveY - this.moveObj.startY;
            var box = document.querySelector(".swiperDate1");
            box.style.WebkitTransform = "translateY(" + this.moveObj.disY + "px)";
        }
    };
    LkDateSet.prototype.dateTouchEnd = function (e) {
        var _this_1 = this;
        if (this.ops._isCanTab) {
            var box_1 = document.querySelector(".swiperDate1");
            var moveH = this.ops.liH * 6;
            var _a = this.chnageHeadDate.split("-"), y_1 = _a[0], m_1 = _a[1];
            var htmlBox_1 = box_1.querySelectorAll(".dateLists");
            var obj_1 = {};
            this.ops._isCanTab = false;
            if (this.moveObj.disY > 60) {
                box_1.classList.add("lk_speed");
                box_1.style.WebkitTransform = "translateY(" + moveH + "px)";
                setTimeout(function () {
                    box_1.classList.remove("lk_speed");
                    var _a = _this_1.getNewYear(y_1, m_1, 0), sy = _a[0], sm = _a[1];
                    var _b = _this_1.getNewYear(sy, sm, 0), ny = _b[0], nm = _b[1];
                    _this_1.changeDateHead("", sy, sm);
                    _this_1.addDays(htmlBox_1[0], ny, nm);
                    _this_1.addDays(htmlBox_1[1], sy, sm);
                    _this_1.addDays(htmlBox_1[2], y_1, m_1);
                    obj_1 = { year: sy, month: sm };
                    box_1.style.WebkitTransform = "";
                    _this_1.ops.dateChange(obj_1);
                    _this_1.ops._isCanTab = true;
                }, this.ops.swiperLTime);
            }
            else if (this.moveObj.disY < -60) {
                box_1.classList.add("lk_speed");
                box_1.style.WebkitTransform = "translateY(-" + moveH + "px)";
                setTimeout(function () {
                    box_1.classList.remove("lk_speed");
                    var _a = _this_1.getNewYear(y_1, m_1, 1), sy = _a[0], sm = _a[1];
                    var _b = _this_1.getNewYear(sy, sm, 1), ny = _b[0], nm = _b[1];
                    _this_1.changeDateHead("", sy, sm);
                    _this_1.addDays(htmlBox_1[2], ny, nm);
                    _this_1.addDays(htmlBox_1[1], sy, sm);
                    _this_1.addDays(htmlBox_1[0], y_1, m_1);
                    obj_1 = { year: sy, month: sm };
                    box_1.style.WebkitTransform = "";
                    _this_1.ops.dateChange(obj_1);
                    _this_1.ops._isCanTab = true;
                }, this.ops.swiperLTime);
            }
            else {
                box_1.style.WebkitTransform = "translateY(0px)";
                this.ops._isCanTab = true;
            }
            this.moveObj.disY = 0;
        }
    };
    LkDateSet.prototype.delateDatePop = function (m) {
        var box = document.querySelector(".lk_dateBoxPop");
        document.querySelector("body").removeChild(box);
        this.initAttrStyle(-1);
    };
    LkDateSet.prototype.sureBtnDatePop = function (e) {
        var _a, _b;
        var obj = {};
        var _c = this.selectDate.split("-"), sy = _c[0], sm = _c[1], sd = _c[2];
        if (sm < 10 && this.ops.isRepair) {
            sm = '0' + sm;
        }
        if (sd < 10 && this.ops.isRepair) {
            sd = '0' + sd;
        }
        var date = sy + "-" + sm + "-" + sd;
        var time = this.selectedDTime;
        var _d = [0, 0, 0], minY = _d[0], minM = _d[1], minD = _d[2];
        var _e = [0, 0, 0], maxY = _e[0], maxM = _e[1], maxD = _e[2];
        var minDTime = 0;
        var maxDTime = 0;
        if (this.ops.minDate) {
            _a = this.ops.minDate.split("-"), minY = _a[0], minM = _a[1], minD = _a[2];
            minDTime = this.getDateTimes(minY, minM, minD);
        }
        if (this.ops.maxDate) {
            _b = this.ops.maxDate.split("-"), maxY = _b[0], maxM = _b[1], maxD = _b[2];
            maxDTime = this.getDateTimes(maxY, maxM, maxD);
        }
        this.initAttrStyle(1);
        if (minDTime && time < minDTime || maxDTime && time > maxDTime || !this.canClickSoltTime(time)) {
            var box_2 = document.querySelector(".lk_dateBoxPop");
            document.querySelector("body").removeChild(box_2);
            obj = { err: "当前日期不可选择" };
            this.ops.selectedDate(obj);
            return false;
        }
        this.oDiv.innerHTML = date;
        obj = { date: date, time: time };
        this.ops.selectedDate(obj);
        var box = document.querySelector(".lk_dateBoxPop");
        document.querySelector("body").removeChild(box);
    };
    LkDateSet.prototype.createHtml = function () {
        var _a = this.chnageHeadDate.split("-"), y = _a[0], m = _a[1];
        var target = document.querySelector("#" + this.idName).querySelector(".lk_dayBox");
        var boxH = this.ops.liH * 6;
        target.style.height = boxH + "px";
        var div = document.createElement("div");
        div.style.height = boxH * 3 + "px";
        div.style.left = 0 + "px";
        div.style.top = -boxH + "px";
        div.style.position = "absolute";
        div.className = "swiperDate1";
        div.innerHTML = "<ul class='dateLists'></ul><ul class='dateLists'></ul><ul class='dateLists'></ul>";
        target.appendChild(div);
        var setTargets = target.querySelectorAll(".dateLists");
        var _b = this.getNewYear(y, m, 0), ly = _b[0], lm = _b[1];
        var _c = this.getNewYear(y, m, 1), ny = _c[0], nm = _c[1];
        setTargets[1].classList.add("chostUl");
        this.addDays(setTargets[0], ly, lm);
        this.addDays(setTargets[1], y, m);
        this.addDays(setTargets[2], ny, nm);
        var _d = this.selectDate.split("-"), sy = _d[0], sm = _d[1];
        var obj = { year: Number(sy), month: Number(sm) };
        this.ops.dateChange(obj);
    };
    LkDateSet.prototype.dateTabPrev = function () {
        var _this_1 = this;
        if (this.ops._isCanTab) {
            var _this_2 = this;
            var target = this.oDiv.querySelector(".lk_dateHead");
            this.ops._isCanTab = false;
            var _a = this.oDiv.getAttribute("data-num").split("-"), y = _a[0], m = _a[1];
            var _b = this.getNewYear(y, m, 0), ny = _b[0], nm = _b[1];
            this.changeDateHead(target, ny, nm);
            var obj = { year: ny, month: nm };
            this.ops.dateChange(obj);
            if (this.ops.animation) {
                var targetArry_1 = this.oDiv.querySelector(".lk_dayBox").querySelectorAll("ul");
                var boxW_1 = this.oDiv.querySelector(".lk_dayBox").clientWidth;
                targetArry_1[0].style.WebkitTransform = "translateX(-" + boxW_1 + "px)";
                targetArry_1[0].style.display = "block";
                var target_1 = this.oDiv.querySelector(".lk_dateHead");
                setTimeout(function () {
                    targetArry_1[0].classList.add("lk_speed");
                    targetArry_1[0].style.WebkitTransform = "translateX(0px)";
                    targetArry_1[1].classList.add("lk_speed");
                    targetArry_1[1].style.WebkitTransform = "translateX(" + boxW_1 + "px)";
                    setTimeout(function () {
                        targetArry_1[0].classList.remove("lk_speed");
                        targetArry_1[1].classList.remove("lk_speed");
                        var _a = _this_1.oDiv.getAttribute("data-num").split("-"), y = _a[0], m = _a[1];
                        var _b = _this_1.getNewYear(y, m, 0), ly = _b[0], lm = _b[1];
                        var _c = _this_1.getNewYear(y, m, 1), ny = _c[0], nm = _c[1];
                        _this_1.addDays(targetArry_1[0], ly, lm);
                        _this_1.addDays(targetArry_1[1], y, m);
                        _this_1.addDays(targetArry_1[2], ny, nm);
                        targetArry_1[0].style.display = "none";
                        targetArry_1[0].style.WebkitTransform = "";
                        targetArry_1[1].style.WebkitTransform = "";
                        _this_2.ops._isCanTab = true;
                    }, _this_1.ops.swiperLTime);
                }, 10);
            }
            else {
                this.addDays(this.changeHtmlBox, ny, nm);
                this.ops._isCanTab = true;
            }
        }
    };
    LkDateSet.prototype.dateTabNext = function () {
        var _this_1 = this;
        if (this.ops._isCanTab) {
            var _this_3 = this;
            this.ops._isCanTab = false;
            var _a = this.oDiv.getAttribute("data-num").split("-"), y = _a[0], m = _a[1];
            var _b = this.getNewYear(y, m, 1), ny = _b[0], nm = _b[1];
            var target = this.oDiv.querySelector(".lk_dateHead");
            this.changeDateHead(target, ny, nm);
            var obj = { year: ny, month: nm };
            this.ops.dateChange(obj);
            if (this.ops.animation) {
                var targetArry_2 = this.oDiv.querySelector(".lk_dayBox").querySelectorAll("ul");
                var boxW_2 = this.oDiv.querySelector(".lk_dayBox").clientWidth;
                targetArry_2[2].style.WebkitTransform = "translateX(" + boxW_2 + "px)";
                targetArry_2[2].style.display = "block";
                var target_2 = this.oDiv.querySelector(".lk_dateHead");
                setTimeout(function () {
                    targetArry_2[2].classList.add("lk_speed");
                    targetArry_2[2].style.WebkitTransform = "translateX(0px)";
                    targetArry_2[1].classList.add("lk_speed");
                    targetArry_2[1].style.WebkitTransform = "translateX(-" + boxW_2 + "px)";
                    setTimeout(function () {
                        targetArry_2[2].classList.remove("lk_speed");
                        targetArry_2[1].classList.remove("lk_speed");
                        var _a = _this_1.oDiv.getAttribute("data-num").split("-"), y = _a[0], m = _a[1];
                        var _b = _this_1.getNewYear(y, m, 0), ly = _b[0], lm = _b[1];
                        var _c = _this_1.getNewYear(y, m, 1), ny = _c[0], nm = _c[1];
                        _this_1.addDays(targetArry_2[0], ly, lm);
                        _this_1.addDays(targetArry_2[1], y, m);
                        _this_1.addDays(targetArry_2[2], ny, nm);
                        targetArry_2[2].style.display = "none";
                        targetArry_2[2].style.WebkitTransform = "";
                        targetArry_2[1].style.WebkitTransform = "";
                        _this_3.ops._isCanTab = true;
                    }, _this_1.ops.swiperLTime);
                }, 10);
            }
            else {
                this.addDays(this.changeHtmlBox, ny, nm);
                this.ops._isCanTab = true;
            }
        }
    };
    LkDateSet.prototype.changeDateHead = function (targt, y, m) {
        if (this.ops.dateStyle == "default") {
            var month = this.ops.monthList[m - 1];
            targt.querySelector(".monthBox").innerHTML = "" + month;
            targt.querySelector(".yearNox").innerHTML = "" + y;
            this.oDiv.setAttribute("data-num", y + "-" + m);
        }
        this.chnageHeadDate = y + "-" + m;
    };
    LkDateSet.prototype.addDays = function (target, y, m) {
        var _a, _b;
        target.innerHTML = "";
        var week = new Date(y, m - 1, 1).getDay();
        var days = new Date(y, m, 0).getDate();
        var lastMDats = new Date(y, m - 1, 0).getDate();
        var lastW = new Date(y, m - 2, lastMDats).getDay();
        var html = "";
        var html1 = "";
        var html2 = "";
        var html3 = "";
        var lm = m - 1 > 0 ? m - 1 : 12;
        var nm = Number(m) + 1 < 13 ? Number(m) + 1 : 1;
        if (week) {
            for (var i = 0; i <= lastW; i++) {
                var day = lastMDats - (lastW - i);
                html1 += "<li class=\"no_date\" data-m=\"" + lm + "\" data-d=\"" + day + "\"><span>" + day + "</span></li>";
            }
        }
        for (var i = 1; i <= days; i++) {
            var time = this.getDateTimes(y, m, i);
            if (time == this.todayTime && time == this.selectedDTime) {
                html2 += "<li class=\"sameMuoth todayBox selectDay\" data-m=\"" + m + "\" data-time=\"" + time + "\" data-date=\"" + y + "-" + m + "-" + i + "\" data-d=\"" + i + "\"><span class=\" \">" + i + "</span></li>";
            }
            else if (time == this.todayTime) {
                html2 += "<li class=\"sameMuoth todayBox\" data-m=\"" + m + "\" data-time=\"" + time + "\" data-date=\"" + y + "-" + m + "-" + i + "\" data-d=\"" + i + "\"><span class=\"\">" + i + "</span></li>";
            }
            else if (time == this.selectedDTime) {
                html2 += "<li class=\"sameMuoth selectDay\" data-m=\"" + m + "\" data-time=\"" + time + "\" data-date=\"" + y + "-" + m + "-" + i + "\" data-d=\"" + i + "\"><span class=\"\">" + i + "</span></li>";
            }
            else {
                html2 += "<li class=\"sameMuoth\" data-m=\"" + m + "\" data-time=\"" + time + "\" data-date=\"" + y + "-" + m + "-" + i + "\" data-d=\"" + i + "\"><span>" + i + "</span></li>";
            }
        }
        for (var i = 1; i <= 42 - days - week; i++) {
            html3 += "<li class=\"no_date\" data-m=\"" + nm + "\" data-d=\"" + i + "\"><span>" + i + "</span></li>";
        }
        html = html1 + html2 + html3;
        target.innerHTML = html;
        var targetArry = target.querySelectorAll("li");
        var liLength = targetArry.length;
        var _c = [0, 0, 0], minY = _c[0], minM = _c[1], minD = _c[2];
        var _d = [0, 0, 0], maxY = _d[0], maxM = _d[1], maxD = _d[2];
        var minDTime = 0;
        var maxDTime = 0;
        if (this.ops.minDate) {
            _a = this.ops.minDate.split("-"), minY = _a[0], minM = _a[1], minD = _a[2];
            minDTime = this.getDateTimes(minY, minM, minD);
        }
        if (this.ops.maxDate) {
            _b = this.ops.maxDate.split("-"), maxY = _b[0], maxM = _b[1], maxD = _b[2];
            maxDTime = this.getDateTimes(maxY, maxM, maxD);
        }
        for (var i = 0; i < liLength; i++) {
            var time = targetArry[i].getAttribute("data-time");
            var dateM = targetArry[i].getAttribute("data-m");
            var dateD = targetArry[i].getAttribute("data-d");
            if (this.ops.minDate && time < minDTime) {
                this.dayIsToday(targetArry[i]);
            }
            if (this.ops.dateStyle != "default" && dateD == 1 && this.ops.changeMonth) {
                targetArry[i].querySelector("span").innerHTML = dateM + "\u6708";
                targetArry[i].classList.add("fristDay");
            }

            if (this.ops.maxDate && time > maxDTime) {
                this.dayIsToday(targetArry[i]);
            }

            if(this.ops.expiration){
                if(time < this.todayTime){
                    this.dayIsToday(targetArry[i]);
                }
            }

            if (this.ops.openSolt) {
                if (!this.canClickSoltTime(time)) {
                    this.dayIsToday(targetArry[i]);
                }
            }
        }
        target.addEventListener("click", this.fnLiClickEvents.bind(this), false);
    };
    LkDateSet.prototype.dayIsToday = function (targrt) {
        if (targrt.classList.contains("todayBox")) {
            targrt.className = "no_date";
            targrt.classList.add("todayBox");
        }
        else {
            targrt.className = "no_date";
        }
    };
    LkDateSet.prototype.canClickSoltTime = function (stime) {
        var timeArry = this.ops.timeSlot;
        var timeLeng = timeArry.length;
        var a = false;
        if (timeLeng) {
            for (var i = 0; i < timeLeng; i++) {
                var _a = timeArry[i].split("-"), sy = _a[0], sm = _a[1], sd = _a[2], ey = _a[3], em = _a[4], ed = _a[5];
                var startTime = this.getDateTimes(sy, sm, sd);
                var endTime = this.getDateTimes(ey, em, ed);
                if (stime >= startTime && stime <= endTime) {
                    a = true;
                    break;
                }
            }
            if (a) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    };
    LkDateSet.prototype.fnLiClickEvents = function (e) {
        if (this.ops.dateStyle == "default") {
            e.stopPropagation();
        }
        var target = e.target;
        var domName = target.localName;
        if (domName != "li") {
            target = e.target.parentNode;
        }
        if (!target.classList.contains("no_date") && !target.classList.contains("selectDay")) {
            target.parentNode.querySelector(".selectDay") && target.parentNode.querySelector(".selectDay").classList.remove("selectDay");
            target.classList.add("selectDay");
            var obj = {};
            var date = target.getAttribute("data-date");
            var time = target.getAttribute("data-time");
            var _a = date.split("-"), year = _a[0], month = _a[1], day = _a[2];
            this.selectedDTime = time;
            this.selectDate = date;
            if (this.ops.dateStyle == "default") {
                obj["date"] = date;
                obj["time"] = time;
                this.ops.selectedDate(obj);
            }
            else if (this.ops.dateStyle == "downUp") {
            }
        }
    };
    LkDateSet.prototype.getDateTimes = function (y, m, d) {
        var time = new Date(y, m - 1, d).getTime();
        return time;
    };
    LkDateSet.prototype.getNewYear = function (y, m, s) {
        var arry = [];
        if (s) {
            if (m < 12) {
                m++;
            }
            else {
                m = 1;
                y++;
            }
        }
        else {
            if (m > 1) {
                m--;
            }
            else {
                m = 12;
                y--;
            }
        }
        arry.push(Number(y));
        arry.push(m);
        return arry;
    };
    return LkDateSet;
}());
//# sourceMappingURL=date.js.map