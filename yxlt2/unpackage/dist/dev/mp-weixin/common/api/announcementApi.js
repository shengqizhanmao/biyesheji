"use strict";
const common_https = require("../https.js");
const announcementApi = {
  async getByPalteIdAndModularsId(palteId, modularsId) {
    return common_https.service({
      url: "/announcement/get/" + palteId + "/" + modularsId,
      method: "get"
    });
  }
};
exports.announcementApi = announcementApi;
