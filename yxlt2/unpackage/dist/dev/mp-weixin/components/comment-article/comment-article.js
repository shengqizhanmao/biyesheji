"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "comment-article",
  props: {
    commentList: {},
    userInfo: {}
  },
  emits: ["reply", "deleteComment"],
  data() {
    return {};
  },
  methods: {
    reply(parentId, userId) {
      this.$emit("reply", parentId, userId);
    },
    deleteComment(parentId) {
      this.$emit("deleteComment", parentId);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.commentList, (item, k0, i0) => {
      return common_vendor.e({
        a: item.author.avatar,
        b: common_vendor.t(item.author.nickname),
        c: common_vendor.t(item.layer),
        d: $props.userInfo && $props.userInfo.id === item.author.id
      }, $props.userInfo && $props.userInfo.id === item.author.id ? {
        e: common_vendor.o(($event) => $options.deleteComment(item.id))
      } : {}, {
        f: common_vendor.t(item.content),
        g: item.childrens.length != 0
      }, item.childrens.length != 0 ? {
        h: common_vendor.f(item.childrens, (item2, k1, i1) => {
          return common_vendor.e({
            a: item2.author.avatar,
            b: item2.parentId == item.id
          }, item2.parentId == item.id ? {
            c: common_vendor.t(item2.author.nickname)
          } : {
            d: common_vendor.t(item2.author.nickname),
            e: common_vendor.t(item2.toUser.nickname)
          }, {
            f: $props.userInfo && $props.userInfo.id === item2.author.id
          }, $props.userInfo && $props.userInfo.id === item2.author.id ? {
            g: common_vendor.o(($event) => $options.deleteComment(item2.id))
          } : {}, {
            h: common_vendor.t(item2.content),
            i: common_vendor.o(($event) => $options.reply(item2.id, item2.author.id))
          });
        })
      } : {}, {
        i: common_vendor.t(item.createDate),
        j: common_vendor.o(($event) => $options.reply(item.id, item.author.id))
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/linshengwei/bysj2/yxlt2/components/comment-article/comment-article.vue"]]);
wx.createComponent(Component);
