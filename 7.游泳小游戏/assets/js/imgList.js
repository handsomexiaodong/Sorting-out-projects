var imgList = [
    {
        name: "bg0",
        src: 'bg0.jpg',
        w: 750,
        h: 1334
    },
    {
        name: "bg1",
        src: "bg1.jpg",
        w: 750,
        h: 1334
    },
    {
        name: "bg2",
        src: "bg2.jpg",
        w: 750,
        h: 1334
    }
];
for (var i_1 = 0; i_1 < 34; i_1++) {
    var obj_1 = {};
    obj_1.name = 'img' + i_1;
    obj_1.src = 'img' + i_1 + '.png';
    imgList.push(obj_1);
}
var imgLeng = imgList.length;
var imgJson = [];
var time = new Date().getTime();
for (var i = 0; i < imgLeng; i++) {
    var obj = {};
    obj.name = imgList[i].name;
    obj.url = base_url + imgList[i].src + "?t=" + time;
    imgJson.push(obj);
}
//# sourceMappingURL=imgList.js.map