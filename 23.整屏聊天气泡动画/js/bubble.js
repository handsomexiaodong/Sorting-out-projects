/**
 * @author xiaodong
 */
class Bubble {
    ops = {
        _aw: window.innerWidth,
        _ah: window.innerHeight,
        str: "",
        speed: 1,
        num: 50,
        style: {
            fontSize: 24,
            fill: "#fff",
            align: "center",
            fontFamily: "Microsoft YaHei",
            lineHeight: 0,
            letterSpacing: 0,
            padding:0
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
        this.ops.str = str;
        this.init();
    }
    init() {
        this.createCanvas();
        this.drawGraph();
    }
    createCanvas() {
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

    }
    drawGraph() {
        let style = new PIXI.TextStyle(this.ops.style);
        console.log(style, 999);
        let message = new PIXI.Text(this.ops.str, style);
        let roundBox = new PIXI.Graphics();
        roundBox.lineStyle(4, 0x99CCFF, 1);
        roundBox.beginFill(this.ops.str);
        roundBox.drawRoundedRect(0, 0, 84, 36, 10)
        roundBox.endFill();
        roundBox.x = 48;
        roundBox.y = 190;
        roundBox.addChild(message);
        this.app.stage.addChild(roundBox);
    }
}