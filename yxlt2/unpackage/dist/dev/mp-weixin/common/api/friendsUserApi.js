"use strict";
const common_https = require("../https.js");
const friendsUserApi = {
  async getFriendsUserList(userId) {
    return common_https.service({
      url: "/friendsUser/getList/" + userId,
      method: "get"
    });
  },
  async getListSearchAddByUsernameOrNickname(usernameOrNickname) {
    return common_https.service({
      url: "/friendsUser/getListSearch",
      method: "get",
      params: { "usernameOrNickname": usernameOrNickname }
    });
  },
  async addFriendsUser(data) {
    return common_https.service({
      url: "/friendsUser/add",
      method: "post",
      data
    });
  },
  async getFriendsUserApplyList(userId) {
    return common_https.service({
      url: "/friendsUser/getApplyList/" + userId,
      method: "get"
    });
  },
  async updateStatus(friendsUserData) {
    return common_https.service({
      url: "/friendsUser/updateStatus",
      method: "post",
      data: friendsUserData
    });
  },
  async getListDeletefriendsUser(userId) {
    return common_https.service({
      url: "/friendsUser/getListDelete/" + userId,
      method: "get"
    });
  },
  async deleteFriendsUser(deleteFriendsData) {
    return common_https.service({
      url: "/friendsUser/delete",
      method: "post",
      data: deleteFriendsData
    });
  }
};
exports.friendsUserApi = friendsUserApi;
