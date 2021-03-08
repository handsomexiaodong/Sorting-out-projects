/**
 * 函数防抖：当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定好的时间到来之前，有一次触发了事件，就重新开始延时
 */
function debounce(handle, delay) {
    let timer = null;
    return function () {
        let _this = this,
            _args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            handle.apply(_this, _args)
        }, delay)
    }
}

function debance(fn, delay) {
    let timer = null;
    return () => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn();
        }, delay);
    };
}

/**
 * 函数节流：当持续触发事件时，保证一定时间段内只调用一次事件处理函数
 */
function throttle(handle, wait) {
    let lastTime = 0;
    return function (e) {
        let newTime = new Date().getTime();
        if (newTime - lastTime > wait) {
            handle.apply(this, arguments);
            lastTime = newTime;
        }
    }
}

function throttle(fn, delay) {
    let flag = true;
    return () => {
        if (!flag) return;
        flag = false;
        timer = setTimeout(() => {
            fn();
            flag = true;
        }, delay);
    };
}

function throttle(fn, delay) {
    let startTime = new Date()
    return () => {
        let endTime = new Date()
        if (endTime - startTime >= delay) {
            fn()
            startTime = endTime
        } else {
            return
        }
    };
}