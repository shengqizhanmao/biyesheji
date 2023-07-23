import request from '@/common/https.js'

export default {
	//是否为作者
	isAuthor(){
		return request({
			url: '/author/isAuthor',
			method: 'get',
		})
	},
	//申请为作者
	applyAuthot(){
		return request({
			url: '/author/apply',
			method: 'post'
		})
	}
	
}