/**
 * call、apply bind 可以改变this的指向
 * 
 * @param {call} :第一个参数为this的指向,其余参数就是{一个普通的参数}列表
 * 
 * @param {apply} :第一个参数为this的指向，其余参数接受{{一个数组类型}}的参数
 * 
 * @param {bind} :第一个参数为this的指向，其余参数就是一个普通参数的列表，但是[返回是函数]
 * 
 * 当然，三者的参数不限定是 string 类型，允许是各种类型，包括函数 、 object 等等！
 */