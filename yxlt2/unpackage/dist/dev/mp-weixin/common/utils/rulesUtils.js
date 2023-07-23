"use strict";
const rulesUtils = {
  emailRules() {
    return (rule, value, data, callback) => {
      let emailDreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!emailDreg.test(value)) {
        callback("\u90AE\u7BB1\u683C\u5F0F\u4E0D\u5BF9,\u5982:xxx@163.com");
      }
      return true;
    };
  },
  emailCodeRules() {
    return (rule, value, data, callback) => {
      let codeDreg = /^[0-9]{6}$/;
      if (!codeDreg.test(value)) {
        callback("\u8BF7\u8F93\u51656\u4F4D\u6570\u5B57");
      }
      return true;
    };
  },
  codeRules() {
  },
  passwordRules() {
    return (rule, value, data, callback) => {
      let codeDreg = /^[a-zA-Z0-9]{5,17}$/;
      if (!codeDreg.test(value)) {
        callback("\u8BF7\u8F93\u51655-17\u4F4D\u6570\u5B57\u6216\u8005\u5B57\u6BCD");
      }
      return true;
    };
  }
};
exports.rulesUtils = rulesUtils;
