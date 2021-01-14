class lk3dSide {
    constructor(target, obj) {
        this.odiv = typeof target == "string" ? $(target) : target;
        this.ops = {
            el: '',
            size: 3,
            scale: 0.5,
            opacity: 0.5,
            speed: 300,
        };
        $.extend(this.ops, obj);
        this.ops._arry = [];
        this.canrender = true;
        this.init();
    }
    init() {
        if (this.ops.size % 2 == 0) {
            this.ops.size++;
        }
        this.ops.element = this.odiv.find(this.ops.el);
        this.ops.width = this.ops.element.width();
        this.ops.height = this.ops.element.height();
        this.ops.maxW = this.odiv.width();
        this.ops.maxH = this.odiv.height();
        this.ops.defL = (this.ops.maxW - this.ops.width) / 2;
        this.ops.defT = (this.ops.maxH - this.ops.height) / 2;
        this.ops.zIndex = 5;
        this.isAppendDom();
    }
    isAppendDom() {
        let el = this.odiv.find(this.ops.el);
        let domSize = el.size();
        console.log(domSize, this.ops.size, this.ops.element.size());
        let _this = this;
        if (domSize <= this.ops.size) {
            let html = el.parent().html();
            el.parent().append(html);
            _this.isAppendDom();
        } else {
            this.ops.element = this.odiv.find(this.ops.el);
            this.ops.element.eq(0).addClass("chost");
            this.buildQueue();
            this.bindEvent();
        }
    }
    buildQueue() {
        if (!this.canrender) {
            return false;
        }
        this.ops._arry = [];
        let _this = this;
        let num = parseInt(_this.ops.size / 2);
        let size = this.odiv.find(this.ops.el).size();
        let s = this.ops.scale;
        let o = this.ops.opacity;
        let zIndex = this.ops.zIndex;
        for (let i = 0; i < this.ops.size; i++) {
            let obj = {};
            let n = i - num + this.odiv.find(".chost").index();
            if (n < 0) {
                n = n + size;
            }
            if (n > this.ops.size) {
                n = n - size;
            }
            obj.index = n;
            if (i < num) {
                let os = s + s * (i / num);
                let oo = o + o * (i / num);
                obj.scale = os;
                obj.zIndex = zIndex + zIndex * (i / num);
                obj.opacity = oo;
                obj.w = this.ops.width * os;
                obj.h = this.ops.height * os;
                obj.l = this.ops.defL * (i / num);
                obj.t = (this.ops.maxH - obj.h) / 2;
                //console.log(i,zIndex + zIndex * (i/num))
            } else {
                let m = this.ops.size - 1 - i;
                let os = s + s * (m / num);
                obj.zIndex = zIndex + zIndex * (m / num);
                obj.scale = os;
                obj.opacity = o + o * (m / num);
                obj.w = this.ops.width * os;
                obj.h = this.ops.height * os;
                obj.l = this.ops.maxW - this.ops.defL * (m / num) - obj.w;
                obj.t = (this.ops.maxH - obj.h) / 2;
            }
            this.ops._arry.push(obj);
        }
        //console.log(this.ops._arry);
        this.renderElement();
    }
    renderElement() {
        let _this = this;
        let time = this.ops.speed + 10;
        if (!this.canrender) {
            return false;
        }
        this.canrender = false;
        var element = this.odiv.find(this.ops.el);
        element.css({
            "width": 0,
            "height": 0,
            "left": this.ops.maxW / 2,
            "top": this.ops.maxH / 2,
            'opacity': 0,
            "z-index": 1,
        });
        // element.animate({},20)
        this.ops._arry.map(res => {
            let index = res.index;
            let w = res.w;
            let h = res.h;
            let l = res.l;
            let t = res.t;
            let o = res.opacity;
            let z = parseInt(res.zIndex);
            element.eq(index).css({
                "width": w,
                "height": h,
                "left": l,
                "top": t,
                "opacity": o,
                "z-index": z
            })
        });
        setTimeout(function () {
            _this.canrender = true;
        }, time)
    }
    bindEvent() {
        let _this = this;
        let element = this.odiv.find(this.ops.el);
        element.click(function () {
            if (!_this.canrender) {
                return false;
            }
            //console.log($(this).index());
            $(this).addClass("chost").siblings().removeClass("chost");
            _this.buildQueue();
        }).bind(this);
    }
}