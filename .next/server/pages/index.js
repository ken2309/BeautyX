(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 1258:
/***/ ((module) => {

// Exports
module.exports = {
	"ser_pro_item": "ServicePromo_ser_pro_item__9NQoY",
	"ser_img_cnt": "ServicePromo_ser_img_cnt__9ptWF",
	"ser_img": "ServicePromo_ser_img__TtZtS",
	"ser_promo": "ServicePromo_ser_promo__fssgj",
	"ser_promo__percent": "ServicePromo_ser_promo__percent__d_wsW",
	"ser_promo__bot": "ServicePromo_ser_promo__bot__tkcL7",
	"ser_promo__bot_start": "ServicePromo_ser_promo__bot_start__t0cyA",
	"ser_img__org_logo": "ServicePromo_ser_img__org_logo__bBH7J",
	"ser_pro_item__cnt": "ServicePromo_ser_pro_item__cnt__3pE1E",
	"ser_name": "ServicePromo_ser_name__EdMX7",
	"ser_price": "ServicePromo_ser_price__jq4wQ",
	"ser_price_special": "ServicePromo_ser_price_special__Slzk_",
	"ser_price_old": "ServicePromo_ser_price_old__5aY6V",
	"ser_org_address": "ServicePromo_ser_org_address__b0_ZT",
	"ser_org_address_p": "ServicePromo_ser_org_address_p__P_z7a"
};


/***/ }),

/***/ 6853:
/***/ ((module) => {

// Exports
module.exports = {
	"home_title": "HomeSectionTitle_home_title__AMjdV",
	"title": "HomeSectionTitle_title__EsABI"
};


/***/ }),

/***/ 1288:
/***/ ((module) => {

// Exports
module.exports = {
	"home_section_promo": "Home_home_section_promo__4nFON",
	"home_service_list": "Home_home_service_list__Pkd7_",
	"home_service_item_cnt": "Home_home_service_item_cnt__SyrQA"
};


/***/ }),

/***/ 5685:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: external "axios"
const external_axios_namespaceObject = require("axios");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_namespaceObject);
;// CONCATENATED MODULE: external "query-string"
const external_query_string_namespaceObject = require("query-string");
var external_query_string_default = /*#__PURE__*/__webpack_require__.n(external_query_string_namespaceObject);
;// CONCATENATED MODULE: ./src/api/axios.ts


// export const baseURL = process.env.REACT_APP_API_TEST;
const baseURL = process.env.REACT_APP_API_URL;
//export const baseURL = process.env.REACT_APP_API_PRO;
// export const baseURL ="https://api.myspa.vn/v1/"
const axiosClient = external_axios_default().create({
    baseURL: baseURL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    paramsSerializer: (params)=>external_query_string_default().stringify(params)
});
axiosClient.interceptors.request.use(async (config)=>{
    return config;
});
external_axios_default().interceptors.response.use((response)=>{
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error)=>{
    throw error;
});
/* harmony default export */ const axios = (axiosClient);

;// CONCATENATED MODULE: external "lodash"
const external_lodash_namespaceObject = require("lodash");
;// CONCATENATED MODULE: ./src/api/servicePromoApi.ts


class ServicePromo {
    //services promo
    getServicesPromo = async (values)=>{
        const url = `/services`;
        // const LOCATION = AUTH_LOCATION();
        const paramsOb = {
            page: values.page || 1,
            limit: 30,
            "filter[keyword]": values.keyword,
            "filter[min_price]": values.min_price || 1000,
            "filter[max_price]": values.max_price,
            "filter[special_min_price]": values.special_min_price || 1000,
            "filter[special_max_price]": values.special_max_price,
            "filter[discount_percent]": values.discount_percent,
            "filter[special_price]": values.special_price,
            "filter[is_momo_ecommerce_enable]": true,
            // "filter[location]": values.sort === "distance" ? LOCATION : null,
            "sort": values.sort === "distance" ? null : values.sort
        };
        const params = (0,external_lodash_namespaceObject.pickBy)(paramsOb, external_lodash_namespaceObject.identity);
        return axios.get(url, {
            params
        });
    };
}
const servicePromoApi = new ServicePromo();
/* harmony default export */ const api_servicePromoApi = (servicePromoApi);

;// CONCATENATED MODULE: external "@mui/material"
const material_namespaceObject = require("@mui/material");
// EXTERNAL MODULE: ./next/components/ServicePromoItem/ServicePromo.module.css
var ServicePromo_module = __webpack_require__(1258);
var ServicePromo_module_default = /*#__PURE__*/__webpack_require__.n(ServicePromo_module);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./src/utils/formatUrlString.ts
function slugify(string) {
    const a = `àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;`;
    const b = `aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------`;
    const p = new RegExp(a.split("").join("| "), "g");
    return string.toString().toLowerCase().replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a").replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e").replace(/i|í|ì|ỉ|ĩ|ị/gi, "i").replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o").replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u").replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y").replace(/đ/gi, "d").replace(/\s+/g, "-").replace(p, (c)=>b.charAt(a.indexOf(c))).replace(/&/g, "-and -")// eslint-disable-next-line no-useless-escape
    .replace(/[^\w\-]+/g, "")// eslint-disable-next-line no-useless-escape
    .replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
};
const formatParam = (url)=>{
    const params = url.split("?");
    return params;
};
const shareLink = ()=>{
    const string = window.location.search;
    if (string) {
        const queryString = string.split("?");
        const result = queryString.length > 2 ? "?" + queryString[1] + "&" + queryString[queryString.length - 1] : "?" + queryString[1];
        const urlSearchParams = new URLSearchParams(result);
        return Object.fromEntries(urlSearchParams.entries());
    }
};

