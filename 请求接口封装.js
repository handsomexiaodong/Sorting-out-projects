/**
 * 请求接口
 */
Vue.prototype.$http = function sendRequest(url, data, showLoading, cacheCallback) {
	if (showLoading) {
		uni.showLoading({
			title: '正在加载...'
		})
	}
	return new Promise((resolve, reject) => {
		let actualUrl = CONST.BASE_URL.concat(url);
		let time = parseInt((new Date().getTime()) / 1000);
		data.time = time;
		data.sign = MD5.hex(time + "LinkAward2020");
		data.form = "public";
		uni.request({
			url: actualUrl,
			data: data,
			header: {
				"content-type": "application/x-www-form-urlencoded"
			},
			method: 'POST',
			dataType: 'json',
			success: function(res) {
				// console.log(res, "请求接口")
				if (showLoading) {
					uni.hideLoading()
				}
				if (res.data.code == "200") {
					resolve(res.data)
				} else {
					let errMsg = res.data.msg || "网络异常，稍后重试~"
					uni.showToast({
						title: errMsg,
						icon: 'none',
						duration: 2000
					})
					reject(res.data)
				}
			},
			fail: function(res) {
				if (showLoading) {
					setTimeout(() => {
						uni.hideLoading()
					}, 2000)
				}
				uni.showToast({
					title: '网络请求失败，请更换网络重试',
					icon: 'none',
					duration: 2000
				})
				reject(new Error('Network request failed'))
			}
		})
	})
}