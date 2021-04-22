import MD5 from './md5.min.js'
import axios from 'axios'

let DEBUG = true // 测试上
if (window.location.href.indexOf('mk.inh5.cn') > -1) {
    DEBUG = false
}
/* API */
let BASE_URL = "http://mk.inh5.cn/merckapi/frontend/web/mercklive/mainapi";
let BASE_URL_PRE = "http://event.jzxkp.com/merckwebtest/frontend/web/mercklive/mainapi";

let AUTH_URL = "http://mk.inh5.cn/merckapi/frontend/web/mercklive/wxlogin?lastUrl=";
let AUTH_URL_PRE = "http://event.jzxkp.com/merckwebtest/frontend/web/mercklive/wxlogin?lastUrl=";

let SCAN_URL = "http://mk.inh5.cn/merckapi/frontend/web/mercklive/mobilescanlogin?t=";
let SCAN_URL_PRE = "http://event.jzxkp.com/merckwebtest/frontend/web/mercklive/mobilescanlogin?t=";

if (DEBUG) {
    BASE_URL = BASE_URL_PRE;
    AUTH_URL = AUTH_URL_PRE;
    SCAN_URL = SCAN_URL_PRE;
}

const baseUrl = '/api'

/* http request 拦截器 */
axios.interceptors.request.use(
    config => {
        return config;//只有return config后，才能成功发送请求
    },
    err => {
        return Promise.reject(err);
    }
)

/* http response 拦截器 */
axios.interceptors.response.use(
    response => {
        return response;//只有return '数据'后才能完成响应
    },
    error => {
        return Promise.reject(error.response.data)  // 返回接口返回的错误信息
    }
)

/* 自定义axios异步请求 */
let Axios = axios.create({
    baseURL: BASE_URL,
    timeout: 50000,// 如果请求的时间超过'timeout'，请求将被中止。
    responseType: 'json',// “responseType”表示服务器将响应的数据类型,包括 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    headers: {
        'content-type': 'application/x-www-form-urlencoded'   //转换为key=value的格式必须增加content-type
    },
    // transformRequest:[function(data){
    //   return qs.stringify(data);    //利用对应方法转换格式
    // }]
});

function httpApi(method, url, params) {
    let time = parseInt((new Date().getTime()) / 1000);
    params.timespan = time;
    params.sign = MD5.hex(time + "linkone2020");
    console.log('请求钱', method, url, params);
    return new Promise((resolve, reject) => {
        Axios({
            method: method,
            url: url,
            data: method === 'POST' ? params : null,//data是添加到请求体（body）中的， 用于post请求。post请求的时候不存在params
            params: method === 'GET' ? params : null,//params是添加到url的请求字符串中的，用于get请求。get请求的时候不存在data
        }).then(
            (response) => {
                console.log(1233, response);
                if (response.data.code == "200" || response.data.code == "40020") {
                    resolve(response.data)
                } else if (response.data.code == "10001") {
                    reject(response.data.msg)
                } else {
                    reject(response.data.msg)
                    console.log(1233, params);
                    if (params.method == 'MERCK_EnglishReg') {
                        vm.lkAlertTips.textBox("Fail,Please enter the correct invitation code", 2000);
                    } else if (params.method == 'MERCK_TaskQuest') {
                        vm.lkAlertTips.textBox('您已有观看资格<br />无需抢票');
                    } else {
                        if (response.data.msg == '还未注册') {
                            sessionStorage.clear();
                            vm.$router.push({
                                path: '/scan_login',
                            });
                        } else if (response.data.msg == '您已注册') {
                            reject(response.data.msg);
                        } else {
                            vm.lkAlertTips.textBox(response.data.msg, function () {
                            })
                        }
                    }
                }
            }
        ).catch(
            (error) => {
                reject('失败', error)
                vm.lkAlertTips.tipsBox("网络请求失败，请更换网络重试", "warning");
            }
        )
    })
}

export default {
    get: function (url, params) {
        return httpApi('GET', url, params)
    },
    post: function (url, params) {
        return httpApi('POST', url, params)
    },
    BASE_URL,
    AUTH_URL,
    SCAN_URL
}
