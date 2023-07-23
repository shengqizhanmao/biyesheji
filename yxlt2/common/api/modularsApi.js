import request from '@/common/https.js'
 
/**
 * 模块
 * @param {*} data 
 */
export default
{
	/*
	* 获取模块列表
	* */
	async GetModulars(palteId) {
		return request({
			url: '/modulars/get/'+palteId,
			method: 'get',
		})
	},
}
