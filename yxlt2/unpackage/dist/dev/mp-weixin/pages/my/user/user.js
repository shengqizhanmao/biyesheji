"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_utils_utils = require("../../../common/utils/utils.js");
const common_api_userApi = require("../../../common/api/userApi.js");
const common_utils_rulesUtils = require("../../../common/utils/rulesUtils.js");
require("../../../common/https.js");
const _sfc_main = {
  data() {
    return {
      uploadUpdateImages: {
        id: "",
        file: {}
      },
      imagesStyle: {
        "height": 80,
        "width": 80
      },
      imagesListStyle: {
        "borderStyle": {
          "color": "#eee",
          "width": "1px",
          "style": "solid",
          "radius": "5px"
        },
        "border": false,
        "dividline": false
      },
      user: {},
      updateGender: "",
      gender: [{
        text: "\u7537",
        value: "\u7537"
      }, {
        text: "\u5973",
        value: "\u5973"
      }, {
        text: "\u672A\u77E5",
        value: "\u672A\u77E5"
      }],
      emailForm: {
        id: "",
        email: "",
        code: ""
      },
      emailRules: {
        email: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u8F93\u5165\u65B0\u90AE\u7BB1",
            trigger: "blur"
          }, {
            validateFunction: common_utils_rulesUtils.rulesUtils.emailRules()
          }]
        },
        code: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",
            trigger: "blur"
          }, {
            validateFunction: common_utils_rulesUtils.rulesUtils.emailCodeRules()
          }]
        }
      },
      passwordForm: {
        id: "",
        password: "",
        newPassword: ""
      },
      passwordRules: {
        password: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u8F93\u5165\u65E7\u5BC6\u7801",
            trigger: "blur"
          }, {
            validateFunction: common_utils_rulesUtils.rulesUtils.passwordRules()
          }]
        },
        newPassword: {
          rules: [{
            required: true,
            errorMessage: "\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801",
            trigger: "blur"
          }, {
            validateFunction: common_utils_rulesUtils.rulesUtils.passwordRules()
          }]
        }
      }
    };
  },
  onLoad() {
    this.user = common_utils_utils.utils.getCookieUser();
    this.updateGender = this.user.gender;
    this.emailForm.id = this.user.id;
    this.passwordForm.id = this.user.id;
    this.uploadUpdateImages.id = this.user.id;
  },
  methods: {
    toMy() {
      common_vendor.index.switchTab({
        url: "/pages/my/my"
      });
    },
    updateImages(e) {
      let that2 = this;
      let tempFilePath = e.tempFilePaths[0];
      console.log(tempFilePath);
      let xhr = new XMLHttpRequest();
      xhr.open("GET", tempFilePath);
      xhr.responseType = "blob";
      xhr.onload = function() {
        let blob = xhr.response;
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function() {
          let base64Str = reader.result;
          common_vendor.index.uploadFile({
            url: "http://127.0.0.1:8100/yxlt/user/updateUserAvatar",
            filePath: tempFilePath,
            name: "file",
            formData: {
              "imgurl": base64Str,
              "id": that2.uploadUpdateImages.id
            },
            success: function(res) {
              if (JSON.parse(res.data).success === false)
                return common_utils_utils.utils.showToast("error", JSON.parse(res.data).msg);
              console.log(res);
              that2.getNewUserRmCookies();
            },
            fail: function(err) {
              console.log("upload fail", err);
            }
          });
        };
      };
      xhr.send();
    },
    inputDiaologTooggle(diaolog) {
      this.$refs[diaolog].open();
    },
    dialogInputNicknameConfirm(val) {
      common_utils_utils.utils.showLoading("\u4FEE\u6539\u4E2D");
      setTimeout(() => {
        common_utils_utils.utils.hideLoading();
        common_api_userApi.userApi.updateUser({
          "id": this.user.id,
          "nickname": val
        }).then((res) => {
          this.thenMathod(res);
        }).catch((err) => {
          common_utils_utils.utils.showToast("error", "\u4FEE\u6539\u5931\u8D25");
          setTimeout(() => {
            this.$refs.inputGenderDiaolog.close();
            common_utils_utils.utils.hideToast();
          }, 1e3);
        });
      }, 500);
    },
    dialogInputGenderConfirm(val) {
      common_utils_utils.utils.showLoading("\u4FEE\u6539\u4E2D");
      setTimeout(() => {
        common_utils_utils.utils.hideLoading();
        common_api_userApi.userApi.updateUser({
          "id": this.user.id,
          "gender": this.updateGender
        }).then((res) => {
          this.thenMathod(res);
        }).catch((err) => {
          common_utils_utils.utils.showToast("error", "\u4FEE\u6539\u5931\u8D25");
          setTimeout(() => {
            this.$refs.inputGenderDiaolog.close();
            common_utils_utils.utils.hideToast();
          }, 1e3);
        });
      }, 500);
    },
    getUpdateEmailCode(ref) {
      this.$refs[ref].validateField(["email"]).then((res) => {
        if (that.user.email === that.emailForm.email) {
          common_utils_utils.utils.showToast("error", "\u65B0\u90AE\u7BB1\u4E0D\u80FD\u4E0E\u65E7\u90AE\u7BB1\u76F8\u540C");
          return;
        }
        common_api_userApi.userApi.getUpdateEmailCode({
          "email": that.emailForm.email
        }).then((res2) => {
          if (res2.data.success === false) {
            common_utils_utils.utils.showToast("error", res2.data.msg);
            return;
          }
          common_utils_utils.utils.showToast("success", res2.data.msg);
        }).catch((err) => {
          console.log(err);
          common_utils_utils.utils.showToast("error", err);
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    updateEmail(ref) {
      this.APiMethod(ref, common_api_userApi.userApi.updateEmail, this.emailForm, this.$refs.inputEmailDiaolog);
    },
    updatePassword(ref) {
      this.APiMethod(ref, common_api_userApi.userApi.updatePassword, this.passwordForm, this.$refs.inputPasswordDiaolog);
    },
    APiMethod(ref, apiNameMethod, data, resDiaolog) {
      common_utils_utils.utils.showLoading("\u4FEE\u6539\u4E2D");
      this.$refs[ref].validate().then((res) => {
        apiNameMethod(data).then((res2) => {
          this.thenMathod(res2);
        }).catch((err) => {
          common_utils_utils.utils.showToast("error", "\u4FEE\u6539\u5931\u8D25");
        }).finally((res2) => {
          setTimeout(() => {
            resDiaolog.close();
            common_utils_utils.utils.hideToast();
            common_utils_utils.utils.hideLoading();
          }, 1e3);
        });
      }).catch((err) => {
        console.log("err", err);
      });
      common_utils_utils.utils.hideLoading();
    },
    getNewUserRmCookies() {
      common_api_userApi.userApi.getNewCookie().then((res) => {
        if (res.data.success === false) {
          common_utils_utils.utils.showToast("error", res.data.msg);
          setTimeout(() => {
            this.$refs.inputGenderDiaolog.close();
            common_utils_utils.utils.hideToast();
          }, 1e3);
          return;
        }
        common_utils_utils.utils.deleteCookieUser();
        common_utils_utils.utils.setCookieUser(JSON.stringify(res.data.data));
        common_vendor.index.redirectTo({
          url: "/pages/my/user/user"
        });
      }).catch((err) => {
        console.log("err", err);
      });
    },
    thenMathod(res) {
      if (res.data.success === false)
        return common_utils_utils.utils.showToast("error", res.data.msg);
      common_utils_utils.utils.showToast("success", res.data.msg);
      this.getNewUserRmCookies();
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_nav_bar2 + _easycom_uni_file_picker2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_data_checkbox2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_file_picker = () => "../../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_data_checkbox = () => "../../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_file_picker + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_data_checkbox + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.toMy()),
    b: common_vendor.p({
      ["left-icon"]: "left",
      backgroundColor: "#F8F8F8",
      title: "\u4E2A\u4EBA\u4FE1\u606F",
      shadow: true,
      fixed: true
    }),
    c: $data.user.avatar,
    d: common_vendor.o($options.updateImages),
    e: common_vendor.p({
      ["image-styles"]: $data.imagesStyle,
      ["return-type"]: "object",
      ["file-mediatype"]: "image",
      ["auto-upload"]: false,
      limit: "1",
      ["disable-preview"]: false,
      ["del-icon"]: false
    }),
    f: common_vendor.p({
      title: "\u5934\u50CF",
      link: true
    }),
    g: common_vendor.t($data.user.userName),
    h: common_vendor.p({
      title: "\u8D26\u53F7"
    }),
    i: common_vendor.t($data.user.nickName),
    j: common_vendor.o(($event) => $options.inputDiaologTooggle("inputNickNameDiaolog")),
    k: common_vendor.p({
      title: "\u540D\u5B57",
      link: true
    }),
    l: common_vendor.t($data.user.gender),
    m: common_vendor.o(($event) => $options.inputDiaologTooggle("inputGenderDiaolog")),
    n: common_vendor.p({
      title: "\u6027\u522B",
      link: true
    }),
    o: common_vendor.t($data.user.email),
    p: common_vendor.o(($event) => $options.inputDiaologTooggle("inputEmailDiaolog")),
    q: common_vendor.p({
      title: "\u90AE\u7BB1",
      link: true
    }),
    r: common_vendor.o(($event) => $options.inputDiaologTooggle("inputPasswordDiaolog")),
    s: common_vendor.p({
      title: "\u66F4\u6539\u5BC6\u7801",
      link: true
    }),
    t: common_vendor.o($options.dialogInputNicknameConfirm),
    v: common_vendor.p({
      mode: "input",
      title: "\u66F4\u6539\u540D\u5B57",
      value: $data.user.nickName,
      placeholder: "\u8BF7\u8F93\u5165\u540D\u5B57"
    }),
    w: common_vendor.sr("inputNickNameDiaolog", "529295a0-9"),
    x: common_vendor.p({
      type: "dialog"
    }),
    y: common_vendor.o(($event) => $data.updateGender = $event),
    z: common_vendor.p({
      localdata: $data.gender,
      modelValue: $data.updateGender
    }),
    A: common_vendor.o($options.dialogInputGenderConfirm),
    B: common_vendor.p({
      title: "\u66F4\u6539\u6027\u522B"
    }),
    C: common_vendor.sr("inputGenderDiaolog", "529295a0-11"),
    D: common_vendor.p({
      type: "dialog"
    }),
    E: common_vendor.o(($event) => $data.emailForm.email = $event),
    F: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u65B0\u90AE\u7BB1",
      modelValue: $data.emailForm.email
    }),
    G: common_vendor.p({
      label: "\u65B0\u90AE\u7BB1",
      required: true,
      name: "email"
    }),
    H: common_vendor.o(($event) => $data.emailForm.code = $event),
    I: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",
      modelValue: $data.emailForm.code
    }),
    J: common_vendor.o(($event) => $options.getUpdateEmailCode("emailRef")),
    K: common_vendor.p({
      label: "\u9A8C\u8BC1\u7801",
      required: true,
      name: "code"
    }),
    L: common_vendor.o(($event) => $options.updateEmail("emailRef")),
    M: common_vendor.sr("emailRef", "529295a0-16,529295a0-15"),
    N: common_vendor.p({
      rules: $data.emailRules,
      modelValue: $data.emailForm
    }),
    O: common_vendor.p({
      title: "\u66F4\u6539\u90AE\u7BB1"
    }),
    P: common_vendor.sr("inputEmailDiaolog", "529295a0-14"),
    Q: common_vendor.p({
      type: "dialog"
    }),
    R: common_vendor.o(($event) => $data.passwordForm.password = $event),
    S: common_vendor.p({
      type: "password",
      placeholder: "\u8F93\u5165\u65E7\u5BC6\u7801",
      modelValue: $data.passwordForm.password
    }),
    T: common_vendor.p({
      label: "\u5BC6\u7801",
      required: true,
      name: "password"
    }),
    U: common_vendor.o(($event) => $data.passwordForm.newPassword = $event),
    V: common_vendor.p({
      type: "password",
      placeholder: "\u8F93\u5165\u65B0\u5BC6\u7801",
      modelValue: $data.passwordForm.newPassword
    }),
    W: common_vendor.p({
      label: "\u65B0\u5BC6\u7801",
      required: true,
      name: "newPassword"
    }),
    X: common_vendor.o(($event) => $options.updatePassword("passwordRef")),
    Y: common_vendor.sr("passwordRef", "529295a0-23,529295a0-22"),
    Z: common_vendor.p({
      rules: $data.passwordRules,
      modelValue: $data.passwordForm
    }),
    aa: common_vendor.p({
      title: "\u66F4\u6539\u5BC6\u7801"
    }),
    ab: common_vendor.sr("inputPasswordDiaolog", "529295a0-21"),
    ac: common_vendor.p({
      type: "dialog"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/linshengwei/bysj2/yxlt2/pages/my/user/user.vue"]]);
wx.createPage(MiniProgramPage);
