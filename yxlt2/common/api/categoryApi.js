import request from '@/common/https.js'

export default {
	//获取分类,根据板块id
	getByPalteId(palteId){
		return request({
			url: '/category/get/'+palteId,
			method: 'get',
		})
	},
}