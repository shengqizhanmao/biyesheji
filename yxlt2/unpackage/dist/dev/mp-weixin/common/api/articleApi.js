"use strict";
const common_https = require("../https.js");
const articleApi = {
  async Img(img) {
    return common_https.service({
      url: "/article/img",
      method: "post",
      data: img
    });
  },
  async applyArticle(articleFormData) {
    return common_https.service({
      url: "/article/apply",
      method: "post",
      data: articleFormData
    });
  },
  async get() {
    return common_https.service({
      url: "/article/get",
      method: "get"
    });
  },
  async getById(articleId) {
    return common_https.service({
      url: "/article/get/" + articleId,
      method: "get"
    });
  },
  async getArticleDetail(articleId) {
    return common_https.service({
      url: "/article/getArticleDetail/" + articleId,
      method: "get"
    });
  },
  async deleteByArticleId(articleId) {
    return common_https.service({
      url: "/article/delete/" + articleId,
      method: "post"
    });
  },
  async updateArticle(articleFormData) {
    return common_https.service({
      url: "/article/update",
      method: "post",
      data: articleFormData
    });
  },
  async getBySortAndPalteAndModulersId(getArticleDate) {
    return common_https.service({
      url: "/article/getBySortAndPalteAndModulersId",
      method: "post",
      data: getArticleDate
    });
  },
  async getArticleByCategory(modularsId, categoryId, page, pageSize) {
    return common_https.service({
      url: "/article/getArticleByCategory/" + modularsId + "/" + categoryId + "/" + page + "/" + pageSize,
      method: "get"
    });
  },
  async getArticleByUserCollect(palteId) {
    return common_https.service({
      url: "/article/getArticleByUserCollect/" + palteId,
      method: "get"
    });
  },
  async getArticleByStatus(status) {
    return common_https.service({
      url: "/article/getArticleByStatus/" + status,
      method: "get"
    });
  },
  async getArticleByPalteIdAndStatus(palteId, status) {
    return common_https.service({
      url: "/article/getArticleByPalteIdAndStatus/" + palteId + "/" + status,
      method: "get"
    });
  }
};
exports.articleApi = articleApi;
