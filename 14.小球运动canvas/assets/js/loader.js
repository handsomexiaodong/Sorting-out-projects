//http://www.ilinkone.com/
//2019-02-12
//by liuweihua

var Loader=(function(){
    var typeList=".jpg-.gif-.png-.bmp-.svg-.JPEG.mp4.MP4.AVI.mov.rmvb.rm.3GP.mp3.MP3.WMA.wma";
    var imgType=".jpg-.gif-.png-.bmp-.svg-.JPEG";
    var audioType=".mp3.MP3.WMA.wma";
    var videoType=".mp4.MP4.AVI.mov.rmvb.rm.3GP"
    return function(loaderList){
        this.List="";
        this.container=[];
        this.sum=0;
        this.num=0;
        this.webType=getBrowserInfo();
        this.init=function(){
            var loaderLeng=loaderList.length;
            for(var i=0;i<loaderLeng;i++){
                var arrget=loaderList[i].split(".");
               if(typeList.indexOf(arrget[arrget.length-1])>-1){
                   if(this.List.indexOf(loaderList[i])<0){
                       this.List+=loaderList[i];
                       var obj={
                           id:i,
                           src:loaderList[i],
                           state:false,
                           type:arrget[arrget.length-1]
                       }
                       this.sum++;
                       this.container.push(obj);
                   }else{
//                      console.log("第"+i+"个重复");
                   }
               }else{
//                 console.log("第"+i+"个格式类型不对");
               }
            }

            this.loadOn();
        }
        this.loadOn=function(){

            var container=this.container;
            var leng= container.length;
            for(var i=0;i<leng;i++){
                if(imgType.indexOf(container[i].type)>-1){
                    this._switch(container[i].src,i,"img");
                }else if(audioType.indexOf(container[i].type)>-1){
                    this._switch(container[i].src,i,"audio");
                }else if(videoType.indexOf(container[i].type)>-1){
                    this._switch(container[i].src,i,"video");
                }
            }
            //console.log(this.container);
        }
        this.progress=function(n){
            //console.log(n);
        }
        this.complete=function(){
            //console.log("完成");
        }
        this.callback=function(){
            var percent=parseInt(this.num/this.sum*100);
            this.progress(percent);
            if(percent==100){
                this.complete();
            }
        }
        this._switch=function(src,n,type){
            var _this=this;
            switch (type) {
                case "img":
                    //var image=new Image();
                    var image=document.createElement("img");
                    image.src=src;
                    image.onload=function(){
                        _this.num++;
                        _this.container[n].state=true;
                        _this.callback();
                    }
                    break;
                case "audio":
                   // var audio=new Audio();
                    var audio=document.createElement("audio");
                    audio.src=src;
                    // audio.buffered=function(m){
                    //     console.log(m);
                    //     _this.num++;
                    //     _this.container[n].state=true;
                    //     _this.callback();
                    // }
                    //audio.play();
                    audio.oncanplay=function(){

                    }
                    audio.oncanplaythrough=function(){

                        _this.num++;
                        _this.container[n].state=true;
                        _this.callback();
                    }
                    break;
                case "video":
                    //var video=new Video();
                    var video=document.createElement("video");
                    video.src=src;
                    video.play();
                    video.oncanplaythrough=function(){
                        video.pause();
                        _this.num++;
                        _this.container[n].state=true;
                        _this.callback();
                    }
                    break;
                default:
                    break;
            }
        }
        this.init();
    }
    //检测浏览器类型;
    function getBrowserInfo() {
        var agent = navigator.userAgent.toLowerCase();
        var regStr_ie = /msie [\d.]+;/gi;
        var regStr_ff = /firefox\/[\d.]+/gi
        var regStr_chrome = /chrome\/[\d.]+/gi;
        var regStr_saf = /safari\/[\d.]+/gi;
        var isIE = agent.indexOf("compatible") > -1 && agent.indexOf("msie" > -1); //判断是否IE<11浏览器
        var isEdge = agent.indexOf("edge") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isIE11 = agent.indexOf('trident') > -1 && agent.indexOf("rv:11.0") > -1;
        if (isIE) {
            var reIE = new RegExp("msie (\\d+\\.\\d+);");
            reIE.test(agent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) {
                return "IE/7";
            } else if (fIEVersion == 8) {
                return "IE/8";
            } else if (fIEVersion == 9) {
                return "IE/9";
            } else if (fIEVersion == 10) {
                return "IE/10";
            }
        } //isIE end
        if (isIE11) {
            return "IE/11";
        }
        //firefox
        if (agent.indexOf("firefox") > 0) {
            return agent.match(regStr_ff);
        }
        //Safari
        if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
            return agent.match(regStr_saf);
        }
        //Chrome
        if (agent.indexOf("chrome") > 0) {
            return agent.match(regStr_chrome);
        }
    }
}());