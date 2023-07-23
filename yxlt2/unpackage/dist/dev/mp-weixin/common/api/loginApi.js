"use strict";
const common_https = require("../https.js");
const loginApi = {
  getCode() {
    return common_https.service.getUri() + "/login/code?time=";
  },
  async Login(param, data) {
    return common_https.service({
      url: "/login",
      method: "post",
      params: param,
      data
    });
  },
  async getEmailCode(param) {
    return common_https.service({
      url: "/login/getEmailCode",
      method: "get",
      params: param
    });
  },
  async LoginEmail(data) {
    return common_https.service({
      url: "/login/loginEmail",
      method: "post",
      data
    });
  },
  async Register(data) {
    return common_https.service({
      url: "/login/register",
      method: "post",
      data
    });
  },
  async Logout() {
    return common_https.service({
      url: "/login/logout",
      method: "get"
    });
  }
};
exports.loginApi = loginApi;
