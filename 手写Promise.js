/**
 * Promise内部的三个状态：pending, resolved, rejected
 * Promise原型对象上有then, catch 函数
 * Promise函数对象上有all, race, resolve方法
 */
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

class Promise {
    constructor(executor) {
        this.status = PENDING // 初始状态为pending
        this.value = undefined // 存储resolve数据
        this.reason = undefined // 存储reject数据
        this.onResolvedCallbacks = [] // 存储成功的回调函数
        this.onRejectedCallbacks = [] // 存储成功的回调函数

        /* 成功的函数 */
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value
                this.status = RESOLVED
                this.onResolvedCallbacks.forEach((fn) => fn())
            }
        }
        /* 失败的函数 */
        let rejected = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED
                this.onRejectedCallbacks.forEach((fn) => fn())
            }
        }
        try {
            /* 立即执行executor传入成功和失败的函数 */
            executor(resolve, rejected)
        } catch (error) {
            /* 抛出错误直接reject向下传递 */
            reject(error)
        }
    }
    // 在原型上定义then方法，接受两个参数成功回调与失败毁掉
    then(onResolved, onRejected) {
        onResolved =
            typeof onResolved === "function"
                ? onResolved
                : (value) => value
        onRejected =
            typeof onRejected === "function"
                ? onRejected
                : (reason) => {
                    throw reason
                }

        // 为了实现链式调用 返回一个新的promise
        return new Promise((resolve, reject) => {
            // 处理then的结果
            let resolvePromise = (result) => {
                try {
                    // 处理then的回调返回一个promise
                    if (result instanceof Promise) {
                        result.then(resolve, reject)
                    } else if (
                        result !== null &&
                        (typeof result === "object" ||
                            typeof result === "function")
                    ) {
                        const then = result.then
                        if (typeof then === "function") {
                            then(resolve, reject)
                        } else {
                            // result 类似 {then :1}
                            resolve(then)
                        }
                    } else {
                        resolve(result)
                    }
                } catch (error) {
                    reject(error)
                }
            }

            if (this.status === RESOLVED) {
                //执行then中的方法 可能返回的是一个普通值，也可能是一个promise
                //用宏任务的机制使then的回调做成异步
                setTimeout(() => {
                    let result = onResolved(this.value)
                    resolvePromise(result)
                }, 0)
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    let result = onRejected(this.reason)
                    resolvePromise(result)
                }, 0)
            }

            // 处理异步的情况
            // 调用then的时候状态还是pending先收集回调函数，等待状态改变的时候执行
            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    let result = onResolved(this.value)
                    resolvePromise(result)
                })
                this.onRejectedCallbacks.push(() => {
                    let result = onRejected(this.reason)
                    resolvePromise(result)
                })
            }
        })
    }

    catch(errCallback) {
        return this.then(null, errCallback)
    }

    //Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例
    static all(promises) {
        if (!(promises instanceof Array)) {
            return Promise.reject(
                new Error("params must be a Array!")
            )
        }
        const resultArray = new Array(promises.length)
        let resultCount = 0
        return new Promise((resolve, reject) => {
            promises.forEach((p, index) => {
                Promise.resolve(p).then(
                    (value) => {
                        resultCount++
                        resultArray[index] = value
                        // 如果全部都成功了，将return的promise变为成功
                        if (resultCount === promises.length) {
                            resolve(resultArray)
                        }
                    },
                    (reason) => {
                        reject(reason)
                    }
                )
            })
        })
    }

    // Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例
    // 返回最先获取的结果
    static race() {
        if (!(promises instanceof Array)) {
            return Promise.reject(
                new Error("params must be a Array!")
            )
        }
        return new Promise((resolve, reject) => {
            promises.forEach((p, index) => {
                // 只要有结果直接resolve/reject
                Promise.resolve(p).then(
                    (value) => {
                        resolve(value)
                    },
                    (reason) => {
                        reject(reason)
                    }
                )
            })
        })
    }

    // 现有参数转为 Promise 对象
    static resolve(value) {
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(resolve, reject)
            } else {
                resolve(value)
            }
        })
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }
}