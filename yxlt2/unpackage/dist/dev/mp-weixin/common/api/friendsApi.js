"use strict";
const common_https = require("../https.js");
const friendsApi = {
  getTen(param) {
    return common_https.service({
      url: "/friends/getTen",
      method: "get",
      params: param
    });
  },
  getVo() {
    return common_https.service({
      url: "/friends/getVo",
      method: "get"
    });
  }
};
exports.friendsApi = friendsApi;
