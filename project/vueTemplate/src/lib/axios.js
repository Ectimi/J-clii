import axios from 'axios'
import { Toast } from 'vant'
import router from '../router'

// axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '//localhost:28019' : '//localhost:28019'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

//设置默认请求头
axios.defaults.headers = {
	'Content-Type': 'application/x-www-form-urlencoded'
}

//超时时间
axios.defaults.timeout = 10000

axios.interceptors.request.use(function(config) {
	//请求之前做点什么

	return config;
}, function(error) {
	// 对请求错误做些什么

	return Promise.reject(error);
});

axios.interceptors.response.use(function(response) {
	//请求完成 对响应数据做点什么
	
	return response;
}, function(error) {
	// 请求错误
	
	return Promise.reject(error);
});

export default axios;
