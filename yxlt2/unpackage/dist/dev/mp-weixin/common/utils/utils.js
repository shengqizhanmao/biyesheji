"use strict";
const common_vendor = require("../vendor.js");
const token = "yxlt_token";
const user = "user";
const utils = {
  showToast(inputIcon, inputTitle) {
    common_vendor.index.showToast({
      title: inputTitle,
      icon: inputIcon
    });
  },
  hideToast() {
    common_vendor.index.hideToast();
  },
  showLoading(inputTitle) {
    common_vendor.index.showLoading({
      title: inputTitle
    });
  },
  hideLoading() {
    common_vendor.index.hideLoading();
  },
  thenMathod(res) {
    if (res.data.success === false) {
      return this.showToast("error", res.data.msg);
    }
    this.showToast("success", res.data.msg);
  },
  setCookie(key, data) {
    window.$cookies.set(key, data);
  },
  setCookieToken(data) {
    window.$cookies.set(token, data);
  },
  setCookieUser(data) {
    window.$cookies.set(user, data);
  },
  getCookie(key) {
    return window.$cookies.get(key);
  },
  getCookieUser() {
    return window.$cookies.get(user);
  },
  deleteCookie(key) {
    window.$cookies.remove(key);
  },
  deleteCookieToken() {
    window.$cookies.remove(token);
  },
  deleteCookieUser() {
    window.$cookies.remove(user);
  }
};
exports.utils = utils;
