//http://www.ilinkone.com/
//2019-2-25
//by-liuweihua
//获取canvas对象
function getName(id){
    return document.getElementById(id);
}
//获取路径画笔;
function getCont(name){
    return name.getContext("2d");
}

//正多边形函数;
/*
*target画笔对象,
* n 表示N边型
* dx,dy表示圆心坐标
* size 表示大小
*/
function createPolugon(target,n,dx,dy,size){
    target.beginPath();
    var degree=(2*Math.PI)/n;//获取弧度;
    for(var i=0;i<n;i++){
        var x=Math.cos(i*degree);
        var y=Math.sin(i*degree);
        target.lineTo(x*size+dx,y*size+dy);
    }
    target.closePath();
}


//多角形函数：
/*
*target画笔对象,
* n 表示N边型
* dx,dy表示圆心坐标
* Rw 大圆半径
* mrw小圆半径
* n1 大圆角度
 */
function createMoreHorn(target,n,dx,dy,Rw,mrw,n1){
    target.beginPath();
    if(!n1){
        n1=54;
    }
    var degree=360/n;
    var n2=degree-n1;
    for(var i=0;i<n;i++){
        target.lineTo(dx+Math.cos((n2+i*degree)*Math.PI/180)*Rw,dy-Math.sin((n2+i*degree)*Math.PI/180)*Rw);
        target.lineTo(dx+Math.cos((n1+i*degree)*Math.PI/180)*mrw,dy-Math.sin((n1+i*degree)*Math.PI/180)*mrw);
        //target.lineTo(dx+Math.cos(n1+i*degree)*mrw,dy-Math.sin(n1+i*degree)*mrw);
    }
    target.closePath();
}

//封装圆角矩形;
/*
*target画笔对象,
* dx,dy表示圆心坐标
* w,h,代表宽高，
* r代表圆角半径
 */

function createRounded (target,dx,dy,w,h,r) {
    var x=dx-w/2,
        y=dy-h/2;
    target.beginPath();
    target.moveTo(x,y);
   // target.lineTo(x+w,y);
    target.arcTo(x+w+r,y,x+w+r,y+r,r);
    //target.lineTo(x+w+r,y+h);
    target.arcTo(x+w+r,y+h+r,x+w,y+h+r,r);
   // target.lineTo(x,y+h+r);
    target.arcTo(x-r,y+h+r,x-r,y+h-r,r);
   // target.lineTo(x-r,y+r);
    target.arcTo(x-r,y,x,y,r);
    target.closePath();
}

//封装绘制N页草
/*
*target画布路径.
* n代表叶子数量
* dx,dy表示圆心坐标
* size 叶子的大小
* length 叶子的长度
* *******size要小于length 不然就看不到叶子的分叉了;********
 */
function createLeaf(target,n,dx,dy,size,length){
    target.beginPath();
    target.moveTo(dx,dy+size);
    var degree=2*Math.PI/n;
    for(var i=1;i<=n;i++){
        //计算控制点坐标；
        var cx1=Math.sin((i-1)*degree)*length+dx;
        var cy1=Math.cos((i-1)*degree)*length+dy;
        var cx2=Math.sin(i*degree)*length+dx;
        var cy2=Math.cos(i*degree)*length+dy;
        //控制结束点坐标；
        var x=Math.sin(i*degree)*size+dx;
        var y=Math.cos(i*degree)*size+dy;
        target.bezierCurveTo(cx1,cy1,cx2,cy2,x,y);
    }
    target.closePath();
}

//封装扇形函数
/*
*target画布路径.
* x,y,圆心点坐标;
* r半径
* angle1开始角度
* angle2结束角度
* antic正时针还是逆时针，默认false
 */
function createSecTor(target,x,y,r,angle1,angle2,antic){
    antic = antic || false;
    target.beginPath();
    target.moveTo(x,y);
    target.arc(x,y,r,angle1*Math.PI/180,angle2*Math.PI/180,antic);
    target.closePath();
}

//实现文字自动折行函数
/*
*target画布路径
* text需要写入的文本内容;
* x,y文本坐标
* maxWidth文本的宽度
* lineHeight行间距
 */
function wrapText(target, text, x, y, maxWidth, lineHeight){
    var words = text.split(''); //这里我们将所有文字保存到数组中，注意如果处理英文，请使用split(' ');
    var line = '';
    for(var n = 0; n<words.length; n++){
        var testLine = line + words[n];
        //console.log(testLine);
        var metrics = target.measureText(testLine); //使用measureText计算宽度
        var testWidth  = metrics.width;
        if(testWidth > maxWidth && n>0){ //此处判断文字宽度是否超过可显示最大宽度
            target.fillText(line, x, y);
            line = words[n];
            y += lineHeight; //此处设置添加文字到下一行的位置
        }else{
            line = testLine;
        }
    }
    target.fillText(line, x, y);
}

//创建图片函数
/*
*target画布路径；
* src图片路径
* dx，dy图片顶点坐标
* dw，dh图片在画布上显示的宽度和高度，dw，dh可以都不传，如果不传按照图片实际宽度输出。dh可以不写，会按照dw约束比例;
 */
function createImage(target,src,dx,dy,dw,dh){
    var img=new Image();
    img.src=src;
    if(img.complete){
        draw()
    }else{
        img.onload=function () {

            draw();
        }
    }
    function draw(){
        setTimeout(function(){
            var mw=img.width,
                mh=img.height,
                wh=mw/mh;
            dw=dw || mw;
            dh=dh || dw/wh || mh;
            target.drawImage(img,dx,dy,dw,dh);
        },0);

    }
}
//裁剪图片;
/*
*target画布路径；
* src图片路径
* sx,sy相对于图片开始裁剪的坐标
* sw，sy裁剪区域的大小
* dx，dy源图片顶点坐标
* dw，dh裁剪图片在画布上显示的宽度和高度，dw，dh可以都不传，如果不传按照图片裁剪的宽度输出。dh可以不写，会按照dw约束比例;
 */
function cutImage(target,src,sx,sy,sw,sh,dx,dy,dw,dh){
    var img=new Image();
    img.src=src;
    if(img.complete){
        draw()
    }else{
        img.onload=function () {
            draw();
        }
    }
    function draw(){
        setTimeout(function(){
            var mw=sw,
                mh=sh,
                wh=mw/mh;
            dw=dw || mw;
            dh=dh || dw/wh || mh;
            target.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh);
        },10)

    }
}