"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "card-article-index",
  props: {
    articleList: ""
  },
  data() {
    return {};
  },
  methods: {
    toLooke(id) {
      common_vendor.index.navigateTo({
        url: "/pages/index/article/article?id=" + id
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_tag2 + _easycom_uni_icons2 + _easycom_uni_card2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_icons + _easycom_uni_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.articleList, (item, k0, i0) => {
      return {
        a: item.avatar,
        b: common_vendor.t(item.nickname),
        c: common_vendor.t(item.createDate),
        d: common_vendor.t(item.category.name),
        e: common_vendor.t(item.title),
        f: common_vendor.t(item.summary),
        g: item.frontCover,
        h: common_vendor.o(($event) => $options.toLooke(item.id)),
        i: common_vendor.f(item.tagsList, (item2, k1, i1) => {
          return {
            a: "9cd037e2-1-" + i0 + "-" + i1 + "," + ("9cd037e2-0-" + i0),
            b: common_vendor.p({
              text: item2.name,
              inverted: "true",
              type: "success"
            })
          };
        }),
        j: "9cd037e2-2-" + i0 + "," + ("9cd037e2-0-" + i0),
        k: common_vendor.t(item.likesCounts),
        l: "9cd037e2-3-" + i0 + "," + ("9cd037e2-0-" + i0),
        m: common_vendor.t(item.viewCounts),
        n: "9cd037e2-4-" + i0 + "," + ("9cd037e2-0-" + i0),
        o: common_vendor.t(item.commentCounts),
        p: "9cd037e2-5-" + i0 + "," + ("9cd037e2-0-" + i0),
        q: common_vendor.t(item.collectionCounts),
        r: "9cd037e2-0-" + i0
      };
    }),
    b: common_vendor.p({
      type: "hand-up",
      size: "25",
      color: "#999"
    }),
    c: common_vendor.p({
      type: "eye",
      size: "25",
      color: "#999"
    }),
    d: common_vendor.p({
      type: "chatbubble",
      size: "25",
      color: "#999"
    }),
    e: common_vendor.p({
      type: "heart",
      size: "25",
      color: "#999"
    }),
    f: common_vendor.p({
      ["is-shadow"]: true
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/linshengwei/bysj2/yxlt2/components/card-article-index/card-article-index.vue"]]);
wx.createComponent(Component);
