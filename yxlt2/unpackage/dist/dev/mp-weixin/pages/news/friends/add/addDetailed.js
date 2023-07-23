"use strict";
const common_api_userApi = require("../../../../common/api/userApi.js");
const common_api_friendsUserApi = require("../../../../common/api/friendsUserApi.js");
const common_utils_utils = require("../../../../common/utils/utils.js");
const common_vendor = require("../../../../common/vendor.js");
const common_assets = require("../../../../common/assets.js");
require("../../../../common/https.js");
const _sfc_main = {
  data() {
    return {
      user: {},
      toUserId: "",
      addDate: {
        formUserId: "",
        toUserId: ""
      }
    };
  },
  onLoad(e) {
    this.addDate.formUserId = common_utils_utils.utils.getCookieUser().id;
    console.log(e.userId);
    this.toUserId = e.userId;
    this.getUserById(this.toUserId);
  },
  methods: {
    getUserById(toUserId) {
      common_api_userApi.userApi.getUserById(toUserId).then((res) => {
        if (res.data.success === false) {
          common_utils_utils.utils.showToast("error", res.data.msg);
          return;
        }
        this.user = res.data.data;
      }).catch((err) => {
        console.log("error", err);
      });
    },
    add() {
      this.addDate.toUserId = this.toUserId;
      console.log(this.addDate);
      common_api_friendsUserApi.friendsUserApi.addFriendsUser(this.addDate).then((res) => {
        if (res.data.success === false) {
          common_utils_utils.utils.showToast("error", res.data.msg);
          return;
        }
        common_utils_utils.utils.showToast("success", "\u7533\u8BF7\u597D\u53CB\u6210\u529F");
      }).catch((err) => {
        console.log("error", err);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.user.avatar
  }, $data.user.avatar ? {
    b: $data.user.avatar
  } : {
    c: common_assets._imports_0
  }, {
    d: $data.user.nickname
  }, $data.user.nickname ? {
    e: common_vendor.t($data.user.nickname)
  } : {}, {
    f: common_vendor.t($data.user.username),
    g: common_vendor.o(($event) => $options.add()),
    h: common_vendor.p({
      clickable: true
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/linshengwei/bysj2/yxlt2/pages/news/friends/add/addDetailed.vue"]]);
wx.createPage(MiniProgramPage);
