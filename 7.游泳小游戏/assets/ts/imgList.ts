let imgList = [
    {
        name:"bg0",
        src:'bg0.jpg',
        w:750,
        h:1334
    },
    {
        name:"bg1",
        src:"bg1.jpg",
        w:750,
        h:1334
    },
    {
        name:"bg2",
        src:"bg2.jpg",
        w:750,
        h:1334
    }
];
for(let i = 0; i<34; i++){
    let obj:any = {};
    obj.name = 'img'+i;
    obj.src = 'img' + i + '.png';
    imgList.push(obj);
}
let imgLeng = imgList.length;
let imgJson = [];
let time = new Date().getTime();
for(var i = 0;i<imgLeng;i++){
    var obj:any = {};
    obj.name = imgList[i].name;
    obj.url = base_url + imgList[i].src+"?t="+time;
    imgJson.push(obj);
}