"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_api_userApi = require("../../../common/api/userApi.js");
const common_utils_utils = require("../../../common/utils/utils.js");
require("../../../common/https.js");
const _sfc_main = {
  data() {
    return {
      toUserId: "",
      toUser: {}
    };
  },
  onLoad(e) {
    this.toUserId = e.toUserId;
    this.getToUser(this.toUserId);
  },
  methods: {
    toChat() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    getToUser(toUserId) {
      common_api_userApi.userApi.getUserById(toUserId).then((res) => {
        common_utils_utils.utils.thenMathod(res, true);
        this.toUser = res.data.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    toFriendsDetailed(userId) {
      common_vendor.index.navigateTo({
        url: "/pages/news/friends/detailed/detailed?userId=" + userId
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_nav_bar2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.toChat()),
    b: common_vendor.p({
      ["left-icon"]: "left",
      title: "\u804A\u5929\u4FE1\u606F",
      shadow: true,
      fixed: true
    }),
    c: $data.toUser.avatar,
    d: common_vendor.o(($event) => $options.toFriendsDetailed($data.toUser.id)),
    e: common_vendor.t($data.toUser.nickname),
    f: common_vendor.p({
      border: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/linshengwei/bysj2/yxlt2/pages/news/chat/chatDetailed.vue"]]);
wx.createPage(MiniProgramPage);
