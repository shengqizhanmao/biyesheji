"use strict";
const common_https = require("../https.js");
const articleLikesCollectionApi = {
  async getByArticleId(articleId) {
    return common_https.service({
      url: "/articleLikesCollection/get/" + articleId,
      method: "get"
    });
  },
  async updateByArticleId(updateLikesCollectionData) {
    return common_https.service({
      url: "/articleLikesCollection/updateByArticleId",
      method: "post",
      data: updateLikesCollectionData
    });
  }
};
exports.articleLikesCollectionApi = articleLikesCollectionApi;
