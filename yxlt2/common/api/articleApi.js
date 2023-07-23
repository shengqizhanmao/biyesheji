import request from '@/common/https.js'




/**
 * 文章
 * @param {*} data 
 */
export default
{
	//作者添加图片
	async Img(img) {
		return request({
			url: '/article/img',
			method: 'post',
			data:img
		})
	},
	/**
	 *作者添加帖子
	 * palteId,		板块id
	 * modularsId	模块id
	 * categoryId	分类id
	 * frontCover	封面
	 * title		标题
	 * summary		简介
	 * tagsList		标签列表
	 * content		内容
	 * contentHtml	内容html格式
	* */
	async applyArticle(articleFormData) {
		return request({
			url: '/article/apply',
			method: 'post',
			data:articleFormData
		})
	},
	//获取帖子列表
	async get(){
		return request({
			url: '/article/get',
			method: 'get',
		})
	},
	//作者获取帖子详情，不增加观看人数，必须要token
	async getById(articleId){
		return request({
			url: '/article/get/'+articleId,
			method: 'get',
		})
	},
	//用户获取帖子详细，会增加观看人数
	async getArticleDetail(articleId){
		return request({
			url: '/article/getArticleDetail/'+articleId,
			method: 'get',
		})
	},
	//删除帖子
	async deleteByArticleId(articleId){
		return request({
			url: '/article/delete/'+articleId,
			method: 'post',
		})
	},
	/**
	 *修改帖子
	 * palteId,		板块id
	 * modularsId	模块id
	 * categoryId	分类id
	 * frontCover	封面
	 * title		标题
	 * summary		简介
	 * tagsList		标签列表
	 * content		内容
	 * contentHtml	内容html格式
	 * */
	async updateArticle(articleFormData){
		return request({
			url: '/article/update',
			method: 'post',
			data:articleFormData
		})
	},
	/**
	 * 帖子排序
	 * sort       	排序规则
	 * modularsId 	模块id
	 * palteId		板块id
	 * pages		当前页
	 * pagesSize	页大小
	* */
	async getBySortAndPalteAndModulersId(getArticleDate){
		return request({
			url: '/article/getBySortAndPalteAndModulersId',
			method: 'post',
			data:getArticleDate
		})
	},
	/**
	 * 根据分类获取帖子
	 * modularsId 	模块id
	 * palteId		板块id
	 * pages		当前页
	 * pagesSize	页大小
	 * */
	async getArticleByCategory(modularsId,categoryId,page,pageSize){
		return request({
			url: '/article/getArticleByCategory/'+modularsId+"/"+categoryId+"/"+page+"/"+pageSize,
			method: 'get',
		})
	},
	//根据用户收藏
	async getArticleByUserCollect(palteId){
		return request({
			url: '/article/getArticleByUserCollect/'+palteId,
			method: 'get'
		})
	},
	//获取帖子列表
	async getArticleByStatus(status){
		return request({
			url: '/article/getArticleByStatus/'+status,
			method: 'get',
		})
	},
	//获取帖子列表
	async getArticleByPalteIdAndStatus(palteId,status){
		return request({
			url: '/article/getArticleByPalteIdAndStatus/'+palteId+"/"+status,
			method: 'get',
		})
	},
}
