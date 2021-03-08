const arr = [3, 5, 6, 5, 9, 8, 10, 5, 7, 7, 10, 7, 7, 7, 7, 10, 10, 10, 10, 10]
function findMost(arr) {
    if (!arr.length) return;
    if (arr.length === 1) return 1;
    let maxName, maxNum = 0
    let res = arr.reduce((res, currentNum) => {
        res[currentNum] ? res[currentNum] += 1 : res[currentNum] = 1
        if (res[currentNum] > maxNum) {
            maxNum = res[currentNum]
            maxName = currentNum
        }
        return res
    }, {})
    return '出现次数最多的元素为:' + maxName + ', 出现次数为:' + maxNum;
}
console.log(findMost(arr));