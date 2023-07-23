"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_api_loginApi = require("../../../common/api/loginApi.js");
require("../../../common/https.js");
const common_utils_utils = require("../../../common/utils/utils.js");
const common_utils_rulesUtils = require("../../../common/utils/rulesUtils.js");
const _sfc_main = {
  data() {
    return {
      registerFormData: {
        username: "",
        nickname: "",
        password: ""
      },
      registerRules: {
        username: {
          rules: [{
            required: true,
            errorMessage: "\u8D26\u53F7\u4E0D\u80FD\u4E3A\u7A7A"
          }]
        },
        nickname: {
          rules: [{
            required: true,
            errorMessage: "\u6635\u79F0\u4E0D\u80FD\u4E3A\u7A7A"
          }]
        },
        password: {
          rules: [{
            required: true,
            errorMessage: "\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A"
          }, { validateFunction: common_utils_rulesUtils.rulesUtils.passwordRules() }]
        }
      }
    };
  },
  methods: {
    register(ref) {
      let that = this;
      this.$refs[ref].validate().then((res) => {
        that.registerMethods();
      }).catch((err) => {
        console.log("err", err);
      }).finally((res) => {
        common_utils_utils.utils.hideToast();
      });
    },
    registerMethods() {
      let that = this;
      common_utils_utils.utils.showToast("loading", "\u6CE8\u518C\u4E2D");
      common_api_loginApi.loginApi.Register(that.registerFormData).then((res) => {
        console.log(res);
        if (res.data.success === false)
          return common_utils_utils.utils.showToast("error", res.data.msg);
        common_utils_utils.utils.showToast("success", res.data.msg);
        setTimeout(() => {
          common_vendor.index.navigateTo({
            url: "/pages/my/Login/Login"
          });
        }, 500);
      }).catch((err) => {
        common_utils_utils.utils.showToast("error", err);
      });
    },
    toMy() {
      common_vendor.index.switchTab({
        url: "/pages/my/my"
      });
    },
    toRegister() {
      common_vendor.index.navigateTo({
        url: "/pages/my/Login/Login"
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
    a: common_vendor.o(($event) => $options.toRegister()),
    b: common_vendor.p({
      ["left-icon"]: "left",
      title: "\u8D26\u53F7\u6CE8\u518C",
      shadow: "true",
      fixed: "true"
    }),
    c: common_vendor.o(($event) => $data.registerFormData.username = $event),
    d: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u8D26\u53F7",
      modelValue: $data.registerFormData.username
    }),
    e: common_vendor.p({
      label: "\u8D26\u53F7",
      required: true,
      name: "username"
    }),
    f: common_vendor.o(($event) => $data.registerFormData.nickname = $event),
    g: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
      modelValue: $data.registerFormData.nickname
    }),
    h: common_vendor.p({
      label: "\u6635\u79F0",
      required: true,
      name: "nickname"
    }),
    i: common_vendor.o(($event) => $data.registerFormData.password = $event),
    j: common_vendor.p({
      type: "password",
      placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
      modelValue: $data.registerFormData.password
    }),
    k: common_vendor.p({
      label: "\u5BC6\u7801",
      required: true,
      name: "password"
    }),
    l: common_vendor.sr("registerForm", "8fb14e81-2,8fb14e81-1"),
    m: common_vendor.p({
      rules: $data.registerRules,
      modelValue: $data.registerFormData
    }),
    n: common_vendor.o(($event) => $options.register("registerForm")),
    o: common_vendor.p({
      title: "\u8D26\u53F7\u6CE8\u518C",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8fb14e81"], ["__file", "G:/linshengwei/bysj2/yxlt2/pages/my/Login/register.vue"]]);
wx.createPage(MiniProgramPage);
