"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/login";
exports.ids = ["pages/api/auth/login"];
exports.modules = {

/***/ "http-proxy":
/*!*****************************!*\
  !*** external "http-proxy" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("http-proxy");

/***/ }),

/***/ "(api)/./pages/api/auth/login.ts":
/*!*********************************!*\
  !*** ./pages/api/auth/login.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"config\": () => (/* binding */ config),\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var http_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http-proxy */ \"http-proxy\");\n/* harmony import */ var http_proxy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http_proxy__WEBPACK_IMPORTED_MODULE_0__);\n\nconst proxy = http_proxy__WEBPACK_IMPORTED_MODULE_0___default().createProxyServer();\nconst config = {\n    api: {\n        bodyParser: {\n            sizeLimit: false\n        }\n    }\n};\nasync function handler(req, res) {\n    if (req.method !== \"POST\") {\n        return res.status(404).json({\n            message: \"This api support only method POST\"\n        });\n    }\n    return new Promise((resolved)=>{\n        req.headers.cookie = \"\";\n        const handleLoginResponse = (proxyRes, req, res)=>{\n            let body = \"\";\n            proxyRes.on(\"data\", function(chunk) {\n                body += chunk;\n            });\n            proxyRes.on(\"end\", function() {\n                const resp = JSON.parse(body);\n                console.log(resp);\n                res.end(\"my cli\");\n            });\n        };\n        proxy.once(\"proxyRes\", handleLoginResponse);\n        proxy.web(req, res, {\n            target: \"https://devapi.myspa.vn\",\n            changeOrigin: true,\n            selfHandleResponse: true\n        });\n    });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9sb2dpbi50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ3lEO0FBRXpELE1BQU1DLEtBQUssR0FBR0QsbUVBQTJCLEVBQUU7QUFDcEMsTUFBTUcsTUFBTSxHQUFHO0lBQ2xCQyxHQUFHLEVBQUU7UUFDREMsVUFBVSxFQUFFO1lBQ1JDLFNBQVMsRUFBRSxLQUFLO1NBQ25CO0tBQ0o7Q0FDSjtBQUVjLGVBQWVDLE9BQU8sQ0FDakNDLEdBQW1CLEVBQ25CQyxHQUF5QixFQUMzQjtJQUNFLElBQUlELEdBQUcsQ0FBQ0UsTUFBTSxLQUFLLE1BQU0sRUFBRTtRQUN2QixPQUFPRCxHQUFHLENBQUNFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1lBQUVDLE9BQU8sRUFBRSxtQ0FBbUM7U0FBRSxDQUFDLENBQUM7S0FDakY7SUFHRCxPQUFPLElBQUlDLE9BQU8sQ0FBQyxDQUFDQyxRQUFRLEdBQUs7UUFDN0JQLEdBQUcsQ0FBQ1EsT0FBTyxDQUFDQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLE1BQU1DLG1CQUFtQixHQUFxQixDQUFDQyxRQUFRLEVBQUVYLEdBQUcsRUFBRUMsR0FBRyxHQUFLO1lBQ2xFLElBQUlXLElBQUksR0FBRyxFQUFFO1lBQ2JELFFBQVEsQ0FBQ0UsRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFVQyxLQUFLLEVBQUU7Z0JBQ2pDRixJQUFJLElBQUlFLEtBQUs7YUFDaEIsQ0FBQztZQUNGSCxRQUFRLENBQUNFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsV0FBWTtnQkFDM0IsTUFBTUUsSUFBSSxHQUFHQyxJQUFJLENBQUNDLEtBQUssQ0FBQ0wsSUFBSSxDQUFDO2dCQUM3Qk0sT0FBTyxDQUFDQyxHQUFHLENBQUNKLElBQUksQ0FBQztnQkFDakJkLEdBQUcsQ0FBQ21CLEdBQUcsQ0FBQyxRQUFRLENBQUM7YUFDcEIsQ0FBQztTQUNMO1FBRUQzQixLQUFLLENBQUM0QixJQUFJLENBQUMsVUFBVSxFQUFFWCxtQkFBbUIsQ0FBQztRQUMzQ2pCLEtBQUssQ0FBQzZCLEdBQUcsQ0FBQ3RCLEdBQUcsRUFBRUMsR0FBRyxFQUFFO1lBQ2hCc0IsTUFBTSxFQUFFLHlCQUF5QjtZQUNqQ0MsWUFBWSxFQUFFLElBQUk7WUFDbEJDLGtCQUFrQixFQUFFLElBQUk7U0FDM0IsQ0FBQztLQUNMLENBQUM7Q0FDTCIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYi1ib29raW5nLy4vcGFnZXMvYXBpL2F1dGgvbG9naW4udHM/NzQ0ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tICduZXh0JztcbmltcG9ydCBodHRwUHJveHksIHsgUHJveHlSZXNDYWxsYmFjayB9IGZyb20gXCJodHRwLXByb3h5XCI7XG5cbmNvbnN0IHByb3h5ID0gaHR0cFByb3h5LmNyZWF0ZVByb3h5U2VydmVyKCk7XG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICAgIGFwaToge1xuICAgICAgICBib2R5UGFyc2VyOiB7XG4gICAgICAgICAgICBzaXplTGltaXQ6IGZhbHNlLFxuICAgICAgICB9LFxuICAgIH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoXG4gICAgcmVxOiBOZXh0QXBpUmVxdWVzdCxcbiAgICByZXM6IE5leHRBcGlSZXNwb25zZTxhbnk+XG4pIHtcbiAgICBpZiAocmVxLm1ldGhvZCAhPT0gXCJQT1NUXCIpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogXCJUaGlzIGFwaSBzdXBwb3J0IG9ubHkgbWV0aG9kIFBPU1RcIiB9KTtcbiAgICB9XG5cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZWQpID0+IHtcbiAgICAgICAgcmVxLmhlYWRlcnMuY29va2llID0gXCJcIjtcbiAgICAgICAgY29uc3QgaGFuZGxlTG9naW5SZXNwb25zZTogUHJveHlSZXNDYWxsYmFjayA9IChwcm94eVJlcywgcmVxLCByZXMpID0+IHtcbiAgICAgICAgICAgIGxldCBib2R5ID0gXCJcIjtcbiAgICAgICAgICAgIHByb3h5UmVzLm9uKFwiZGF0YVwiLCBmdW5jdGlvbiAoY2h1bmspIHtcbiAgICAgICAgICAgICAgICBib2R5ICs9IGNodW5rXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcHJveHlSZXMub24oXCJlbmRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3AgPSBKU09OLnBhcnNlKGJvZHkpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3ApXG4gICAgICAgICAgICAgICAgcmVzLmVuZChcIm15IGNsaVwiKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3h5Lm9uY2UoJ3Byb3h5UmVzJywgaGFuZGxlTG9naW5SZXNwb25zZSlcbiAgICAgICAgcHJveHkud2ViKHJlcSwgcmVzLCB7XG4gICAgICAgICAgICB0YXJnZXQ6IFwiaHR0cHM6Ly9kZXZhcGkubXlzcGEudm5cIixcbiAgICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGZIYW5kbGVSZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICB9KVxufSJdLCJuYW1lcyI6WyJodHRwUHJveHkiLCJwcm94eSIsImNyZWF0ZVByb3h5U2VydmVyIiwiY29uZmlnIiwiYXBpIiwiYm9keVBhcnNlciIsInNpemVMaW1pdCIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsIlByb21pc2UiLCJyZXNvbHZlZCIsImhlYWRlcnMiLCJjb29raWUiLCJoYW5kbGVMb2dpblJlc3BvbnNlIiwicHJveHlSZXMiLCJib2R5Iiwib24iLCJjaHVuayIsInJlc3AiLCJKU09OIiwicGFyc2UiLCJjb25zb2xlIiwibG9nIiwiZW5kIiwib25jZSIsIndlYiIsInRhcmdldCIsImNoYW5nZU9yaWdpbiIsInNlbGZIYW5kbGVSZXNwb25zZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/login.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/login.ts"));
module.exports = __webpack_exports__;

})();