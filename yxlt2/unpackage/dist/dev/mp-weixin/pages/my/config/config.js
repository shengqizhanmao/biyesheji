"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_utils_utils = require("../../../common/utils/utils.js");
const common_api_loginApi = require("../../../common/api/loginApi.js");
require("../../../common/https.js");
const _sfc_main = {
  data() {
    return {
      sublist: {
        "title": "\u5173\u4E8E",
        "to": "",
        "icon": "info"
      }
    };
  },
  methods: {
    logout() {
      common_api_loginApi.loginApi.Logout().then((res) => {
        if (res.data.success === false) {
          common_utils_utils.utils.showToast("error", res.data.msg);
          return;
        }
        common_utils_utils.utils.showToast("success", res.data.msg);
        common_utils_utils.utils.deleteCookieUser();
        common_utils_utils.utils.deleteCookieToken();
        common_vendor.index.$emit("logout", { msg: "\u5173\u95EDwebSocket\u8FDE\u63A5" });
        common_vendor.index.$emit("logout-data", { msg: "\u6E05\u7A7A\u6570\u636E" });
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/my/my"
          });
        }, 500);
      }).catch((err) => {
        console.log("err", err);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: $data.sublist.title,
      link: true,
      to: $data.sublist.to,
      ["show-extra-icon"]: true,
      extraIcon: {
        type: $data.sublist.icon,
        color: "#999"
      }
    }),
    b: common_vendor.o(($event) => $options.logout()),
    c: common_vendor.p({
      clickable: "true"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/linshengwei/bysj2/yxlt2/pages/my/config/config.vue"]]);
wx.createPage(MiniProgramPage);
