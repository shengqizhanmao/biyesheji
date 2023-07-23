"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_api_palteApi = require("../../../common/api/palteApi.js");
const common_api_modularsApi = require("../../../common/api/modularsApi.js");
const common_api_categoryApi = require("../../../common/api/categoryApi.js");
const common_utils_utils = require("../../../common/utils/utils.js");
const common_api_articleApi = require("../../../common/api/articleApi.js");
const common_api_tagsApi = require("../../../common/api/tagsApi.js");
require("../../../common/https.js");
const _sfc_main = {
  data() {
    return {
      articleFormData: {
        palteId: "",
        modularsId: "",
        categoryId: "",
        frontCover: "",
        title: "",
        summary: "",
        tagsList: [],
        content: "",
        contentHtml: ""
      },
      value: "",
      value2: "",
      value3: "",
      palteListRange: [],
      palteList: [],
      modularsListRange: [],
      modularsList: [],
      categoryListRange: [],
      categoryList: [],
      Img: {
        file: {}
      },
      articleImg: {
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
      searchTags: "",
      TagsList: [],
      value4: "",
      formats: {},
      editorCtx: {},
      html: "",
      text: ""
    };
  },
  onShow() {
    this.getPalte();
  },
  methods: {
    toBack() {
      common_vendor.index.switchTab({
        url: "/pages/creation/creation"
      });
    },
    getPalte() {
      common_api_palteApi.palteApi.GetPalte().then((res) => {
        if (res.data.success === false) {
          common_utils_utils.utils.showToast("error", res.data.msg);
          return;
        }
        this.palteList = res.data.data;
        for (let i = 0; i < this.palteList.length; i++) {
          this.palteListRange[i] = {
            text: "",
            value: ""
          };
          this.palteListRange[i].text = this.palteList[i].name;
          this.palteListRange[i].value = this.palteList[i].id;
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    changePalte(e) {
      if (e === "") {
        this.modularsListRange = [];
        this.articleFormData.modularsId = "";
        this.value2 = "";
        this.categoryListRange = [];
        this.articleFormData.categoryId = "";
        this.value3 = "";
        this.TagsList = [];
        this.articleFormData.tagsList = [];
        return;
      }
      this.articleFormData.palteId = e;
      this.getModulars(e);
      this.getCategorys(e);
      this.getTags(e);
    },
    getModulars(palteId) {
      common_api_modularsApi.modularsApi.GetModulars(palteId).then((res) => {
        if (res.data.success === false)
          return common_utils_utils.utils.showToast("error", res.data.msg);
        this.modularsList = res.data.data;
        for (let i = 0; i < this.modularsList.length; i++) {
          this.modularsListRange[i] = {
            text: this.modularsList[i].name,
            value: this.modularsList[i].id
          };
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    changeModulars(e) {
      if (e === "")
        return this.articleFormData.modularsId = "";
      this.articleFormData.modularsId = e;
    },
    getCategorys(palteId) {
      common_api_categoryApi.categoryApi.getByPalteId(palteId).then((res) => {
        if (res.data.success === false)
          return common_utils_utils.utils.showToast("error", res.data.msg);
        this.categoryList = res.data.data;
        for (let i = 0; i < this.categoryList.length; i++) {
          this.categoryListRange[i] = {
            text: this.categoryList[i].name,
            value: this.categoryList[i].id
          };
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    changeCategory(e) {
      if (e === "")
        return this.articleFormData.categoryId = "";
      this.articleFormData.categoryId = e;
    },
    updateImages(e) {
      let that = this;
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
            url: "http://127.0.0.1:8100/yxlt/article/img",
            filePath: tempFilePath,
            name: "file",
            formData: {
              "imgurl": base64Str
            },
            success: function(res) {
              if (JSON.parse(res.data).success === false)
                return common_utils_utils.utils.showToast("error", JSON.parse(res.data).msg);
              that.articleFormData.frontCover = JSON.parse(res.data).data;
              console.log(that.articleFormData.frontCover);
            },
            fail: function(err) {
              console.log("upload fail", err);
            }
          });
        };
      };
      xhr.send();
    },
    getTags(palteId) {
      common_api_tagsApi.tagsApi.getByPalteId(palteId).then((res) => {
        if (res.data.success === false)
          return common_utils_utils.utils.showToast("error", res.data.msg);
        let TagsListRes = res.data.data;
        for (let i = 0; i < TagsListRes.length; i++) {
          this.TagsList[i] = {
            "id": TagsListRes[i].id,
            "name": TagsListRes[i].name,
            "type": "default",
            "inverted": false
          };
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    setType(item) {
      if (item.inverted) {
        item.type = "default";
        item.inverted = false;
        for (let i = 0; i < this.articleFormData.tagsList.length; i++) {
          if (item.id === this.articleFormData.tagsList[i]) {
            this.articleFormData.tagsList.splice(i, 1);
          }
        }
        return;
      }
      item.type = "success";
      item.inverted = true;
      this.articleFormData.tagsList.push(item.id);
    },
    change4(e) {
      console.log(e);
    },
    onEditorReady() {
      let that = this;
      common_vendor.index.createSelectorQuery().select("#editor").context((res) => {
        that.editorCtx = res.context;
      }).exec();
    },
    undo() {
      this.editorCtx.undo();
    },
    redo() {
      this.editorCtx.redo();
    },
    format(e) {
      let {
        name,
        value
      } = e.target.dataset;
      if (!name)
        return;
      this.editorCtx.format(name, value);
    },
    onStatusChange(e) {
      this.formats = e.detail;
    },
    insertDivider() {
      this.editorCtx.insertDivider({
        success: function() {
          console.log("insert divider success");
        }
      });
    },
    clear() {
      this.editorCtx.clear({
        success: function(res) {
          console.log("\u6E05\u7A7A\u6210\u529F");
        }
      });
    },
    removeFormat() {
      this.editorCtx.removeFormat();
    },
    insertDate() {
      let date = new Date();
      let formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      this.editorCtx.insertText({
        text: formatDate
      });
    },
    insertImage() {
      let that = this;
      common_vendor.index.chooseImage({
        count: 1,
        success: function(res) {
          var tempFilePath = res.tempFilePaths[0];
          var xhr = new XMLHttpRequest();
          xhr.open("GET", tempFilePath);
          xhr.responseType = "blob";
          xhr.onload = function() {
            var blob = xhr.response;
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
              var base64Str = reader.result;
              common_vendor.index.uploadFile({
                url: "http://127.0.0.1:8100/yxlt/article/img",
                filePath: tempFilePath,
                name: "file",
                formData: {
                  "imgurl": base64Str
                },
                success: function(res2) {
                  if (res2.data.success === false)
                    return common_utils_utils.utils.showToast("error", res2.data.msg);
                  that.editorCtx.insertImage({
                    src: JSON.parse(res2.data).data,
                    alt: "\u56FE\u50CF",
                    success: function() {
                      console.log("\u63D2\u5165\u56FE\u7247\u6210\u529F");
                    }
                  });
                },
                fail: function(err) {
                  console.log("upload fail", err);
                }
              });
            };
          };
          xhr.send();
        }
      });
    },
    summit() {
      let that = this;
      this.editorCtx.getContents({
        success: function(res) {
          that.articleFormData.contentHtml = res.html;
          that.articleFormData.content = res.text;
        },
        fail: function(error) {
          console.log(error);
          return;
        }
      });
      console.log(that.articleFormData.contentHtml);
      let isRead = this.isRead();
      if (!isRead)
        return console.log("\u9A8C\u8BC1\u5931\u8D25");
      console.log("\u9A8C\u8BC1\u901A\u8FC7");
      common_api_articleApi.articleApi.applyArticle(this.articleFormData).then((res) => {
        common_utils_utils.utils.thenMathod(res);
      }).catch((err) => {
        console.log(err);
      });
      common_vendor.index.switchTab({
        url: "/pages/creation/creation"
      });
    },
    isRead() {
      let isRead = true;
      if (this.articleFormData.content === "/n") {
        isRead = false;
        common_utils_utils.utils.showToast("error", "\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A");
      }
      if (this.articleFormData.contentHtml === "<p><br></p>") {
        isRead = false;
        common_utils_utils.utils.showToast("error", "\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A");
      }
      isRead = this.isReadMethod(isRead, this.articleFormData.categoryId, "\u5206\u7C7B\u4E0D\u80FD\u4E3A\u7A7A");
      isRead = this.isReadMethod(isRead, this.articleFormData.modularsId, "\u6A21\u5757\u4E0D\u80FD\u4E3A\u7A7A");
      isRead = this.isReadMethod(isRead, this.articleFormData.palteId, "\u677F\u5757\u4E0D\u80FD\u4E3A\u7A7A");
      isRead = this.isReadMethod(isRead, this.articleFormData.frontCover, "\u5C01\u9762\u4E0D\u80FD\u4E3A\u7A7A");
      isRead = this.isReadMethod(isRead, this.articleFormData.summary, "\u7B80\u4ECB\u4E0D\u80FD\u4E3A\u7A7A");
      isRead = this.isReadMethod(isRead, this.articleFormData.title, "\u6807\u9898\u4E0D\u80FD\u4E3A\u7A7A");
      return isRead;
    },
    isReadMethod(isRead, data, msg) {
      if (data === "") {
        isRead = false;
        common_utils_utils.utils.showToast("error", msg);
        return isRead;
      }
      return isRead;
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  (_easycom_uni_nav_bar2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_file_picker2 + _easycom_uni_section2 + _easycom_uni_data_select2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_tag2)();
}
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_file_picker = () => "../../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_data_select = () => "../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_grid_item = () => "../../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_tag = () => "../../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_file_picker + _easycom_uni_section + _easycom_uni_data_select + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_tag)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.toBack()),
    b: common_vendor.p({
      ["left-icon"]: "left",
      title: "\u521B\u4F5C\u5E16\u5B50",
      shadow: true,
      fixed: true
    }),
    c: common_vendor.o(($event) => $data.articleFormData.title = $event),
    d: common_vendor.p({
      focus: true,
      placeholder: "\u8BF7\u8F93\u5165\u6807\u9898",
      modelValue: $data.articleFormData.title
    }),
    e: common_vendor.p({
      label: "\u6807\u9898",
      required: true
    }),
    f: common_vendor.o(($event) => $data.articleFormData.summary = $event),
    g: common_vendor.p({
      focus: true,
      placeholder: "\u8BF7\u8F93\u5165\u7B80\u4ECB",
      modelValue: $data.articleFormData.summary
    }),
    h: common_vendor.p({
      label: "\u7B80\u4ECB",
      required: true
    }),
    i: $data.articleFormData.frontCover,
    j: common_vendor.o($options.updateImages),
    k: common_vendor.p({
      ["disable-preview"]: true,
      ["del-icon"]: false,
      ["image-styles"]: $data.imagesStyle,
      ["file-mediatype"]: "image",
      ["auto-upload"]: false,
      limit: "1"
    }),
    l: common_vendor.p({
      title: "\u5C01\u9762",
      padding: true
    }),
    m: common_vendor.o($options.changePalte),
    n: common_vendor.o(($event) => $data.value = $event),
    o: common_vendor.p({
      localdata: $data.palteListRange,
      modelValue: $data.value
    }),
    p: common_vendor.p({
      title: "\u677F\u5757",
      padding: true
    }),
    q: common_vendor.o($options.changeModulars),
    r: common_vendor.o(($event) => $data.value2 = $event),
    s: common_vendor.p({
      localdata: $data.modularsListRange,
      modelValue: $data.value2
    }),
    t: common_vendor.p({
      title: "\u6A21\u5757",
      padding: true,
      square: false
    }),
    v: common_vendor.o($options.changeCategory),
    w: common_vendor.o(($event) => $data.value3 = $event),
    x: common_vendor.p({
      localdata: $data.categoryListRange,
      modelValue: $data.value3
    }),
    y: common_vendor.p({
      title: "\u5206\u7C7B",
      padding: true,
      square: false
    }),
    z: common_vendor.p({
      column: 3,
      square: false,
      showBorder: false
    }),
    A: common_vendor.f($data.TagsList, (item, k0, i0) => {
      return {
        a: common_vendor.o(($event) => $options.setType(item), item.id),
        b: "f95ad89a-18-" + i0 + ",f95ad89a-17",
        c: common_vendor.p({
          inverted: item.inverted,
          text: item.name,
          type: item.type
        }),
        d: item.id
      };
    }),
    B: common_vendor.p({
      title: "\u8BF7\u9009\u62E9\u6807\u7B7E",
      padding: true
    }),
    C: common_vendor.o((...args) => $options.onStatusChange && $options.onStatusChange(...args)),
    D: common_vendor.o((...args) => $options.onEditorReady && $options.onEditorReady(...args)),
    E: common_vendor.n($data.formats.bold ? "ql-active" : ""),
    F: common_vendor.n($data.formats.italic ? "ql-active" : ""),
    G: common_vendor.n($data.formats.underline ? "ql-active" : ""),
    H: common_vendor.n($data.formats.strike ? "ql-active" : ""),
    I: common_vendor.n($data.formats.align === "left" ? "ql-active" : ""),
    J: common_vendor.n($data.formats.align === "center" ? "ql-active" : ""),
    K: common_vendor.n($data.formats.align === "right" ? "ql-active" : ""),
    L: common_vendor.n($data.formats.align === "justify" ? "ql-active" : ""),
    M: common_vendor.n($data.formats.lineHeight ? "ql-active" : ""),
    N: common_vendor.n($data.formats.letterSpacing ? "ql-active" : ""),
    O: common_vendor.n($data.formats.marginTop ? "ql-active" : ""),
    P: common_vendor.n($data.formats.previewarginBottom ? "ql-active" : ""),
    Q: common_vendor.o((...args) => $options.removeFormat && $options.removeFormat(...args)),
    R: common_vendor.n($data.formats.fontFamily ? "ql-active" : ""),
    S: common_vendor.n($data.formats.fontSize === "24px" ? "ql-active" : ""),
    T: common_vendor.n($data.formats.color === "#0000ff" ? "ql-active" : ""),
    U: common_vendor.n($data.formats.backgroundColor === "#00ff00" ? "ql-active" : ""),
    V: common_vendor.o((...args) => $options.insertDate && $options.insertDate(...args)),
    W: common_vendor.n($data.formats.list === "ordered" ? "ql-active" : ""),
    X: common_vendor.n($data.formats.list === "bullet" ? "ql-active" : ""),
    Y: common_vendor.o((...args) => $options.undo && $options.undo(...args)),
    Z: common_vendor.o((...args) => $options.redo && $options.redo(...args)),
    aa: common_vendor.o((...args) => $options.insertDivider && $options.insertDivider(...args)),
    ab: common_vendor.o((...args) => $options.insertImage && $options.insertImage(...args)),
    ac: common_vendor.n($data.formats.header === 1 ? "ql-active" : ""),
    ad: common_vendor.n($data.formats.header === 2 ? "ql-active" : ""),
    ae: common_vendor.n($data.formats.header === 3 ? "ql-active" : ""),
    af: common_vendor.n($data.formats.header === 4 ? "ql-active" : ""),
    ag: common_vendor.n($data.formats.header === 5 ? "ql-active" : ""),
    ah: common_vendor.n($data.formats.header === 6 ? "ql-active" : ""),
    ai: common_vendor.n($data.formats.script === "sub" ? "ql-active" : ""),
    aj: common_vendor.n($data.formats.script === "super" ? "ql-active" : ""),
    ak: common_vendor.o((...args) => $options.clear && $options.clear(...args)),
    al: common_vendor.n($data.formats.direction === "rtl" ? "ql-active" : ""),
    am: common_vendor.o((...args) => $options.format && $options.format(...args)),
    an: common_vendor.p({
      title: "\u8BF7\u8F93\u5165\u5185\u5BB9",
      padding: true
    }),
    ao: common_vendor.o(($event) => $options.summit())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "G:/linshengwei/bysj2/yxlt2/pages/creation/creationArticle/creationArticle.vue"]]);
wx.createPage(MiniProgramPage);
