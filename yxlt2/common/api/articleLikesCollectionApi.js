import request from '@/common/https.js'
 
/**
 * 文章的点赞，收藏
 * @param {*} data 
 */
export default
{
	async getByArticleId(articleId) {
		return request({
			url: '/articleLikesCollection/get/'+articleId,
			method: 'get',
		})
	},
	/**
	 * 修改点赞或者收藏
	 * articleId 	帖子id
	 * likes		点赞(0或1)
	 * collection	收藏(0或1)
	 */
	async updateByArticleId(updateLikesCollectionData) {
		return request({
			url: '/articleLikesCollection/updateByArticleId',
			method: 'post',
			data:updateLikesCollectionData
		})
	}
}