import request from '@/common/https.js'


/**
 * 用户
 * @param {*} data 
 */
export default
{
	/*
	* 获取token保存的基本用户信息
	* */
	async getUserByToken() {
		return request({
			url: '/user/getUserByToken',
			method: 'get',
		})
	},
	/*
	* 修改用户信息
	* User的实体类,必须要有id,其他可有可无
	* */
	async updateUser(data){
		return request({
			url:'/user/update',
			method:'post',
			data:data,
		})
	},
	/*
	* 获取修改邮箱的验证码
	* @param email 邮箱
	* */
	async getUpdateEmailCode(param){
		return request({
			url:'/user/getUpdateCodeByEmail',
			method:'get',
			params:param,
		})
	},
	/*
	* 修改邮箱
	* @data
	* id	用户id
	* email	邮箱
	* code	邮箱验证码
	* */
	async updateEmail(data){
		return request({
			url:'/user/updateEmail',
			method:'post',
			data:data,
		})
	},
	/*
	* 修改密码
	* @data	passwordForm
	* id 			用户id
	* password		旧密码
	* newPassword	新密码
	* */
	async updatePassword(data){
		return request({
			url:'/user/updatePassword',
			method:'post',
			data:data,
		})
	},
	/*
	* 获取修改后用户信息
	* */
	async getNewCookie(){
		return request({
			url:'/user/getNewCookie',
			method:'get',
		})
	},
	/*
	* 上传头像并修改头像
	* @data uploadUpdateImages
	* id	用户id
	* file	图片文件
	* */
	async uploadUpdateImages(data){
		return request({
			url:'/user/updateUserAvatar',
			method:'post',
			data:data
		})
	},
	/*
	* 获取用户信息的基本信息,根据id
	* */
	async getUserById(userId){
		return request({
			url:'/user/getUser/'+userId,
			method:'get',
		})
	},
}
