/**
 * @author hxiaodong
 */
class Waterfall {
    ops = {
        el: 'li',
        w: 300,
        lr: 20,
        t: 20,
        size: 3,
        iscompare: true,
        isLoadImg: true
    }
    constructor(name, obj) {
        for (let item in obj) {
            if (item.indexOf("_") != 0) {
                if (obj[item]) {
                    this.ops[item] = obj[item]
                }
            }
        }
        console.log(this.ops);
        this.div = $(name);
        this.init();
    }
    init() {
        this.count();
        if(this.ops.isLoadImg) {
            this.loadImg();
        }
    }
    count() {
        if (this.ops.iscompare) {
            this.arrayList();
            console.log(11111111);
        } else {
            this.listChange();
            console.log(22222222222);
        }
    }
    arrayList(){
        let keep = [];
        let x = 0;
        let y = 0;
        let domH = 0;
        let startTop = 0;
        let max = this.ops.size;
        let el = this.ops.el;
        let _this = this;
        for (let i = 0; i < max; i++) {
            keep.push(0);
        }
        this.div.find(el).each(function () {
            if ($(this).css("display") != "none") {
                let targt = $(this);
                for (let i = 0; i < max; i++) {
                    if (startTop > keep[i]) {
                        startTop = keep[i];
                        x = i;
                    }
                }
                targt.css({
                    position: "absolute",
                    left: x * (_this.ops.w + _this.ops.lr),
                    top: startTop
                });
                let h = targt.innerHeight();
                startTop = h + startTop + _this.ops.t;
                keep[x] = startTop;
            }
        })
        for (let i = 0; i < max; i++) {
            if (domH < keep[i]) {
                domH = keep[i];
            }
        }
        this.div.height(domH);
    }
    listChange(){
        let keep = [];
        let x = 0;
        let y = 0;
        let domH = 0;
        let max = this.ops.size - 1;
        let el = this.ops.el;
        let _this = this;
        this.div.find(el).each(function () {
            if ($(this).css("display") != "none") {
                let targt = $(this);
                if (x == 0) {
                    keep[y] = [];
                }
                let obj = {};
                obj.h = targt.innerHeight();
                if (y == 0) {
                    obj.top = 0;
                } else {
                    obj.top = keep[y - 1][x].h + keep[y - 1][x].top + _this.ops.t;
                }
                keep[y].push(obj);
                if (domH < obj.top + obj.h) {
                    domH = obj.top + obj.h;
                }
                targt.css({
                    position: "absolute",
                    left: x * (_this.ops.w + _this.ops.lr),
                    top: obj.top
                });
                if (x < max) {
                    x++;
                } else {
                    x = 0;
                    y++;
                }
            }
        })
        console.log(keep);
        this.div.height(domH);
    }
    loadImg() {
        let el = this.ops.el;
        let imgBox = this.div.find(el).find("img");
        let _this = this;
        imgBox.each(function () {
            let src = $(this).attr("src");
            let img = new Image();
            img.onerror = function () {
                _this.count();
            }
            img.oncomplete = function () {
                _this.count();
            }
            img.onload = function () {
                _this.count();
            }
            img.src = src;
        })
    }
    reset() {
        this.init();
    }
}