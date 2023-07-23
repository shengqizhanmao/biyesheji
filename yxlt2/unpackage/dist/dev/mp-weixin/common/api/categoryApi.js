"use strict";
const common_https = require("../https.js");
const categoryApi = {
  getByPalteId(palteId) {
    return common_https.service({
      url: "/category/get/" + palteId,
      method: "get"
    });
  }
};
exports.categoryApi = categoryApi;
