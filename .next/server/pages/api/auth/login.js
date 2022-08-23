"use strict";
(() => {
var exports = {};
exports.id = 908;
exports.ids = [908];
exports.modules = {

/***/ 9884:
/***/ ((module) => {

module.exports = require("http-proxy");

/***/ }),

/***/ 9539:
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
    if (req.method !== "POST") {
        return res.status(404).json({
            message: "This api support only method POST"
        });
    }
    return new Promise((resolved)=>{
        req.headers.cookie = "";
        const handleLoginResponse = (proxyRes, req, res)=>{
            let body = "";
            proxyRes.on("data", function(chunk) {
                body += chunk;
            });
            proxyRes.on("end", function() {
                const resp = JSON.parse(body);
                console.log(resp);
                res.end("my cli");
            });
        };
        proxy.once("proxyRes", handleLoginResponse);
        proxy.web(req, res, {
            target: "https://devapi.myspa.vn",
            changeOrigin: true,
            selfHandleResponse: true
        });
    });
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(9539));
module.exports = __webpack_exports__;

})();