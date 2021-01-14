const imgsrc="../assets/animate/";
let animageArry=[];
for(let i=0; i<118;i++){
    let src=imgsrc+"m"+i+".png";
    animageArry.push(src);
    loaderList.push(src);
}
let num=0;
let listLeng=animageArry.length-1;
var canvas=document.getElementById("canvas");
var cont=canvas.getContext("2d");
let setImageFun=(i) =>{
    let img=new Image();
    img.src=i;
    //cont.clearRect(0,0,750,1334);
    if(img.complete){
        cont.drawImage(img,0,0,750,1334);
    }else{
        img.onload=function(){
            cont.drawImage(img,0,0,750,1334);
        }
    }

}
setImageFun(animageArry[0]);
function canvasDraw(){
    if(num<listLeng){
        num++;
        setImageFun(animageArry[num]);
        setTimeout(function(){
            canvasDraw();
        },35);
    }else{
        setTimeout(function(){
            $(".footStart").addClass("footStartd");
        },100);
    }
    //setImageFun(1);
}