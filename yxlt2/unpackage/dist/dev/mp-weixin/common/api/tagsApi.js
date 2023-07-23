"use strict";
const common_https = require("../https.js");
const tagsApi = {
  async getByPalteId(palteId) {
    return common_https.service({
      url: "/tags/get/" + palteId,
      method: "get"
    });
  }
};
exports.tagsApi = tagsApi;
