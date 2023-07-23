"use strict";
const common_https = require("../https.js");
const modularsApi = {
  async GetModulars(palteId) {
    return common_https.service({
      url: "/modulars/get/" + palteId,
      method: "get"
    });
  }
};
exports.modularsApi = modularsApi;
