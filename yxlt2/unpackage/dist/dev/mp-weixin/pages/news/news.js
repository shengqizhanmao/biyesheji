"use strict";
const common_vendor = require("../../common/vendor.js");
const common_api_friendsApi = require("../../common/api/friendsApi.js");
const common_utils_utils = require("../../common/utils/utils.js");
require("../../common/https.js");
const _sfc_main = {
  data() {
    return {
      friendsVoList: []
    };
  },
  onShow() {
    if (common_utils_utils.utils.getCookieUser()) {
      this.getVo();
      let that = this;
      common_vendor.index.$on("toBackChat", function(data) {
        that.getVo();
      });
    } else {
      common_utils_utils.utils.showToast("error", "\u672A\u767B\u5F55");
    }
  },
  reload() {
    location.reload();
  },
  methods: {
    getVo() {
      let that = this;
      common_api_friendsApi.friendsApi.getVo().then((res) => {
        if (res.data.success === false)
          return common_utils_utils.utils.showToast("error", res.data.msg);
        that.friendsVoList = res.data.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    toChat(toUserId) {
      common_vendor.index.navigateTo({
        url: "/pages/news/chat/chat?toUserId=" + toUserId
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_nav_bar2 + _easycom_uni_list_chat2 + _easycom_uni_list2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_list_chat = () => "../../uni_modules/uni-list/components/uni-list-chat/uni-list-chat.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_list_chat + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "\u6D88\u606F",
      shadow: true,
      fixed: true
    }),
    b: common_vendor.f($data.friendsVoList, (friendsUser, k0, i0) => {
      return {
        a: common_vendor.o(($event) => $options.toChat(friendsUser.toUserId)),
        b: "c4900d0a-2-" + i0 + "," + ("c4900d0a-1-" + i0),
        c: common_vendor.p({
          clickable: true,
          note: friendsUser.msg,
          time: friendsUser.createDate,
          title: friendsUser.nickname,
          avatar: friendsUser.avatar
        }),
        d: "c4900d0a-1-" + i0
      };
    }),
    c: common_vendor.p({
      border: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/linshengwei/bysj2/yxlt2/pages/news/news.vue"]]);
wx.createPage(MiniProgramPage);
