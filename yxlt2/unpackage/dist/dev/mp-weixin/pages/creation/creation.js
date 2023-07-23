"use strict";
const common_vendor = require("../../common/vendor.js");
const common_api_authorApi = require("../../common/api/authorApi.js");
const common_utils_utils = require("../../common/utils/utils.js");
require("../../common/https.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {},
      isAuthorData: false,
      value: ["0"],
      gridList: [
        {
          "text": "\u67E5\u770B\u5E16\u5B50",
          "icon": "search",
          "to": "/pages/creation/seeArticle/seeArticle"
        },
        {
          "text": "\u521B\u4F5C\u5E16\u5B50",
          "icon": "compose",
          "to": "/pages/creation/creationArticle/creationArticle"
        }
      ]
    };
  },
  onShow() {
    this.userInfo = common_utils_utils.utils.getCookieUser();
    if (!common_utils_utils.utils.getCookieUser()) {
      common_utils_utils.utils.showToast("error", "\u672A\u767B\u5F55");
      return;
    }
    this.isAuthor();
  },
  reload() {
    location.reload();
  },
  methods: {
    isAuthor() {
      common_api_authorApi.authorApi.isAuthor().then((res) => {
        if (res.data.success === false) {
          this.showToast("error", res.data.msg);
          return;
        }
        this.isAuthorData = res.data.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    apply() {
      common_api_authorApi.authorApi.applyAuthot().then((res) => {
        common_utils_utils.utils.thenMathod(res);
      }).catch((err) => {
        console.log(err);
      });
    },
    changeTo(item) {
      common_vendor.index.navigateTo({
        url: item
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_nav_bar2 + _easycom_uni_icons2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_section2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_icons + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_collapse_item + _easycom_uni_collapse + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: "\u521B\u4F5C\u4E2D\u5FC3",
      shadow: true,
      fixed: true
    }),
    b: $data.isAuthorData
  }, $data.isAuthorData ? {
    c: common_vendor.f($data.gridList, (item, index, i0) => {
      return {
        a: "7771b4fb-6-" + i0 + "," + ("7771b4fb-5-" + i0),
        b: common_vendor.p({
          color: "#061fff",
          type: item.icon,
          size: "26"
        }),
        c: common_vendor.t(item.text),
        d: common_vendor.o(($event) => $options.changeTo(item.to), index),
        e: index,
        f: "7771b4fb-5-" + i0 + ",7771b4fb-4"
      };
    }),
    d: common_vendor.p({
      column: 4,
      showBorder: false,
      square: true
    }),
    e: common_vendor.p({
      title: "\u5E16\u5B50\u7BA1\u7406"
    }),
    f: common_vendor.o(($event) => $data.value = $event),
    g: common_vendor.p({
      modelValue: $data.value
    }),
    h: common_vendor.p({
      title: "\u521B\u4F5C\u8005\u670D\u52A1",
      type: "line"
    })
  } : {
    i: common_vendor.o(($event) => $options.apply())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/linshengwei/bysj2/yxlt2/pages/creation/creation.vue"]]);
wx.createPage(MiniProgramPage);
