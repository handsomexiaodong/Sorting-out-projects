 var InputCalendar = (function(window, document, undefined) {
	'use strict';
	var checkDates = {arr:[],checktiem:'',singleCalendar:''};
	var InputCalendar = function(element, options) {
		var _this = this;
		_this.myDate = new Date(); //获取当前日期
		_this.newDate = _this.myDate.getDate(); //今天几号
		_this.newDay = _this.myDate.getDay(); //今天周几
		_this.newMonth = _this.myDate.getMonth(); // 这是几月
		_this.newFullYear = _this.myDate.getFullYear(); // 这是哪年
		_this.newGetHours = _this.myDate.getHours(); //获取系统时
		_this.newGetMinutes = _this.myDate.getMinutes(); //获取系统时分
		 
		
		_this.twoNewMonths = null;
		_this.twoNewYears = null;
		options = options || {};
		var defaults = {
			calenderScroll: false, //滚动加载
			checkCalender: false, //选多个日期
			twoCalendar: true,
			topcalendarTop: options.calendarTop || '38px', //日历展示的top值
			hourMinute: true, //多选时是否显示是分秒
			beforeToday: false, //今天之前是否不可选呢
			afterToday: false, //今天之后是否不可选呢
			jsonData: options.jsonData || ''
		};

		_this._element = $(element);
		_this._options = $.extend({}, defaults, options);
		_this._element.show();
		_this.init();
	};
	//默认加载
	InputCalendar.prototype.init = function() {
		var _this = this;
		//console.log(this._element)
//		console.log(checkDates);
		
		_this._element.html('');
		$("#calendar-input").val(''); 
		if(_this._options.twoCalendar) {
			_this.twoNewMonths = parseInt(_this.newMonth) + 2;
			_this.twoNewYears = parseInt(_this.newFullYear);

			if(_this.twoNewMonths == 13) {
				_this.twoNewMonths = 1;
				_this.twoNewYears = _this.twoNewYears + 1;
			}

		}
		//		console.log(parseInt(_this.newMonth) + '’' + parseInt(_this.newFullYear))
		//月超12，年加1，月归0;
		for(var i = 0; i < 1; i++) {
			_this.newMonth++
				if(_this.newMonth > 11) {
					_this.newMonth = 0;
					_this.newFullYear += 1;
				}

			this._element.append(_this.calendarCon(_this.newFullYear, _this.newMonth));
		}
		 
		
		if(!_this._options.checkCalender) {
			_this._element.css({
				'top': _this._options.topcalendarTop,
				'width': 343
			})
			_this._element.find('.content .list ul li').css({
				'height':36,
				'border-radius':'50%',
				'margin': 5,
				'width': 'calc((100%/7) - 10px)'
			});
			_this._element.find('.content .list ul li').each(function(){
				if($(this).attr('_date') ==checkDates.singleCalendar){
					$(this).addClass('active');
				}
			});
		}else{
			//回显选中的日历  
			var echoMaxDate = checkDates.arr[0],echoMinDate = checkDates.arr[0];
			checkDates.arr.map(res=>{ 
				echoMaxDate = new Date(res) > new Date(echoMaxDate)? res: echoMaxDate;
	  			echoMinDate = new Date(res) < new Date(echoMinDate)? res: echoMinDate;
				
				
				_this._element.find('.content .list ul li').each(function(){
					if(res == $(this).attr('_date')){ 
						$(this).addClass('hover'); 
					}
					 
				})
			}) 
//			console.log(echoMinDate)
			if(echoMinDate !='' && echoMinDate != undefined && echoMinDate != null){
				_this._element.find('.content .list ul li').each(function(){  
					if(echoMinDate == $(this).attr('_date')){
						$(this).addClass('startDate'); 
					}else if(echoMaxDate == $(this).attr('_date')){
						$(this).addClass('endDate'); 
					}
				})
			}
			_this._element.find('.dateTimeInput input').val(checkDates.checktiem);
//			console.log(echoMinDate,echoMaxDate)
		}

		//点击空白 关闭弹窗
		$(document).mouseup(function(e) {
			var _con = _this._element; // 设置目标区域
			if(!_con.is(e.target) && _con.has(e.target).length === 0) { // Mark 1
				_this._element.hide();

			}
		});

		_this.calendarConter();
		_this.calendarClick();
	}

	//创建日历
	InputCalendar.prototype.calendarCon = function(newYears, newMonths) {
		var _this = this;

		//console.log(newYears, newMonths, _this.newMonth)
		var oldDate = new Date(newYears, newMonths);

		var calendarList;
		oldDate.setMonth(newMonths);
		oldDate.setDate(0);
		var newDayNum = oldDate.getDate(0); //获取天数

		oldDate.setDate(1);
		var emptyAll = oldDate.getDay(); //获取每月空白数量

		if(_this.newMonth == 0) {
			newYears -= 1;
		}
		newMonths = newMonths == 0 ? 12 : newMonths;
		newMonths = newMonths > 9 ? newMonths : '0' + newMonths;
		//console.log(parseInt(newMonths), parseInt(_this.twoNewMonths))

		//是否多选日历现实确定按钮
		if(_this._options.checkCalender) {
			calendarList =
				'<div class="dateTimeInput">' +
				'<input type="text" readonly placeholder="请输入日期" />' +
				'</div>';
			if(_this._options.twoCalendar) {
				calendarList += '<div class="calendar-content">' +
					//左边日历
					'<div class="calendar-l">' +
					'<div class="calendar-left">';
			}
			calendarList += '<div class="calendar-btn"><p>' +
				'<a class="leftbtnYear" href="javascript:;">&lt;&lt;</a>' +
				'<a class="leftbtn ml5" href="javascript:;">&lt;</a>' +
				'</p>';
			calendarList += '<h3>' + newYears + '-' + newMonths + '</h3><p>';

			//    if (((parseInt(_this.twoNewMonths) - parseInt(newMonths)) > 1 && parseInt(_this.twoNewYears) == parseInt(newYears))   || (parseInt(_this.twoNewYears) - parseInt(newYears)  != 1 && parseInt(newMonths) != 12 && parseInt(_this.twoNewMonths) != 1 ) ) {
			//      calendarList +=
			//        '<a class="rightbtn" href="javascript:;">&gt;</a>' +
			//        '<a class="rightbtnYear ml5" href="javascript:;">&gt;&gt;</a>';
			//
			//    }

			if(parseInt(_this.twoNewYears) != parseInt(newYears)) {
				if(parseInt(_this.twoNewYears) - parseInt(newYears) != 1 || parseInt(newMonths) != 12 || parseInt(_this.twoNewMonths) != 1) {
					calendarList +=
						'<a class="rightbtn ml5" href="javascript:;">&gt;</a>' +
						'<a class="rightbtnYear" href="javascript:;">&gt;&gt;</a>';
				}

			} else {
				if((parseInt(_this.twoNewMonths) - parseInt(newMonths)) > 1) {
					calendarList +=
						'<a class="rightbtn ml5" href="javascript:;">&gt;</a>' +
						'<a class="rightbtnYear" href="javascript:;">&gt;&gt;</a>';
				}
			}
		} else {
			calendarList =
				'<div class="calendar-btn radio-calendar-btn"><p>' +
				'<a class="leftbtnYear" href="javascript:;">&lt;&lt;</a>' +
				'<a class="leftbtn ml5" href="javascript:;">&lt;</a>' +
				'</p>';
			calendarList += '<h3>' + newYears + '年' + newMonths + '月</h3><p>' +
				'<a class="rightbtn" href="javascript:;">&gt;</a>' +
				'<a class="rightbtnYear ml5" href="javascript:;">&gt;&gt;</a>';
		}

		calendarList +=
			'</p></div><ol class="title">' +
			'<li>日</li>' +
			'<li>一</li>' +
			'<li>二</li>' +
			'<li>三</li>' +
			'<li>四</li>' +
			'<li>五</li>' +
			'<li>六</li>' +
			'</ol>';
		calendarList += '<div class="content"><div class="list">';
		//		calendarList += '<h3>' + newYears + '日' + newMonths + '月</h3>';
		calendarList += '<ul>';
		if(emptyAll > 0) {
			for(var j = 0; j < emptyAll; j++) {
				calendarList += ('<li></li>');
			}
		}

		//判断是否是这个月
		if((_this.myDate.getMonth() + 1) == newMonths && _this.myDate.getFullYear() == newYears) {
			for(var i = 1; i <= newDayNum; i++) {
				var days = i > 9 ? i : '0' + i;
				if(i < _this.newDate) { // 今日以前

					if(_this._options.beforeToday) {
						calendarList += ('<li _date="' + newYears + '-' + newMonths + '-' + days + '" class="disabled" >' + days + '</li>');
					} else {
						calendarList += ('<li _date="' + newYears + '-' + newMonths + '-' + days + '" >' + days + '</li>');
					}

				} else if(i == _this.newDate) { //今日

					calendarList += ('<li _date="' + newYears + '-' + newMonths + '-' + days + '" class="today"  >' + days + '</li>');
				} else { //今日以后

					if(_this._options.afterToday) {
						calendarList += ('<li _date="' + newYears + '-' + newMonths + '-' + days + '" class="disabled" >' + days + '</li>');
					} else {
						calendarList += ('<li _date="' + newYears + '-' + newMonths + '-' + days + '" >' + days + '</li>');
					}
				}
			}
		} else if(_this.myDate.getFullYear() > newYears || (_this.myDate.getFullYear() == newYears && (_this.myDate.getMonth() + 1) > newMonths)) {
			for(var i = 1; i <= newDayNum; i++) {
				var days = i > 9 ? i : '0' + i;
				if(_this._options.beforeToday) {
					calendarList += ('<li _date="' + newYears + '-' + newMonths + '-' + days + '"  class="disabled" >' + days + '</li>');
				} else {
					calendarList += ('<li _date="' + newYears + '-' + newMonths + '-' + days + '" >' + days + '</li>');
				}
			}
		} else if(_this.myDate.getFullYear() < newYears || (_this.myDate.getFullYear() == newYears && (_this.myDate.getMonth() + 1) < newMonths)) {
			for(var i = 1; i <= newDayNum; i++) {
				var days = i > 9 ? i : '0' + i;
				if(_this._options.afterToday) {
					calendarList += ('<li _date="' + newYears + '-' + newMonths + '-' + days + '"  class="disabled" >' + days + '</li>');
				} else {
					calendarList += ('<li _date="' + newYears + '-' + newMonths + '-' + days + '" >' + days + '</li>');
				}
			}
		}
		calendarList += '</ul>' +
			'</div></div>';
		//是否多选日历现实确定按钮
		if(_this._options.checkCalender) {
			//俩个日历
			if(_this._options.twoCalendar) {
				//、console.log(_this.twoNewYears, _this.twoNewMonths)
				var twoOldDate = new Date(_this.twoNewYears, _this.twoNewMonths);
				//console.log(twoOldDate)
				twoOldDate.setMonth(_this.twoNewMonths);
				twoOldDate.setDate(0);
				var newDayNum = twoOldDate.getDate(0); //获取天数

				twoOldDate.setDate(1);
				var emptyAll = twoOldDate.getDay(); //获取每月空白数量

				if(_this.twoNewMonths == 0) {
					_this.twoNewMonths = 12;
					_this.twoNewYears -= 1;
				}

				_this.twoNewMonths = parseInt(_this.twoNewMonths) > 9 ? _this.twoNewMonths : '0' + parseInt(_this.twoNewMonths);
				calendarList +=
					'</div>' +
					//左边时分秒
					'<div class="left-time undb">' +
					'<div class="left-time-title time-title">' +
					_this.newFullYear + '-' + _this.newMonth +
					'</div>' +
					'<div class="left-time-conter tiem-conter">' +
					'<div class="hour">' +
					'<ul>';
				for(var i = 0; i < 24; i++) {
					i = i < 10 ? '0' + i : i;
					calendarList += '<li>' + i + '</li>';
				}

				calendarList +=
					'</ul>' +
					'</div>' +
					'<div class="minute">' +
					'<ul>';
				for(var i = 0; i < 60; i++) {
					i = i < 10 ? '0' + i : i;
					calendarList += '<li>' + i + '</li>';
				}
				calendarList +=
					'</ul>' +
					'</div>' +
					'</div>' +
					'</div></div>' +

					//右边日历
					'<div class="calendar-r">' +
					'<div class="calendar-right">' +
					'<div class="calendar-btn"><p>';
				//		console.log((parseInt(_this.twoNewMonths) - parseInt(newMonths)) > 1 || parseInt(_this.twoNewYears) != parseInt(newYears))

				if(parseInt(_this.twoNewYears) != parseInt(newYears)) {
					if(parseInt(_this.twoNewYears) - parseInt(newYears) != 1 || parseInt(newMonths) != 12 || parseInt(_this.twoNewMonths) != 1) {
						calendarList +=
							'<a class="leftbtnYear" href="javascript:;">&lt;&lt;</a>' +
							'<a class="leftbtn ml5" href="javascript:;">&lt;</a>';
					}

				} else {
					if((parseInt(_this.twoNewMonths) - parseInt(newMonths)) > 1) {
						calendarList +=
							'<a class="leftbtnYear" href="javascript:;">&lt;&lt;</a>' +
							'<a class="leftbtn ml5" href="javascript:;">&lt;</a>';
					}
				}
				//      if (((parseInt(_this.twoNewMonths) - parseInt(newMonths)) > 1 && parseInt(_this.twoNewYears) == parseInt(newYears))  || (parseInt(_this.twoNewYears) - parseInt(newYears)  != 1 && parseInt(newMonths) != 12 && parseInt(_this.twoNewMonths) != 1 ) ) {
				//        calendarList +=
				//          '<a class="leftbtnYear" href="javascript:;">&lt;&lt;</a>' +
				//          '<a class="leftbtn ml5" href="javascript:;">&lt;</a>';
				//     	console.log(1122334)
				//      }

				calendarList += '</p><h3>' + _this.twoNewYears + '-' + _this.twoNewMonths + '</h3>';
				calendarList +=
					'<p>' +
					'<a class="rightbtn" href="javascript:;">&gt;</a>' +
					'<a class="rightbtnYear ml5" href="javascript:;">&gt;&gt;</a>' +
					'</p></div>';

				calendarList +=
					'<ol class="title">' +
					'<li>日</li>' +
					'<li>一</li>' +
					'<li>二</li>' +
					'<li>三</li>' +
					'<li>四</li>' +
					'<li>五</li>' +
					'<li>六</li>' +
					'</ol>';
				calendarList += '<div class="content"><div class="list">';
				calendarList += '<ul>';
				if(emptyAll > 0) {
					for(var j = 0; j < emptyAll; j++) {
						calendarList += ('<li></li>');
					}
				}
				//判断是否是这个月
				if((_this.myDate.getMonth() + 1) == _this.twoNewMonths && _this.myDate.getFullYear() == _this.twoNewYears) {
					for(var i = 1; i <= newDayNum; i++) {
						var days = i > 9 ? i : '0' + i;
						if(i < _this.newDate) { // 今日以前

							if(_this._options.beforeToday) {
								calendarList += ('<li _date="' + _this.twoNewYears + '-' + _this.twoNewMonths + '-' + days + '" class="disabled" >' + days + '</li>');
							} else {
								calendarList += ('<li _date="' + _this.twoNewYears + '-' + _this.twoNewMonths + '-' + days + '" >' + days + '</li>');
							}

						} else if(i == _this.newDate) { //今日

							calendarList += ('<li _date="' + _this.twoNewYears + '-' + _this.twoNewMonths + '-' + days + '"   >' + days + '</li>');
						} else { //今日以后

							if(_this._options.afterToday) {
								calendarList += ('<li _date="' + _this.twoNewYears + '-' + _this.twoNewMonths + '-' + days + '" class="disabled" >' + days + '</li>');
							} else {
								calendarList += ('<li _date="' + _this.twoNewYears + '-' + _this.twoNewMonths + '-' + days + '" >' + days + '</li>');
							}
						}
					}
				} else {
					for(var i = 1; i <= newDayNum; i++) {
						var days = i > 9 ? i : '0' + i;
						calendarList += ('<li _date="' + _this.twoNewYears + '-' + _this.twoNewMonths + '-' + days + '" >' + days + '</li>');
					}
				}
				calendarList += '</ul>' +
					'</div></div>';

				calendarList += '</div>' +

					//右边时分秒
					'<div class="right-time undb">' +
					'<div class="right-time-title time-title">' +
					_this.newFullYear + '-' + _this.newMonth +
					'</div>' +
					'<div class="right-time-conter tiem-conter">' +
					'<div class="hour">' +
					'<ul>';
				for(var i = 0; i < 24; i++) {
					i = i < 10 ? '0' + i : i;
					calendarList += '<li>' + i + '</li>';
				}

				calendarList +=
					'</ul>' +
					'</div>' +
					'<div class="minute">' +
					'<ul>';
				for(var i = 0; i < 60; i++) {
					i = i < 10 ? '0' + i : i;
					calendarList += '<li>' + i + '</li>';
				}
				calendarList +=
					'</ul>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'</div></div>';
			}

			calendarList += '<div class="bottom-btn">';
			if(_this._options.hourMinute) {
				calendarList += '<a  class="fl checkTimes-btn disabled" href="javascript:;">选择时间</a>';
			}
			calendarList += '<a  class="sure-btn disabled" href="javascript:;">确定</a>' +
				'</div>';
		}else{
			calendarList +='<div class="today-btn" _toDate = '+_this.myDate.getFullYear()+'-'+(_this.myDate.getMonth() + 1)+'-'+_this.newDate+'>今天</div>'
		}
		$(".calendar .calendar-btn h3").html(newYears + "," + newMonths);
		
		
		return calendarList;
	};

	//滚动加载更多
	InputCalendar.prototype.calendarConter = function() {
		var _this = this;

		if(_this._options.calenderScroll) {
			_this._element.find('content').on("resize scroll", function() {
				var windowHeight = _this._element.find('content').height(); //当前窗口的高度
				var scrollTop = _this._element.find('content').scrollTop(); 	//当前滚动条从上往下滚动的距离
				var docHeight = _this._element.find(".content .list").height() * _this._element.find(".content .list").length; //当前文档的高度
				//console.log(scrollTop, windowHeight, docHeight);
				//换句话说：（滚动条滚动的距离 + 窗口的高度 = 文档的高度）  这个是基本的公式
				if((scrollTop + windowHeight - 20) >= docHeight) {
					monthNum++;
					//月超12，年加1，月归0;
					for(var i = 0; i < monthNum; i++) {
						newMonth++
						if(newMonth > 11) {
							newMonth = 0;
							newFullYear += 1;
						}
						_this._element.find(".content").append(calendarCon(newFullYear, newMonth))
					}
				}
			});
		}
	}

	//点击事件
	InputCalendar.prototype.calendarClick = function() {
		var _this = this;

		//多选日期
		let startCalender = ''; //开始日期
		let endCalender = ''; //结束日期
		let clickNum = 0; //点击的次数
		//上一年/下一年/上一月/下一月

		_this._element.on('click', ' .calendar-btn a', function() {
			var that = $(this);
			//console.log(_this.newMonth + '---------_this.newMonth')
			if(that.parent('p').parent('.calendar-btn').parent().hasClass('calendar-left')) {
				if($(this).hasClass('rightbtn')) {
					_this.newMonth++;
				} else if($(this).hasClass('leftbtn')) {
					_this.newMonth--;
				} else if($(this).hasClass('rightbtnYear')) {
					_this.newFullYear++;
				} else if($(this).hasClass('leftbtnYear')) {
					_this.newFullYear--;
				}

				if(_this.newMonth > 11) {
					_this.newMonth = 0;
					_this.newFullYear += 1;
				} else if(_this.newMonth < 0) {
					_this.newMonth = 11;
					_this.newFullYear -= 1;
				};
			} else if(that.parent('p').parent('.calendar-btn').parent().hasClass('calendar-right')) {

				if(_this.twoNewMonths > 11) {
					//console.log('_this.twoNewMonths >11');
					_this.twoNewMonths = 0;
					_this.twoNewYears += 1;
				}

				if($(this).hasClass('rightbtn')) {
					_this.twoNewMonths++;
				} else if($(this).hasClass('leftbtn')) {
					_this.twoNewMonths--;
				} else if($(this).hasClass('rightbtnYear')) {
					_this.twoNewYears++;
				} else if($(this).hasClass('leftbtnYear')) {
					_this.twoNewYears--;
				}

				if(_this.twoNewMonths < 0) {
					//console.log('_this.twoNewMonths <= 0');
					_this.twoNewMonths = 11;
					_this.twoNewYears -= 1;
				};

			} else if(that.parent('p').parent('.calendar-btn').hasClass('radio-calendar-btn')) {
				if($(this).hasClass('rightbtn')) {
					_this.newMonth++;
				} else if($(this).hasClass('leftbtn')) {
					_this.newMonth--;
				} else if($(this).hasClass('rightbtnYear')) {
					_this.newFullYear++;
				} else if($(this).hasClass('leftbtnYear')) {
					_this.newFullYear--;
				}
				if(_this.newMonth > 11) {
					_this.newMonth = 0;
					_this.newFullYear += 1;
				} else if(_this.newMonth < 0) {
					_this.newMonth = 11;
					_this.newFullYear -= 1;
				};
			}

			_this._element.html('');
			_this._element.append(_this.calendarCon(_this.newFullYear, _this.newMonth));

			if(clickNum == 1) {
				_this._element.find('.calendar-content .content .list ul li').hover(function() {
					endCalender = $(this).attr('_date');
					//console.log(endCalender)
					checkCalenders();
				})
			} else {
				checkCalenders();
			}

			compareDate(); 
			availableDate();
		})

		// 根据起始日期和结束日期获取时间段数组
		function getAllDate(day1, day2) {

			var getDate = function(str) {
				var tempDate = new Date();
				var list = str.split("-");
				tempDate.setFullYear(list[0]);
				tempDate.setMonth(list[1] - 1);
				tempDate.setDate(list[2]);
				return tempDate;
			}
			var date1 = getDate(day1);
			var date2 = getDate(day2);
			var dateArr = [];
			var i = 0;
			if(day1 != day2) {
				if(date1 > date2) {
					var tempDate = date1;
					date1 = date2;
					date2 = tempDate;
				}
				date1.setDate(date1.getDate() + 1);

				while(!(date1.getFullYear() == date2.getFullYear() &&
						date1.getMonth() == date2.getMonth() &&
						date1.getDate() == date2.getDate())) {
					var dayStr = date1.getDate().toString();
					if(dayStr.length == 1) {
						dayStr = "0" + dayStr;
					}
					var monthStr = (date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : date1.getMonth() + 1;
					dateArr[i] = date1.getFullYear() + "-" + monthStr + "-" +
						dayStr;
					i++;
					date1.setDate(date1.getDate() + 1);
				}
				dateArr.splice(0, 0, day1);
				dateArr.push(day2);
			} else {
				dateArr.push(day1)
			}

			return dateArr;
		}

		//选中日期添加hover
		function checkCalenders() {
			if(startCalender && endCalender) {
				let getAllCalender = [];
				getAllCalender = getAllDate(startCalender, endCalender);

//				console.log(getAllCalender)
				_this._element.find('.content .list ul li').removeClass('hover endDate')
				getAllCalender.forEach((item) => {
					_this._element.find('.content .list ul li').each(function() {
						if(item == $(this).attr("_date")) {
							$(this).addClass('hover');
						} else if(startCalender == $(this).attr("_date")) {
							$(this).addClass('startDate');
						} else if(endCalender == $(this).attr("_date")) {
							$(this).addClass('endDate');
						}
					})
				})

				//console.log(getAllCalender)
				//console.log(startCalender,endCalender)
				
				return getAllCalender ;
			}
			
		}

		//比较开始日期和结束日期
		function compareDate() {

			let startTime = new Date(Date.parse(startCalender));
			let endTime = new Date(Date.parse(endCalender));

			let getHours = parseInt(_this.newGetHours) < 10 ? '0' + parseInt(_this.newGetHours) : parseInt(_this.newGetHours);
			let getMinutes = parseInt(_this.newGetMinutes) < 10 ? '0' + parseInt(_this.newGetMinutes) : parseInt(_this.newGetMinutes);
			//console.log(getHours, getMinutes)
			if(clickNum == 2) {
				if(startTime < endTime) {
					if(_this._options.hourMinute) {
						_this._element.find('.dateTimeInput input').val(startCalender + ' ' + getHours + ':' + getMinutes + ' ~ ' + endCalender + ' ' + getHours + ':' + getMinutes);
					} else {
						_this._element.find('.dateTimeInput input').val(startCalender + ' ~ ' + endCalender);
					}
					_this._element.find('.left-time .left-time-title').html(startCalender);
					_this._element.find('.right-time .right-time-title').html(endCalender);
				} else {
					if(_this._options.hourMinute) {
						_this._element.find('.dateTimeInput input').val(endCalender + ' ' + getHours + ':' + getMinutes + ' ~ ' + startCalender + ' ' + getHours + ':' + getMinutes);
					} else {
						_this._element.find('.dateTimeInput input').val(endCalender + ' ~ ' + startCalender);
					}

					_this._element.find('.left-time .left-time-title').html(endCalender);
					_this._element.find('.right-time .right-time-title').html(startCalender);
				}
				_this._element.find('.bottom-btn .sure-btn').removeClass('disabled')
			}
		}

		//选择日期

		_this._element.on('click', ' .content .list ul li', function() {
			var that = $(this);
			if(!$(this).hasClass('disabled') && $(this).html() != '') {
				if(_this._options.checkCalender) {

					clickNum++;
					//console.log(clickNum)
					//clickNum 点击次数，如果是一次，那么就开始时间 ，点击俩次是结束时间，点击三次归于一次
					if(clickNum == 1) {
						that.addClass('startDate');
						startCalender = that.attr('_date');
						$(this).parents('.calendar-content').find('li').hover(function() {
							endCalender = $(this).attr('_date');
							//console.log(endCalender)
							checkCalenders();
						})

						_this._element.find('.bottom-btn a').addClass('disabled')
						_this._element.find('.dateTimeInput input').val('')
					} else if(clickNum == 2) {
						endCalender = that.attr('_date');
						//console.log(endCalender)
						that.addClass('endDate');
						checkCalenders();

						compareDate();

						_this._element.find('.bottom-btn a').removeClass('disabled')
						$(this).parents('.calendar-content').find('li').off('mouseenter').unbind('mouseleave');
					} else if(clickNum == 3) {
						clickNum = 1;
						startCalender = that.attr('_date');

						$(this).parents('.calendar-content').find('li').each(function() {
							$(this).removeClass('startDate hover endDate');
						})
						that.addClass('startDate');

						$(this).parents('.calendar-content').find('li').hover(function() {
							endCalender = $(this).attr('_date');
							checkCalenders();
						})

						_this._element.find('.bottom-btn a').addClass('disabled')
						_this._element.find('.dateTimeInput input').val('')
						console.log(12345)
					}

				} else {
					if(!$(this).hasClass('closure') || !$(this).hasClass('disabled')){
						_this._element.hide();
						$(this).css('border-radius', '3px');
						$(this).addClass('active').siblings().removeClass('active');
						_this._element.siblings('input').val($(this).attr('_date'));
						checkDates.singleCalendar = $(this).attr('_date');
					} 
				}
			} 
		});

		//点击确定按钮
		let checkTimesType = true;
		_this._element.on('click', '.bottom-btn a', function() {

			var calendarContent = $(this).parent('.bottom-btn').siblings('.calendar-content');
			if(!$(this).hasClass('disabled')) {
				//点击确定按钮
				if($(this).hasClass('sure-btn')) {
					_this._element.siblings('input').val(_this._element.find('.dateTimeInput input').val());
					_this._element.hide();
				} else
					//点击选择时分按钮
					if($(this).hasClass('checkTimes-btn')) {
						if(checkTimesType) {
							calendarContent.find('.calendar-l .left-time,.calendar-r .right-time').show();
							calendarContent.find('.calendar-l .calendar-left,.calendar-r .calendar-right').hide();
							checkTimesType = false;
						} else {
							calendarContent.find('.calendar-l .left-time,.calendar-r .right-time').hide();
							calendarContent.find('.calendar-l .calendar-left,.calendar-r .calendar-right').show();
							checkTimesType = true;
						}
					}
					checkDates.arr = checkCalenders();
					checkDates.checktiem = _this._element.find('.dateTimeInput input').val();
			} 
			
		});

		//点击选择时分
		_this._element.on('click', '.calendar-content .tiem-conter ul li', function() {
			let timeInput = _this._element.find('.dateTimeInput input').val().split(''); //把开始时间和结束时间的字符串转变成数组
			let thatHtml = $(this).html().split(''); //把点击选中的时间转变成数组
			$(this).addClass('active').siblings().removeClass('active');
			if($(this).parents('.tiem-conter').hasClass("left-time-conter")) {
				if($(this).parents('div').hasClass('hour')) {
					//console.log('左边的小时');
					timeInput.splice(11, 2, thatHtml[0], thatHtml[1]);

				} else if($(this).parents('div').hasClass('minute')) {
					//console.log('左边的分钟');
					timeInput.splice(14, 2, thatHtml[0], thatHtml[1]);
				}
			} else if($(this).parents('.tiem-conter').hasClass("right-time-conter")) {
				if($(this).parents('div').hasClass('hour')) {
					//console.log('右边的小时');
					timeInput.splice(30, 2, thatHtml[0], thatHtml[1]);
				} else if($(this).parents('div').hasClass('minute')) {
					//console.log('右边的分钟');
					timeInput.splice(33, 2, thatHtml[0], thatHtml[1]);
				}
			}

			_this._element.find('.dateTimeInput input').val(timeInput.join(''))
		})

		//console.log(_this._options)
		//单选日历有数据时展示数据 
		function availableDate(){ 
			if(_this._options.jsonData != '' && !_this._options.checkCalender) {
				_this._options.jsonData.map((item, index) => {
//					console.log(item)
					if(new Date(item.date) > new Date()){
						_this._element.find('.content .list  ul li').each(function() {
							if($(this).attr('_date') == item.date) {
								if(item.show == '闭馆') {
									$(this).addClass('closure').append('<i>' + item.show + '</i>');
								} else if(!item.open) {
									$(this).addClass('disabled').append('<i>' + item.show + '</i>');
								} else {
									$(this).append('<i>' + item.show + '</i>');
								}
							}
		
						})
					}
					
	
				})
				_this._element.find('.content .list ul li').css({
					'height':36,
					'border-radius':'50%',
					'margin': 5,
					'width': 'calc((100%/7) - 10px)'
				});
				_this._element.find('.content .list ul li').each(function(){
					if($(this).attr('_date') ==checkDates.singleCalendar){
						$(this).addClass('active');
					}
				});
			}
			
		}
		 availableDate(); 
		_this._element.on('click','.today-btn',function(){ 
			_this._element.hide();   
			_this._element.siblings('input').val($(this).attr('_todate')); 
			checkDates.singleCalendar= $(this).attr('_todate');
		})
		

	}

	// InputCalendar.prototype.jQueryInterface(config) {
	//     return this.each(function () {
	//       let data = Data.getData(this, DATA_KEY)
	//
	//       if (!data) {
	//         data = new calendar(this)
	//       }
	//
	//       // if (config === 'close') {
	//       //   data[config](this)
	//       // }
	//     })
	//   }

	// if ($) {
	//   const JQUERY_NO_CONFLICT = $.fn[NAME]
	//   $.fn[NAME] = calendar.jQueryInterface
	//   $.fn[NAME].Constructor = calendar
	//   $.fn[NAME].noConflict = () => {
	//     $.fn[NAME] = JQUERY_NO_CONFLICT
	//     return calendar.jQueryInterface
	//   }
	// }

	window.InputCalendar = InputCalendar;

	return InputCalendar;

})(window, document);
 