;// CONCATENATED MODULE: ./src/assets/icon/avatar.svg
/* harmony default export */ const avatar = ({"src":"/_next/static/media/avatar.f1a0ee30.svg","height":36,"width":36});
;// CONCATENATED MODULE: ./src/assets/icon/logo.svg
/* harmony default export */ const logo = ({"src":"/_next/static/media/logo.50acd6f2.svg","height":44,"width":54});
;// CONCATENATED MODULE: ./src/assets/icon/menu.svg
/* harmony default export */ const menu = ({"src":"/_next/static/media/menu.0e27333e.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/shoppingCartSimple.svg
/* harmony default export */ const shoppingCartSimple = ({"src":"/_next/static/media/shoppingCartSimple.6d696ef8.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/check.svg
/* harmony default export */ const check = ({"src":"/_next/static/media/check.d4bafad8.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/check-2.svg
/* harmony default export */ const check_2 = ({"src":"/_next/static/media/check-2.10d4f964.svg","height":16,"width":16});
;// CONCATENATED MODULE: ./src/assets/icon/ellipse _109.svg
/* harmony default export */ const ellipse_109 = ({"src":"/_next/static/media/ellipse _109.55357201.svg","height":16,"width":16});
;// CONCATENATED MODULE: ./src/assets/icon/expand_right.svg
/* harmony default export */ const expand_right = ({"src":"/_next/static/media/expand_right.c4c3010f.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/expand_down.svg
/* harmony default export */ const expand_down = ({"src":"/_next/static/media/expand_down.1508013d.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/search.svg
/* harmony default export */ const search = ({"src":"/_next/static/media/search.a0d9ef69.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/vector_10.svg
/* harmony default export */ const vector_10 = ({"src":"/_next/static/media/vector_10.8f723dfe.svg","height":6,"width":10});
;// CONCATENATED MODULE: ./src/assets/icon/vector_down.svg
/* harmony default export */ const vector_down = ({"src":"/_next/static/media/vector_down.531b84bf.svg","height":4,"width":6});
;// CONCATENATED MODULE: ./src/assets/icon/miniMapIcon.svg
/* harmony default export */ const miniMapIcon = ({"src":"/_next/static/media/miniMapIcon.ba447377.svg","height":45,"width":44});
;// CONCATENATED MODULE: ./src/assets/icon/pinMap.svg
/* harmony default export */ const pinMap = ({"src":"/_next/static/media/pinMap.f6ca32be.svg","height":40,"width":30});
;// CONCATENATED MODULE: ./src/assets/icon/star_fill.svg
/* harmony default export */ const star_fill = ({"src":"/_next/static/media/star_fill.4f8da126.svg","height":16,"width":16});
;// CONCATENATED MODULE: ./src/assets/icon/chat_alt_fill.svg
/* harmony default export */ const chat_alt_fill = ({"src":"/_next/static/media/chat_alt_fill.a0e5b824.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/locate.svg
/* harmony default export */ const locate = ({"src":"/_next/static/media/locate.f5c301e6.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/time.svg
/* harmony default export */ const time = ({"src":"/_next/static/media/time.b7417049.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/carSimple.svg
/* harmony default export */ const carSimple = ({"src":"/_next/static/media/carSimple.6d8278cf.svg","height":18,"width":18});
;// CONCATENATED MODULE: ./src/assets/icon/bed.svg
/* harmony default export */ const bed = ({"src":"/_next/static/media/bed.2f723ce1.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/door.svg
/* harmony default export */ const door = ({"src":"/_next/static/media/door.a3deb476.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/pPrev.svg
/* harmony default export */ const pPrev = ({"src":"/_next/static/media/pPrev.28a2a047.svg","height":24,"width":25});
;// CONCATENATED MODULE: ./src/assets/icon/pNext.svg
/* harmony default export */ const pNext = ({"src":"/_next/static/media/pNext.fc470d6c.svg","height":24,"width":25});
;// CONCATENATED MODULE: ./src/assets/icon/logo_cong_ty.svg
/* harmony default export */ const logo_cong_ty = ({"src":"/_next/static/media/logo_cong_ty.6eed55c2.svg","height":96,"width":96});
;// CONCATENATED MODULE: ./src/assets/icon/phone.png
/* harmony default export */ const phone = ({"src":"/_next/static/media/phone.d6bc2dea.png","height":20,"width":21,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAl0lEQVR42mNgAIKChJ08BYm7youSdvNA+UwMUABTkA/EFwsTd83Ij9/JChVjRFYwD4i9gXhrfvx2MZgpQA2MMAUpQLwdiNcXJOyQZUADMEXLgPggEK8sSNy5ozBxZxsDsoOAOvmA7C1AvBGIfYDG7ylI2FUJU8TMAAQ5cbtYgewJQBNWA/FKoCZjZCuY4Oz4HbI50evBmgCifkvvZhdVjgAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./src/assets/icon/gps_fixed.png
/* harmony default export */ const gps_fixed = ({"src":"/_next/static/media/gps_fixed.d1f4f7bf.png","height":20,"width":20,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAaVBMVEVxYbxxYbtxYbpxYblwYblwYLpwYLlxYblwYblxYLlwYLpwYLlwYLpwYLlwYLhwYLpwYLlwYLhwYLhwYLhwYLdwYLlwYLhwYLpwYLlwYblwYLlxYblwYLlwYblwYLlwYLlxYblwYblwYLneH+h0AAAAI3RSTlMAAAAAAAAABAQEBAQnJycoKCg2Nzc/P0dHwsLJyc3NztLS0uj9dYgAAABESURBVHjaBUAJFkAgFBzboIREvhbi/of00OhuWqiAoZVcpFLgmfyWhFjLfgV/G5jHh+A+C0p0RxRCU94s7FGPtDN1/QOXKQQ7YwsIQgAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./src/assets/icon/darhboard.svg
/* harmony default export */ const darhboard = ({"src":"/_next/static/media/darhboard.6b3f170b.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/buildings.svg
/* harmony default export */ const buildings = ({"src":"/_next/static/media/buildings.5fc5f5fa.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/message.svg
/* harmony default export */ const message = ({"src":"/_next/static/media/message.a224688c.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/phone.svg
/* harmony default export */ const icon_phone = ({"src":"/_next/static/media/phone.5dc54e59.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/storefront.svg
/* harmony default export */ const storefront = ({"src":"/_next/static/media/storefront.51ba6f3c.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/user.svg
/* harmony default export */ const user = ({"src":"/_next/static/media/user.4b096a1f.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/user_1.svg
/* harmony default export */ const user_1 = ({"src":"/_next/static/media/user_1.8f726e7f.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/user_box.svg
/* harmony default export */ const user_box = ({"src":"/_next/static/media/user_box.b3d4e530.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/location.svg
/* harmony default export */ const icon_location = ({"src":"/_next/static/media/location.24b5aca0.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/arrow-down-white.svg
/* harmony default export */ const arrow_down_white = ({"src":"/_next/static/media/arrow-down-white.45e691d0.svg","height":6,"width":10});
;// CONCATENATED MODULE: ./src/assets/icon/search-white.svg
/* harmony default export */ const search_white = ({"src":"/_next/static/media/search-white.a8cc1f25.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/lock.svg
/* harmony default export */ const lock = ({"src":"/_next/static/media/lock.49545240.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/eye.svg
/* harmony default export */ const eye = ({"src":"/_next/static/media/eye.b973328d.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/facebook.svg
/* harmony default export */ const facebook = ({"src":"/_next/static/media/facebook.382a4856.svg","height":44,"width":44});
;// CONCATENATED MODULE: ./src/assets/icon/google.svg
/* harmony default export */ const google = ({"src":"/_next/static/media/google.def5b1c2.svg","height":46,"width":46});
;// CONCATENATED MODULE: ./src/assets/icon/warning.svg
/* harmony default export */ const warning = ({"src":"/_next/static/media/warning.efbd83c4.svg","height":24,"width":25});
;// CONCATENATED MODULE: ./src/assets/icon/arrow_drop_down.svg
/* harmony default export */ const arrow_drop_down = ({"src":"/_next/static/media/arrow_drop_down.8d399b70.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/box.svg
/* harmony default export */ const box = ({"src":"/_next/static/media/box.3e1c9bd4.svg","height":32,"width":32});
;// CONCATENATED MODULE: ./src/assets/icon/bag_alt.svg
/* harmony default export */ const bag_alt = ({"src":"/_next/static/media/bag_alt.c9e62d39.svg","height":32,"width":32});
;// CONCATENATED MODULE: ./src/assets/icon/trash.svg
/* harmony default export */ const trash = ({"src":"/_next/static/media/trash.d422c03e.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/vi.svg
/* harmony default export */ const vi = ({"src":"/_next/static/media/vi.db628044.svg","height":474,"width":474});
;// CONCATENATED MODULE: ./src/assets/icon/en.svg
/* harmony default export */ const en = ({"src":"/_next/static/media/en.ba45beca.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/money.svg
/* harmony default export */ const money = ({"src":"/_next/static/media/money.37209150.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/camera.svg
/* harmony default export */ const camera = ({"src":"/_next/static/media/camera.be7c186a.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/ticket.svg
/* harmony default export */ const ticket = ({"src":"/_next/static/media/ticket.88f07d50.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/wallet_alt.svg
/* harmony default export */ const wallet_alt = ({"src":"/_next/static/media/wallet_alt.6eec3fdc.svg","height":20,"width":21});
;// CONCATENATED MODULE: ./src/assets/icon/crown.svg
/* harmony default export */ const crown = ({"src":"/_next/static/media/crown.85483917.svg","height":20,"width":21});
;// CONCATENATED MODULE: ./src/assets/icon/camera_purple.svg
/* harmony default export */ const camera_purple = ({"src":"/_next/static/media/camera_purple.ef9ee5a6.svg","height":16,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/credit_card.svg
/* harmony default export */ const credit_card = ({"src":"/_next/static/media/credit_card.7f8b0f05.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/clockCounterClockwise.svg
/* harmony default export */ const clockCounterClockwise = ({"src":"/_next/static/media/clockCounterClockwise.365e8158.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/bell.svg
/* harmony default export */ const bell = ({"src":"/_next/static/media/bell.389226e1.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/bell_1.svg
/* harmony default export */ const bell_1 = ({"src":"/_next/static/media/bell_1.fdf28d4d.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/union.svg
/* harmony default export */ const union = ({"src":"/_next/static/media/union.02b19735.svg","height":22,"width":22});
;// CONCATENATED MODULE: ./src/assets/icon/headphones_fill.svg
/* harmony default export */ const headphones_fill = ({"src":"/_next/static/media/headphones_fill.f32ad688.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/plus.svg
/* harmony default export */ const plus = ({"src":"/_next/static/media/plus.207aef99.svg","height":32,"width":32});
;// CONCATENATED MODULE: ./src/assets/icon/success.png
/* harmony default export */ const success = ({"src":"/_next/static/media/success.3b5b7df1.png","height":64,"width":65,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA8klEQVR42mMAgYLEXSoFCTv3A+lfQPpXccqufSUpu1QgkvE7FQsTdz0vTNr1Hyj5vzh51/+04G3/82J3Pi9N263AUJS0axOQ8z8nasfP8ozd/2NctvzfvO7qzyndx/8neG3ZxJAbs+N9bf6+/83lB/776W74v2j22f/nzz7+D9JUkLjzPQNQ5/uGkv3/LwAF508//f/yhSf/KzL3/M+K2PG/KHnXe4aS1N2bUgO3/Z/Sfeznwwdv/vc2H/mfErDtZ3EK2E1gKxSAKp9nR+74nx8HdgtQJ1jyeWHiTkWwT/Ljd6oABfeBvFiUBPbqfqAk2JsAFPSUR4ZlrT8AAAAASUVORK5CYII="});
;// CONCATENATED MODULE: ./src/assets/icon/checkWhite.svg
/* harmony default export */ const checkWhite = ({"src":"/_next/static/media/checkWhite.825d435d.svg","height":30,"width":36});
;// CONCATENATED MODULE: ./src/assets/icon/calendar.svg
/* harmony default export */ const calendar = ({"src":"/_next/static/media/calendar.40e0fb49.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/calendar_1.svg
/* harmony default export */ const calendar_1 = ({"src":"/_next/static/media/calendar_1.9c147028.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/onedot.svg
/* harmony default export */ const onedot = ({"src":"/_next/static/media/onedot.3704e315.svg","height":4,"width":4});
;// CONCATENATED MODULE: ./src/assets/icon/ticketHome.svg
/* harmony default export */ const ticketHome = ({"src":"/_next/static/media/ticketHome.c0b5d3c1.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/close_ring.svg
/* harmony default export */ const close_ring = ({"src":"/_next/static/media/close_ring.16576696.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/info.svg
/* harmony default export */ const info = ({"src":"/_next/static/media/info.b1d3c906.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/exclude.svg
/* harmony default export */ const exclude = ({"src":"/_next/static/media/exclude.12844bcb.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/exclude2.svg
/* harmony default export */ const exclude2 = ({"src":"/_next/static/media/exclude2.eb4baf4f.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/exclude3.svg
/* harmony default export */ const exclude3 = ({"src":"/_next/static/media/exclude3.ee658863.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/exclude4.svg
/* harmony default export */ const exclude4 = ({"src":"/_next/static/media/exclude4.15cacff0.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/setting_line.svg
/* harmony default export */ const setting_line = ({"src":"/_next/static/media/setting_line.18eac861.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/arrowPurple.svg
/* harmony default export */ const arrowPurple = ({"src":"/_next/static/media/arrowPurple.a06559dc.svg","height":6,"width":9});
;// CONCATENATED MODULE: ./src/assets/icon/trashOrange.svg
/* harmony default export */ const trashOrange = ({"src":"/_next/static/media/trashOrange.9e671462.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/sign_out_squre.svg
/* harmony default export */ const sign_out_squre = ({"src":"/_next/static/media/sign_out_squre.ebb199b6.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/userCircle.svg
/* harmony default export */ const userCircle = ({"src":"/_next/static/media/userCircle.f1a0ee30.svg","height":36,"width":36});
;// CONCATENATED MODULE: ./src/assets/icon/sign_out.svg
/* harmony default export */ const sign_out = ({"src":"/_next/static/media/sign_out.ebb199b6.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/home.svg
/* harmony default export */ const home = ({"src":"/_next/static/media/home.9f3bd391.svg","height":24,"width":25});
;// CONCATENATED MODULE: ./src/assets/icon/home_1.svg
/* harmony default export */ const home_1 = ({"src":"/_next/static/media/home_1.0788e506.svg","height":24,"width":25});
;// CONCATENATED MODULE: ./src/assets/icon/chevron-left.svg
/* harmony default export */ const chevron_left = ({"src":"/_next/static/media/chevron-left.2154aaab.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/searchPurple.svg
/* harmony default export */ const searchPurple = ({"src":"/_next/static/media/searchPurple.75eaeb8a.svg","height":17,"width":17});
;// CONCATENATED MODULE: ./src/assets/icon/pinMap_2.svg
/* harmony default export */ const pinMap_2 = ({"src":"/_next/static/media/pinMap_2.8af7c2ae.svg","height":104,"width":104});
;// CONCATENATED MODULE: ./src/assets/icon/chevron-right.svg
/* harmony default export */ const chevron_right = ({"src":"/_next/static/media/chevron-right.c4c3010f.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/edit.svg
/* harmony default export */ const edit = ({"src":"/_next/static/media/edit.4a03d4ec.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/desk_alt.svg
/* harmony default export */ const desk_alt = ({"src":"/_next/static/media/desk_alt.13ecfb1e.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/tumer.svg
/* harmony default export */ const tumer = ({"src":"/_next/static/media/tumer.b823a17a.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/x.svg
/* harmony default export */ const x = ({"src":"/_next/static/media/x.37f1dc4b.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/staff.svg
/* harmony default export */ const staff = ({"src":"/_next/static/media/staff.d3cd4b2a.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/branches.svg
/* harmony default export */ const branches = ({"src":"/_next/static/media/branches.9d3b2c81.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/chevronRight_2.svg
/* harmony default export */ const chevronRight_2 = ({"src":"/_next/static/media/chevronRight_2.0679f81c.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/filter.svg
/* harmony default export */ const filter = ({"src":"/_next/static/media/filter.c22a2c9d.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/menuWhite.svg
/* harmony default export */ const menuWhite = ({"src":"/_next/static/media/menuWhite.62e3e498.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/shoppingCartSimpleWhite.svg
/* harmony default export */ const shoppingCartSimpleWhite = ({"src":"/_next/static/media/shoppingCartSimpleWhite.8b8a629d.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/closeCircle.svg
/* harmony default export */ const closeCircle = ({"src":"/_next/static/media/closeCircle.f7966a0d.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/favorite_fill.svg
/* harmony default export */ const favorite_fill = ({"src":"/_next/static/media/favorite_fill.17aaf00f.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/pPrev_purple.svg
/* harmony default export */ const pPrev_purple = ({"src":"/_next/static/media/pPrev_purple.694fda39.svg","height":24,"width":25});
;// CONCATENATED MODULE: ./src/assets/icon/order_cancel.svg
/* harmony default export */ const order_cancel = ({"src":"/_next/static/media/order_cancel.977d7672.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/order_finish.svg
/* harmony default export */ const order_finish = ({"src":"/_next/static/media/order_finish.3b986c74.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/order_pending.svg
/* harmony default export */ const order_pending = ({"src":"/_next/static/media/order_pending.c5df0881.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/back_white.svg
/* harmony default export */ const back_white = ({"src":"/_next/static/media/back_white.cf744e81.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/check_green.svg
/* harmony default export */ const check_green = ({"src":"/_next/static/media/check_green.8a7f4edb.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/chevron-up-white.svg
/* harmony default export */ const chevron_up_white = ({"src":"/_next/static/media/chevron-up-white.ee087887.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/chevron-down-white.svg
/* harmony default export */ const chevron_down_white = ({"src":"/_next/static/media/chevron-down-white.4929aac7.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/mapPinRed.svg
/* harmony default export */ const mapPinRed = ({"src":"/_next/static/media/mapPinRed.d337c8d2.svg","height":12,"width":12});
;// CONCATENATED MODULE: ./src/assets/icon/heart.svg
/* harmony default export */ const heart = ({"src":"/_next/static/media/heart.37ed8038.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/unHeart.svg
/* harmony default export */ const unHeart = ({"src":"/_next/static/media/unHeart.f3d049c7.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/unHeartWhite.svg
/* harmony default export */ const unHeartWhite = ({"src":"/_next/static/media/unHeartWhite.8f3a22df.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/chevronRightBlack.svg
/* harmony default export */ const chevronRightBlack = ({"src":"/_next/static/media/chevronRightBlack.5ad4d004.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/distance.svg
/* harmony default export */ const distance = ({"src":"/_next/static/media/distance.15da9fad.svg","height":44,"width":49});
;// CONCATENATED MODULE: ./src/assets/icon/fire.svg
/* harmony default export */ const fire = ({"src":"/_next/static/media/fire.e3038d59.svg","height":47,"width":49});
;// CONCATENATED MODULE: ./src/assets/icon/sheild.svg
/* harmony default export */ const sheild = ({"src":"/_next/static/media/sheild.362bcd8b.svg","height":44,"width":49});
;// CONCATENATED MODULE: ./src/assets/icon/editWhite.svg
/* harmony default export */ const editWhite = ({"src":"/_next/static/media/editWhite.74115369.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/pinMapGreen.svg
/* harmony default export */ const pinMapGreen = ({"src":"/_next/static/media/pinMapGreen.e5ffe4cf.svg","height":40,"width":30});
;// CONCATENATED MODULE: ./src/assets/icon/pinMapRed.svg
/* harmony default export */ const pinMapRed = ({"src":"/_next/static/media/pinMapRed.4705d169.svg","height":40,"width":30});
;// CONCATENATED MODULE: ./src/assets/icon/closeCircleWhite.svg
/* harmony default export */ const closeCircleWhite = ({"src":"/_next/static/media/closeCircleWhite.3cfd1ebd.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/sucessGreen.svg
/* harmony default export */ const sucessGreen = ({"src":"/_next/static/media/sucessGreen.5cc42381.svg","height":64,"width":65});
;// CONCATENATED MODULE: ./src/assets/icon/xCircleRed.svg
/* harmony default export */ const xCircleRed = ({"src":"/_next/static/media/xCircleRed.81a1ff67.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/loginReq.svg
/* harmony default export */ const loginReq = ({"src":"/_next/static/media/loginReq.e821c1a3.svg","height":172,"width":197});
;// CONCATENATED MODULE: ./src/assets/icon/playCirclePurple.svg
/* harmony default export */ const playCirclePurple = ({"src":"/_next/static/media/playCirclePurple.81c57368.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/playCircle.svg
/* harmony default export */ const playCircle = ({"src":"/_next/static/media/playCircle.4f9697a2.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/newsPurple.svg
/* harmony default export */ const newsPurple = ({"src":"/_next/static/media/newsPurple.556341cd.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/languagePurple.svg
/* harmony default export */ const languagePurple = ({"src":"/_next/static/media/languagePurple.92f41834.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/sendWhite.svg
/* harmony default export */ const sendWhite = ({"src":"/_next/static/media/sendWhite.c0cb5413.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/cartCheckPurple.svg
/* harmony default export */ const cartCheckPurple = ({"src":"/_next/static/media/cartCheckPurple.2b1e337a.svg","height":12,"width":12});
;// CONCATENATED MODULE: ./src/assets/icon/wifiBlack.svg
/* harmony default export */ const wifiBlack = ({"src":"/_next/static/media/wifiBlack.c2a51cfe.svg","height":12,"width":12});
;// CONCATENATED MODULE: ./src/assets/icon/carBlack.svg
/* harmony default export */ const carBlack = ({"src":"/_next/static/media/carBlack.14425a86.svg","height":12,"width":12});
;// CONCATENATED MODULE: ./src/assets/icon/creditCardBlack.svg
/* harmony default export */ const creditCardBlack = ({"src":"/_next/static/media/creditCardBlack.a4e071a3.svg","height":12,"width":12});
;// CONCATENATED MODULE: ./src/assets/icon/watch_more.svg
/* harmony default export */ const watch_more = ({"src":"/_next/static/media/watch_more.6a7138b1.svg","height":14,"width":8});
;// CONCATENATED MODULE: ./src/assets/icon/comment_light.svg
/* harmony default export */ const comment_light = ({"src":"/_next/static/media/comment_light.a1e8dfe7.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/comment_bold.svg
/* harmony default export */ const comment_bold = ({"src":"/_next/static/media/comment_bold.9b4d94d3.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/shareReels.svg
/* harmony default export */ const shareReels = ({"src":"/_next/static/media/shareReels.c1d98db5.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/send-comment.svg
/* harmony default export */ const send_comment = ({"src":"/_next/static/media/send-comment.0664a6e2.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/add-img.svg
/* harmony default export */ const add_img = ({"src":"/_next/static/media/add-img.b14e0272.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/tickBlue.png
/* harmony default export */ const tickBlue = ({"src":"/_next/static/media/tickBlue.48f8d1b9.png","height":24,"width":24,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAaVBMVEUhlvMgl/IhlvMglvMhl/MhlvMglvMglvMglvMhlvMhlvMhlvIglfIhlvIhlvIglfIhlfMglvIhlvIhlfIglfIhlfMglvMglvIglfMglfIglfIglvMhlfMglvIhlvMhlvIglvIhlfMhlfJ27CT3AAAAHnRSTlMADxQUFRUVLExNT09PUFxiaWt2dnaZu7u7u97f4eIi7uOlAAAAR0lEQVR42g3LRwKAIAwEwFWx90hALEDy/0fq3Acw5BwZoGZNmrjBoXc/v2Jxylp0u3g4XbZ2iAGUrml8soXhGCVz9TcKnkp8qxcEu3B0RacAAAAASUVORK5CYII="});
;// CONCATENATED MODULE: ./src/assets/icon/userNotSign.svg
/* harmony default export */ const userNotSign = ({"src":"/_next/static/media/userNotSign.f1a0ee30.svg","height":36,"width":36});
;// CONCATENATED MODULE: ./src/assets/icon/arrow_drop_down_purple.svg
/* harmony default export */ const arrow_drop_down_purple = ({"src":"/_next/static/media/arrow_drop_down_purple.c0cd31c8.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/shopping-cart-add.svg
/* harmony default export */ const shopping_cart_add = ({"src":"/_next/static/media/shopping-cart-add.2b0347b1.svg","height":12,"width":12});
;// CONCATENATED MODULE: ./src/assets/icon/shopping-cart-add-orange.svg
/* harmony default export */ const shopping_cart_add_orange = ({"src":"/_next/static/media/shopping-cart-add-orange.953f2ec5.svg","height":12,"width":12});
;// CONCATENATED MODULE: ./src/assets/icon/favorite-stroke.svg
/* harmony default export */ const favorite_stroke = ({"src":"/_next/static/media/favorite-stroke.fdf2261a.svg","height":21,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/rss.svg
/* harmony default export */ const rss = ({"src":"/_next/static/media/rss.088fd812.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/archive.svg
/* harmony default export */ const archive = ({"src":"/_next/static/media/archive.4ce0d278.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/add-btn.svg
/* harmony default export */ const add_btn = ({"src":"/_next/static/media/add-btn.7da6ea8e.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/remove-btn.svg
/* harmony default export */ const remove_btn = ({"src":"/_next/static/media/remove-btn.7fa1d8ae.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/alarm-clock.svg
/* harmony default export */ const alarm_clock = ({"src":"/_next/static/media/alarm-clock.24041972.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/list.svg
/* harmony default export */ const list = ({"src":"/_next/static/media/list.4a812d0c.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/arrown-left-white.svg
/* harmony default export */ const arrown_left_white = ({"src":"/_next/static/media/arrown-left-white.51211366.svg","height":10,"width":7});
;// CONCATENATED MODULE: ./src/assets/icon/arrown-right-white.svg
/* harmony default export */ const arrown_right_white = ({"src":"/_next/static/media/arrown-right-white.3b4c1e4e.svg","height":10,"width":7});
;// CONCATENATED MODULE: ./src/assets/icon/cartPurpleBold.svg
/* harmony default export */ const cartPurpleBold = ({"src":"/_next/static/media/cartPurpleBold.ffdef3c9.svg","height":16,"width":16});
;// CONCATENATED MODULE: ./src/assets/icon/calendarPurpleBold.svg
/* harmony default export */ const calendarPurpleBold = ({"src":"/_next/static/media/calendarPurpleBold.6bdbea0e.svg","height":16,"width":16});
;// CONCATENATED MODULE: ./src/assets/icon/cardDiscountOrange.svg
/* harmony default export */ const cardDiscountOrange = ({"src":"/_next/static/media/cardDiscountOrange.dd1ca7a5.svg","height":10,"width":12});
;// CONCATENATED MODULE: ./src/assets/icon/tumer-gray.svg
/* harmony default export */ const tumer_gray = ({"src":"/_next/static/media/tumer-gray.dd7fa3e3.svg","height":20,"width":20});
;// CONCATENATED MODULE: ./src/assets/icon/searchGray.svg
/* harmony default export */ const searchGray = ({"src":"/_next/static/media/searchGray.c6947e0d.svg","height":16,"width":16});
;// CONCATENATED MODULE: ./src/assets/icon/email-white.svg
/* harmony default export */ const email_white = ({"src":"/_next/static/media/email-white.abe20a28.svg","height":12,"width":12});
;// CONCATENATED MODULE: ./src/assets/icon/phone-white.svg
/* harmony default export */ const phone_white = ({"src":"/_next/static/media/phone-white.ba54079d.svg","height":12,"width":12});
;// CONCATENATED MODULE: ./src/assets/icon/edit-white.svg
/* harmony default export */ const edit_white = ({"src":"/_next/static/media/edit-white.952504d6.svg","height":12,"width":12});
;// CONCATENATED MODULE: ./src/assets/icon/box-acc.svg
/* harmony default export */ const box_acc = ({"src":"/_next/static/media/box-acc.64fefc76.svg","height":16,"width":16});
;// CONCATENATED MODULE: ./src/assets/icon/arown-acc.svg
/* harmony default export */ const arown_acc = ({"src":"/_next/static/media/arown-acc.0de27bae.svg","height":16,"width":16});
;// CONCATENATED MODULE: ./src/assets/icon/calendar-acc.svg
/* harmony default export */ const calendar_acc = ({"src":"/_next/static/media/calendar-acc.ba19ee25.svg","height":16,"width":16});
;// CONCATENATED MODULE: ./src/assets/icon/heart-acc.svg
/* harmony default export */ const heart_acc = ({"src":"/_next/static/media/heart-acc.98deb850.svg","height":16,"width":16});
;// CONCATENATED MODULE: ./src/assets/icon/marker-acc.svg
/* harmony default export */ const marker_acc = ({"src":"/_next/static/media/marker-acc.38100db3.svg","height":16,"width":16});
;// CONCATENATED MODULE: ./src/assets/icon/book-alt.svg
/* harmony default export */ const book_alt = ({"src":"/_next/static/media/book-alt.a45a9467.svg","height":12,"width":12});
;// CONCATENATED MODULE: ./src/assets/icon/Camera-acc.svg
/* harmony default export */ const Camera_acc = ({"src":"/_next/static/media/Camera-acc.b36e2016.svg","height":32,"width":32});
;// CONCATENATED MODULE: ./src/assets/icon/email-purple.svg
/* harmony default export */ const email_purple = ({"src":"/_next/static/media/email-purple.40aa31e6.svg","height":12,"width":12});
;// CONCATENATED MODULE: ./src/assets/icon/phone-purple.svg
/* harmony default export */ const phone_purple = ({"src":"/_next/static/media/phone-purple.73295176.svg","height":12,"width":12});
;// CONCATENATED MODULE: ./src/assets/icon/messageChat.svg
/* harmony default export */ const messageChat = ({"src":"/_next/static/media/messageChat.43bbfd8d.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/calendarWhite.svg
/* harmony default export */ const calendarWhite = ({"src":"/_next/static/media/calendarWhite.50a6973b.svg","height":12,"width":12});
;// CONCATENATED MODULE: ./src/assets/icon/cardDiscountWhite.svg
/* harmony default export */ const cardDiscountWhite = ({"src":"/_next/static/media/cardDiscountWhite.73c8dd72.svg","height":10,"width":12});
;// CONCATENATED MODULE: ./src/assets/icon/checkFlowOrange.svg
/* harmony default export */ const checkFlowOrange = ({"src":"/_next/static/media/checkFlowOrange.a4edcdc9.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/arrowSmallUpWhite.svg
/* harmony default export */ const arrowSmallUpWhite = ({"src":"/_next/static/media/arrowSmallUpWhite.777ca2cd.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/star.svg
/* harmony default export */ const star = ({"src":"/_next/static/media/star.5da9651c.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/setting-purple.svg
/* harmony default export */ const setting_purple = ({"src":"/_next/static/media/setting-purple.ef0457f6.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/servicesPurpleBold.svg
/* harmony default export */ const servicesPurpleBold = ({"src":"/_next/static/media/servicesPurpleBold.e5c215e9.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/mapMarkerOrg.svg
/* harmony default export */ const mapMarkerOrg = ({"src":"/_next/static/media/mapMarkerOrg.075fbfbc.svg","height":16,"width":16});
;// CONCATENATED MODULE: ./src/assets/icon/x-white.svg
/* harmony default export */ const x_white = ({"src":"/_next/static/media/x-white.b1f3338a.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/home-white.svg
/* harmony default export */ const home_white = ({"src":"/_next/static/media/home-white.003d93e0.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/chat-white.svg
/* harmony default export */ const chat_white = ({"src":"/_next/static/media/chat-white.773480d2.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/checkFlowGreen.svg
/* harmony default export */ const checkFlowGreen = ({"src":"/_next/static/media/checkFlowGreen.17beb9d5.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/momo.ico
/* harmony default export */ const momo = ({"src":"/_next/static/media/momo.1fbfc93f.ico","height":256,"width":256});
;// CONCATENATED MODULE: ./src/assets/icon/payon.jpg
/* harmony default export */ const payon = ({"src":"/_next/static/media/payon.bb6f435d.jpg","height":785,"width":785,"blurDataURL":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIAAgACAMBIgACEQEDEQH/xAAnAAEBAAAAAAAAAAAAAAAAAAAABwEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAAsAP/xAAZEAABBQAAAAAAAAAAAAAAAAABAAMUQZH/2gAIAQEAAT8AEiy1hX//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AH//2Q=="});
;// CONCATENATED MODULE: ./src/assets/icon/settingsSliders.svg
/* harmony default export */ const settingsSliders = ({"src":"/_next/static/media/settingsSliders.fe401bce.svg","height":12,"width":12});
;// CONCATENATED MODULE: ./src/assets/icon/crossPurple.svg
/* harmony default export */ const crossPurple = ({"src":"/_next/static/media/crossPurple.6638f7cc.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/minusPurple.svg
/* harmony default export */ const minusPurple = ({"src":"/_next/static/media/minusPurple.f4aabd99.svg","height":4,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/chatPurple.svg
/* harmony default export */ const chatPurple = ({"src":"/_next/static/media/chatPurple.7fc55f1e.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/friendsPurple.png
/* harmony default export */ const friendsPurple = ({"src":"/_next/static/media/friendsPurple.1dd8e539.png","height":128,"width":128,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAnklEQVR42mOAgaLUXQoMuEBh6q5ZQAX/gXRZUepOOSB9HYibYZKihSDJtJ0gBVeACuuLIOzvQMwPU1QOlHgJpCMK03bxAukTQJyDbIUfUMEMIG0ExLFA/ByIDwKxBUhyGhD/B9oNtAbsjj6g4q9Aa0D8HyAFP4CcH0D6I0hRUdqufUAFBYWpOzcCxVYyAAXVgCrVgIrUgQLqQFoJ2YcAYb1qM7nJawcAAAAASUVORK5CYII="});
;// CONCATENATED MODULE: ./src/assets/icon/plusPurple.svg
/* harmony default export */ const plusPurple = ({"src":"/_next/static/media/plusPurple.ae94167e.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/exclamationPurple.svg
/* harmony default export */ const exclamationPurple = ({"src":"/_next/static/media/exclamationPurple.fe543516.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./src/assets/icon/settingsSlidersPurple.svg
/* harmony default export */ const settingsSlidersPurple = ({"src":"/_next/static/media/settingsSlidersPurple.914101c6.svg","height":12,"width":12});
;// CONCATENATED MODULE: ./src/assets/icon/lineGray.svg
/* harmony default export */ const lineGray = ({"src":"/_next/static/media/lineGray.c6e43cf8.svg","height":6,"width":28});
;// CONCATENATED MODULE: ./src/assets/icon/filterBlack.svg
/* harmony default export */ const filterBlack = ({"src":"/_next/static/media/filterBlack.d8327d8f.svg","height":16,"width":16});
;// CONCATENATED MODULE: ./src/assets/icon/closeBlack.svg
/* harmony default export */ const closeBlack = ({"src":"/_next/static/media/closeBlack.ea1cc210.svg","height":16,"width":16});
;// CONCATENATED MODULE: ./src/assets/icon/locationCate.png
/* harmony default export */ const locationCate = ({"src":"/_next/static/media/locationCate.2a5eabd3.png","height":128,"width":128,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA50lEQVR42mP4oy/BxAAEfw0kGn7rif9/Li/y/6mscDMDEDyWFmZkYACCP/rivkAF/4H0lGdyItOA+D8Q+zPAAFByDlDyNYwPlHwLxPMYYOCnk0zab3PJ/3+MJNKfyotmPVGT+P/YSD6TARn8Z2A/+Ftf4v9zRZH/bxkYjjDAwNFFduwMr6Mj5x/yPvlHVeT/S1be//UrM88wnG+MXjYtjJ0h4V5Yceqd0P9OTyL/n51u+m93bdA/hpN1/1UPVv0XOlxVxpB4N1Q68W7YzLj7oc9Sb4b9MTtY/pfhcPUL6cOVcySPVMoAAA0EYn95SLxrAAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./src/assets/icon/no-apply.svg
/* harmony default export */ const no_apply = ({"src":"/_next/static/media/no-apply.4b99e658.svg","height":56,"width":72});
;// CONCATENATED MODULE: ./src/constants/icon.js



























































































































































// acccount





















// btn assistan home



















const icon = {
    noApply: no_apply,
    payon: payon,
    momo: momo,
    settingPurple: setting_purple,
    chatWhite: chat_white,
    homeWhite: home_white,
    xWhite: x_white,
    phonePurple: phone_purple,
    emailPurple: email_purple,
    cameraAcc: Camera_acc,
    book: book_alt,
    boxAcc: box_acc,
    arownAcc: arown_acc,
    calendarAcc: calendar_acc,
    heartAcc: heart_acc,
    editWhiteAcc: edit_white,
    markerAcc: marker_acc,
    emailWhite: email_white,
    phoneWhite: phone_white,
    searchGray: searchGray,
    tumerGray: tumer_gray,
    arrownLeftWhite: arrown_left_white,
    arrownRightWhite: arrown_right_white,
    list: list,
    Favorite: favorite_fill,
    Tumer: tumer,
    DeskAlt: desk_alt,
    edit: edit,
    SignOutPurple: sign_out_squre,
    TrashOrange: trashOrange,
    Exclude: exclude,
    Exclude2: exclude2,
    Exclude3: exclude3,
    Exclude4: exclude4,
    Info: info,
    CloseRing: close_ring,
    TicketHome: ticketHome,
    success: success,
    Avatar: avatar,
    Logo: logo,
    Menu: menu,
    ShoppingCartSimple: shoppingCartSimple,
    Check: check,
    Check2: check_2,
    dotPurple: ellipse_109,
    next: expand_right,
    Expand_right_2: expand_right,
    down: expand_down,
    search: search,
    down_2: vector_10,
    miniMapIcon: miniMapIcon,
    pinMap: pinMap,
    star: star_fill,
    chatAll: chat_alt_fill,
    location: locate,
    car: carSimple,
    bed: bed,
    time: time,
    door: door,
    pPrev: pPrev,
    pNext: pNext,
    logoBusiness: logo_cong_ty,
    phone: phone,
    gps: gps_fixed,
    dashboard: darhboard,
    Buildings: buildings,
    Message: message,
    Phone: icon_phone,
    Storefront: storefront,
    User: user,
    User_purple: user_box,
    Location: icon_location,
    Lock: lock,
    eye: eye,
    facebook: facebook,
    google: google,
    warning: warning,
    arrowDown: arrow_drop_down,
    box: box,
    bag: bag_alt,
    trash: trash,
    VietnamFlat: vi,
    EngFlat: en,
    Money: money,
    Camera: camera,
    Ticket: ticket,
    Wallet: wallet_alt,
    Crown: crown,
    Camera_purple: camera_purple,
    Credit_card: credit_card,
    Clock_purple: clockCounterClockwise,
    Bell: bell,
    Bell_1: bell_1,
    Union: union,
    Headphones_purple: headphones_fill,
    plus: plus,
    ArrowDownWhite: arrow_down_white,
    SearchWhite: search_white,
    checkWhite: checkWhite,
    Calendar: calendar,
    Calendar_1: calendar_1,
    onedot: onedot,
    Setting: setting_line,
    arrowPurple: arrowPurple,
    userCircle: userCircle,
    signOut: sign_out,
    home: home,
    chevronLeft: chevron_left,
    chevronRight: chevron_right,
    searchPurple: searchPurple,
    pinMap_2: pinMap_2,
    x: x,
    staff: staff,
    branches: branches,
    chevronRight_2: chevronRight_2,
    filter: filter,
    menuWhite: menuWhite,
    ShoppingCartSimpleWhite: shoppingCartSimpleWhite,
    closeCircle: closeCircle,
    home_1: home_1,
    pPrev_purple: pPrev_purple,
    User_1: user_1,
    orderCancel: order_cancel,
    orderFinish: order_finish,
    orderPending: order_pending,
    backWhite: back_white,
    checkGreen: check_green,
    chevronDownWhite: chevron_down_white,
    vector_down: vector_down,
    chevronUpWhite: chevron_up_white,
    mapPinRed: mapPinRed,
    heart: heart,
    unHeart: unHeart,
    unHeartWhite: unHeartWhite,
    chevronRightBlack: chevronRightBlack,
    distance: distance,
    fire: fire,
    shield: sheild,
    editWhite: editWhite,
    pinMapGreen: pinMapGreen,
    closeCircleWhite: closeCircleWhite,
    sucessGreen: sucessGreen,
    xCircleRed: xCircleRed,
    loginReq: loginReq,
    playCirclePurple: playCirclePurple,
    playCircle: playCircle,
    newsPurple: newsPurple,
    languagePurple: languagePurple,
    sendWhite: sendWhite,
    cartCheckPurple: cartCheckPurple,
    wifiBlack: wifiBlack,
    carBlack: carBlack,
    creditCardBlack: creditCardBlack,
    watchMore: watch_more,
    comment: comment_light,
    share: shareReels,
    sendComment: send_comment,
    addImg: add_img,
    tickBlue: tickBlue,
    userNotSign: userNotSign,
    comment_bold: comment_bold,
    arrowDownPurple: arrow_drop_down_purple,
    shopingCartAddBlack: shopping_cart_add,
    shopingCartAddOrange: shopping_cart_add_orange,
    favoriteStroke: favorite_stroke,
    rss: rss,
    archive: archive,
    addBtn: add_btn,
    removeBtn: remove_btn,
    alarmClock: alarm_clock,
    cartPurpleBold: cartPurpleBold,
    calendarPurpleBold: calendarPurpleBold,
    cardDiscountOrange: cardDiscountOrange,
    supportChat: messageChat,
    calendarWhite: calendarWhite,
    cardDiscountWhite: cardDiscountWhite,
    checkFlowOrange: checkFlowOrange,
    arrowSmallUpWhite: arrowSmallUpWhite,
    starLine: star,
    checkFlowGreen: checkFlowGreen,
    settingsSliders: settingsSliders,
    settingsSlidersPurple: settingsSlidersPurple,
    servicesPurpleBold: servicesPurpleBold,
    mapMarkerOrg: mapMarkerOrg,
    crossPurple: crossPurple,
    minusPurple: minusPurple,
    chatPurple: chatPurple,
    friendsPurple: friendsPurple,
    plusPurple: plusPurple,
    exclamationPurple: exclamationPurple,
    lineGray: lineGray,
    filterBlack: filterBlack,
    closeBlack: closeBlack,
    locationCate: locationCate,
    pinMapRed: pinMapRed
};
/* harmony default export */ const constants_icon = (icon);

;// CONCATENATED MODULE: ./src/assets/image/avatar.png
/* harmony default export */ const image_avatar = ({"src":"/_next/static/media/avatar.4f657957.png","height":36,"width":36,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABA0lEQVR42hXJu06DUAAG4DP6LPAE7r6Ak4uzMU5uxgcwcXNycTMuxsS1kdBISDFqC1HacjlcAj2nUKCIGNtUzvKbfutHABBrzKQpLTU/rMXIDIVHS92hlbw9Yru57IXLJkpb3Fxd43h3B4Y6AM/WzWTKJOKHS33GVwgMs3s8PcLdyQFuLy+6Ml9jzn40ErOVyKICidKDrzxDPT/E2f4eAlqgLv4ESZNGRJ8+CvaN2GPwNQ39+wekUYVqsRHEHdqabYzAvVnX8i+0WYvfvO3ygGM84TqxBpbUU4dNX31HHS9QhhlSm8J9+2ielFeZACBmspEprfTMTcTciYXzYmqmqksAyD/HQM828Cfq5wAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./src/assets/image/map.png
/* harmony default export */ const map = ({"src":"/_next/static/media/map.3a199d82.png","height":445,"width":502,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAAxUlEQVR42mMAgYrVKzi29vSa7+rsUgfxl9St5dzRNIVr0fQZ7AzTetczz5w9V33tpEnmO7u65EAKdtROZ93aOZF3ZsdGXobOjj3M86bO5520YL7w4unTpQ60tLEwYANASZ65s2YrLJ02XRHEXz1pCuOCSQsYwZK9nTv5F8yYZbijq8tia0+PEYrOKW1b2de2z+GcPncu1972dt2bWblc7UsWcy6YMVN9at86MYYJzbv51kyYyo+sacGMGexzZ80Snz17Di8A0+tLhOeAZMwAAAAASUVORK5CYII="});
;// CONCATENATED MODULE: ./src/assets/image/group_265.png
/* harmony default export */ const group_265 = ({"src":"/_next/static/media/group_265.769bc49a.png","height":437,"width":562,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAuklEQVR42hXLO27CQBQF0HvH9kM0ERNQxA6yjnTp06XKMrKGrCN7SJM1pEqB+DX8BAgLI5DNzDw/xOkPy7J6lkI+QUJVLcQGMUYz5l3pyHfu/cNTVZ0/QggoCkHUBldNIBSZ48rNpvO30f8f9tt1EsnUOdG8PAbGBDjWbjKevCwWawwGQ1hLwBTwHkk6iNqSZva63x1+mrpG77GPS3NCaiOCCbpZ8cXVcjPs+f67gUzhagbckxEUOv7eAN5fXYsLngYYAAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./src/assets/image/homeSt1.png
/* harmony default export */ const homeSt1 = ({"src":"/_next/static/media/homeSt1.aa57ddac.png","height":365,"width":492,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAyElEQVR42g3KMW8BUQDA8f+dq3p3lxPRDjRNWkM79abunTt17sDgU4lvYiAiISzHRCQMQkIkguDlvOMdv/lnNOot+V4oJIl1LKWiWq0wnk6w3bRhJxPKarc7YjQccdVXtI6RoeT/75fzZkEzGAtr0A84HvZkss/I05Gnl1d8/4vDOkMtmGB5aY+UcBHiEcdxyHouubdPPvxvfmYbLHVWhPKEaXoAbHc7et0ewk4xny8wSsWy0lo/mGbingyiS8RqtSRUF/K5fHQDYnpQ+3GjTSwAAAAASUVORK5CYII="});
;// CONCATENATED MODULE: ./src/assets/image/homeSt2.png
/* harmony default export */ const homeSt2 = ({"src":"/_next/static/media/homeSt2.0306a607.png","height":365,"width":492,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAuElEQVR42g3DUUrDQBRA0fteJoZJqVUkFYT5sLoAd+AqxA93IujG3IYI/iiIaIulKUbbZtLJaw8cebh/XE0m5wdtU9vXxxuzZkvbJaqqkun0O2oIwV+G0+z66sKdDaJrm6VLhqvrRaaqXvPhCFNlkBe8M2a++MdlhmjE6HGvzy80deDpZ85y9sdRdUyuYwo9IekncntzZ5v1hsPREF+WiELqCiwV9PzifOm7/VxEiDFiZhgroEdw3Q46HkjF9Uv8cwAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./src/assets/image/homest3.png
/* harmony default export */ const homest3 = ({"src":"/_next/static/media/homest3.f824fec7.png","height":365,"width":492,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAu0lEQVR4nDWMQQ7BUBRF7/f7n5G2EZbAjAUQNsACGFiHgRUYCImxIII9aLEPNeqwjbQmBtX+p2niTm5yTnLEbnv4dDpdYs6YyoTT8QznckOtXhVElIj5fMHtdgtZmkJKCc97IoojkCIEQQCx3ex5MBxAkYLKoVIGmDl/Bde5QqyWa+71e4jjN8IwhCFLyDINaeS1hwcxnc642WzA9324lztMq1IUWDMs24QYjyZJ9IpUxTJh21Yh/9Naf38v101LO2kiXAAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./src/assets/image/homeSt4.png
/* harmony default export */ const homeSt4 = ({"src":"/_next/static/media/homeSt4.cabbe234.png","height":365,"width":492,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAsUlEQVR42g3BTU4CQRCA0a+qe8DZyQbjAVx4ApceAy/gPYi3MSxNXJl4DRcaNZoQYAGEn5mp6e6C92Q6fTqq6mA0uvScnHNCFDbrrbi7RTOrx+MrJpMHUu+IKoIzmz2zXC3qmFMhhIgGgZJBhOKOF2ibhL69/PHztaHPRiodZg3l/Pd7y/vrP7HdOc3RiDLETNEQqKvA4WC0+4Lc3z3a8CJUN7fXWFfAoRoonx9zui73JzzeWNlBGQX/AAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./src/assets/image/schedule.png
/* harmony default export */ const schedule = ({"src":"/_next/static/media/schedule.b15307df.png","height":861,"width":1426,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAk0lEQVR42g2KMQ7CMBRD/fO/klaoMLB1BCFxGEbOwQm4EyMTV2BGQlWPgICqIp8m6bdle/Cj8+l2X6399jemCIAcEwgoOZcwDqmTzb5pD8fd8vOO8J4RgiClhAKH6+XZinOkIgzbVNdCi6aCqhbAsQ+sEmOqNE4GODYDdjHZWqwqmTQ/+u4VNWZlJrKgmAzww/ffzz3COo05MmhrAAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./src/assets/image/flatform1.png
/* harmony default export */ const flatform1 = ({"src":"/_next/static/media/flatform1.d6e54386.png","height":346,"width":428,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAw0lEQVR4nA2OTQsBURiFz3vv3AWlGNmSFSlFWfgnvn+dzx+glCILxVaSmFKkUUOixqAx97pPndWpcx6yrEPati+tQGmkhFQAgwJpUqlkm9brbWM8Gnbs0xGFfE6XEp7iADEUS+UmzefLCic1SJimDwITnOMTKPl8PsTL+1ZpOpnVvPe7FzPj+kUyaIRhSMdxeCgUrtNqtan0u52BtdsjHIkA2sN1XWSyGdQbzSqdz1fzcb+V/Z8Pxjj0io6CEAaiscTiD9ezWkTOPNwuAAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./src/assets/image/flatform2.png
/* harmony default export */ const flatform2 = ({"src":"/_next/static/media/flatform2.8fd21deb.png","height":346,"width":429,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAwElEQVR42g3ITU7CQBiH8f+8M9OJk8DYBuLWjTFpxD2X8S5exct4AViIMUY2OlWkFOh336HP5kl+4utze7t62zydqzoQDyAp0TNg7ZVY3N+9qO/d/9J/bJ7RViAXg5vxXY0TKfjZ/F3VVdWni0fM4uvOTidUliWsluyzTP8ej73S2tDhZzsiSFCgfJeh0AZ/+wJmmpDirmGbzKEmiSyaFpG7gRwzLUCBWXi/j9fr1TLPDyIyUeCBwTwI51xI04fXC1cxVuAzrHMkAAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./src/assets/image/flatform3.png
/* harmony default export */ const flatform3 = ({"src":"/_next/static/media/flatform3.c7793250.png","height":346,"width":428,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAvUlEQVR42hXMS64BQRQG4L8eXbdVc69cxFB6hERMiYGRbViMtVgGczvwSiR6gFGHRAet65wS4y/5RJKc4t1mPX08H94EBsQOTIyStaLd6c51mqaj5XIxS44JbBSByCF/5WjFMeqN5kG7onAeCtZWijAMpfceQv0wM4Kv6Td7ORkPYDxLAyHfWn17kBe4v3KpBROXfmuoVv+Uc4RISRit1fV2QwDB4nJO/7f77TDLMiilwUQonEOlXEa/11t9AMDAVptbxA89AAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./src/assets/image/jyg7xHRmXiU.png
/* harmony default export */ const jyg7xHRmXiU = ({"src":"/_next/static/media/jyg7xHRmXiU.facd87d6.png","height":392,"width":588,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAApElEQVR42g3JuwqBYQCA4fc7YXAopRQXYJCUzeWZbUY3YDOSw2Q0kMRgQNSPnOX09R941kcMen03HIkoYQwp+cZal+l8wmY+JJrJeTqQQsUTce6PG4ePxXgWjYe+jnBOa/VvRafXpd1skPYfpNWLbL7M+BjDBiGkGwhGa4dCsUT4ssIed3yloT7b01rcEKf70xMglTZ89ksuO4dzKEmtWkE/t/4P+pBGPkwYbSwAAAAASUVORK5CYII="});
;// CONCATENATED MODULE: ./src/assets/image/bath.png
/* harmony default export */ const bath = ({"src":"/_next/static/media/bath.13a49abb.png","height":385,"width":576,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAsElEQVR4nAVA3QrBUAD+jqGQn+WvdsEbKLnYhTdYeRwhl8u1V9itB8ADSG1JIiJt1ho3KzW/LWdnR0Qd9EIaSwhfz0WuVEFJkuB/3kinMvjRgJHxSOUPymEeNlCUDhpyG7q+RLMlY7tagAy7fV6tVlAvplCWasgXRLhXB/bFAk1mQAzD4GVRRJwzpLN5vAIKgVMcT2to2gTk/gxCFkVCyDh87wbLNuG6DuazKXb7M/sDOhRMg05p3EwAAAAASUVORK5CYII="});
;// CONCATENATED MODULE: ./src/assets/image/employee.png
/* harmony default export */ const employee = ({"src":"/_next/static/media/employee.b5ade808.png","height":44,"width":44,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABCUlEQVR42h3MPUvDUBiG4XfSxV/g3MHkNzg4FwVXF7dugoOCGcTFLywKGewggmB1sAiOokPBZHAQ6yAWrJUW06b1g0Mbk9Oc80Z8TJ3vi5sAkC+l8c7sCIC/OOEPpdyuUuaw0VskTV9p0Y1CPD/cwQ8CfDIjBaIVxwY1v6Xrc4Jay9P2TAavHR8C0O3BAJ6MHaoHkhuhRJt/YG2s46B0jnqvDy8FzVAy1XoReyrByeUVaGwURAS7eIpO8ouXfsR0fVtxyvdPyM7N62FcmJ2EfXikb6oNlCtVl4r728bW5qqYms5ifCLzf9hZyuGskBc5a9kkAHR8UTLXdvdcGiFOAeetReexsGIAoD/Okbq3zjwWcwAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./src/assets/image/rectangle_148.png
/* harmony default export */ const rectangle_148 = ({"src":"/_next/static/media/rectangle_148.3cb8e176.png","height":160,"width":241,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAIAAAD38zoCAAAAiElEQVR42gF9AIL/AIWbZayteMnFlsO/oJyaesS0nrOef2dVNQC/ybDQwK3azLehlYick4fPwrOvmX2Vf18AycK64ci5oJh4L0QuZGdit62eoZeLjYFuAOLQxdK0paaqrzefvy+avGOXrYWQknd2bQC/rqC8urdPpcFVs9RKrdEUnsQAfqEvT2Hh90a23jUE1QAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./src/assets/image/service.png
/* harmony default export */ const service = ({"src":"/_next/static/media/service.b84802e8.png","height":180,"width":272,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAIAAAD38zoCAAAAiElEQVR42gF9AIL/AHJcT2hhWnlfR45nQ6J2TZtwSGI9H0cpCwC1trTAxMSol4uplH7MnX6yh2qEYkluXloA3+Xh1ca+1KmPrIp6m1wyrYVxiWhYg35+ALmnkJJmQ+jYwtfMxMC3to9za0EmF1hRTgCBXjRxV0Gdi3aagmm9ubW1trhaTkpNPDe9Xj0E0Uh0JAAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./src/assets/image/partner.png
/* harmony default export */ const partner = ({"src":"/_next/static/media/partner.3a4de159.png","height":360,"width":482,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAAxUlEQVR42mMAgfv3HyrdvHU3+/GjZyIg/qOHzzzv3X1syQADl69crzp56vz/O/ceJB46fHLi40fP1z179roIruD6zTvFJ0+f+3/+9KX0E1t2Lzty9bLM5StX5eEKju04GHT39rO5h/fdO3hl464z5zfu6O+fdlj78v7brAxTp6/jWzRry6bjh+6e37/n1pOV87bfWj5j4/5F8/ZN2LD6mBTDvl3neM+fuxN36sSVut3bz8w/e/ZOy7Vrj4qOHrpUs3PbSX4Aft9wupELmRsAAAAASUVORK5CYII="});
;// CONCATENATED MODULE: ./src/assets/image/money.png
/* harmony default export */ const image_money = ({"src":"/_next/static/media/money.46d6283d.png","height":51,"width":52,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAp0lEQVR42kWOPwuBURSHr8FqMPkMJoPlnpvOmQwWelOM/hQlEikpk1j0lkk2ZfUpPSevDM997r3n168TJFoJAlRhkkRneJeizUVsFdI/0IdpirrBDTDYM9AyuIWPBxxFNGBn5MePGqF30ZBxb+GhD7ow4GOMn3DjnuMrXDywSCxHbS+KlXk3CSxxDi8PdKiti5gWu1R8WVjD4dsg1sYnUMhoPOO7iG0/U1dA13wnSucAAAAASUVORK5CYII="});
;// CONCATENATED MODULE: ./src/assets/image/cardAtm.png
/* harmony default export */ const cardAtm = ({"src":"/_next/static/media/cardAtm.5f4378f5.png","height":52,"width":52,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAoUlEQVR42i3NMQvCMBCG4QRXRVdxEUFwsy7WS7DJJAi6CIKDdLDY1UVnlyI4iH/Z92wKD9936aU1+jgJWyfxgpJeeAlCb/A1XuKQw7pdjF3NRR4s/YaX3n5SHuQUe3omEifSzge9dac05BJHPr/GmD5CqQtn5+KMDPik3OCNky749H/BHBly7NDXF1e3+h9Uvog2LfcwMGmoEVCluaOZuv0BMhQ1RiyX/QoAAAAASUVORK5CYII="});
;// CONCATENATED MODULE: ./src/assets/image/creditMachine.png
/* harmony default export */ const creditMachine = ({"src":"/_next/static/media/creditMachine.f6f6aa01.png","height":52,"width":52,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAo0lEQVR42l2NuwrCMBRAL/QL/AEdxDoUB0GlNxmSRewggo5uIh20kwqhgw9cxElx83M9hbo0cDjnhoQrzWPUp3CFAEZUfWTU9Rhi3II5/YRAL4XowJsh4Bds6D0UdC5W/Yh4cNHHK7jTQxjTZyF2xBcfcA4l3YWYPlYrivrXFq+hhIR5gG/VgwVDG9tJ6iL6ZHlg1SX/FRnxwVPh1CsymBn1lx/MRzz9ZO5ecwAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./src/assets/image/payon.png
/* harmony default export */ const image_payon = ({"src":"/_next/static/media/payon.b186ecf3.png","height":28,"width":76,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAYAAACuyE5IAAAAaklEQVR4nGMUS1mpzMDA8JmRgUHg01/m13rCH/89+cQtFGix7R8P920BkIJmoILvzIwMf5//YmF2lH71UkPxggQX5zMeFpYPb0AKshgYGDcxMv4X+fufUU6A9c+1lIAotnfvnH7+Z2D6AADykSXP/i4IlQAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./src/assets/image/image_23.png
/* harmony default export */ const image_23 = ({"src":"/_next/static/media/image_23.bfdaa328.png","height":52,"width":52,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA2ElEQVR42mM4mijBxAAEnyvkm75VKfz/W6v49n+zchYDEEz1FADKAcHrErmIr5UK/4H0leke/PuqLLmueiuwhDFAQfrtbOkrf2oVrwHZxUB8EIjvAvF/cTbGOgYgeHM6WWIf0OhdDFDwpVK+2F2O5TqQ+Y8BCP77KLJc/VmtkMcABX/rFA+cSJLYB7KdAWhMI0gREF8F4l1AnAO07vbNbOmLIOsZQABoQkSlJdflaUAHAh16FeTgVyWyEEfO9BZiYgACoNcyge549xXo1U8V8o0MQHA6RYoJAJUZUKtdp8vLAAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./src/assets/image/resultNull.png
/* harmony default export */ const resultNull = ({"src":"/_next/static/media/resultNull.25fd8ae8.png","height":256,"width":304,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAA8klEQVR4nAHnABj/Aefl7wYMCwv6+Pn5VO3t8av6+voAGhsXZAUFAZ3e2vEBAf///wDk4uoA6+vxUxEMAaz5+Pn+CxIW9QwNCZvq4+12Aenp7SQJCAhb8vD4TNTW2TQBAQD+KykmAgsNBwD+/v6iAfPv+N/b7s8gDggUAKmbtv4yNi0CMTcq/gL9Bf8EAwb/AfPv+f/Z7ssA2/DMAPfMEgAbHRsABCLsAAgBDAAtFkP7Ae7s8p3d7dJb3vLS8wrlIwn+/v8C/yDo9BMHFw8qFjqdAYeBrgIsPQkZwefB/xTTEEv49vYQEy8esEw+UfKWq57svtdxBhRda9YAAAAASUVORK5CYII="});
;// CONCATENATED MODULE: ./src/assets/image/beautyX.svg
/* harmony default export */ const beautyX = ({"src":"/_next/static/media/beautyX.1bddfe77.svg","height":44,"width":138});
;// CONCATENATED MODULE: ./src/assets/image/slider1.png
/* harmony default export */ const slider1 = ({"src":"/_next/static/media/slider1.a8e6cb1e.png","height":349,"width":569,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAlElEQVR42gWAPQ/BQBiAn/fulKv4is0g8b9tEpON1W+wiwgikRRJVUsb7XsieVbWqs4gEkCpG8UZwRBEXFBXZLm9H59oy4sVoRN7xqMYpeJDac3jdmC3nTOeBKJBSbv/pYkK1pslSXJFLuckVFXNcNQnf1eoKt1uRJq+iOMObrXY63TWk+fjgvcW6wz1T2n7FtdTHv4W00RUxV09tQAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./src/assets/image/banner.png
/* harmony default export */ const image_banner = ({"src":"/_next/static/media/banner.dd1ce9cb.png","height":480,"width":1200,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAYAAACuyE5IAAAAaklEQVR4nA3Juw3CMBRA0fv0TBxbuAGZloYN2IDFGICSPZgIBKIjpEkRKV87qY9UnynNoqIGQgljgkLBbqBthyyP2z1vQ0DDbhXLPkZcafDe8v6+kOvlnHw8Sm6e1L2jOJzokvCvfqgzeQGRAB3xPK7dTgAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./src/assets/image/thumb.png
/* harmony default export */ const thumb = ({"src":"/_next/static/media/thumb.a5498605.png","height":768,"width":1366,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAIAAAA8r+mnAAAAb0lEQVR42gFkAJv/APPy9/Hx+/Pz/PHw+e3u+PPy+fPv9/Xz+ADo4u/bzefYzuvcz+nh1vHy5fn67Pvq5OsAv6qoo3p11s/Sz8jO29Ta5N3ir6CjuLKxAN/d397c4Pr8/u7u9ezs8/f4+9jX297d4LQFU+sstXoQAAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./src/assets/image/thumb_1.png
/* harmony default export */ const thumb_1 = ({"src":"/_next/static/media/thumb_1.0818cd49.png","height":768,"width":1366,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAIAAAA8r+mnAAAAb0lEQVR42gFkAJv/AKafzsnG3rOu1L+72cG+2sC82sTB3KOczADJxt78/fnj4uz19ff39/j19fb9/fvKx98AvLnY7e3y2tjn9PT29vb39PT2+vv6yMXeALmz1Ozr8NfV5ujo7+zr8erp8O/v9MC82sU+UvZCp8BNAAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./src/assets/image/thumb_2.png
/* harmony default export */ const thumb_2 = ({"src":"/_next/static/media/thumb_2.3ea5cde8.png","height":768,"width":1366,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAIAAAA8r+mnAAAAW0lEQVR42g3Luw2AMAxF0ey/CKyBvAGiBNGFKPHzJ5EFJbn1PSnidQvwEHSdeTdDd0u1tuu8n9xUTdQcFeriIxHRuizMKKXO2QCTKZCO/aCNIj73oYKmIzcW4R8lz1cqMn5IHAAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./src/assets/image/imgDefault.png
/* harmony default export */ const imgDefault = ({"src":"/_next/static/media/imgDefault.ea13a1bb.png","height":1024,"width":1024,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAqklEQVR42mOAgVnbJzCjsRFg+qYpTCB67fUcZxBGiAFBUdpOFhCd7nbQZ9KK2ROAeCKQ7QsSqyzfgjCpJHuHXVbg/h4g7i7J2WENEf3KCDLBBojVgBLMQEV+QByVE7FXcsX5ct5lp6vZGQpTdwUWpe1aUJS6qweosLM4c2d7VsD+aqAbpmx7EqIDVLCTBaiAE0izAhXwF6Xv5MyP383f1L1G9P9/BkYGQgAAGORMuJ6hwnoAAAAASUVORK5CYII="});
;// CONCATENATED MODULE: ./src/assets/image/tags/hairSalon.svg
/* harmony default export */ const hairSalon = ({"src":"/_next/static/media/hairSalon.3f463946.svg","height":56,"width":57});
;// CONCATENATED MODULE: ./src/assets/image/tags/message.svg
/* harmony default export */ const tags_message = ({"src":"/_next/static/media/message.88de043a.svg","height":56,"width":56});
;// CONCATENATED MODULE: ./src/assets/image/tags/eyelash_extensions.jpg
/* harmony default export */ const eyelash_extensions = ({"src":"/_next/static/media/eyelash_extensions.45f7e473.jpg","height":314,"width":600,"blurDataURL":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIAAQACAMBIgACEQEDEQH/xAAnAAEBAAAAAAAAAAAAAAAAAAAABgEBAAAAAAAAAAAAAAAAAAAABf/aAAwDAQACEAMQAAAApgel/8QAGhABAAIDAQAAAAAAAAAAAAAAAgEDABESFP/aAAgBAQABPwBjzXu0pJIKZ6nef//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Af//EABURAQEAAAAAAAAAAAAAAAAAAAAB/9oACAEDAQE/AK//2Q=="});
;// CONCATENATED MODULE: ./src/assets/image/tags/nails.svg
/* harmony default export */ const nails = ({"src":"/_next/static/media/nails.f1f57f37.svg","height":56,"width":57});
;// CONCATENATED MODULE: ./src/assets/image/tags/nhaKhoa.svg
/* harmony default export */ const nhaKhoa = ({"src":"/_next/static/media/nhaKhoa.ba59ce8a.svg","height":56,"width":57});
;// CONCATENATED MODULE: ./src/assets/image/tags/skinCare.svg
/* harmony default export */ const skinCare = ({"src":"/_next/static/media/skinCare.17f82cac.svg","height":56,"width":57});
;// CONCATENATED MODULE: ./src/assets/image/tags/spa.svg
/* harmony default export */ const spa = ({"src":"/_next/static/media/spa.399aafb7.svg","height":56,"width":56});
;// CONCATENATED MODULE: ./src/assets/image/tags/yoga.svg
/* harmony default export */ const yoga = ({"src":"/_next/static/media/yoga.e4546028.svg","height":56,"width":57});
;// CONCATENATED MODULE: ./src/assets/image/tags/clinic.jpg
/* harmony default export */ const clinic = ({"src":"/_next/static/media/clinic.e1b61b44.jpg","height":400,"width":400,"blurDataURL":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIAAgACAMBIgACEQEDEQH/xAAoAAEBAAAAAAAAAAAAAAAAAAAABwEBAQAAAAAAAAAAAAAAAAAAAQL/2gAMAwEAAhADEAAAAKOLP//EABoQAAMAAwEAAAAAAAAAAAAAAAECAwAREiH/2gAIAQEAAT8AFDKJoJs23Y8qej7n/8QAFhEBAQEAAAAAAAAAAAAAAAAAAQAR/9oACAECAQE/AA2//8QAFREBAQAAAAAAAAAAAAAAAAAAAAH/2gAIAQMBAT8Ar//Z"});
;// CONCATENATED MODULE: ./src/assets/image/homeBannerDeal/dealhot.png
/* harmony default export */ const dealhot = ({"src":"/_next/static/media/dealhot.f29c7350.png","height":308,"width":660,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAeElEQVR42hXMywqCQBiA0W/GLqZRylDU+y97jOgt2tWixGQgoeb6l3DWR52vNofg1bKsqOqK+/NNuSjYm5qURLQgKsVEjIHRWnLwrIrITMFEb7YNu+OBtmnQpuXhMqdLx230BAU6Z5F/hQi4r2Poe8x6Tje8+AQnP3wAO71AR7NVAAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./src/assets/image/homeBannerDeal/dealhot1.png
/* harmony default export */ const dealhot1 = ({"src":"/_next/static/media/dealhot1.7ff9ee11.png","height":320,"width":320,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAwElEQVR42jXMO07DQBRG4fPPHfIgthVwkg4Evfe/CMQGaEBUNEgYS9h44jtDGk5xyk/j58siZJ4zkjALpDnh7qzWK4/992D918B+XzNOv4w/E48Pd2y2W3J2C0Lo8nk+EyTqpuL17Z0lJa6ring83HI6trhnYjT6fuDj6ZlBYtfURDMDIIQAEs1F6LoOthtkgVhK4b9ShM5OKpDnmd2UCEggITIeG5arE6YCbiS7IVKKIxkAeYGqJbf3rJsDJa78D2s+TO9e6a4IAAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./src/assets/image/homeBannerDeal/dealhot2.png
/* harmony default export */ const dealhot2 = ({"src":"/_next/static/media/dealhot2.7e2581a5.png","height":320,"width":320,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA0UlEQVR42iXO206DQBSFYd7ZxIfwcXrZSms81EJFMLRKbYVhZkBJ5NRGe0Pyd4CLleydfDt7Wfuo6EyID7/so58hh12BEi0yaTpr7UTYUwfP3fFw5zOfOQPQ6bEHWNtQsXraEHhfhIFgMrlnYXt8678RZPLULyb/JOZNcDvj5vqK+XRFkZ+xepXGNVIciT8y2s0r2fMC116SZwYo0aAMkqJFJyXV2qUOXHRcDkeWHNsOrUXcIPx3Su8R9ZmPwFx3PdDpCe2/kb8sqUKPamvmtO4uyz7j7eE6WVkAAAAASUVORK5CYII="});
;// CONCATENATED MODULE: ./src/assets/image/sellerCenterImg.jpeg
/* harmony default export */ const sellerCenterImg = ({"src":"/_next/static/media/sellerCenterImg.289f7f64.jpeg","height":864,"width":1300,"blurDataURL":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIAAUACAMBIgACEQEDEQH/xAAnAAEBAAAAAAAAAAAAAAAAAAAABgEBAAAAAAAAAAAAAAAAAAAABP/aAAwDAQACEAMQAAAApAJf/8QAGhAAAgMBAQAAAAAAAAAAAAAAAgMBBBESAP/aAAgBAQABPwC/csVXMEGnwS4HmZ3Pf//EABkRAAEFAAAAAAAAAAAAAAAAAAIAAxEhQv/aAAgBAgEBPwAXDk70v//EABkRAAEFAAAAAAAAAAAAAAAAAAIAERIhQf/aAAgBAwEBPwCIsNYv/9k="});
;// CONCATENATED MODULE: ./src/assets/image/beautyx_icon.png
/* harmony default export */ const beautyx_icon = ({"src":"/_next/static/media/beautyx_icon.c214653a.png","height":256,"width":256,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAclBMVEWr03GfvomevomPpJ5xZrlxZbpxZblmRMFlQcLb/wB+g69xZblyZrpyZrlxZbqWr5aq0nNyZrlyZbpxZblxZLpxZbp9f7Gt12xyZbpyZrpyZrmt12xwYbtyZrlyZrlwYbtwYbur03JyZrlyZbpxZbpxZblo7CoXAAAAIXRSTlMAAAAAAAAAAAABAQECAgIEHx8fHyBna2x0daWnq67Fy8ztPCU1AAAASklEQVR42g3FWQJAIBQAwGerFC200EbJ/a/I/AzQQUgpBgozuFLcH4k2BBsJ6Hp3/VU1qJYxzk3B5E1Kxk/A0fE+J1qBIb7ty8g+oCEEiAD6TjoAAAAASUVORK5CYII="});
;// CONCATENATED MODULE: ./src/assets/image/social/facebook.png
/* harmony default export */ const social_facebook = ({"src":"/_next/static/media/facebook.94dc27b8.png","height":512,"width":512,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA9ElEQVR42mMwDZrHAMSatuHzD2p4z/nFwDnxl6zbrEPeCYs1GUDAKnS+pk3Y/Hf6fnP/Z5St+X/81O3/xfUb/ku5znoXmLJEk8EyZN5Bt9iF/xkY+n6ePHPn/517L/67xiz8CTT1P8hUBvuIBb9k3Gb9r2jZ9P/bt5//Hz958z+nau1/Va/Z/+3CF/xiAKr6ZeA/939k1vL/z1+8/3/1xpP/QalL/xsGzP1vGzb/F5IVvT+v33zyf/WG02DrgNb8B8mBHWkXPv+dpOus//OXHfnf2r/jvzTQSpAYSI7BJHAuCGsC3XKQwXo6yD2/QGygI8HeBABwEogB8LWPWQAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./src/assets/image/social/tiktok.png
/* harmony default export */ const tiktok = ({"src":"/_next/static/media/tiktok.9f88956f.png","height":512,"width":512,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAQAAABuBnYAAAAAe0lEQVR42g3Iqw0CQRSG0d/QAYqEYV+B3M0GQycUg6YHNC2gSEhwlwIoAILGjZ9rvh1zxJHUWOspFNMrmaTONnnHgSOiz7WSGyriz7U6uizEmRsf7oghtA3x5cIbkehCexfP8uOBykjrmmyZ15xYsKLLjUm16scQvSeTZhEXQMbiCShaAAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./src/assets/image/social/youtube.png
/* harmony default export */ const youtube = ({"src":"/_next/static/media/youtube.de50fcc2.png","height":512,"width":512,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAPFBMVEX+Dg7+ERH+EBD+Jyf+AAD+Jyf+AAD+rKz+JCT+AAD+///+8/P+39/+xsb+w8P+Y2P+YmL+FRX+FBT+AADK/7oMAAAACnRSTlMAKSnBwcLu+fr6p07bGQAAADVJREFUeNpjYGBi5uBgZWJgYGQTBgI2RgYWQXZePnYhFgZOAS4ebi5+TjgDLoVQDNbOzMQAAFLsAksWV6goAAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./src/assets/image/social/instagram.png
/* harmony default export */ const instagram = ({"src":"/_next/static/media/instagram.ed2403fc.png","height":512,"width":512,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA9UlEQVR42kWPP0tCURyGfx+lpeW2NDTlRwjaoiGkvoEJFqFNURT0B6KyIVBrKsgs0ItFpV4NbEgspC1Hc8nC7Z7bOU8cQnzXh+d9ecVGfU6NqVepBUUJdDIUmOhClbmEM4Qt+fmth9HuOia1DZE11Gjiuzu+6Yg1LTQv9z6FLBQe4fnd70wf0pBdT2ytNXFzkLlAnxbpZ59oRi/JSUqJPpoMTGYPzvPo5A1fBy7tkxLl5Tv25VqJicxXiW2AW/f7Zw+00xU+8m9+eqZEXCqeEF511Ei815k9phm7orx0i4UrUusthlr/T7oTW05Ddjy7aWutOYB/ohGlOhlu7lgAAAAASUVORK5CYII="});
;// CONCATENATED MODULE: ./src/assets/icon/qr-code.svg
/* harmony default export */ const qr_code = ({"src":"/_next/static/media/qr-code.ce244e69.svg","height":961,"width":961});
;// CONCATENATED MODULE: ./src/assets/image/appstore.png
/* harmony default export */ const appstore = ({"src":"/_next/static/media/appstore.a03331a2.png","height":80,"width":268,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAQAAADPnVVmAAAALElEQVR42mPI+rfqf9j/vP/5/3P+u/03/8dQ/e/o/7j//f8r/rf+b/zv/w8AgtEXF8WVfPsAAAAASUVORK5CYII="});
;// CONCATENATED MODULE: ./src/assets/image/playstore.png
/* harmony default export */ const playstore = ({"src":"/_next/static/media/playstore.e9278160.png","height":80,"width":268,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAYAAABllJ3tAAAATUlEQVR4nGPUbu77Z/jrGiP7zXcMbKJSDGwszAyfP39mePHiBcOzZ8/+MwZUdP9T/XiF8e23nwwSMioM/Hy8DB8+fGBgY2NjePjw4X8AzrQdry8DQ28AAAAASUVORK5CYII="});
;// CONCATENATED MODULE: ./src/assets/image/paymentMethod/atm.svg
/* harmony default export */ const atm = ({"src":"/_next/static/media/atm.19275ad4.svg","height":33,"width":32});
;// CONCATENATED MODULE: ./src/assets/image/paymentMethod/jcb.svg
/* harmony default export */ const jcb = ({"src":"/_next/static/media/jcb.de01c26e.svg","height":33,"width":32});
;// CONCATENATED MODULE: ./src/assets/image/paymentMethod/masterCard.svg
/* harmony default export */ const masterCard = ({"src":"/_next/static/media/masterCard.2e50dcf1.svg","height":33,"width":32});
;// CONCATENATED MODULE: ./src/assets/image/paymentMethod/mocaGrap.svg
/* harmony default export */ const mocaGrap = ({"src":"/_next/static/media/mocaGrap.f3fbb3a1.svg","height":33,"width":32});
;// CONCATENATED MODULE: ./src/assets/image/paymentMethod/momoPay.svg
/* harmony default export */ const momoPay = ({"src":"/_next/static/media/momoPay.4829ca41.svg","height":33,"width":32});
;// CONCATENATED MODULE: ./src/assets/image/paymentMethod/payHand.svg
/* harmony default export */ const payHand = ({"src":"/_next/static/media/payHand.afec5040.svg","height":33,"width":32});
;// CONCATENATED MODULE: ./src/assets/image/paymentMethod/phonePay.svg
/* harmony default export */ const phonePay = ({"src":"/_next/static/media/phonePay.f91ca2fa.svg","height":32,"width":32});
;// CONCATENATED MODULE: ./src/assets/image/social/tiki.png
/* harmony default export */ const tiki = ({"src":"/_next/static/media/tiki.4b96e635.png","height":512,"width":512,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAvElEQVR42iXOvUpCARgA0PPde4vQoBoqSCKLGgRX36KhN/FVcm6OgrbephpqiyBCRU38uV9C2xlPnDzUt2Xoj5JxTbvko0ZyURpE67HOVXJeyasd8Tyhty0PKvE0pdgNvpay2xDXp4x+6e1t3JKS6mXBfVccNRnOuetSBZ9Toaaw5mfObEnnkJsOzS0u97GmUvI6luOFmCz4fue4wdtQKkW0N8n/tVQLQCrEWUk1T4N2oV8QVQUgVsksDf4AKnFIH7h60IoAAAAASUVORK5CYII="});
;// CONCATENATED MODULE: ./src/assets/image/paymentMethod/visa.svg
/* harmony default export */ const visa = ({"src":"/_next/static/media/visa.d9f58e13.svg","height":32,"width":32});
;// CONCATENATED MODULE: ./src/assets/image/paymentMethod/vnPay.svg
/* harmony default export */ const vnPay = ({"src":"/_next/static/media/vnPay.e3e4c0b6.svg","height":256,"width":268});
;// CONCATENATED MODULE: ./src/assets/image/paymentMethod/zaloPay.svg
/* harmony default export */ const zaloPay = ({"src":"/_next/static/media/zaloPay.48aedd8c.svg","height":33,"width":32});
;// CONCATENATED MODULE: ./src/assets/image/bannerBlur.png
/* harmony default export */ const bannerBlur = ({"src":"/_next/static/media/bannerBlur.f37faa74.png","height":626,"width":1540,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAIAAAAhqtkfAAAAVklEQVR42gFLALT/AJBynI5ljodmin9vp4pzs49+q5KDnrCoqQDRmoXjqIDapnqafZiIcJ2Zh4SbjJmamKAAv52AxKx2xqd2jXJnmJKMzMC5wLWota+oE9oq5gO8IbgAAAAASUVORK5CYII="});
;// CONCATENATED MODULE: ./src/constants/img.js












































// social







// payment method












const img_img = {
    appStore: appstore,
    playStore: playstore,
    qrCode: qr_code,
    slider1: slider1,
    Avatar: image_avatar,
    banner: image_banner,
    mapCustomer: map,
    miniMap: group_265,
    homeSt1: homeSt1,
    homeSt2: homeSt2,
    homeSt3: homest3,
    homeSt4: homeSt4,
    homeCalendar: schedule,
    flatform1: flatform1,
    flatform2: flatform2,
    flatform3: flatform3,
    slider: jyg7xHRmXiU,
    slider4: bath,
    nv: employee,
    rectangle: rectangle_148,
    service: service,
    Partner: partner,
    money: image_money,
    creditMachine: creditMachine,
    cardAtm: cardAtm,
    payon: image_payon,
    imagePay: image_23,
    resultNull: resultNull,
    beautyX: beautyX,
    thumb: thumb,
    thumb_1: thumb_1,
    thumb_2: thumb_2,
    imgDefault: imgDefault,
    sellerCenterImg: sellerCenterImg,
    beautyx: beautyx_icon,
    bannerBlur: bannerBlur
};
const social = {
    facebook: social_facebook,
    tiktok: tiktok,
    instagram: instagram,
    youtube: youtube
};
const paymentMethod = {
    vnPay: vnPay,
    zaloPay: zaloPay,
    handPay: payHand,
    visa: visa,
    tikiPay: tiki,
    atm: atm,
    jcb: jcb,
    masterCard: masterCard,
    mocaGrap: mocaGrap,
    phonePay: phonePay,
    momoPayment: momoPay
};
const imgTag = {
    hairSalon: hairSalon,
    massage: tags_message,
    eyelash_extensions: eyelash_extensions,
    nails: nails,
    nhaKhoa: nhaKhoa,
    skinCare: skinCare,
    spa: spa,
    yoga: yoga,
    clinic: clinic
};
const dealHot = {
    dealhot1: dealhot1,
    dealhot: dealhot,
    dealhot2: dealhot2
};
/* harmony default export */ const constants_img = (img_img);
const banner_default = (/* unused pure expression or super */ null && (banner));

;// CONCATENATED MODULE: ./src/utils/errorImg.ts

function onErrorImg(e) {
    e.target.src = constants_img.imgDefault;
    e.target.style.objectFit = "contain";
//e.target.style.transform = "scale(0.5)";
};
const onLoadImg = (e)=>{
    e.target.src = img.imgDefault;
    e.target.style.objectFit = "contain";
//e.target.style.transform = "scale(0.5)";
};

;// CONCATENATED MODULE: ./src/utils/formatPrice.ts
function formatPrice(num) {
    return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};
const formatSalePriceService = (special_price, special_price_momo)=>{
    let sale = 0;
    if (special_price_momo > 0) {
        return sale = special_price_momo;
    } else if (special_price > 0) {
        return sale = special_price;
    }
    return sale;
};

;// CONCATENATED MODULE: external "dayjs"
const external_dayjs_namespaceObject = require("dayjs");
;// CONCATENATED MODULE: ./src/utils/format.ts
//2021-12-24 08:43:39

const formatDate = (dateParams)=>{
    const dateArr = dateParams?.split(" ");
    const date = dateArr[0]?.split("-")?.reverse().join("/");
    return date;
};
const formatDateRevArr = (dateParams)=>{
    const dateArr = dateParams?.split(" ");
    const date = dateArr[0]?.split("-");
    return date;
};
const formatHourRevArr = (dateParams)=>{
    const dateArr = dateParams?.split(" ");
    const date = dateArr[1]?.split(":");
    return date;
};
const checkTimeExpired = (time_expired)=>{
    let dateExpired = false;
    if (!time_expired || time_expired?.slice(0, 5) < 0) return dateExpired = false;
    const now = dayjs().format("YYYY/MM/DD");
    const dateExNum = `${time_expired?.slice(0, 4)}${time_expired?.slice(5, 7)}${time_expired?.slice(8, 10)}`;
    const nowNum = `${now.slice(0, 4)}${now.slice(5, 7)}${now.slice(8, 10)}`;
    if (dateExNum < nowNum) {
        dateExpired = true;
    }
    return dateExpired;
};
const formatTime = (dateParams)=>{
    const dateArr = dateParams?.split(" ");
    const time = dateArr[1]?.slice(0, 5);
    return time;
};
const formatDistance = (distance)=>{
    let dis = "";
    if (distance) {
        dis = distance < 1000 ? `${Math.round(distance)} m` : `${Math.round(distance / 1000)} km`;
    }
    return dis;
};
const uniqueArr = (arr)=>{
    var newArr = [];
    for(var i = 0; i < arr.length; i++){
        if (newArr.indexOf(arr[i]) === -1) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
};
const formatRoundOrgCount = (count)=>{
    let countRound = "";
    if (count <= 5) {
        countRound = "5+";
    } else if (count > 5 && count <= 10) {
        countRound = "10+";
    } else if (count > 10 && count <= 100) {
        countRound = `${Math.ceil(count / 10) * 10}+`;
    } else if (count > 100 && count <= 1000) {
        countRound = `${Math.ceil(count / 100) * 100}+`;
    }
    return countRound;
};
const fakeOrgStar = (count)=>{
    let star;
    if (count >= 0 || count < 10) {
        star = `4.${count}`;
    } else if (count >= 10) {
        star = "5";
    }
    return star;
};

// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./next/components/ServicePromoItem/index.tsx










function ServicePromoItem(props) {
    const { service  } = props;
    const serviceSaleSpecial = formatSalePriceService(service.special_price, service?.special_price_momo);
    return /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
        href: `/${slugify(service.service_name)}?ser_id=${service.service_id}`,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
            className: (ServicePromo_module_default()).ser_pro_item,
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (ServicePromo_module_default()).ser_img_cnt,
                    children: [
                        service.org_image !== "" && service.org_image !== null && /*#__PURE__*/ jsx_runtime_.jsx("img", {
                            src: service.org_image,
                            className: (ServicePromo_module_default()).ser_img__org_logo,
                            onError: (e)=>onErrorImg(e),
                            alt: ""
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("img", {
                            className: (ServicePromo_module_default()).ser_img,
                            src: service?.image_url ? `${service.image_url}` : `${service?.org_image}`,
                            alt: "",
                            onError: (e)=>onErrorImg(e)
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (ServicePromo_module_default()).ser_promo,
                            children: [
                                service.discount_percent > 0 && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: (ServicePromo_module_default()).ser_promo__percent,
                                    children: [
                                        "Giảm",
                                        " ",
                                        Math.round(service?.discount_percent),
                                        "%"
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: (ServicePromo_module_default()).ser_promo__bot,
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: (ServicePromo_module_default()).ser_promo__bot_start,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                width: 16,
                                                height: 16,
                                                src: constants_icon.star,
                                                alt: ""
                                            }),
                                            service.rating === 5 ? 5 : `4.${service?.rating}`
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (ServicePromo_module_default()).ser_pro_item__cnt,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                            className: (ServicePromo_module_default()).ser_name,
                            children: service?.service_name
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (ServicePromo_module_default()).ser_price,
                            children: serviceSaleSpecial > 0 ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                        className: (ServicePromo_module_default()).ser_price_special,
                                        children: [
                                            " ",
                                            formatPrice(serviceSaleSpecial),
                                            "đ"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                        className: (ServicePromo_module_default()).ser_price_old,
                                        children: [
                                            formatPrice(service?.price),
                                            "đ"
                                        ]
                                    })
                                ]
                            }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                className: (ServicePromo_module_default()).ser_price_special,
                                style: {
                                    color: "var(--purple)"
                                },
                                children: [
                                    formatPrice(service?.price),
                                    "đ"
                                ]
                            })
                        }),
                        service._geoDistance ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "flex-row ser-distance",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {}),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                    children: [
                                        "Khoảng c\xe1ch",
                                        ": ",
                                        formatDistance(service?._geoDistance)
                                    ]
                                })
                            ]
                        }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {}),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (ServicePromo_module_default()).ser_org_address,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                    src: constants_icon.mapPinRed,
                                    alt: ""
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                    className: (ServicePromo_module_default()).ser_org_address_p,
                                    children: [
                                        service?.org_district_name,
                                        ",",
                                        service?.org_province_name
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
/* harmony default export */ const components_ServicePromoItem = (ServicePromoItem);

// EXTERNAL MODULE: ./next/homeSectionHead/HomeSectionTitle.module.css
var HomeSectionTitle_module = __webpack_require__(6853);
var HomeSectionTitle_module_default = /*#__PURE__*/__webpack_require__.n(HomeSectionTitle_module);
;// CONCATENATED MODULE: ./next/homeSectionHead/index.tsx



function HomeSectionHead(props) {
    const { title  } = props;
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (HomeSectionTitle_module_default()).home_title,
        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
            className: (HomeSectionTitle_module_default()).title,
            children: title
        })
    });
}
/* harmony default export */ const homeSectionHead = (HomeSectionHead);

// EXTERNAL MODULE: ./styles/Home.module.css
var Home_module = __webpack_require__(1288);
var Home_module_default = /*#__PURE__*/__webpack_require__.n(Home_module);
;// CONCATENATED MODULE: ./pages/index.tsx







function index(props) {
    const { services  } = props;
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        style: {
            backgroundColor: "var(--bg-gray)"
        },
        children: /*#__PURE__*/ jsx_runtime_.jsx(material_namespaceObject.Container, {
            children: /*#__PURE__*/ jsx_runtime_.jsx(HomePromo, {
                services: services
            })
        })
    });
}
/* harmony default export */ const pages = (index);
const getStaticProps = async (context)=>{
    const res = await api_servicePromoApi.getServicesPromo({
        page: 1,
        sort: "-discount_percent"
    });
    const hits = await res.data.data.hits;
    return {
        props: {
            services: hits
        }
    };
};
const HomePromo = (props)=>{
    const { services  } = props;
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (Home_module_default()).home_section_promo,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(homeSectionHead, {
                title: "Top Deal khủng"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                className: (Home_module_default()).home_service_list,
                children: services.map((i, index)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx(components_ServicePromoItem, {
                            service: i
                        })
                    }, index))
            })
        ]
    });
};


/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [952,61], () => (__webpack_exec__(5685)));
module.exports = __webpack_exports__;

})();