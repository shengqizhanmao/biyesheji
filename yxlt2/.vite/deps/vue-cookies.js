import {
  __commonJS
} from "./chunk-RSJERJUL.js";

// ../../../../../linshengwei/bysj2/yxlt2/node_modules/vue-cookies/vue-cookies.js
var require_vue_cookies = __commonJS({
  "../../../../../linshengwei/bysj2/yxlt2/node_modules/vue-cookies/vue-cookies.js"(exports, module) {
    (function() {
      var defaultConfig = {
        expires: "1d",
        path: "; path=/",
        domain: "",
        secure: "",
        sameSite: "; SameSite=Lax"
      };
      var VueCookies = {
        install: function(Vue2, options) {
          if (options)
            this.config(options.expires, options.path, options.domain, options.secure, options.sameSite);
          if (Vue2.prototype)
            Vue2.prototype.$cookies = this;
          if (Vue2.config && Vue2.config.globalProperties) {
            Vue2.config.globalProperties.$cookies = this;
            Vue2.provide("$cookies", this);
          }
          Vue2.$cookies = this;
        },
        config: function(expires, path, domain, secure, sameSite) {
          defaultConfig.expires = expires ? expires : "1d";
          defaultConfig.path = path ? "; path=" + path : "; path=/";
          defaultConfig.domain = domain ? "; domain=" + domain : "";
          defaultConfig.secure = secure ? "; Secure" : "";
          defaultConfig.sameSite = sameSite ? "; SameSite=" + sameSite : "; SameSite=Lax";
        },
        get: function(key) {
          var value = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
          if (value && (value.substring(0, 1) === "{" && value.substring(value.length - 1, value.length) === "}" || value.substring(0, 1) === "[" && value.substring(value.length - 1, value.length) === "]")) {
            try {
              value = JSON.parse(value);
            } catch (e) {
              return value;
            }
          }
          return value;
        },
        set: function(key, value, expires, path, domain, secure, sameSite) {
          if (!key) {
            throw new Error("Cookie name is not found in the first argument.");
          } else if (/^(?:expires|max\-age|path|domain|secure|SameSite)$/i.test(key)) {
            throw new Error('Cookie name illegality. Cannot be set to ["expires","max-age","path","domain","secure","SameSite"]	 current key name: ' + key);
          }
          if (value && value.constructor === Object) {
            value = JSON.stringify(value);
          }
          var _expires = "";
          expires = expires == void 0 ? defaultConfig.expires : expires;
          if (expires && expires != 0) {
            switch (expires.constructor) {
              case Number:
                if (expires === Infinity || expires === -1)
                  _expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
                else
                  _expires = "; max-age=" + expires;
                break;
              case String:
                if (/^(?:\d+(y|m|d|h|min|s))$/i.test(expires)) {
                  var _expireTime = expires.replace(/^(\d+)(?:y|m|d|h|min|s)$/i, "$1");
                  switch (expires.replace(/^(?:\d+)(y|m|d|h|min|s)$/i, "$1").toLowerCase()) {
                    case "m":
                      _expires = "; max-age=" + +_expireTime * 2592e3;
                      break;
                    case "d":
                      _expires = "; max-age=" + +_expireTime * 86400;
                      break;
                    case "h":
                      _expires = "; max-age=" + +_expireTime * 3600;
                      break;
                    case "min":
                      _expires = "; max-age=" + +_expireTime * 60;
                      break;
                    case "s":
                      _expires = "; max-age=" + _expireTime;
                      break;
                    case "y":
                      _expires = "; max-age=" + +_expireTime * 31104e3;
                      break;
                    default:
                      new Error('unknown exception of "set operation"');
                  }
                } else {
                  _expires = "; expires=" + expires;
                }
                break;
              case Date:
                _expires = "; expires=" + expires.toUTCString();
                break;
            }
          }
          document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + _expires + (domain ? "; domain=" + domain : defaultConfig.domain) + (path ? "; path=" + path : defaultConfig.path) + (secure == void 0 ? defaultConfig.secure : secure ? "; Secure" : "") + (sameSite == void 0 ? defaultConfig.sameSite : sameSite ? "; SameSite=" + sameSite : "");
          return this;
        },
        remove: function(key, path, domain) {
          if (!key || !this.isKey(key)) {
            return false;
          }
          document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (domain ? "; domain=" + domain : defaultConfig.domain) + (path ? "; path=" + path : defaultConfig.path) + "; SameSite=Lax";
          return true;
        },
        isKey: function(key) {
          return new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie);
        },
        keys: function() {
          if (!document.cookie)
            return [];
          var _keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
          for (var _index = 0; _index < _keys.length; _index++) {
            _keys[_index] = decodeURIComponent(_keys[_index]);
          }
          return _keys;
        }
      };
      if (typeof exports == "object") {
        module.exports = VueCookies;
      } else if (typeof define == "function" && define.amd) {
        define([], function() {
          return VueCookies;
        });
      } else if (window.Vue && window.Vue.use) {
        Vue.use(VueCookies);
      }
      if (typeof window !== "undefined") {
        window.$cookies = VueCookies;
      }
    })();
  }
});
export default require_vue_cookies();
//# sourceMappingURL=vue-cookies.js.map
