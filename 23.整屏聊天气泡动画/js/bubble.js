/**
 * @author xiaodong
 */
class Bubble {
    ops = {
        _aw: window.innerWidth,
        _ah: window.innerHeight,
        _pack: new Array(),
        _defAddNum: 0,
        _defMaxNum: 100,
        str: "",
        speed: 4,
        num: 20,
        style: {
            fontSize: 24,
            fill: "#000",
            align: "center",
            fontFamily: "Microsoft YaHei",
            lineHeight: 0,
            letterSpacing: 2,
            padding: 0,
            trim: true,
            wordWrap: true,
            wordWrapWidth: 100,
        },
        isSend: true,
    }
    constructor(str, obj) {
        for (let item in obj) {
            if (item.indexOf("_") != 0) {
                if (obj[item]) {
                    this.ops[item] = obj[item]
                }
            }
        }
        this.ops.str = str || "气泡框";
        this.init();
    }
    init() {
        this.createCanvas();
        this.createBubble();
        // this.animationLoop();
    }
    createCanvas() {
        let _this = this;
        this.app = new PIXI.Application({
            width: this.ops._aw,
            height: this.ops._ah,
            antialias: true,
            transparent: true,
            resolution: 1
        });
        console.log(this.app);
        let div = document.createElement('div');
        div.width = this.ops._aw;
        div.height = this.ops._ah;
        div.id = "bubble";
        div.style = "position: absolute;top: 0;left: 0;z-index: 9999999";
        div.appendChild(this.app.view);
        document.body.appendChild(div);
        this.article = this.createContainer(this.ops._aw, this.ops._ah);
        this.app.stage.addChild(this.article);
        this.app.ticker.add(function (delta) {
            _this.animationLoop(delta);
        });
    }
    createBubble() {
        for (let i = 0; i <= this.ops.num; i++) {
            let obj = new Object();
            obj.x = this.Abscissa().x;
            obj.y = this.Abscissa().y;
            obj.minY = this.Abscissa().y - 80;
            this.ops._pack.push(obj);
            let message = new PIXI.Text(this.ops.str, this.ops.style);
            message.x = 15;
            message.y = 10;
            let width = this.textSize(`${this.ops.style.fontSize}px`, this.ops.style.fontFamily, this.ops.str).width;
            let height = this.textSize(`${this.ops.style.fontSize}px`, this.ops.style.fontFamily, this.ops.str).height;
            let roundBox = new PIXI.Graphics();
            roundBox.lineStyle(4, 0xDCDCDC, 1);
            roundBox.beginFill(0xDCDCDC);
            roundBox.drawRoundedRect(0, 0, width + 30, height + 10, height / 2)
            roundBox.endFill();
            roundBox.x = obj.x;
            roundBox.y = obj.y;
            roundBox.rotation = -0.2;
            roundBox.addChild(message);
            this.article.addChild(roundBox);
        }
    }
    drawGraph() {
        this.article.removeChildren();
        let length = this.ops._pack.length;
        if (!length) {
            let deleteNode = document.getElementById("bubble");
            document.body.removeChild(deleteNode);
            return false;
        };
        for (let i = length - 1; i >= 0; i--) {
            let item = this.ops._pack[i];
            if (item.y < item.minY) {
                this.ops._pack.splice(i, 1);
                continue;
            } else {
                item.y -= this.ops.speed;
                item.x = this.rowAxisAction(item.x);
            }
            let message = new PIXI.Text(this.ops.str, this.ops.style);
            let width = this.textSize(`${this.ops.style.fontSize}px`, this.ops.style.fontFamily, this.ops.str).width;
            let height = this.textSize(`${this.ops.style.fontSize}px`, this.ops.style.fontFamily, this.ops.str).height;
            message.x = 15;
            message.y = 10;
            let roundBox = new PIXI.Graphics();
            roundBox.lineStyle(4, 0xDCDCDC, 1);
            roundBox.beginFill(0xDCDCDC);
            roundBox.drawRoundedRect(0, 0, width + 30, height + 10, height / 2)
            roundBox.endFill();
            roundBox.x = item.x;
            roundBox.y = item.y;
            roundBox.rotation = this.angleAction(-0.2);
            roundBox.addChild(message);
            this.article.addChild(roundBox);
        }
    }
    createContainer(w = 0, h = 0, x = 0, y = 0) {
        let container = new PIXI.Container({
            width: w,
            height: h
        });
        container.x = x;
        container.y = y;
        return container;
    }
    textSize(fontSize, fontFamily, text) {
        var span = document.createElement("span");
        var result = {};
        result.width = span.offsetWidth;
        result.height = span.offsetHeight;
        span.style.visibility = "hidden";
        span.style.fontSize = fontSize;
        span.style.fontFamily = fontFamily;
        span.style.display = "inline-block";
        document.body.appendChild(span);
        if (typeof span.textContent != "undefined") {
            span.textContent = text;
        } else {
            span.innerText = text;
        }
        result.width = parseFloat(window.getComputedStyle(span).width) - result.width;
        result.height = parseFloat(window.getComputedStyle(span).height) - result.height;
        return result;
    }
    angleAction(num = 0, min = -0.2, max = 0.2) {
        num += 0.1;
        if (num >= max) {
            num -= 0.1;
        } else if (num <= min) {
            num += 0.1;
        }
        return num;
    }
    rowAxisAction(num) {
        let _this = this;
        let bNum = num;
        num += _this.ops.speed;
        if (num - bNum > 5) {
            num -= _this.ops.speed;
        }
        if (num - bNum < -5) {
            num += _this.ops.speed;
        }
        return num;
    }
    animationLoop(delta) {
        this.drawGraph();
    }
    GetRandom(a, b) {
        return a + Math.random() * (b - a);
    }
    Abscissa() {
        let x, y;
        if (!x) {
            x = this.GetRandom(0, this.ops._aw);
            y = this.GetRandom(this.ops._ah / 3, this.ops._ah);
        }
        return { x, y };
    }
}