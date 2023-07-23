"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_api_articleApi = require("../../../common/api/articleApi.js");
const common_api_palteApi = require("../../../common/api/palteApi.js");
const common_utils_utils = require("../../../common/utils/utils.js");
require("../../../common/https.js");
const _sfc_main = {
  data() {
    return {
      palteId: "",
      status: "",
      articleList: [],
      palteList: [],
      active: 0,
      active2: 0,
      manageDate: false,
      sortList: [
        {
          name: "\u5BA1\u6838\u5931\u8D25"
        },
        {
          name: "\u5BA1\u6838\u4E2D"
        },
        {
          name: "\u5BA1\u6838\u901A\u8FC7"
        }
      ]
    };
  },
  onLoad() {
    if (common_utils_utils.utils.getCookieUser() == null) {
      common_utils_utils.utils.showToast("error", "\u672A\u767B\u5F55");
      return;
    }
    this.getPalte();
    this.status = "-1";
    this.getArticleByStatus();
  },
  methods: {
    manage() {
      this.manageDate = !this.manageDate;
    },
    toDetailed(item) {
      common_vendor.index.navigateTo({
        url: "/pages/index/article/article?id=" + item.id
      });
    },
    revise(id) {
      common_vendor.index.navigateTo({
        url: "/pages/creation/seeArticle/reviserArticle?articleId=" + id
      });
      console.log("\u4FEE\u6539");
    },
    deleteArticle(id) {
      let that = this;
      common_api_articleApi.articleApi.deleteByArticleId(id).then((res) => {
        if (res.data.success === false)
          return common_utils_utils.utils.showToast("error", res.data.msg);
        common_utils_utils.utils.showToast("success", "\u5220\u9664\u6210\u529F");
        setTimeout(() => {
          that.$router.go(0);
        }, 500);
      }).catch((err) => {
        console.log(err);
      });
    },
    toBack() {
      common_vendor.index.switchTab({
        url: "/pages/creation/creation"
      });
    },
    ontabtap1(index) {
      this.active = index;
      this.palteId = "";
      this.getArticleByStatus();
    },
    ontabtap(index, palteId) {
      this.active = index;
      this.palteId = palteId;
      this.getArticleByPalteIdAndStatus();
    },
    onSort(index) {
      this.active2 = index;
      this.articleList = [];
      this.status = (index - 1).toString();
      if (this.palteId === "")
        return this.getArticleByStatus();
      this.getArticleByPalteIdAndStatus();
    },
    getPalte() {
      common_api_palteApi.palteApi.GetPalte().then((res) => {
        if (res.data.success === false) {
          common_utils_utils.utils.showToast("error", res.data.msg);
          return;
        }
        this.palteList = res.data.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    getArticleByPalteIdAndStatus() {
      common_api_articleApi.articleApi.getArticleByPalteIdAndStatus(this.palteId, this.status).then((res) => {
        if (res.data.success === false) {
          common_utils_utils.utils.showToast("error", res.data.msg);
          return;
        }
        this.articleList = res.data.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    getArticleByStatus() {
      common_api_articleApi.articleApi.getArticleByStatus(this.status).then((res) => {
        if (res.data.success === false)
          return common_utils_utils.utils.showToast("error", res.data.msg);
        this.articleList = res.data.data;
      }).catch((err) => {
        console.log(err);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _component_el_scrollbar = common_vendor.resolveComponent("el-scrollbar");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_card_article2 = common_vendor.resolveComponent("card-article");
  (_easycom_uni_nav_bar2 + _component_el_scrollbar + _easycom_uni_card2 + _easycom_card_article2)();
}
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_card_article = () => "../../../components/card-article/card-article.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_card + _easycom_card_article)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $options.toBack()),
    b: common_vendor.o(($event) => $options.manage()),
    c: common_vendor.p({
      ["left-icon"]: "left",
      title: "\u67E5\u770B\u5E16\u5B50",
      rightText: "\u7BA1\u7406",
      shadow: true,
      fixed: true
    }),
    d: common_vendor.n($data.active === 0 ? "scrollbar-demo-item2" : "scrollbar-demo-item"),
    e: common_vendor.o(($event) => $options.ontabtap1(0)),
    f: common_vendor.f($data.palteList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.n($data.active === index + 1 ? "scrollbar-demo-item2" : "scrollbar-demo-item"),
        c: index + 1,
        d: common_vendor.o(($event) => $options.ontabtap(index + 1, item.id), index + 1)
      };
    }),
    g: common_vendor.f($data.sortList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.o(($event) => $options.onSort(index), index),
        c: index,
        d: common_vendor.n($data.active2 === index ? "sort2" : "sort")
      };
    }),
    h: $data.articleList.length === 0
  }, $data.articleList.length === 0 ? {} : {}, {
    i: common_vendor.f($data.articleList, (item, k0, i0) => {
      return {
        a: common_vendor.o(($event) => $options.deleteArticle(item.id)),
        b: common_vendor.o(($event) => $options.revise(item.id)),
        c: common_vendor.o(($event) => $options.toDetailed(item)),
        d: "cec8e7ba-3-" + i0,
        e: common_vendor.p({
          manageDate: $data.manageDate,
          article: item
        })
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/linshengwei/bysj2/yxlt2/pages/creation/seeArticle/seeArticle.vue"]]);
wx.createPage(MiniProgramPage);
