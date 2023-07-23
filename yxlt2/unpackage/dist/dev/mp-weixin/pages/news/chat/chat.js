"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_api_userApi = require("../../../common/api/userApi.js");
const common_utils_dateFormatUtils = require("../../../common/utils/dateFormatUtils.js");
const common_utils_utils = require("../../../common/utils/utils.js");
const common_api_friendsApi = require("../../../common/api/friendsApi.js");
require("../../../common/https.js");
var isSuccess = false;
var listFormUserId = [];
const _sfc_main = {
  data() {
    return {
      isFormUserId: false,
      scrollTop: 0,
      triggered: true,
      toUserId: "",
      toUser: {},
      formUserId: "",
      formUser: {},
      getFridens: {
        formUserId: "",
        toUserId: "",
        page: 1,
        size: 5
      },
      value: "",
      socketTask: {},
      toWebSocketData: {
        formUserId: "",
        toUserId: "",
        msg: "",
        type: "sendMsg"
      },
      getWebSocketDataList: [],
      getWebSocketData: {
        formUserId: "",
        toUserId: "",
        msg: "",
        type: "",
        createdDate: ""
      }
    };
  },
  onLoad(e) {
    this.toUserId = e.toUserId;
    this.formUser = common_utils_utils.utils.getCookieUser();
    this.formUserId = this.formUser.id;
    this.toWebSocketData.formUserId = this.formUserId;
    this.toWebSocketData.toUserId = e.toUserId;
    this.getFridens.formUserId = this.formUser.id;
    this.getFridens.toUserId = e.toUserId;
    this.getFridens.page = 1;
    this.getTen();
    this.getToUser(e.toUserId);
    this.connectSocket();
    let that = this;
    common_vendor.index.$on("logout", function(data) {
      that.socketTask.close();
    });
  },
  methods: {
    toBackChat() {
      common_vendor.index.switchTab({
        url: "/pages/news/news"
      });
      common_vendor.index.$emit("toBackChat", { msg: "\u9875\u9762\u66F4\u65B0" });
    },
    toDetailed() {
      common_vendor.index.navigateTo({
        url: "/pages/news/chat/chatDetailed?toUserId=" + this.toUserId
      });
    },
    getToUser(toUserId) {
      common_api_userApi.userApi.getUserById(toUserId).then((res) => {
        if (res.data.success === false)
          return common_utils_utils.utils.showToast("error", res.data.msg);
        this.toUser = res.data.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    getTen() {
      common_api_friendsApi.friendsApi.getTen(this.getFridens).then((res) => {
        if (res.data.success === false)
          return common_utils_utils.utils.showToast("error", res.data.msg);
        let DataList = res.data.data;
        for (let i = 0; i < DataList.length; i++) {
          DataList.createdDate = common_utils_dateFormatUtils.dateFormatUtils.friendlyDate(DataList.createdDate);
        }
        for (let i = 0; i < this.getWebSocketDataList.length; i++) {
          DataList.push(this.getWebSocketDataList[i]);
        }
        this.getWebSocketDataList = DataList;
      }).catch((err) => {
        console.log(err);
      });
    },
    refresh(e) {
      setTimeout(() => {
        this.triggered = false;
      }, 1e3);
      this.getFridens.page = this.getFridens.page + 1;
      this.getTen();
    },
    send(e) {
      console.log(e.value);
      this.toWebSocketData.msg = e.value;
      this.sendSocketMessage(this.toWebSocketData);
    },
    connectSocket() {
      for (let i = 0; i < listFormUserId.length; i++) {
        if (listFormUserId[i] === this.formUserId)
          return this.isFormUserId = true;
      }
      if (isSuccess && this.isFormUserId)
        return console.log("\u5DF2\u8FDE\u63A5");
      let that = this;
      console.log("\u8C03\u7528\u8FDE\u63A5websocket");
      this.socketTask = common_vendor.index.connectSocket({
        url: "ws://127.0.0.1:8100/yxlt/websocket/" + that.formUserId,
        success(res) {
          console.log("websocket\u8FDE\u63A5\u6210\u529F");
          isSuccess = true;
          listFormUserId.push(this.formUserId);
        },
        fail(err) {
          console.log("\u62A5\u9519", err);
        }
      });
      this.socketTask.onOpen(function(res) {
        console.log("WebSocket\u8FDE\u63A5\u5DF2\u6253\u5F00\uFF01");
        isSuccess = true;
        that.heart();
      });
      this.socketTask.onMessage(function(res) {
        that.getWebSocketData = JSON.parse(res.data);
        if (that.getWebSocketData.type === "heartbeat")
          return;
        common_vendor.index.$emit("toBackChat", { msg: "\u9875\u9762\u66F4\u65B0" });
        console.log("\u6536\u5230\u670D\u52A1\u5668\u5185\u5BB9\uFF1A" + that.getWebSocketData.msg);
        that.getWebSocketData.createdDate = common_utils_dateFormatUtils.dateFormatUtils.friendlyDate(that.getWebSocketData.createdDate);
        that.getWebSocketDataList.push(that.getWebSocketData);
        setTimeout(() => {
          that.scrollTop = that.scrollTop + 500;
        }, 500);
      });
      this.socketTask.onError(function(res) {
        console.log("WebSocket\u8FDE\u63A5\u6253\u5F00\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\uFF01");
        console.log(res);
        isSuccess = false;
      });
      this.socketTask.onClose((e) => {
        console.log("WebSocket\u8FDE\u63A5\u5173\u95ED\uFF01");
        clearInterval(that.timer);
        that.timer = "";
        isSuccess = false;
        listFormUserId = [];
      });
    },
    reconnect() {
      console.log("\u8FDB\u5165\u65AD\u7EBF\u91CD\u8FDE");
      this.socketTask.close();
      this.socketTask = null;
      isSuccess = false;
      this.connectSocket();
    },
    sendSocketMessage(msg) {
      let that = this;
      console.log("\u53D1\u9001\u4FE1\u606F");
      msg = JSON.stringify(msg);
      return new Promise((reslove, reject) => {
        that.socketTask.send({
          data: msg,
          success(res) {
            console.log("\u53D1\u9001\u6210\u529F");
            reslove(res);
          },
          fail(res) {
            console.log("\u53D1\u9001\u5931\u8D25");
            console.log(res);
            reject(res);
          }
        });
      });
    },
    heart() {
      let that = this;
      clearInterval(this.timer);
      this.timer = "";
      let msg = {
        "type": "heartbeat"
      };
      this.timer = setInterval(() => {
        that.sendSocketMessage(msg).then((res) => {
          console.log("\u5FC3\u8DF3\u6210\u529F");
        }).catch((res) => {
          console.log("\u53D1\u9001\u5931\u8D25");
          console.log(res);
        });
      }, 1e3 * 60 * 2);
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_chatBox2 = common_vendor.resolveComponent("chatBox");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  (_easycom_uni_nav_bar2 + _easycom_chatBox2 + _easycom_uni_icons2 + _easycom_uni_search_bar2)();
}
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_chatBox = () => "../../../components/chatBox/chatBox.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_search_bar = () => "../../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_chatBox + _easycom_uni_icons + _easycom_uni_search_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.toBackChat()),
    b: common_vendor.o(($event) => $options.toDetailed()),
    c: common_vendor.p({
      ["left-icon"]: "left",
      title: $data.toUser.nickname,
      shadow: true,
      fixed: true,
      ["right-icon"]: "more"
    }),
    d: common_vendor.p({
      valueList: $data.getWebSocketDataList,
      toUser: $data.toUser,
      formUser: $data.formUser
    }),
    e: $data.triggered,
    f: common_vendor.o((...args) => $options.refresh && $options.refresh(...args)),
    g: $data.scrollTop,
    h: common_vendor.o($options.send),
    i: common_vendor.o(($event) => $data.value = $event),
    j: common_vendor.p({
      placeholder: "\u53D1\u9001\u6D88\u606F",
      cancelText: "\u53D1\u9001",
      bgColor: "#EEEEEE",
      modelValue: $data.value
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/linshengwei/bysj2/yxlt2/pages/news/chat/chat.vue"]]);
wx.createPage(MiniProgramPage);
