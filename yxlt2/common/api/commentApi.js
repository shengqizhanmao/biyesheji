import request from '@/common/https.js'
/**
 * 评论
 * @param {*} data 
 */
export default
{
	//获取评论
	async getComment(articleId) {
		return request({
			url: '/comment/get/'+articleId,
			method: 'get',
		})
	},
	//进行评论
	/**
	 * articleId	帖子id
	 * content		内容
	 * parentId		父评论的id(无则为0)
	 * toUserId		给谁评论(无则为0)
	* */
	async createComment(commentSummit) {
		return request({
			url: '/comment/create',
			method: 'post',
			data:commentSummit
		})
	},
	//删除自己的评论
	async deleteComment(id) {
		return request({
			url: '/comment/delete/'+id,
			method: 'post',
		})
	},
}