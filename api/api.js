import request from './request.js'

export const login = (data) => {
	return request({
		method: 'GET',
		url: '/Userforeign/login',
		data
	})
}