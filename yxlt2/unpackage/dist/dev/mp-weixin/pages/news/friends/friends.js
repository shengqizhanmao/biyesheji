"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_api_friendsUserApi = require("../../../common/api/friendsUserApi.js");
const common_utils_utils = require("../../../common/utils/utils.js");
require("../../../common/https.js");
const _sfc_main = {
  data() {
    return {
      addAvatar: [{ url: "../../../static/img/1.jpg" }],
      searchUser: "",
      userInfo: {},
      friendsUserList: [],
      friendsUserListSearch: []
    };
  },
  onShow() {
    this.getFriendsUserApi();
  },
  methods: {
    toDetailed(userId) {
      common_vendor.index.navigateTo({
        url: "/pages/news/friends/detailed/detailed?userId=" + userId
      });
    },
    toMy() {
      common_vendor.index.switchTab({
        url: "/pages/my/my"
      });
    },
    toAdd() {
      common_vendor.index.navigateTo({
        url: "/pages/news/friends/add/add"
      });
    },
    getFriendsUserApi() {
      this.userInfo = common_utils_utils.utils.getCookieUser();
      common_api_friendsUserApi.friendsUserApi.getFriendsUserList(this.userInfo.id).then((res) => {
        if (res.data.success === false) {
          common_utils_utils.utils.showToast("error", res.data.msg);
          return;
        }
        this.friendsUserList = res.data.data;
        this.friendsUserListSearch = res.data.data;
      }).catch((err) => {
        console.log("error", err);
      });
    },
    searchInput(e) {
      let friendsUserList2 = [];
      this.friendsUserListSearch.forEach((friendsUser) => {
        if (friendsUser.nickname.indexOf(e) !== -1) {
          friendsUserList2.push(friendsUser);
        }
      });
      this.friendsUserList = friendsUserList2;
      console.log(e);
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  (_easycom_uni_nav_bar2 + _easycom_uni_search_bar2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_list_chat2)();
}
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_search_bar = () => "../../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_list_chat = () => "../../../uni_modules/uni-list/components/uni-list-chat/uni-list-chat.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_search_bar + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_list_chat)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.toAdd()),
    b: common_vendor.o(($event) => $options.toMy()),
    c: common_vendor.p({
      ["left-icon"]: "left",
      ["right-icon"]: "personadd",
      title: "\u597D\u53CB",
      shadow: true,
      fixed: true
    }),
    d: common_vendor.o($options.searchInput),
    e: common_vendor.o(($event) => $data.searchUser = $event),
    f: common_vendor.p({
      placeholder: "\u641C\u7D22\u597D\u53CB",
      bgColor: "#EEEEEE",
      modelValue: $data.searchUser
    }),
    g: common_vendor.o(($event) => $options.toAdd()),
    h: common_vendor.p({
      title: "\u6DFB\u52A0\u597D\u53CB",
      link: true,
      ["badge-positon"]: "left"
    }),
    i: common_vendor.f($data.friendsUserList, (friendsUser, k0, i0) => {
      return {
        a: common_vendor.o(($event) => $options.toDetailed(friendsUser.toUserId)),
        b: "316aa0a3-5-" + i0 + ",316aa0a3-4",
        c: common_vendor.p({
          clickable: "true",
          title: friendsUser.nickname,
          avatar: friendsUser.avatar
        })
      };
    }),
    j: common_vendor.p({
      border: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/linshengwei/bysj2/yxlt2/pages/news/friends/friends.vue"]]);
wx.createPage(MiniProgramPage);
