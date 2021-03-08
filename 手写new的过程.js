const createObj = function () {
    let obj = {}
    let Constructor = [].shift.call(arguments) // 1
    console.log(Constructor);
    obj.__proto__ = Constructor.prototype // 2
    let ret = Constructor.apply(obj, arguments) // 3
    return typeof ret === 'object' ? ret : obj // 4
}
// 使用
const Fun = function (name) {
    this.name = name
}
Fun.prototype.getName = function () {
    console.log(this.name);
}
let fun = createObj(Fun, 'xiaodong')
fun.getName() // gim


class Fun {
    constructor(name) {
        this.name = name
    }
    getName() {
        console.log(this.name);
    }
}
let fun = createObj(Fun, 'gim')
fun.getName() // Uncaught TypeError: Class constructor Fun cannot be invoked without 'new'
