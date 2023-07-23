import request from '@/common/https.js'
 
/**
 * 板块
 * @param {*} data 
 */
export default
{
	/*
	* 获取板块列表
	* */
	async GetPalte() {
		return request({
			url: '/palte/get',
			method: 'get',
		})
	},

}
