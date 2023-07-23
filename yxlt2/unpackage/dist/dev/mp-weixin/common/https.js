"use strict";
const common_vendor = require("./vendor.js");
const common_utils_utils = require("./utils/utils.js");
common_vendor.axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
const service = common_vendor.axios.create({
  baseURL: "http://127.0.0.1:8100/yxlt",
  timeout: 1e4
});
service.interceptors.request.use((req) => {
  req.headers.Authorization = window.$cookies.get("yxlt_token");
  if (req.url === "/user/updateUserAvatar") {
    req.headers["Content-Type"] = "multipart/form-data";
  }
  if (req.url === "/article/img") {
    req.headers["Content-Type"] = "multipart/form-data";
  }
  return req;
}, (error) => {
  console.log("\u8BF7\u6C42\u62E6\u622A\u5668:" + error);
});
service.interceptors.response.use(
  (res2) => {
    return res2;
  },
  (error) => {
    console.log("err" + error);
    let { message } = error;
    if (message == "Network Error") {
      message = "\u7F51\u7EDC\u8FDE\u63A5\u5F02\u5E38";
    } else if (message.includes("timeout")) {
      message = "\u7F51\u7EDC\u8BF7\u6C42\u8D85\u65F6";
    } else if (message.includes("Request failed with status code")) {
      message = "\u7F51\u7EDC" + message.substr(message.length - 3) + "\u5F02\u5E38";
    }
    if (error.code === "ERR_BAD_REQUEST") {
      message = error.response.data.msg;
      common_utils_utils.utils.deleteCookieUser();
      common_utils_utils.utils.deleteCookieToken();
    }
    common_vendor.index.showModal({
      title: "\u63D0\u793A",
      content: message,
      success: function(res2) {
        if (res2.confirm)
          ;
        else if (res2.cancel)
          ;
      }
    });
    return res;
  }
);
exports.service = service;
