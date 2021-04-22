let a = [1, 2, 3, 3, 2, 2, 3, 12, 33, 12, 12, 33, 2]
let obj = {} //采用键值对来存储，键表示该数字，值表示给数字出现次数
let maxNum = 0
let newArr = []
a.forEach((item, index) => {
    if (a.indexOf(item) == index) {
        obj[item] = 1
    } else {
        obj[item] = obj[item] + 1
    }
})
//找出谁是最大值
for (let i in obj) {
    if (obj[i] > maxNum) {
        maxNum = obj[i]
    }
}
//根据最大值输出对应的数字
for (let j in obj) {
    if (obj[j] === maxNum) {
        console.log('出现次数最多的数字为', j, ' ,次数为', obj[j]);
    }
}
console.log(newArr);