"use strict";
const common_api_articleApi = require("../../../common/api/articleApi.js");
const common_api_palteApi = require("../../../common/api/palteApi.js");
const common_vendor = require("../../../common/vendor.js");
require("../../../common/https.js");
require("../../../common/utils/utils.js");
const _sfc_main = {
  data() {
    return {
      palteId: "",
      palteList: [],
      articleList: []
    };
  },
  onLoad() {
    this.getPalte();
  },
  methods: {
    getPalte() {
      let that = this;
      common_api_palteApi.palteApi.GetPalte().then((res) => {
        if (res.data.success === false) {
          utils.showToast("error", res.data.msg);
          return;
        }
        let palteListLet = res.data.data;
        for (let i = 0; i < palteListLet.length; i++) {
          let palte = {
            id: "",
            name: "",
            type: "default",
            plain: true
          };
          palte.id = palteListLet[i].id;
          palte.name = palteListLet[i].name;
          if (i == 0) {
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
      this.articleList = [];
      this.getArticle();
    },
    getArticle() {
      let that = this;
      common_api_articleApi.articleApi.getArticleByUserCollect(this.palteId).then((res) => {
        if (res.data.success === false)
          return;
        that.articleList = res.data.data;
      }).catch((err) => {
        console.log(err);
      });
    }
  }
};
if (!Array) {
  const _easycom_card_article_index2 = common_vendor.resolveComponent("card-article-index");
  _easycom_card_article_index2();
}
const _easycom_card_article_index = () => "../../../components/card-article-index/card-article-index.js";
if (!Math) {
  _easycom_card_article_index();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.palteList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.type,
        c: item.plain,
        d: common_vendor.n(_ctx.active === index ? "scrollbar-demo-item2" : "scrollbar-demo-item"),
        e: index,
        f: common_vendor.o(($event) => $options.onPalte(index, item), index)
      };
    }),
    b: $data.articleList.length == 0
  }, $data.articleList.length == 0 ? {} : {}, {
    c: common_vendor.p({
      articleList: $data.articleList
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/linshengwei/bysj2/yxlt2/pages/my/collect/collect.vue"]]);
wx.createPage(MiniProgramPage);
