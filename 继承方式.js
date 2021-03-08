/**
 * JS继承的方式: 1.原型链继承 2.构造函数继承 3.组合继承 4.实例继承 5.拷贝继承 6.寄生组合继承 7.ES6-class继承
 */
function Father(name) {
    /* 属性 */
    this.name = name || 'Father';
    /* 方法 */
    this.getName = function () {
        console.log(this.name);
    }
    this.color = ['red', 'blue']
}
/* 原型方法 */
Father.prototype.age = 18;
Father.prototype.getAge = function () {
    console.log(this.age);
}

// 原型链继承
function Son(name) {
    this.name = name || 'Son';
}
Son.prototype = new Father();

let s1 = new Son("s1");
let s2 = new Son("s2");
s1.color.push("yellow");
// console.log(s1.name);//s1
// console.log(s2.name);//s2
// console.log(s2.color);//['red','blue','yellow']
// console.log(s1.age);//18

// 构造函数继承:不能继承父类的原型方法
function Son1(name) {
    Father.call(this, "要传给父类的");
    this.name = name || 'Son1';
}
let s3 = new Son1("s3");
// console.log(s3);//{ name: 's3', getName: [Function], color: [ 'red', 'blue' ] }

// 组合继承
function Son2(name) {
    // 第一次调用父类构造器 子类实例增加父类实例
    Father.call(this, "我是传给父类的参数");
    this.name = name || "Son2";
}
// 经过new运算符 第二次调用父类构造器 子类原型也增加了父类实例
Son2.prototype = new Father();
let s4 = new Son("s4");
// console.log(s4.name); // s4
// s4.getAge(); // 18
// s4.getName(); // s4
// console.log(s4.age); // 18

// 实例继承
function Son3(name) {
    let f = new Father();
    f.name = name || 'Son3';
    return f;
}
let s5 = new Son3("s5");
// console.log(s5.name);//s5
// s5.getAge()//18
// s5.getName()//s5
// console.log(s5.age);//18

// 拷贝继承
function Son4(name) {
    let copy = new Father();
    for (let k in copy) {
        Son4.prototype[k] = copy[k]
    }
    Son4.prototype.name = name;
}
let s6 = new Son4("s6");
// console.log(s6.name);//s6
// s6.getAge();//18
// console.log(s6.age); //18
// s6.getName();//s6

// 寄生组合继承
function Son5(name) {
    Father.call(this);
    this.name = name || "Son5";
}

// 方法一  自己动手创建一个中间类
// (function() {
//   let NoneFun = function() {};
//   NoneFun.prototype = Father.prototype;
//   Son5.prototype = new NoneFun();
//   Son5.prototype.constructor = Son5;
// })();

// 方法二  直接借用Object.create()方法
Son5.prototype = Object.create(Father.prototype);
// 修复构造函数指向
Son5.prototype.constructor = Son5;

let s7 = new Son5("Son5");
// console.log(s7.name); // son5
// s7.getAge(); // 18
// s7.getName(); // son5
// console.log(s7.age); // 18
// console.log(s7 instanceof Father); // true
// console.log(s7 instanceof Son); // false
// console.log(s7.constructor === Father); // false
// console.log(s7.constructor === Son); // false

// ES6--class继承
class Son6 extends Father {
    constructor(name) {
        super(name);
        this.name = name || "Son6"
    }
}
let s8 = new Son6();
console.log(s8.name);//Son6
console.log(s8.age);//18
s8.getAge(); // 18
s8.getName(); // son6
console.log(s8 instanceof Father); // true
console.log(s8 instanceof Son); // false
console.log(s8.constructor === Father); // false
console.log(s8.constructor === Son); // false
