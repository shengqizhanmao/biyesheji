"use strict";
const common_vendor = require("../../common/vendor.js");
const common_api_articleApi = require("../../common/api/articleApi.js");
const common_api_palteApi = require("../../common/api/palteApi.js");
const common_utils_utils = require("../../common/utils/utils.js");
const common_api_modularsApi = require("../../common/api/modularsApi.js");
require("../../common/https.js");
const common_api_announcementApi = require("../../common/api/announcementApi.js");
const _sfc_main = {
  data() {
    return {
      palteId: "",
      palteList: [],
      active: 0,
      modularsList: [],
      announcement: "",
      announcementTrue: true,
      collapse: ["0"],
      active2: 0,
      sortList: [{ name: "\u6700\u65B0" }, { name: "\u70B9\u8D5E\u6700\u591A" }, { name: "\u8BC4\u8BBA\u6700\u591A" }, { name: "\u6536\u85CF\u6570\u6700\u591A" }],
      articleList: [],
      ReachBottomStatus: "more",
      getArticleDate: {
        "sort": "",
        "modularsId": "0",
        "palteId": "",
        "pages": 1,
        "pagesSize": 3
      }
    };
  },
  onLoad() {
    this.getPalte();
  },
  onPullDownRefresh() {
    setTimeout(function() {
      common_vendor.index.stopPullDownRefresh();
      location.reload();
    }, 1e3);
  },
  onReachBottom() {
    this.ReachBottomStatus = "loading";
    this.getArticleDate.pages = this.getArticleDate.pages + 1;
    this.getArticle();
    setTimeout(() => {
      this.ReachBottomStatus = "no-more";
    }, 500);
    setTimeout(() => {
      this.ReachBottomStatus = "more";
    }, 1e3);
  },
  methods: {
    getPalte() {
      let that = this;
      common_api_palteApi.palteApi.GetPalte().then((res) => {
        if (res.data.success === false)
          return common_utils_utils.utils.showToast("error", res.data.msg);
        let palteListLet = [];
        palteListLet = res.data.data;
        for (let i = 0; i < palteListLet.length; i++) {
          let palte = { id: "", name: "", type: "default", plain: true };
          palte.id = palteListLet[i].id;
          palte.name = palteListLet[i].name;
          if (i === 0) {
            palte.type = "primary";
            palte.plain = false;
            that.onPalte(0, palte);
          }
          that.palteList.push(palte);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    onPalte(index, palte) {
      this.active = index;
      this.palteId = palte.id;
      for (let i = 0; i < this.palteList.length; i++) {
        this.palteList[i].palte = true;
        this.palteList[i].type = "default";
      }
      palte.plain = false;
      palte.type = "primary";
      this.getMoudeliars(palte.id);
      this.getAnnouncement();
      this.articleList = [];
      this.getArticleDate = { "sort": "", "modularsId": "0", "palteId": "", "pages": 1, "pagesSize": 3 };
      this.getArticle();
    },
    getMoudeliars(palteId) {
      common_api_modularsApi.modularsApi.GetModulars(palteId).then((res) => {
        if (res.data.success === false) {
          common_utils_utils.utils.showToast("error", res.data.msg);
          return;
        }
        this.modularsList = res.data.data;
      });
    },
    onModeulars(modeularsName, modeularsId) {
      common_vendor.index.navigateTo({
        url: "/pages/index/modulars/modulars?modeularsId=" + modeularsId + "&palteId=" + this.palteId + "&modeularsName=" + modeularsName
      });
    },
    getAnnouncement() {
      common_api_announcementApi.announcementApi.getByPalteIdAndModularsId(this.palteId, "0").then((res) => {
        if (res.data.success === false)
          return this.announcement = "\u65E0\u516C\u544A";
        this.announcement = res.data.data.content;
      }).catch((err) => {
        console.log(err);
      });
    },
    onAnnouncement() {
      this.$refs.announcementDialog.open();
    },
    closeAnnouncementpopup() {
      this.announcementTrue = false;
      this.$refs.announcementDialog.close();
    },
    onSort(index) {
      this.active2 = index;
      this.articleList = [];
      this.getArticleDate = {
        "sort": "",
        "modularsId": "0",
        "palteId": "",
        "pages": 1,
        "pagesSize": 3
      };
      this.getArticle();
    },
    getArticle() {
      let that = this;
      this.getArticleDate.sort = this.active2.toString();
      this.getArticleDate.palteId = this.palteId;
      common_api_articleApi.articleApi.getBySortAndPalteAndModulersId(this.getArticleDate).then((res) => {
        if (res.data.success === false)
          return console.log(res.data);
        if (that.articleList.length === 0) {
          that.articleList = res.data.data;
          if (res.data.data.length === 0) {
            setTimeout(() => {
              that.ReachBottomStatus = "no-more";
            }, 1500);
            return;
          }
          return;
        }
        if (res.data.data.length === 0) {
          setTimeout(() => {
            that.ReachBottomStatus = "no-more";
          }, 1500);
          return;
        }
        that.articleList = that.articleList.concat(res.data.data);
      }).catch((err) => {
        console.log(err);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_card_article_index2 = common_vendor.resolveComponent("card-article-index");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_card2 + _easycom_uni_notice_bar2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_card_article_index2 + _easycom_uni_load_more2)();
}
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_card_article_index = () => "../../components/card-article-index/card-article-index.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_card + _easycom_uni_notice_bar + _easycom_uni_collapse_item + _easycom_uni_collapse + _easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_card_article_index + _easycom_uni_load_more)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.palteList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.type,
        c: item.plain,
        d: common_vendor.n($data.active === index ? "scrollbar-demo-item2" : "scrollbar-demo-item"),
        e: index,
        f: common_vendor.o(($event) => $options.onPalte(index, item), index)
      };
    }),
    b: common_vendor.f($data.modularsList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.o(($event) => $options.onModeulars(item.name, item.id)),
        c: "65569641-2-" + i0 + ",65569641-1"
      };
    }),
    c: common_vendor.p({
      showBorder: false,
      square: false,
      column: $data.modularsList.length,
      ["border-color"]: "#03a9f4"
    }),
    d: common_vendor.p({
      ["is-full"]: true
    }),
    e: $data.announcementTrue
  }, $data.announcementTrue ? {
    f: common_vendor.o(($event) => $options.onAnnouncement()),
    g: common_vendor.p({
      showClose: true,
      single: true,
      ["show-get-more"]: true,
      ["show-icon"]: true,
      scrollable: true,
      text: $data.announcement
    })
  } : {}, {
    h: common_vendor.p({
      title: "\u516C\u544A"
    }),
    i: common_vendor.sr("collapse", "65569641-3"),
    j: common_vendor.o(($event) => $data.collapse = $event),
    k: common_vendor.p({
      modelValue: $data.collapse
    }),
    l: common_vendor.o(($event) => $options.closeAnnouncementpopup()),
    m: common_vendor.p({
      type: "info",
      cancelText: "\u5173\u95ED\u516C\u544A\u680F",
      title: "\u516C\u544A",
      content: $data.announcement
    }),
    n: common_vendor.sr("announcementDialog", "65569641-6"),
    o: common_vendor.p({
      type: "dialog"
    }),
    p: common_vendor.f($data.sortList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.o(($event) => $options.onSort(index), index),
        c: index,
        d: common_vendor.n($data.active2 === index ? "sort2" : "sort")
      };
    }),
    q: common_vendor.p({
      articleList: $data.articleList
    }),
    r: common_vendor.p({
      status: $data.ReachBottomStatus
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/linshengwei/bysj2/yxlt2/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
