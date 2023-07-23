import request from '@/common/https.js'
/**
 * 标签
 * @param {*} data 
 */
export default
{
	/*
	* 获取标签列表
	* */
	async getByPalteId(palteId) {
		return request({
			url: '/tags/get/'+palteId,
			method: 'get',
		})
	},

}
