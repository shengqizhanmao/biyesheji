"use strict";
const common_https = require("../https.js");
const palteApi = {
  async GetPalte() {
    return common_https.service({
      url: "/palte/get",
      method: "get"
    });
  }
};
exports.palteApi = palteApi;
