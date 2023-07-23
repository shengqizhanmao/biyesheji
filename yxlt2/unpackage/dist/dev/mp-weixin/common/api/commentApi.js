"use strict";
const common_https = require("../https.js");
const commentAPi = {
  async getComment(articleId) {
    return common_https.service({
      url: "/comment/get/" + articleId,
      method: "get"
    });
  },
  async createComment(commentSummit) {
    return common_https.service({
      url: "/comment/create",
      method: "post",
      data
    });
  },
  async deleteComment(id) {
    return common_https.service({
      url: "/comment/delete/" + id,
      method: "post"
    });
  }
};
exports.commentAPi = commentAPi;
