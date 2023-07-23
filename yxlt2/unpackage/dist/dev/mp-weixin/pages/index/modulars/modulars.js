"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_api_categoryApi = require("../../../common/api/categoryApi.js");
const common_api_articleApi = require("../../../common/api/articleApi.js");
const common_api_announcementApi = require("../../../common/api/announcementApi.js");
const common_utils_utils = require("../../../common/utils/utils.js");
require("../../../common/https.js");
const _sfc_main = {
  data() {
    return {
      palteId: "",
      modeularsId: "",
      modeularsName: "",
      announcement: "",
      announcementTrue: true,
      value: ["0"],
      active2: 0,
      sortList: [
        {
          name: "\u6700\u65B0"
        },
        {
          name: "\u70ED\u5EA6"
        },
        {
          name: "\u8BC4\u8BBA\u6700\u591A"
        },
        {
          name: "\u6536\u85CF\u6570\u6700\u591A"
        },
        {
          name: "\u5206\u7C7B"
        }
      ],
      categoryList: [],
      categoryListVo: [],
      categoryVo: {
        text: "",
        value: ""
      },
      categoryValue: "",
      page: "1",
      pageSize: "3",
      categoryId: "",
      articleList2: [],
      articleList: [],
      ReachBottomStatus: "more",
      getArticleDate: {
        "sort": "",
        "modularsId": "",
        "palteId": "",
        "pages": 1,
        "pagesSize": 3
      }
    };
  },
  onLoad(e) {
    this.palteId = e.palteId;
    this.modeularsId = e.modeularsId;
    this.modeularsName = e.modeularsName;
    this.getArticleDate.modularsId = e.modeularsId;
    this.getArticleDate.palteId = e.palteId;
    this.getAnnouncement();
    this.getArticle();
    this.getCategory();
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
    toBack() {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    },
    getAnnouncement() {
      common_api_announcementApi.announcementApi.getByPalteIdAndModularsId(this.palteId, this.modeularsId).then((res) => {
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
      console.log(this.active2);
      this.articleList = [];
      this.getArticleDate.pages = 1;
      this.getArticleDate.sort = this.active2.toString();
      this.getArticle();
    },
    async getCategory() {
      let that = this;
      const res = await common_api_categoryApi.categoryApi.getByPalteId(this.palteId);
      if (res.data.success === false)
        return common_utils_utils.utils.showToast("error", res.data.msg);
      that.categoryList = res.data.data;
      for (let i = 0; i < that.categoryList.length; i++) {
        that.categoryVo.value = that.categoryList[i].id;
        that.categoryVo.text = that.categoryList[i].name;
        that.categoryListVo.push(that.categoryVo);
        that.categoryVo = { text: "", value: "" };
      }
    },
    categoryChange(e) {
      this.categoryId = e;
      this.getArticleByCategory(e);
    },
    getArticle() {
      let that = this;
      this.getArticleDate.sort = this.active2.toString();
      common_api_articleApi.articleApi.getBySortAndPalteAndModulersId(this.getArticleDate).then((res) => {
        if (res.data.success === false)
          return;
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
    },
    getArticleByCategory(e) {
      let that = this;
      if (that.categoryValue !== e) {
        that.articleList2 = [];
      }
      common_api_articleApi.articleApi.getArticleByCategory(that.modeularsId, e, this.page, this.pageSize).then((res) => {
        if (res.data.success === false)
          return;
        if (that.articleList2.length === 0) {
          that.articleList2 = res.data.data;
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
        that.articleList2 = that.articleList2.concat(res.data.data);
      }).catch((err) => {
        console.log(err);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_card_article_index2 = common_vendor.resolveComponent("card-article-index");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_nav_bar2 + _easycom_uni_notice_bar2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_data_select2 + _easycom_card_article_index2 + _easycom_uni_load_more2)();
}
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_notice_bar = () => "../../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_collapse_item = () => "../../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_data_select = () => "../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_card_article_index = () => "../../../components/card-article-index/card-article-index.js";
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_notice_bar + _easycom_uni_collapse_item + _easycom_uni_collapse + _easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_data_select + _easycom_card_article_index + _easycom_uni_load_more)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $options.toBack()),
    b: common_vendor.p({
      ["left-icon"]: "left",
      title: $data.modeularsName,
      shadow: true,
      fixed: true
    }),
    c: $data.announcementTrue
  }, $data.announcementTrue ? {
    d: common_vendor.o(($event) => $options.onAnnouncement()),
    e: common_vendor.p({
      showClose: true,
      single: true,
      ["show-get-more"]: true,
      ["show-icon"]: true,
      scrollable: true,
      text: $data.announcement
    })
  } : {}, {
    f: common_vendor.p({
      title: "\u516C\u544A"
    }),
    g: common_vendor.sr("collapse", "26cd2bbe-1"),
    h: common_vendor.o(($event) => $data.value = $event),
    i: common_vendor.p({
      modelValue: $data.value
    }),
    j: common_vendor.o(($event) => $options.closeAnnouncementpopup()),
    k: common_vendor.p({
      type: "info",
      cancelText: "\u5173\u95ED\u516C\u544A\u680F",
      title: "\u516C\u544A",
      content: $data.announcement
    }),
    l: common_vendor.sr("announcementDialog", "26cd2bbe-4"),
    m: common_vendor.p({
      type: "dialog"
    }),
    n: common_vendor.f($data.sortList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.o(($event) => $options.onSort(index), index),
        c: index,
        d: common_vendor.n($data.active2 === index ? "sort2" : "sort")
      };
    }),
    o: $data.active2 == 4
  }, $data.active2 == 4 ? {
    p: common_vendor.o($options.categoryChange),
    q: common_vendor.o(($event) => $data.categoryValue = $event),
    r: common_vendor.p({
      localdata: $data.categoryListVo,
      modelValue: $data.categoryValue
    })
  } : {}, {
    s: $data.active2 == 4
  }, $data.active2 == 4 ? {
    t: common_vendor.p({
      articleList: $data.articleList2
    })
  } : {
    v: common_vendor.p({
      articleList: $data.articleList
    })
  }, {
    w: common_vendor.p({
      status: $data.ReachBottomStatus
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/linshengwei/bysj2/yxlt2/pages/index/modulars/modulars.vue"]]);
wx.createPage(MiniProgramPage);
