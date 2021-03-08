/**
 * 使用Set
 */
const arr = [12, 34, 565, 12, 34, 1, 3, 1]
console.log([...new Set(arr)]);

/**
 * 常规的操作
 */
const newArr = [];
arr.forEach(item => {
    if (newArr.indexOf(item) === -1) {
        newArr.push(item)
    }
})
console.log(newArr);

/**
 * 借助对象的方法
 */
const arr2 = [12, 34, 565, 12, 34, 1, 3, 1]
const obj = {};
for (let i = 0; i < arr2.length; i++) {
    let item = arr2[i];
    if (obj[item] === undefined) {
        obj[item] = item;
    } else {
        arr2.splice(i, 1);
        i--;
    }
}
console.log(arr2);

/**
 * 借助排序的方法
 */
const sortArr = arr.sort((a, b) => a - b);
const sortArrStr = sortArr.join('@') + '@';
const reg = /(\d+@)\1*/g;
const newArr2 = [];

sortArrStr.replace(reg, (val, group) => {
    console.log('val', val);
    console.log('group', group);
    newArr2.push(parseInt(group))
})
console.log(newArr2);