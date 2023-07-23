import request from '@/common/https.js'

/**
 * 好友
 * @param {*} data 
 */
export default {
	/**
	 * 获取好友列表
	 * */
	async getFriendsUserList(userId) {
		return request({
			url: '/friendsUser/getList/'+userId,
			method: 'get',
		})
	},
	/**
	 *
	* 搜索用户
	*/
	async getListSearchAddByUsernameOrNickname(usernameOrNickname) {
		return request({
			url: '/friendsUser/getListSearch',
			method: 'get',
			params: {"usernameOrNickname":usernameOrNickname},
		})
	},
	/**
	 * formUserId	用户id
	 * toUserId		目标用户id
	* */
	async addFriendsUser(data) {
		return request({
			url: '/friendsUser/add',
			method: 'post',
			data: data,
		})
	},
	//获取申请好友列表
	async getFriendsUserApplyList(userId) {
		return request({
			url: '/friendsUser/getApplyList/'+userId,
			method: 'get',
		})
	},
	/**
	 * 根据状态来更改好友关系
	 * formUserId 	用户id
	 * toUserId		目标用户id
	 * status		状态
	* */
	async updateStatus(updateFriendsUserData) {
		return request({
			url: '/friendsUser/updateStatus',
			method: 'post',
			data: updateFriendsUserData,
		})
	},
	/*
	* 获取被单方面删除好友的列表
	* */
	async getListDeletefriendsUser(userId){
		return request({
			url: '/friendsUser/getListDelete/'+userId,
			method: 'get',
		})
	},
	/*
	* 获取拒绝好友通知的列表
	* */
	async getListRefusefriendsUser(userId){
		return request({
			url: '/friendsUser/getListRefuse/'+userId,
			method: 'get',
		})
	},
	/**
	 * 删除 被好友删除 的通知
	 * formUserId	用户id
	 * toUserId		目标用户id
	* */
	async deleteFriendsUser(deleteFriendsData){
		return request({
			url: '/friendsUser/delete',
			method: 'post',
			data: deleteFriendsData,
		})
	}
}
