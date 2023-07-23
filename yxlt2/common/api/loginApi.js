import request from '@/common/https.js'
 
/**
 * 登录
 * @param {*} data 
 */
export default
{
	/*
	* 登录页的验证码
	* */
	getCode(){
		return request.getUri()+'/login/code?time='
	},
	/**
	 * 登录
	 * @param {'time':that.codeDate} 时间为获取验证码的时间
	 * @date that.loginFormData
	 * username	用户名
	 * password	密码
	 * code		验证码
	* */
	async Login(param,data) {
		return request({
			url: '/login',
			method: 'post',
			params:param,
			data:data
		})
	},
	/*
	* 获取邮箱验证码
	* @param {'email': this.emailForm.email} 邮箱
	* */
	async getEmailCode(param) {
		return request({
			url: '/login/getEmailCode',
			method: 'get',
			params:param
		})
	},
	/*
	* 登录邮箱
	* @data emailForm
	* email	邮箱
	* code	验证码
	* */
	async LoginEmail(data) {
		return request({
			url: '/login/loginEmail',
			method: 'post',
			data:data
		})
	},
	/*
	* 注册
	* @data	registerFormData
	* username 用户名
	* nickname 昵称
	* password 密码
	*
	* */
	async Register(data){
		return request({
			url: '/login/register',
			method: 'post',
			data:data
		})
	},
	/*
	* 退出
	* */
	async Logout() {
		return request({
			url: '/login/logout',
			method: 'get',
		})
	}
}
