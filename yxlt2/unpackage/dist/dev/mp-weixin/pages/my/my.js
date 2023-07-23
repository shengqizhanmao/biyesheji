"use strict";
const common_vendor = require("../../common/vendor.js");
const common_utils_utils = require("../../common/utils/utils.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {
        avatar: "",
        userName: "",
        nickName: ""
      },
      noGridList: [
        {
          "text": "\u4E2A\u4EBA\u4FE1\u606F",
          "icon": "chat",
          "to": "/pages/my/user/user"
        },
        {
          "text": "\u597D\u53CB",
          "icon": "contact",
          "to": "/pages/news/friends/friends"
        },
        {
          "text": "\u6536\u85CF",
          "icon": "starhalf",
          "to": "/pages/my/collect/collect"
        }
      ],
      noUcenterList: [{
        "title": "\u8BBE\u7F6E",
        "to": "/pages/my/config/config",
        "icon": "gear"
      }],
      listStyles: {
        "height": "150rpx",
        "width": "150rpx",
        "border": {
          "color": "#eee",
          "width": "1px",
          "style": "solid",
          "radius": "100%"
        }
      }
    };
  },
  onShow() {
    if (common_utils_utils.utils.getCookieUser()) {
      this.userInfo = common_utils_utils.utils.getCookieUser();
    } else {
      this.userInfo = {
        avatar: "",
        userName: "",
        nickName: ""
      };
    }
  },
  onPullDownRefresh() {
    setTimeout(function() {
      common_vendor.index.stopPullDownRefresh();
      location.reload();
    }, 1e3);
  },
  computed: {},
  methods: {
    toUserInfo() {
      common_vendor.index.navigateTo({
        url: "/pages/my/Login/Login"
      });
    },
    tapGrid(item) {
      console.log(item);
      common_vendor.index.navigateTo({
        url: item
      });
    },
    toUser() {
      common_vendor.index.navigateTo({
        url: "/pages/my/user/user"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_icons2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.userInfo.avatar
  }, $data.userInfo.avatar ? {
    b: $data.userInfo.avatar
  } : {
    c: common_assets._imports_0,
    d: common_vendor.o(($event) => $options.toUserInfo())
  }, {
    e: $data.userInfo.nickName
  }, $data.userInfo.nickName ? {
    f: common_vendor.t($data.userInfo.nickName)
  } : $data.userInfo.userName ? {} : {}, {
    g: $data.userInfo.userName,
    h: $data.userInfo.userName
  }, $data.userInfo.userName ? {
    i: common_vendor.t($data.userInfo.userName)
  } : {}, {
    j: $data.userInfo.userName
  }, $data.userInfo.userName ? {
    k: common_vendor.o(($event) => $options.toUser()),
    l: common_vendor.p({
      type: "forward",
      size: "30"
    })
  } : {}, {
    m: $data.userInfo.userName
  }, $data.userInfo.userName ? {
    n: common_vendor.f($data.noGridList, (item, index, i0) => {
      return {
        a: "2f1ef635-3-" + i0 + "," + ("2f1ef635-2-" + i0),
        b: common_vendor.p({
          color: "#007AFF",
          type: item.icon,
          size: "26"
        }),
        c: common_vendor.t(item.text),
        d: common_vendor.o(($event) => $options.tapGrid(item.to), index),
        e: index,
        f: "2f1ef635-2-" + i0 + ",2f1ef635-1"
      };
    })
  } : {}, {
    o: common_vendor.p({
      column: 4,
      showBorder: false,
      square: true
    }),
    p: $data.userInfo.userName
  }, $data.userInfo.userName ? {
    q: common_vendor.f($data.noUcenterList, (item, i, i0) => {
      return common_vendor.e({
        a: item.showBadge
      }, item.showBadge ? {} : {}, {
        b: i,
        c: "2f1ef635-5-" + i0 + ",2f1ef635-4",
        d: common_vendor.p({
          title: item.title,
          link: true,
          clickable: true,
          to: item.to,
          ["show-extra-icon"]: true,
          extraIcon: {
            type: item.icon,
            color: "#999"
          }
        })
      });
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2f1ef635"], ["__file", "G:/linshengwei/bysj2/yxlt2/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
