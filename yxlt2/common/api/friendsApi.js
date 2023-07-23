import request from '@/common/https.js'

export default {

	/**
	 * 获取消息
	 * formUserId	用户自己id
	 * toUserId		好友id
	 * page			当前页
	 * size			页大小
	* */
	getTen(param){
		return request({
			url: '/friends/getTen',
			method: 'get',
			params: param
		})
	},
	//获取一条消息和好友基本信息
	getVo(){
		return request({
			url: '/friends/getVo',
			method: 'get'
		})
	}
	
}