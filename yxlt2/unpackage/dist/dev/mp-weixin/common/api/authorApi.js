"use strict";
const common_https = require("../https.js");
const authorApi = {
  isAuthor() {
    return common_https.service({
      url: "/author/isAuthor",
      method: "get"
    });
  },
  applyAuthot() {
    return common_https.service({
      url: "/author/apply",
      method: "post"
    });
  }
};
exports.authorApi = authorApi;
