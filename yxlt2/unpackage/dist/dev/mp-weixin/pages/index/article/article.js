"use strict";
const common_api_articleLikesCollectionApi = require("../../../common/api/articleLikesCollectionApi.js");
const common_api_articleApi = require("../../../common/api/articleApi.js");
const common_api_commentApi = require("../../../common/api/commentApi.js");
const common_utils_utils = require("../../../common/utils/utils.js");
const common_vendor = require("../../../common/vendor.js");
require("../../../common/https.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {},
      scrollTop: -100,
      id: "",
      article: {},
      body: {},
      category: {},
      collection: false,
      likes: false,
      likesText: {
        contentDefault: "\u70B9\u8D5E",
        contentFav: "\u5DF2\u70B9\u8D5E"
      },
      updateLikesCollectionData: {
        "articleId": "",
        "likes": "0",
        "collection": "0"
      },
      LikesCollectionData: {},
      commentInput: "",
      commentSummit: {
        "articleId": "",
        "content": "",
        "parentId": "0",
        "toUserId": "0"
      },
      commentList: []
    };
  },
  onLoad(e) {
    this.id = e.id;
    this.commentSummit.articleId = e.id;
    this.updateLikesCollectionData.articleId = e.id;
    this.getArticle(e.id);
    this.getComment(e.id);
    this.getArticleLikesCollection(e.id);
    this.userInfo = common_utils_utils.utils.getCookieUser();
  },
  methods: {
    getArticle(id) {
      let that = this;
      common_api_articleApi.articleApi.getArticleDetail(id).then((res) => {
        if (res.data.success === false)
          return common_utils_utils.utils.showToast("error", res.data.msg);
        that.article = res.data.data;
        that.body = that.article.body;
        that.category = that.article.category;
      }).catch((err) => {
        console.log(err);
      });
    },
    likesClick() {
      this.likes = !this.likes;
      if (this.likes) {
        this.updateLikesCollectionData.likes = "1";
      } else {
        this.updateLikesCollectionData.likes = "0";
      }
      let that = this;
      common_api_articleLikesCollectionApi.articleLikesCollectionApi.updateByArticleId(this.updateLikesCollectionData).then((res) => {
        if (res.data.success === false) {
          common_utils_utils.utils.showToast("error", res.data.msg);
          that.likes = !that.likes;
          return;
        }
        that.getArticle(that.id);
        that.getArticleLikesCollection(that.id);
      }).catch((err) => {
        console.log(err);
      });
    },
    collectionClick() {
      this.collection = !this.collection;
      if (this.collection) {
        this.updateLikesCollectionData.collection = "1";
      } else {
        this.updateLikesCollectionData.collection = "0";
      }
      let that = this;
      common_api_articleLikesCollectionApi.articleLikesCollectionApi.updateByArticleId(this.updateLikesCollectionData).then((res) => {
        if (res.data.success === false) {
          common_utils_utils.utils.showToast("error", res.data.msg);
          that.collection = !that.collection;
          return;
        }
        that.getArticle(that.id);
        that.getArticleLikesCollection(that.id);
      }).catch((err) => {
        console.log(err);
      });
    },
    getArticleLikesCollection(id) {
      let that = this;
      common_api_articleLikesCollectionApi.articleLikesCollectionApi.getByArticleId(id).then((res) => {
        if (res.data.success === false) {
          return;
        }
        that.LikesCollectionData = res.data.data;
        if (that.LikesCollectionData == null) {
          return;
        }
        if (that.LikesCollectionData.collection == "1") {
          that.updateLikesCollectionData.collection = "1";
          that.collection = true;
        }
        if (that.LikesCollectionData.likes == "1") {
          that.updateLikesCollectionData.likes = "1";
          that.likes = true;
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    focus() {
      this.$refs.inputDialog.open();
    },
    commentInputSubmit(val) {
      let that = this;
      this.commentSummit.content = val;
      common_api_commentApi.commentAPi.createComment(this.commentSummit).then((res) => {
        if (res.data.success === false) {
          common_utils_utils.utils.showToast("error", res.data.msg);
          return;
        }
        common_utils_utils.utils.showToast("success", res.data.msg);
        that.getComment(that.id);
      }).catch((err) => {
        console.log(err);
      }).finally((res) => {
        that.commentSummit = { "articleId": that.id, "content": "", "parentId": "0", "toUserId": "0" };
      });
    },
    getComment(id) {
      let that = this;
      common_api_commentApi.commentAPi.getComment(id).then((res) => {
        if (res.data.success === false)
          return;
        that.commentList = res.data.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    reply(parentId, userId) {
      this.commentSummit.parentId = parentId;
      this.commentSummit.toUserId = userId;
      this.$refs.inputDialog2.open();
    },
    deleteComment(parentId) {
      let that = this;
      common_api_commentApi.commentAPi.deleteComment(parentId).then((res) => {
        if (res.data.success === false) {
          common_utils_utils.utils.showToast("error", res.data.msg);
          return;
        }
        that.getComment(that.id);
      }).catch((err) => {
        console.log(err);
      });
    }
  }
};
if (!Array) {
  const _easycom_mp_html2 = common_vendor.resolveComponent("mp-html");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_comment_article2 = common_vendor.resolveComponent("comment-article");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_fav2 = common_vendor.resolveComponent("uni-fav");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_mp_html2 + _easycom_uni_tag2 + _easycom_uni_icons2 + _easycom_comment_article2 + _easycom_uni_easyinput2 + _easycom_uni_fav2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_mp_html = () => "../../../uni_modules/mp-html/components/mp-html/mp-html.js";
const _easycom_uni_tag = () => "../../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_comment_article = () => "../../../components/comment-article/comment-article.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_fav = () => "../../../uni_modules/uni-fav/components/uni-fav/uni-fav.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_mp_html + _easycom_uni_tag + _easycom_uni_icons + _easycom_comment_article + _easycom_uni_easyinput + _easycom_uni_fav + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.article.avatar,
    b: common_vendor.t($data.article.nickname),
    c: common_vendor.t($data.category.name),
    d: common_vendor.t($data.article.title),
    e: common_vendor.t($data.article.createDate),
    f: common_vendor.p({
      content: $data.body.contentHtml
    }),
    g: common_vendor.f($data.article.tagsList, (item, k0, i0) => {
      return {
        a: "0c68500c-1-" + i0,
        b: common_vendor.p({
          text: item.name,
          inverted: "true",
          type: "success"
        })
      };
    }),
    h: common_vendor.p({
      type: "eye",
      size: "25",
      color: "#000000"
    }),
    i: common_vendor.t($data.article.viewCounts),
    j: common_vendor.p({
      type: "chatbubble",
      size: "25",
      color: "#000000"
    }),
    k: common_vendor.t($data.article.commentCounts),
    l: common_vendor.o($options.deleteComment),
    m: common_vendor.o($options.reply),
    n: common_vendor.p({
      userInfo: $data.userInfo,
      commentList: $data.commentList
    }),
    o: $data.scrollTop,
    p: common_vendor.o(($event) => $options.focus()),
    q: common_vendor.p({
      placeholder: "\u8BC4\u8BBA"
    }),
    r: common_vendor.o(($event) => $options.collectionClick()),
    s: common_vendor.p({
      checked: $data.collection
    }),
    t: common_vendor.t($data.article.collectionCounts),
    v: common_vendor.o(($event) => $options.likesClick()),
    w: common_vendor.p({
      star: false,
      ["content-text"]: $data.likesText,
      checked: $data.likes
    }),
    x: common_vendor.t($data.article.likesCounts),
    y: common_vendor.sr("inputClose", "0c68500c-9,0c68500c-8"),
    z: common_vendor.o($options.commentInputSubmit),
    A: common_vendor.p({
      mode: "input",
      title: "\u8F93\u5165\u8BC4\u8BBA",
      value: "",
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    }),
    B: common_vendor.sr("inputDialog", "0c68500c-8"),
    C: common_vendor.sr("inputClose2", "0c68500c-11,0c68500c-10"),
    D: common_vendor.o($options.commentInputSubmit),
    E: common_vendor.p({
      mode: "input",
      title: "\u8F93\u5165\u8BC4\u8BBA",
      value: "",
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    }),
    F: common_vendor.sr("inputDialog2", "0c68500c-10")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/linshengwei/bysj2/yxlt2/pages/index/article/article.vue"]]);
wx.createPage(MiniProgramPage);
