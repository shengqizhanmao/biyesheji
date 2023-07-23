"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    toUser: {},
    valueList: [],
    formUser: {}
  },
  name: "chatBox",
  data() {
    return {};
  },
  methods: {
    toFriendsDetailed(userId) {
      common_vendor.index.navigateTo({
        url: "/pages/news/friends/detailed/detailed?userId=" + userId
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  _easycom_uni_card2();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  _easycom_uni_card();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.valueList, (item, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.createdDate),
        b: item.formUserId != $props.formUser.id
      }, item.formUserId != $props.formUser.id ? {
        c: common_vendor.o(($event) => $options.toFriendsDetailed($props.toUser.id)),
        d: $props.toUser.avatar,
        e: common_vendor.t(item.msg),
        f: "402c0e12-0-" + i0
      } : {
        g: common_vendor.t(item.msg),
        h: "402c0e12-1-" + i0,
        i: $props.formUser.avatar
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/linshengwei/bysj2/yxlt2/components/chatBox/chatBox.vue"]]);
wx.createComponent(Component);
