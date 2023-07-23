"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_api_userApi = require("../../../common/api/userApi.js");
const common_api_loginApi = require("../../../common/api/loginApi.js");
const common_utils_utils = require("../../../common/utils/utils.js");
const common_utils_rulesUtils = require("../../../common/utils/rulesUtils.js");
require("../../../common/https.js");
const _sfc_main = {
  data() {
    return {
      emailForm: {
        email: "",
        code: ""
      },
      emailRules: {
        email: {
          rules: [
            {
              required: true,
              errorMessage: "\u8BF7\u8F93\u5165\u90AE\u7BB1"
            },
            { validateFunction: common_utils_rulesUtils.rulesUtils.emailRules() }
          ]
        },
        code: {
          rules: [
            {
              required: true,
              errorMessage: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801"
            },
            { validateFunction: common_utils_rulesUtils.rulesUtils.emailCodeRules() }
          ]
        }
      }
    };
  },
  methods: {
    getLoginEmailCode(ref) {
      this.$refs[ref].validateField(["email"]).then((res) => {
        common_api_loginApi.loginApi.getEmailCode({ "email": this.emailForm.email }).then((res2) => {
          common_utils_utils.utils.thenMathod(res2);
        }).catch((err) => {
          console.log("err", err);
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    loginEmail(ref) {
      this.$refs[ref].validate().then((res) => {
        this.loginEmailMethod();
      }).catch((err) => {
        console.log("err", err);
      });
    },
    loginEmailMethod() {
      common_api_loginApi.loginApi.LoginEmail(this.emailForm).then((res) => {
        if (res.data.success === false)
          return common_utils_utils.utils.showToast("error", res.data.msg);
        this.UserByTokenMethods();
        common_utils_utils.utils.setCookieToken(res.data.data);
        common_utils_utils.utils.showToast("success", res.data.msg);
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/my/my"
          });
        }, 500);
      }).catch((err) => {
        console.log("err", err);
      }).finally((res) => {
        common_utils_utils.utils.hideToast();
      });
    },
    UserByTokenMethods() {
      common_api_userApi.userApi.getUserByToken().then((res) => {
        if (res.data.success === false) {
          common_utils_utils.utils.showToast("error", res.data.msg);
          return;
        }
        common_utils_utils.utils.setCookieUser(JSON.stringify(res.data.data));
      }).catch((err) => {
        common_utils_utils.utils.showToast("error", "\u767B\u5F55\u5931\u8D25:UserByTokenMethods:", +err);
        return;
      });
    },
    toMy() {
      common_vendor.index.switchTab({
        url: "/pages/my/my"
      });
    },
    toLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/my/Login/Login"
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
    b: common_vendor.o(($event) => $options.toLogin()),
    c: common_vendor.p({
      ["left-icon"]: "left",
      rightText: "\u8D26\u53F7\u767B\u5F55",
      title: "\u90AE\u7BB1\u767B\u5F55",
      shadow: "true",
      fixed: "true"
    }),
    d: common_vendor.o(($event) => $data.emailForm.email = $event),
    e: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
      modelValue: $data.emailForm.email
    }),
    f: common_vendor.p({
      label: "\u90AE\u7BB1",
      required: true,
      name: "email"
    }),
    g: common_vendor.o(($event) => $data.emailForm.code = $event),
    h: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",
      modelValue: $data.emailForm.code
    }),
    i: common_vendor.o(($event) => $options.getLoginEmailCode("emailForm")),
    j: common_vendor.p({
      label: "\u9A8C\u8BC1\u7801",
      required: true,
      name: "code"
    }),
    k: common_vendor.sr("emailForm", "75803bdb-2,75803bdb-1"),
    l: common_vendor.p({
      rules: $data.emailRules,
      modelValue: $data.emailForm
    }),
    m: common_vendor.o(($event) => $options.toRegister()),
    n: common_vendor.o(($event) => $options.loginEmail("emailForm")),
    o: common_vendor.p({
      title: "\u90AE\u7BB1\u767B\u5F55",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-75803bdb"], ["__file", "G:/linshengwei/bysj2/yxlt2/pages/my/Login/EmailLogin.vue"]]);
wx.createPage(MiniProgramPage);
