"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_utils_utils = require("../../../../common/utils/utils.js");
const common_api_friendsUserApi = require("../../../../common/api/friendsUserApi.js");
require("../../../../common/https.js");
const _sfc_main = {
  data() {
    return {
      searchAddUser: "",
      friendsUserListSearch: [],
      friendsUserList: [],
      listDeleteFriendsUser: [],
      infoUserId: "",
      agreeFriendsUserData: {
        formUserId: "",
        toUserId: "",
        status: ""
      },
      deleteFriendsData: {
        formUserId: "",
        toUserId: ""
      }
    };
  },
  onShow() {
    this.infoUserId = common_utils_utils.utils.getCookieUser().id;
    this.friendsUserApplyList(this.infoUserId);
    this.getListDeletefriendsUser(this.infoUserId);
  },
  methods: {
    toBack() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    searchAddCancel(e) {
      common_api_friendsUserApi.friendsUserApi.getListSearchAddByUsernameOrNickname(e.value).then((res) => {
        if (res.data.success === false)
          return common_utils_utils.utils.showToast("error", res.data.msg);
        this.friendsUserListSearch = res.data.data;
      }).catch((err) => {
        console.log("error", err);
      });
    },
    toDetailed(userId) {
      common_vendor.index.navigateTo({
        url: "/pages/news/friends/add/addDetailed?userId=" + userId
      });
    },
    friendsUserApplyList(userId) {
      common_api_friendsUserApi.friendsUserApi.getFriendsUserApplyList(userId).then((res) => {
        if (res.data.success === false) {
          common_utils_utils.utils.showToast("error", res.data.msg);
          return;
        }
        this.friendsUserList = res.data.data;
        console.log(this.friendsUserList);
      }).catch((err) => {
        console.log("error", err);
      });
    },
    agreeFriendsUser(toUserId, formUserId) {
      this.agreeFriendsUserData.formUserId = formUserId;
      this.agreeFriendsUserData.toUserId = toUserId;
      this.agreeFriendsUserData.status = "1";
      common_api_friendsUserApi.friendsUserApi.updateStatus(this.agreeFriendsUserData).then((res) => {
        common_utils_utils.utils.thenMathod(res);
      }).catch((err) => {
        console.log(err);
      });
    },
    getListDeletefriendsUser(userId) {
      common_api_friendsUserApi.friendsUserApi.getListDeletefriendsUser(userId).then((res) => {
        if (res.data.success === false)
          return common_utils_utils.utils.showToast("error", res.data.msg);
        this.listDeleteFriendsUser = res.data.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    deleteFriends(formUserId, toUserId) {
      this.deleteFriendsData.formUserId = formUserId;
      this.deleteFriendsData.toUserId = toUserId;
      common_api_friendsUserApi.friendsUserApi.deleteFriendsUser(this.deleteFriendsData).then((res) => {
        common_utils_utils.utils.thenMathod();
      }).catch((err) => {
        console.log(err);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_nav_bar2 + _easycom_uni_search_bar2 + _easycom_uni_list_chat2 + _easycom_uni_list2 + _easycom_uni_section2)();
}
const _easycom_uni_nav_bar = () => "../../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_search_bar = () => "../../../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_list_chat = () => "../../../../uni_modules/uni-list/components/uni-list-chat/uni-list-chat.js";
const _easycom_uni_list = () => "../../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_search_bar + _easycom_uni_list_chat + _easycom_uni_list + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.toBack()),
    b: common_vendor.p({
      ["left-icon"]: "left",
      title: "\u6DFB\u52A0\u597D\u53CB",
      shadow: true,
      fixed: true
    }),
    c: common_vendor.o($options.searchAddCancel),
    d: common_vendor.o(($event) => $data.searchAddUser = $event),
    e: common_vendor.p({
      placeholder: "\u641C\u7D22\u6839\u636E\u7528\u6237\u540D\u6216\u8005\u8D26\u53F7",
      cancelText: "\u641C\u7D22",
      bgColor: "#EEEEEE",
      modelValue: $data.searchAddUser
    }),
    f: common_vendor.f($data.friendsUserListSearch, (friendsUser, k0, i0) => {
      return {
        a: common_vendor.o(($event) => $options.toDetailed(friendsUser.id)),
        b: "6d94ee41-4-" + i0 + "," + ("6d94ee41-3-" + i0),
        c: common_vendor.p({
          clickable: true,
          title: friendsUser.nickname,
          avatar: friendsUser.avatar
        }),
        d: "6d94ee41-3-" + i0 + ",6d94ee41-2"
      };
    }),
    g: common_vendor.p({
      border: true
    }),
    h: common_vendor.p({
      title: "\u641C\u7D22\u5230\u7684\u7528\u6237",
      type: "line"
    }),
    i: common_vendor.f($data.friendsUserList, (friendsUser, k0, i0) => {
      return common_vendor.e({
        a: friendsUser.formUserId == $data.infoUserId
      }, friendsUser.formUserId == $data.infoUserId ? {
        b: "6d94ee41-7-" + i0 + "," + ("6d94ee41-6-" + i0),
        c: common_vendor.p({
          title: friendsUser.nickname,
          avatar: friendsUser.avatar
        })
      } : {
        d: common_vendor.o(($event) => $options.agreeFriendsUser(friendsUser.toUserId, friendsUser.formUserId)),
        e: common_vendor.o(($event) => $options.agreeFriendsUser(friendsUser.toUserId, friendsUser.formUserId)),
        f: "6d94ee41-8-" + i0 + "," + ("6d94ee41-6-" + i0),
        g: common_vendor.p({
          clickable: true,
          title: friendsUser.formNickname,
          avatar: friendsUser.formAvatar
        })
      }, {
        h: "6d94ee41-6-" + i0 + ",6d94ee41-5"
      });
    }),
    j: common_vendor.p({
      border: true
    }),
    k: common_vendor.p({
      title: "\u597D\u53CB\u7533\u8BF7",
      type: "line"
    }),
    l: common_vendor.f($data.listDeleteFriendsUser, (friendsUser, k0, i0) => {
      return {
        a: common_vendor.o(($event) => $options.deleteFriends(friendsUser.formUserId, friendsUser.toUserId)),
        b: "6d94ee41-11-" + i0 + "," + ("6d94ee41-10-" + i0),
        c: common_vendor.p({
          clickable: true,
          title: friendsUser.nickname,
          avatar: friendsUser.avatar
        }),
        d: "6d94ee41-10-" + i0 + ",6d94ee41-9"
      };
    }),
    m: common_vendor.p({
      border: true
    }),
    n: common_vendor.p({
      title: "\u597D\u53CB\u5220\u9664\u901A\u77E5",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/linshengwei/bysj2/yxlt2/pages/news/friends/add/add.vue"]]);
wx.createPage(MiniProgramPage);
