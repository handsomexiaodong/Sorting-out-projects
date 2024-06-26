//http://www.ilinkone.com/
//2019-01-21
//by liuweihua
(function(){
    function AlertPopFun() {
        this._canClose=true;
        this._idList=[];
        this._init=function(){
            console.log("lkAlertTips-初始化成功!");
        }
        this._isPc=function(){
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
        this._testWindow=function(){
            // console.log(window.screen.width);
            // console.log(document.documentElement.clientWidth)
            var lkDevice=this._isPc();
            var lkDeviceWidth=window.screen.width;
            var lkBodyWidth=document.documentElement.clientWidth;
            //console.log(lkDeviceWidth,lkBodyWidth);
            //判断是否是pc还是移动
            if(lkDevice){
                //判断浏览器的宽度是否大于768;
                if(lkBodyWidth>769){
                    //document.body.classList.add("lk-pc-page");
                    $("body").addClass("lk-pc-page");
                }else{
                    //document.body.classList.add("lk-wap-page");
                    $("body").addClass("lk-wap-page");
                }
            }else {
                //判断是响应式移动还是缩放移动端;
                if(lkDeviceWidth==lkBodyWidth){
                    //document.body.classList.add("lk-mob-pc");
                    $("body").addClass("lk-wap-page");
                }else{
                    //document.body.classList.add("lk-mob-wap");
                    $("body").addClass("lk-mob-page");
                }
            }
        }
        this._extend=function(target,original){
            for(var def in target){
                if(typeof original[def] === 'undefined'){
                    original[def]=target[def]
                }
                return original;
            }
        }
        this._testType=function(target){
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
        this._appendPop=function(){
            var _this=this;
            // var div=document.createElement("div");
            // div.classList.add("lk-popBg");
            // var div2=document.createElement("div");
            // div2.classList.add("lk-divbox");
            // div.appendChild(div2);
            // document.body.appendChild(div);
            var idbox="lk-box"+new Date().getTime();
            _this._idList.push(idbox);
            var html='\
            <div class="lk-popBg" id='+idbox+'>\
                <div class="lk-divbox"></div>\
                    <div class="lk-mildbox"></div> \
                \
            </div>\
            ';
            $("body").append(html);
            $(".lk-divbox").click(function(){
                //console.log(_this);
                _this._closePop($(this).parent().attr("id"));
            })
        },
        this._closePop=function(target){
            // document.body.classList.remove("lk-pc-page");
            // document.body.classList.remove("lk-wap-page");
            // document.body.classList.remove("lk-mob-pc");
            // document.body.classList.remove("lk-mob-wap");
            // var lkpop=document.querySelector(".lk-popBg");
            // document.body.removeChild(lkpop);
            var idarry=this._idList;
            var leng=idarry.length;
            var idname=$("#"+target).attr("id");
            $("body").removeClass("lk-pc-page");
            $("body").removeClass("lk-wap-page");
            $("body").removeClass("lk-mob-pc");
            $("body").removeClass("lk-mob-wap");
            if(target){
                //console.log(target);
                $("#"+target).remove();
                for(var i=0;i<leng;i++){
                    if(idarry[i] == idname){
                        idarry.splice(i,1);
                        return false;
                    }
                }
            }else{
                idarry=[];
                $(".lk-popBg").remove();
            }

        }
        this._lkadd=function(){
            this._testWindow();
            this._appendPop();
        }
        this._init();
    }
    AlertPopFun.prototype.alertBox=function(lkJson,fun,title){
        this._lkadd();
        var box=this._idList[this._idList.length-1];
        var target=$("#"+box).find(".lk-mildbox");
        var _this=this;
        this._canClose=true;
        if(this._testType(lkJson)=="object"){
            var lkJson=lkJson||{};
            var def={
                init:function(){

                },
                title:"提示",
                test:"提示文字",
                btnTxt:"确定",
                calssName:"",
                IsClick:function(){

                },
            }
            var ops=$.extend(def,lkJson);
            var html='\
            <div class="lk-alertBox">\
                   <h2>'+ops.title+'</h2>\
                   <p>'+ops.test+'</p>\
                   <div class="lk-alertButton"><span class='+ops.calssName+'>'+ops.btnTxt+'</span></div> \
            </div>\
           ';
            $(target).append(html);
            ops.init();
        }else{
            var lkJson=lkJson || "",
                fun=fun || function (){},
                title = title || "";
            var html='\
            <div class="lk-alertBox">\
                   <h2>'+title+'</h2>\
                   <p>'+lkJson+'</p>\
                   <div class="lk-alertButton"><span class="btn">确定</span></div> \
            </div>\
           ';
            $(target).append(html);
        }
        setTimeout(function(){
            $("#"+box).addClass("lk-popBgd");
            var tar=$("#"+box).find(".lk-alertButton span");
            tar.on("click",function(e){
                e.stopPropagation();
                if(_this._testType(lkJson)=="object"){
                    ops.IsClick();
                }else{
                    fun();
                }
                if(_this._canClose){
                    _this._closePop(box);
                }
            })
        },100)
    }
    AlertPopFun.prototype.confirmBox=function(test,item1,item2,title){
        this._lkadd();
        var box=this._idList[this._idList.length-1];
        var target=$("#"+box).find(".lk-mildbox");
        var _this=this;
        this._canClose=true;
        var type=this._testType(test);
        if(type=="object"){
            var def={
                init:function(){

                },
                title:"标题",
                test:"自定义内容",
                btn1Name:"",
                btn2Name:"",
                btn1Txt:"确定",
                btn2Txt:"取消",
                IsOk:function(){

                },
                IsCancel:function(){

                }
            }
            var ops=$.extend(def,test);
            var html='\
                <div class="lk-confirmBox">\
                    <h2>'+ops.title+'</h2>\
                    <p>'+ops.test+'</p>\
                     <div class="lk-confirmButton">\
                           <span class="lk-btnOk">'+ops.btn1Txt+'</span>\
                           <span class="lk-btnCancel">'+ops.btn2Txt+'</span>\
                     </div>\
                </div>\
            ';
            ops.btn1Name && target.find(".lk-btnOk").addClass(ops.btn1Name);
            ops.btn2Name && target.find(".lk-btnCancel").addClass(ops.btn2Name);
            target.append(html);
            ops.init();
            var fun1=ops.IsOk || function(){}
            var fun2=ops.IsCancel || function(){}
        }else{
           var test=test || "",
               title=title || "";
            var html='\
                <div class="lk-confirmBox">\
                    <h2>'+title+'</h2>\
                    <p>'+test+'</p>\
                     <div class="lk-confirmButton">\
                           <span class="lk-btnOk">确定</span>\
                           <span class="lk-btnCancel">取消</span>\
                     </div>\
                </div>\
            ';
            target.append(html);
            var fun1=item1 || function(){}
            var fun2=item2 || function(){}
        }
        setTimeout(function(){
            $("#"+box).addClass("lk-popBgd");
            $("#"+box).find(".lk-confirmButton span").click(function(){
                if($(this).hasClass("lk-btnOk")){
                    fun1();
                }else{
                    fun2();
                }
                if(_this._canClose){
                    _this._closePop(box);
                }
            })
        },100);
        //console.log(this._testType(test));
    }
    AlertPopFun.prototype.promptBox=function(test,fun1,fun2,title){
        this._lkadd();
        var box=this._idList[this._idList.length-1];
        var target=$("#"+box).find(".lk-mildbox");
        var _this=this;
        this._canClose=true;
        var type=this._testType(test);
        if(type=="object"){
            var def={
                init:function(){

                },
                title:"标题",
                test:"自定义内容",
                btn1Name:"",
                btn2Name:"",
                btn1Txt:"确定",
                btn2Txt:"取消",
                inputList:[],
                IsOk:function(){

                },
                IsCancel:function(){

                },
                _def:{
                    deftxt:"",
                    test:"",
                    idName:"",
                    style:"",
                    type:"",
                    imgSrc:"",
                    options:"",
                    selectedVal:"",
                },
                _styleList:["input","textarea","select","imgCode","telCode","radio","checkbox"],
                _valList:{},

            }
            var ops=$.extend(def,test);
            var html='\
                <div class="lk-promptBox">\
                    <h2>'+ops.title+'</h2>\
                    <p>'+ops.test+'</p>\
                    <div class="lk-scrollBox">\
                        <ul class="lk-list-input"></ul>\
                    </div>\
                    <div class="lk-prompButton">\
                        <span class="lk-btnOk">确定</span>\
                        <span class="lk-btnCancel">取消</span>\
                    </div>\
                </div>\
            ';
            $(target).find(".lk-btnOk").addClass(ops.btn1Name);
            $(target).find(".lk-btnCancel").addClass(ops.btn2Name);
            $(target).append(html);
            var table=$(target).find(".lk-list-input");
            var putList=ops.inputList;
            var putLeng=putList.length;
            var publicArry=ops._styleList;
            if(putLeng){
                for(var i=0;i<putLeng;i++){
                    var test=putList[i].style;
                    //console.log(test,$.inArray(test,publicArry));
                    if($.inArray(test,publicArry)<0){
                        test="input";
                        putList[i].style="input";
                    }
                    //console.log(putList[i])
                    appendEle(test,putList[i],i);
                }
                $(".lk-list-input *").each(function(){
                    if($(this).attr("id") && $(this).attr("id")=="undefined"){
                        $(this).attr("id","");
                    }
                });
            }
            function pushKeyVal(id,name,val){
                if(id){
                    ops._valList[id]=val;
                }else{
                    ops._valList[name]=val;
                }
                ops._valList.length=name+1;
            }
            function appendEle(n,list,num){
                list.title=list.title|| "";
                var className="lk-element-"+num;
                if(list.test){
                    pushKeyVal(list.idName,num,list.test);
                }else{
                    pushKeyVal(list.idName,num,"");
                }
                switch (n) {
                    case "input":
                        table.append('\
                            <li data-num='+num+'>\
                                <h3>'+list.title+'</h3>\
                                <div class="lk-input-box">\
                                    <input class='+className+' id='+list.idName+' type='+list.type+' placeholder='+list.deftxt+' value='+list.test+'>\
                                </div> \
                            </li>\
                        ');
                        table.find("."+className).on("input",function(){
                            pushKeyVal(list.idName,num,$(this).val());
                        });

                        break;
                    case "textarea":
                        table.append('\
                            <li  data-num='+num+'>\
                                <h3>'+list.title+'</h3>\
                                <div class="lk-input-box">\
                                    <textarea class='+className+' id='+list.idName+' placeholder='+list.deftxt+' >'+list.test+'</textarea>\
                                </div> \
                            </li>\
                        ');

                        table.find("."+className).on("input",function(){
                            pushKeyVal(list.idName,num,$(this).val());

                        });
                        break;
                    case "select":
                        var selectNum=0;
                        var optionList=list.options || [];
                        var optLeng=optionList.length;
                        var defSelect=list.selectedVal || "";
                        table.append('\
                            <li data-num='+num+'>\
                                <h3>'+list.title+'</h3>\
                                <div class="lk-input-box lk-select-down">\
                                    <h5>'+list.deftxt+'</h5>\
                                    <select class='+className+' id='+list.idName+'></select>\
                                </div> \
                            </li>\
                        ');
                         if(optLeng){
                            for(var i=0;i<optLeng;i++){
                                table.find("li:last").find("select").append('\
                                        <option value='+optionList[i].key+' >'+optionList[i].text+'</option>\
                                    ');
                                if(optionList[i].text==defSelect){
                                    selectNum=i;
                                    table.find("li:last").find("h5").html(optionList[i].text);
                                    table.find("."+className).find("option:last").prop("selected",true);
                                    pushKeyVal(list.idName,num,defSelect);
                                }else{
                                    table.find("."+className).find("option:last").prop("selected",false);
                                }
                            }
                            if(selectNum==0){
                                table.find("."+className).find("option:first").prop("selected",true);
                                pushKeyVal(list.idName,num,$(table).find("."+className).find("option:first").text());
                            }
                             table.find("."+className).on("change",function(){
                                 $(this).prev().html($(this).find("option:selected").text());
                                 pushKeyVal(list.idName,num,$(this).find("option:selected").text());
                             });
                         }else{
                             console.log("请配置下拉菜单的选项");
                            return false;
                         }

                        break;
                    case "imgCode":
                        table.append('\
                            <li class='+className+' id='+list.idName+' data-num='+num+'>\
                                <h3>'+list.title+'</h3>\
                                <div class="lk-input-box lk-input-code">\
                                    <input type="text" placeholder='+list.deftxt+' />\
                                </div> \
                                <div class="lk-imgCode">\
                                <img src='+list.imgSrc+' /> \
                                </div> \
                                <div class="lk-clearBox"></div> \
                            </li>\
                        ');
                        table.find("."+className).find(".lk-imgCode").click(function(){
                            var that=$(this).find("img");
                            list.imgClick(that);
                        });
                        table.find("."+className).find("input").on("input",function(){
                            pushKeyVal(list.idName,num,$(this).val());
                        });
                        break;
                    case "telCode":
                        var detTimer=parseInt(list.defTime) || 60;
                        var setTxt=list.setText || "发送验证码";
                        table.append('\
                            <li class='+className+' id='+list.idName+' data-num='+num+'>\
                                <div class="lk-telCode-box">\
                                <h3>'+list.title+'</h3>\
                                <div class="lk-input-box lk-input-code">\
                                    <input type="text" placeholder='+list.deftxt+' />\
                                </div> \
                                <div class="lk-get-code">\
                                    <p>'+setTxt+'</p>\
                                </div> \
                                <div class="lk-clearBox"></div> \
                                </div>\
                            </li>\
                        ');
                        table.find("."+className).find(".lk-get-code").click(function(){
                           if(!$(this).hasClass("lk-default-btn")){
                                $(this).addClass("lk-default-btn");
                               var stimer="time"+new Date().getTime();
                               startTimeout($(this).find("p"),detTimer,stimer);
                               list.sendCode();
                           }
                        });
                        table.find("."+className).find("input").on("input",function(){
                            pushKeyVal(list.idName,num,$(this).val());
                        });
                        function startTimeout(dom,num,timer){
                            var time=num,
                                timer=timer;
                            countDowan();
                            list._clearTimer=function(){
                                clearTimeout(timer);
                                dom.html(setTxt);
                                dom.parents().removeClass("lk-default-btn");
                            }
                            function countDowan(){
                                if(time>1){
                                    time--;
                                    dom.html("请"+time+"s后重试");
                                    timer=setTimeout(function(){
                                        countDowan();
                                    },1000);
                                }else{
                                    dom.html(setTxt);
                                    dom.parents().removeClass("lk-default-btn");
                                }
                            }
                        }
                        break;
                    case "radio":
                        var radioList=list.radioList,
                            radioLeng=radioList.length,
                            rName="name-"+num+"-"+parseInt(Math.random()*899+100);
                        table.append('\
                            <li class='+className+' id='+list.idName+' data-num='+num+'>\
                                <h3>'+list.title+'</h3>\
                                <div class="lk-choice-box">\
                                    <dl class="lk-choice-dl">\
                                    </dl>\
                                    <div class="lk-clearBox"></div> \
                                </div> \
                                <div class="lk-clearBox"></div> \
                            </li>\
                        ');
                        var choiceBox=table.find(".lk-choice-dl");
                        for(var i=0;i<radioLeng;i++){
                            choiceBox.append('\
                                <dd>\
                                    <input type="radio" name='+rName+'>\
                                    <label>'+radioList[i].lable+'</label>\
                                </dd>\
                            ');
                            if(_this._testType(radioList[i].checked).indexOf("boolean")>-1 && radioList[i].checked){
                                choiceBox.find("dd:last").find("input").prop("checked",true);
                                pushKeyVal(list.idName,num,radioList[i].lable);
                            }
                            //console.log(_this._testType(radioList[i].checked).indexOf("boolean"));
                        }
                        choiceBox.find("dd").click(function(){
                            $(this).find("input").prop("checked",true);
                            var html=$(this).find("label").text();
                            pushKeyVal(list.idName,num,html);
                        });
                        break;

                    case "checkbox":
                        var checkBoxList=list.checkBoxList,
                            checkBoxLeng=checkBoxList.length,
                            rName="name-"+num+"-"+parseInt(Math.random()*899+100);
                        var checkArry=[];
                        table.append('\
                            <li class='+className+' id='+list.idName+' data-num='+num+'>\
                                <h3>'+list.title+'</h3>\
                                <div class="lk-choice-box">\
                                    <dl class="lk-choice-dl">\
                                    </dl>\
                                    <div class="lk-clearBox"></div> \
                                </div> \
                                <div class="lk-clearBox"></div> \
                            </li>\
                        ');
                        var choiceBox=table.find(".lk-choice-dl");
                        for(var i=0;i<checkBoxLeng;i++){
                            choiceBox.append('\
                                <dd>\
                                    <input type="checkbox" name='+rName+'>\
                                    <label>'+checkBoxList[i].lable+'</label>\
                                </dd>\
                            ');
                            if(_this._testType(checkBoxList[i].checked).indexOf("boolean")>-1 && checkBoxList[i].checked){
                                choiceBox.find("dd:last").find("input").prop("checked",true);
                                checkArry.push(checkBoxList[i].lable)
                                pushKeyVal(list.idName,num,checkArry);
                            }
                            //console.log(_this._testType(radioList[i].checked).indexOf("boolean"));
                        }
                        choiceBox.find("dd").on("click",function(e){
                            checkArry=[];
                            if($(this).find("input").prop("checked")){
                                $(this).find("input").prop("checked","");
                            }else{
                                $(this).find("input").prop("checked",true);
                            }
                            $(this).parent().find("dd").each(function(){
                                if($(this).find("input").prop("checked")){
                                    checkArry.push($(this).find("label").text());
                                }
                            });
                            pushKeyVal(list.idName,num,checkArry);
                        });

                        break;
                    default:
                        break;
                }
            }
            ops.init();
            var tval=ops._valList;
            var fun1=ops.IsOk || function(){}
            var fun2=ops.IsCancel || function(){}
        }else{
            var test=test || "";
            var title=title || "";
            var html='\
            <div class="lk-promptBox">\
                <h2>'+title+'</h2>\
                <p>'+test+'</p>\
                <ul class="lk-list-input">\
                    <li>\
                        <div class="lk-input-box">\
                            <input placeholder="请输入..." type="text" class="lk-promput" />\
                        </div>\
                    </li>\
                </ul> \
                <div class="lk-prompButton">\
                    <span class="lk-btnOk">确定</span>\
                    <span class="lk-btnCancel">取消</span>\
                </div> \
            </div>\
            ';
            $(target).append(html);
            var tval="";
            $("#"+box).find(".lk-promput").on("input",function(){
                tval=$(this).val();
            });
            var fun1=fun1 || function(){}
            var fun2=fun2 || function(){}
        }
        setTimeout(function(){
            $("#"+box).addClass("lk-popBgd");
            $("#"+box).find(".lk-prompButton span").click(function(){
                if($(this).hasClass("lk-btnOk")){
                    fun1(tval);
                }else{
                    fun2(tval);
                }
                if(_this._canClose){
                    _this._closePop(box);
                }
            });
        },100);
        //conso
    }
    AlertPopFun.prototype.defaultDuration=1000;
    AlertPopFun.prototype.tipsBox=function(){
        var parameter=arguments;
        var timer=this.__proto__.defaultDuration;
        var _this=this;
        var callBack=function(){}
        //console.log();
        if(parameter && this._testType(parameter[0])=="string"){
            this._lkadd();
            var box=this._idList[this._idList.length-1];
            var target=$("#"+box).find(".lk-mildbox");
            target.addClass("mob_backNone")
            var html='\
            <div class="lk-tips-box">\
                <div class="iconfont lk-icon-font"></div>\
                <div class="lk-tips-txt">\
                    '+parameter[0]+'\
                </div> \
            </div>\
            ';
            target.append(html);
            var iconFont=target.find(".lk-icon-font");
            var num = parameter.length<5 ? parameter.length : 4;
            render(num);
            $("#"+box).find(".lk-divbox").remove();
            setTimeout(function(){
                $("#"+box).addClass("lk-popBgd");
                colstBox();
            },100);

        }else{
            console.log("请正确配置tipsBox的参数");
        }
        function render(n){
            switch (n) {
                case 1:
                    if(_this._testType(parameter[0])=="string"){
                        genre();
                    }else {
                        console.log("注意tipsBox的第一个参数为String");
                    }
                    break;
                case 2:
                    var Tstyle=_this._testType(parameter[1]);
                   // console.log(Tstyle);
                    if(Tstyle=="string") {
                        genre(parameter[1]);
                    }else if(Tstyle=="function"){
                        callBack=parameter[1];
                        genre();
                    }else if(Tstyle=="number"){
                        timer=parameter[1];
                        genre();
                    }else{
                        timer=10;
                        console.log("请正确配置tipsBox第二个的参数");
                    }
                    break;
                case 3:
                    var Tstyle0=_this._testType(parameter[1]);
                    var Tstyle1=_this._testType(parameter[2]);
                    if(Tstyle0=="string" && Tstyle1=="function"){
                        genre(parameter[1]);
                        callBack=parameter[2];
                    }else if(Tstyle0=="string" && Tstyle1=="number"){
                        genre(parameter[1]);
                        timer=parameter[2];
                    }else if(Tstyle0=="function" && Tstyle1=="string" ){
                        genre(parameter[2]);
                        callBack=parameter[1];
                    }else if(Tstyle0=="function" && Tstyle1=="number"){
                        genre();
                        timer=parameter[2];
                        callBack=parameter[1];
                    }else if(Tstyle0=="number" && Tstyle1=="string" ){
                        timer=parameter[1];
                        genre(parameter[2]);
                    }else if(Tstyle0=="number" && Tstyle1=="function"){
                        genre();
                        timer=parameter[1];
                        callBack=parameter[2];
                    }else{
                        timer=10;
                        console.log("请正确配置tipsBox的参数");
                    }
                    break;
                case 4:
                    var Tstyle0=_this._testType(parameter[1]);
                    var Tstyle1=_this._testType(parameter[2]);
                    var Tstyle2=_this._testType(parameter[3]);
                    if(Tstyle0=="string" && Tstyle1=="function" && Tstyle2=="number"){
                        genre(parameter[1]);
                        callBack=parameter[2];
                        timer=parameter[3];
                    }else{
                        timer=10;
                        console.log("请正确配置tipsBox的参数");
                    }
                    break;
                default:
                    break;
            }
        }
        function genre(type){
            if(type=='fail'){
                iconFont.addClass("icon-shibaizaicitijiao")
            }else if(type=='cancel'){
                iconFont.addClass("icon-quxiao");
            }else if(type=='warning'){
                iconFont.addClass("icon-warning");
            }else if(type=='loading'){
                iconFont.addClass("icon-loading");
            }else{
                iconFont.addClass("icon-success");
            }
        }

        function colstBox(){
            setTimeout(function(){
                if($("#"+box)){
                    callBack();
                    _this._closePop(box);
                }else{
                   // console.log(2222);
                }
            },timer);
        }
    }
    AlertPopFun.prototype.textBox=function(){
        var parameter=arguments;
        var timer=this.__proto__.defaultDuration;
        var _this=this;
        var callBack=function(){}
        //console.log();
        if(parameter && this._testType(parameter[0])=="string"){
            this._lkadd();
            var box=this._idList[this._idList.length-1];
            var target=$("#"+box).find(".lk-mildbox");
            target.addClass("mob_backNone")
            var html='\
            <div class="lk-tips-box">\
                <div class="lk-tips-txt">\
                    '+parameter[0]+'\
                </div> \
            </div>\
            ';
            target.append(html);
            var iconFont=target.find(".lk-icon-font");
            var num = parameter.length<4 ? parameter.length : 3;
            render(num);
            $("#"+box).find(".lk-divbox").remove();
            setTimeout(function(){
                $("#"+box).addClass("lk-popBgd");
                colstBox();
            },100);

        }else{
            console.log("请正确配置textBox的参数");
        }
        function render(n){
            switch (n) {
                case 1:
                    if(_this._testType(parameter[0])=="string"){

                    }else {
                        console.log("注意textBox的第一个参数为String");
                    }
                    break;
                case 2:
                    var Tstyle=_this._testType(parameter[1]);
                    // console.log(Tstyle);
                    if(Tstyle=="function"){
                        callBack=parameter[1];
                    }else if(Tstyle=="number"){
                        timer=parameter[1];
                    }else{
                        timer=10;
                        console.log("请正确配置textBox第二个的参数");
                    }
                    break;
                case 3:
                    var Tstyle0=_this._testType(parameter[1]);
                    var Tstyle1=_this._testType(parameter[2]);
                    if(Tstyle0=="function" && Tstyle1=="number"){
                        timer=parameter[2];
                        callBack=parameter[1];
                    }else if(Tstyle0=="number" && Tstyle1=="function"){
                        timer=parameter[1];
                        callBack=parameter[2];
                    }else{
                        timer=10;
                        console.log("请正确配置textBox的参数");
                    }
                    break;
                default:
                    break;
            }
        }
        function colstBox(){
            setTimeout(function(){
                if($("#"+box)){
                    callBack();
                    _this._closePop(box);
                }else{
                    // console.log(2222);
                }
            },timer);
        }
    }
    AlertPopFun.prototype.downTipsList=function(object){
        this._lkadd();
        var box=this._idList[this._idList.length-1];
        var target=$("#"+box);
        var _this=this;
        this._canClose=true;
        var type=this._testType(object);
        if(type=="object"){
            var def={
                init:function(){

                },
                title:"",
                btnTxt:"确定",
                showBtn:true,
                btnClass:"",
                btnClick:function(){

                },
                type:"",//audio,checkbox,空
                list:[
                    {
                        txt:"",
                        calssName:"",
                        isTrue:"",
                        onClick:function(){

                        }
                    }
                ]
            }
            var ops=$.extend(def,object);
            var html='\
                <div class="lk-downList">\
                    <h2>'+ops.title+'</h2>\
                    <div class="clostbox"></div>\
                    <div class="lk-down-list">\
                        <ul></ul>\
                    </div> \
                </div>\
            ';

            target.append(html);
            if(ops.type=="audio"){
                target.find(".lk-down-list").addClass("lk-downList-audio");
            }else if(ops.type=="checkbox"){
                target.find(".lk-down-list").addClass("lk-downList-checkbox");
            }
            if(ops.list.length){
                for(var i=0; i<ops.list.length; i++){
                    target.find("ul").append("<li>"+ops.list[i].txt+"</li>");
                    if(ops.list[i].calssName){
                        target.find("li:last").addClass(ops.list[i].calssName);
                    }
                    if(ops.list[i].isTrue){
                        target.find("li:last").addClass("lk-down-chost");
                    }
                }
            }
            if(ops.showBtn){
                target.find(".lk-down-list").append('\
                <div class="down-btn">'+ops.btnTxt+'</div>\
                ');
                if(ops.btnClass){
                    target.find(".down-btn").addClass(ops.btnClass);

                }
            }
            setTimeout(function(){
                $("#"+box).addClass("lk-popBgd");
                target.find(".down-btn").click(function(){
                    ops.btnClick();
                    if(_this._canClose){
                        _this._closePop(box);
                    }
                });
                target.find("li").click(function(){
                    var index=$(this).index();
                    if(ops.type=="checkbox"){
                        if($(this).hasClass("lk-down-chost")){
                            $(this).removeClass("lk-down-chost");
                        }else{
                            $(this).addClass("lk-down-chost");
                        }
                    }else{
                        $(this).addClass("lk-down-chost").siblings().removeClass("lk-down-chost");
                    }
                    if(ops.list[index].onClick){
                        ops.list[index].onClick();
                    }
                });
                target.find(".clostbox").click(function(){
                    if(_this._canClose){
                        _this._closePop(box);
                    }
                })
            },100)
        }else{
            console.log("downTipsList参数类型错误");
        }

    }
    return lkAlertTips=new AlertPopFun();
}());

