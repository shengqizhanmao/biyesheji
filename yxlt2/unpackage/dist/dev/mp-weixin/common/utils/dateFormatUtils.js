"use strict";
const dateFormatUtils = {
  formatDate(timestamp) {
    return this.formatDateMethod(timestamp, "yyyy-MM-dd hh:mm:ss");
  },
  formatDateMethod(timestamp, fmt) {
    let date = new Date(timestamp);
    if (!date) {
      return "";
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    let o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + "";
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : this.padLeftZero(str));
      }
    }
    return fmt;
  },
  padLeftZero(str) {
    return ("00" + str).substr(str.length);
  },
  friendlyDate(timestamp) {
    let now = this.formatDateMethod(new Date(), "yyyy-MM-dd hh:mm:ss");
    let now2 = this.formatDateMethod(timestamp, "yyyy-MM-dd hh:mm:ss");
    let years2 = now[0] + now[1] + now[2] + now[3];
    let months2 = now[5] + now[6];
    let days2 = now[8] + now[9];
    now[11] + now[12];
    now[14] + now[15];
    now[17] + now[18];
    let years3 = now2[0] + now2[1] + now2[2] + now2[3];
    let months3 = now2[5] + now2[6];
    let days3 = now2[8] + now2[9];
    let hours3 = now2[11] + now2[12];
    let minutes3 = now2[14] + now2[15];
    now2[17] + now2[18];
    if (years2 != years3) {
      return now2;
    }
    if (months2 != months3) {
      return now2;
    }
    if (days2 != days3) {
      return months3 + "\u6708" + days3 + "\u65E5 " + hours3 + ":" + minutes3;
    }
    return hours3 + ":" + minutes3;
  }
};
exports.dateFormatUtils = dateFormatUtils;
