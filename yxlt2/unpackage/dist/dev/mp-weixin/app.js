"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/news/news.js";
  "./pages/news/friends/friends.js";
  "./pages/news/chat/chat.js";
  "./pages/news/friends/add/add.js";
  "./pages/news/friends/add/addDetailed.js";
  "./pages/news/friends/detailed/detailed.js";
  "./pages/news/chat/chatDetailed.js";
  "./pages/creation/creation.js";
  "./pages/creation/seeArticle/seeArticle.js";
  "./pages/creation/creationArticle/creationArticle.js";
  "./pages/creation/seeArticle/reviserArticle.js";
  "./pages/my/my.js";
  "./pages/my/Login/Login.js";
  "./pages/my/config/config.js";
  "./pages/my/user/user.js";
  "./pages/my/Login/EmailLogin.js";
  "./pages/my/Login/register.js";
  "./pages/index/modulars/modulars.js";
  "./pages/index/article/article.js";
  "./pages/my/collect/collect.js";
}
const _sfc_main = {
  onLaunch: function() {
  },
  onShow: function() {
  },
  onHide: function() {
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/linshengwei/bysj2/yxlt2/App.vue"]]);
window.$cookies.config("30d");
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.config.globalProperties.$cookies = common_vendor.VueCookies;
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
