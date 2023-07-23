import axios from 'axios';
import utils from './utils/utils.js';
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
	baseURL: "http://127.0.0.1:8100/yxlt",
	timeout: 10000
})
 
//请求计数
let reqNum = 0
// request拦截器
service.interceptors.request.use(req => {
	// console.log("axios请求拦截器")
	reqNum++
    req.headers.Authorization = window.$cookies.get("yxlt_token")
	//上传图片，修改Content-Type
	if(req.url==="/user/updateUserAvatar"){
		req.headers['Content-Type']="multipart/form-data"
	}
	if(req.url==="/article/img"){
		req.headers['Content-Type']="multipart/form-data"
	}
    return req
}, error => {
	console.log("请求拦截器:"+error)
})
 
// 响应拦截器
service.interceptors.response.use(res => {
		return res;
	},
	error => {
		console.log('err' + error)
		let {message} = error
		if (message == 'Network Error') {
			message = '网络连接异常'
		} else if (message.includes('timeout')) {
			message = '网络请求超时'
		} else if (message.includes('Request failed with status code')) {
			message = '网络' + message.substr(message.length - 3) + '异常'
		}
		//登录过期
		if (error.code==="ERR_BAD_REQUEST"){
		    message=error.response.data.msg
			utils.deleteCookieUser();
			utils.deleteCookieToken();
		}
		uni.showModal({
			title: '提示',
			content: message,
			success: function(res) {
				if (res.confirm) {
					// console.log('用户点击确定');
				} else if (res.cancel) {
					// console.log('用户点击取消');
				}
			}
		});
		return res;
	}
)
 
 
export default service