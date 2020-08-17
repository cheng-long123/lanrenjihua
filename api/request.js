
// 封装get请求
const baseUrl = "http://dh.weifoupay.com/payapi"
export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			method: options.method,
			data: options.data,
			url: baseUrl+options.url,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}