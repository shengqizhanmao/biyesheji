"use strict";
const common_https = require("../https.js");
const userApi = {
  async getUserByToken() {
    return common_https.service({
      url: "/user/getUserByToken",
      method: "get"
    });
  },
  async updateUser(data) {
    return common_https.service({
      url: "/user/update",
      method: "post",
      data
    });
  },
  async getUpdateEmailCode(param) {
    return common_https.service({
      url: "/user/getUpdateCodeByEmail",
      method: "get",
      params: param
    });
  },
  async updateEmail(data) {
    return common_https.service({
      url: "/user/updateEmail",
      method: "post",
      data
    });
  },
  async updatePassword(data) {
    return common_https.service({
      url: "/user/updatePassword",
      method: "post",
      data
    });
  },
  async getNewCookie() {
    return common_https.service({
      url: "/user/getNewCookie",
      method: "get"
    });
  },
  async uploadUpdateImages(data) {
    return common_https.service({
      url: "/user/updateUserAvatar",
      method: "post",
      data
    });
  },
  async getUserById(userId) {
    return common_https.service({
      url: "/user/getUser/" + userId,
      method: "get"
    });
  }
};
exports.userApi = userApi;
