import request from '@/common/https.js'
 
/**
 * 公告
 * @param {*} data 
 */
export default
{
	async getByPalteIdAndModularsId(palteId,modularsId) {
		return request({
			url: '/announcement/get/'+palteId+"/"+modularsId,
			method: 'get',
		})
	},
}