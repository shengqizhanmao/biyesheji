"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_api_loginApi = require("../../../common/api/loginApi.js");
const common_api_userApi = require("../../../common/api/userApi.js");
const common_utils_utils = require("../../../common/utils/utils.js");
const common_utils_rulesUtils = require("../../../common/utils/rulesUtils.js");
require("../../../common/https.js");
const _sfc_main = {
  data() {
    return {
      loginFormData: {
        username: "",
        password: "",
        code: ""
      },
      loginRules: {
        username: {
          rules: [{
            required: true,
            errorMessage: "\u8D26\u53F7\u4E0D\u80FD\u4E3A\u7A7A"
          }]
        },
        password: {
          rules: [{
            required: true,
            errorMessage: "\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A"
          }, { validateFunction: common_utils_rulesUtils.rulesUtils.passwordRules() }]
        },
        code: {
          rules: [{
            required: true,
            errorMessage: "\u9A8C\u8BC1\u7801\u4E0D\u80FD\u4E3A\u7A7A"
          }, {
            validateFunction: common_utils_rulesUtils.rulesUtils.codeRules()
          }]
        }
      },
      codeDate: "",
      codeUrl: ""
    };
  },
  onShow() {
    this.getCode();
  },
  methods: {
    getCode() {
      this.codeDate = new Date().getTime();
      this.codeUrl = common_api_loginApi.loginApi.getCode() + this.codeDate;
    },
    Login(ref) {
      let that = this;
      this.$refs[ref].validate().then((res) => {
        that.LoginMethods();
      }).catch((err) => {
        console.log("err", err);
        that.getCode();
      }).finally((res) => {
        common_utils_utils.utils.hideToast();
      });
    },
    LoginMethods() {
      let that = this;
      common_utils_utils.utils.showToast("loading", "\u767B\u5F55\u4E2D");
      common_api_loginApi.loginApi.Login({ "time": that.codeDate }, that.loginFormData).then((res) => {
        if (res.data.success === false) {
          common_utils_utils.utils.showToast("error", res.data.msg);
          return;
        }
        that.UserByTokenMethods();
        common_utils_utils.utils.setCookieToken(res.data.data);
        common_utils_utils.utils.showToast("success", res.data.msg);
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/my/my"
          });
        }, 500);
      }).catch((err) => {
        common_utils_utils.utils.showToast("error", "\u9A8C\u8BC1\u7801\u8FC7\u671F,\u8BF7\u5728\u4E00\u5206\u949F\u5185\u767B\u5F55");
        that.getCode();
      });
    },
    UserByTokenMethods() {
      let that = this;
      common_api_userApi.userApi.getUserByToken().then((res) => {
        if (res.data.success === false) {
          common_utils_utils.utils.showToast("error", res.data.msg);
          return;
        }
        common_utils_utils.utils.setCookieUser(JSON.stringify(res.data.data));
      }).catch((err) => {
        common_utils_utils.utils.showToast("error", "\u767B\u5F55\u5931\u8D25:UserByTokenMethods:", +err);
        that.getCode();
        return;
      });
    },
    toMy() {
      common_vendor.index.switchTab({
        url: "/pages/my/my"
      });
    },
    toEmailLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/my/Login/EmailLogin"
      });
    },
    toRegister() {
      common_vendor.index.navigateTo({
        url: "/pages/my/Login/register"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_nav_bar2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_section2)();
}
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.toMy()),
    b: common_vendor.o(($event) => $options.toEmailLogin()),
    c: common_vendor.p({
      ["left-icon"]: "left",
      rightText: "\u90AE\u7BB1\u767B\u5F55",
      title: "\u8D26\u53F7\u5BC6\u7801\u767B\u5F55",
      shadow: "true",
      fixed: "true"
    }),
    d: common_vendor.o(($event) => $data.loginFormData.username = $event),
    e: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u8D26\u53F7",
      modelValue: $data.loginFormData.username
    }),
    f: common_vendor.p({
      label: "\u8D26\u53F7",
      required: true,
      name: "username"
    }),
    g: common_vendor.o(($event) => $data.loginFormData.password = $event),
    h: common_vendor.p({
      type: "password",
      placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
      modelValue: $data.loginFormData.password
    }),
    i: common_vendor.p({
      label: "\u5BC6\u7801",
      required: true,
      name: "password"
    }),
    j: common_vendor.o(($event) => $data.loginFormData.code = $event),
    k: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
      modelValue: $data.loginFormData.code
    }),
    l: common_vendor.p({
      label: "\u9A8C\u8BC1\u7801",
      required: true,
      name: "code"
    }),
    m: common_vendor.o((...args) => $options.getCode && $options.getCode(...args)),
    n: $data.codeUrl,
    o: common_vendor.sr("loginForm", "39a17fa4-2,39a17fa4-1"),
    p: common_vendor.p({
      rules: $data.loginRules,
      modelValue: $data.loginFormData
    }),
    q: common_vendor.o(($event) => $options.toRegister()),
    r: common_vendor.o(($event) => $options.Login("loginForm")),
    s: common_vendor.p({
      title: "\u7528\u6237\u767B\u5F55",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-39a17fa4"], ["__file", "G:/linshengwei/bysj2/yxlt2/pages/my/Login/Login.vue"]]);
wx.createPage(MiniProgramPage);
