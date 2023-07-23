"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "card-article",
  props: {
    article: {},
    manageDate: false
  },
  emits: ["to-looke", "revise", "delete-article"],
  data() {
    return {};
  },
  methods: {
    toLooke() {
      this.$emit("to-looke");
    },
    revise() {
      this.$emit("revise");
    },
    deleteArticle() {
      this.$refs.alertDialog.open();
    },
    dialogConfirm() {
      this.$emit("delete-article");
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_card2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_card + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($props.article.summary),
    b: $props.article.frontCover,
    c: common_vendor.o((...args) => $options.toLooke && $options.toLooke(...args)),
    d: common_vendor.p({
      type: "hand-up",
      size: "25",
      color: "#999"
    }),
    e: common_vendor.t($props.article.likesCounts),
    f: common_vendor.p({
      type: "eye",
      size: "25",
      color: "#999"
    }),
    g: common_vendor.t($props.article.viewCounts),
    h: common_vendor.p({
      type: "chatbubble",
      size: "25",
      color: "#999"
    }),
    i: common_vendor.t($props.article.commentCounts),
    j: common_vendor.p({
      type: "heart",
      size: "25",
      color: "#999"
    }),
    k: common_vendor.t($props.article.collectionCounts),
    l: $props.manageDate
  }, $props.manageDate ? {
    m: common_vendor.o((...args) => $options.revise && $options.revise(...args)),
    n: common_vendor.o((...args) => $options.deleteArticle && $options.deleteArticle(...args))
  } : {}, {
    o: common_vendor.p({
      ["sub-title"]: $props.article.createDate,
      title: $props.article.title,
      extra: $props.article.nickname,
      ["is-shadow"]: true
    }),
    p: common_vendor.o(($event) => $options.dialogConfirm()),
    q: common_vendor.p({
      type: "success",
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u5B9E",
      content: "\u786E\u5B9A\u5220\u9664\u5417"
    }),
    r: common_vendor.sr("alertDialog", "04b00ea2-5"),
    s: common_vendor.p({
      type: "dialog"
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/linshengwei/bysj2/yxlt2/components/card-article/card-article.vue"]]);
wx.createComponent(Component);
