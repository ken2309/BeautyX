"use strict";
(() => {
var exports = {};
exports.id = 130;
exports.ids = [130];
exports.modules = {

/***/ 9884:
/***/ ((module) => {

module.exports = require("http-proxy");

/***/ }),

/***/ 3628:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var http_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9884);
/* harmony import */ var http_proxy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http_proxy__WEBPACK_IMPORTED_MODULE_0__);

const proxy = http_proxy__WEBPACK_IMPORTED_MODULE_0___default().createProxyServer();
const config = {
    api: {
        bodyParser: {
            sizeLimit: false
        }
    }
};
async function handler(req, res) {
    return new Promise((resolved)=>{
        req.headers.cookie = "";
        proxy.web(req, res, {
            target: "https://devapi.myspa.vn",
            changeOrigin: true,
            selfHandleResponse: false
        });
        proxy.once("proxyRes", ()=>{
            resolved(true);
        });
    });
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(3628));
module.exports = __webpack_exports__;

})();