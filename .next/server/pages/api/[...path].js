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
exports.id = "pages/api/[...path]";
exports.ids = ["pages/api/[...path]"];
exports.modules = {

/***/ "http-proxy":
/*!*****************************!*\
  !*** external "http-proxy" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("http-proxy");

/***/ }),

/***/ "(api)/./pages/api/[...path].ts":
/*!********************************!*\
  !*** ./pages/api/[...path].ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"config\": () => (/* binding */ config),\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var http_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http-proxy */ \"http-proxy\");\n/* harmony import */ var http_proxy__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http_proxy__WEBPACK_IMPORTED_MODULE_0__);\n\nconst proxy = http_proxy__WEBPACK_IMPORTED_MODULE_0___default().createProxyServer();\nconst config = {\n    api: {\n        bodyParser: {\n            sizeLimit: false\n        }\n    }\n};\nasync function handler(req, res) {\n    return new Promise((resolved)=>{\n        req.headers.cookie = \"\";\n        proxy.web(req, res, {\n            target: \"https://devapi.myspa.vn\",\n            changeOrigin: true,\n            selfHandleResponse: false\n        });\n        proxy.once(\"proxyRes\", ()=>{\n            resolved(true);\n        });\n    });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvWy4uLnBhdGhdLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDbUM7QUFFbkMsTUFBTUMsS0FBSyxHQUFHRCxtRUFBMkIsRUFBRTtBQUNwQyxNQUFNRyxNQUFNLEdBQUc7SUFDbEJDLEdBQUcsRUFBRTtRQUNEQyxVQUFVLEVBQUU7WUFDUkMsU0FBUyxFQUFFLEtBQUs7U0FDbkI7S0FDSjtDQUNKO0FBRWMsZUFBZUMsT0FBTyxDQUNqQ0MsR0FBbUIsRUFDbkJDLEdBQXlCLEVBQzNCO0lBQ0UsT0FBTyxJQUFJQyxPQUFPLENBQUMsQ0FBQ0MsUUFBUSxHQUFLO1FBQzdCSCxHQUFHLENBQUNJLE9BQU8sQ0FBQ0MsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUN4QlosS0FBSyxDQUFDYSxHQUFHLENBQUNOLEdBQUcsRUFBRUMsR0FBRyxFQUFFO1lBQ2hCTSxNQUFNLEVBQUUseUJBQXlCO1lBQ2pDQyxZQUFZLEVBQUUsSUFBSTtZQUNsQkMsa0JBQWtCLEVBQUUsS0FBSztTQUM1QixDQUFDO1FBQ0ZoQixLQUFLLENBQUNpQixJQUFJLENBQUMsVUFBVSxFQUFFLElBQU07WUFDekJQLFFBQVEsQ0FBQyxJQUFJLENBQUM7U0FDakIsQ0FBQztLQUNMLENBQUM7Q0FDTCIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYi1ib29raW5nLy4vcGFnZXMvYXBpL1suLi5wYXRoXS50cz9mZWRmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gJ25leHQnO1xuaW1wb3J0IGh0dHBQcm94eSBmcm9tIFwiaHR0cC1wcm94eVwiO1xuXG5jb25zdCBwcm94eSA9IGh0dHBQcm94eS5jcmVhdGVQcm94eVNlcnZlcigpO1xuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgICBhcGk6IHtcbiAgICAgICAgYm9keVBhcnNlcjoge1xuICAgICAgICAgICAgc2l6ZUxpbWl0OiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICB9LFxufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKFxuICAgIHJlcTogTmV4dEFwaVJlcXVlc3QsXG4gICAgcmVzOiBOZXh0QXBpUmVzcG9uc2U8YW55PlxuKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlZCkgPT4ge1xuICAgICAgICByZXEuaGVhZGVycy5jb29raWUgPSBcIlwiO1xuICAgICAgICBwcm94eS53ZWIocmVxLCByZXMsIHtcbiAgICAgICAgICAgIHRhcmdldDogXCJodHRwczovL2RldmFwaS5teXNwYS52blwiLFxuICAgICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgICAgc2VsZkhhbmRsZVJlc3BvbnNlOiBmYWxzZSxcbiAgICAgICAgfSlcbiAgICAgICAgcHJveHkub25jZShcInByb3h5UmVzXCIsICgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmVkKHRydWUpXG4gICAgICAgIH0pXG4gICAgfSlcbn0iXSwibmFtZXMiOlsiaHR0cFByb3h5IiwicHJveHkiLCJjcmVhdGVQcm94eVNlcnZlciIsImNvbmZpZyIsImFwaSIsImJvZHlQYXJzZXIiLCJzaXplTGltaXQiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwiUHJvbWlzZSIsInJlc29sdmVkIiwiaGVhZGVycyIsImNvb2tpZSIsIndlYiIsInRhcmdldCIsImNoYW5nZU9yaWdpbiIsInNlbGZIYW5kbGVSZXNwb25zZSIsIm9uY2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/[...path].ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/[...path].ts"));
module.exports = __webpack_exports__;

})();