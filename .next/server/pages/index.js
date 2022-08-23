(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 1288:
/***/ ((module) => {

// Exports
module.exports = {
	"ser_pro_item": "ServicePromo_ser_pro_item__b_iM1",
	"ser_img_cnt": "ServicePromo_ser_img_cnt__JMVtX",
	"ser_img": "ServicePromo_ser_img__zwFd4",
	"ser_promo": "ServicePromo_ser_promo__whoh4",
	"ser_promo__percent": "ServicePromo_ser_promo__percent__TwA5R",
	"ser_promo__bot": "ServicePromo_ser_promo__bot__orYZq",
	"ser_promo__bot_start": "ServicePromo_ser_promo__bot_start__qKrwh",
	"ser_img__org_logo": "ServicePromo_ser_img__org_logo__xzocz",
	"ser_pro_item__cnt": "ServicePromo_ser_pro_item__cnt__V1_l_",
	"ser_name": "ServicePromo_ser_name__bKtnU",
	"ser_price": "ServicePromo_ser_price__2S9_B",
	"ser_price_special": "ServicePromo_ser_price_special___VrKS",
	"ser_price_old": "ServicePromo_ser_price_old__GQ9sf",
	"ser_org_address": "ServicePromo_ser_org_address__rnwK_",
	"ser_org_address_p": "ServicePromo_ser_org_address_p__RdHfA"
};


/***/ }),

/***/ 8483:
/***/ ((module) => {

// Exports
module.exports = {
	"home_title": "HomeSectionTitle_home_title__c0Q5a",
	"title": "HomeSectionTitle_title__mAZQg"
};


/***/ }),

/***/ 8638:
/***/ ((module) => {

// Exports
module.exports = {
	"province": "home_province__qawH7",
	"provinceList": "home_provinceList__xaNLX",
	"provinceItem": "home_provinceItem__7zL2f",
	"provinceTitle": "home_provinceTitle__K84pK",
	"provinceTotal": "home_provinceTotal__6N5Eo",
	"provinceContent": "home_provinceContent__Jv3Ju"
};


/***/ }),

/***/ 7017:
/***/ ((module) => {

// Exports
module.exports = {
	"home_section_promo": "Home_home_section_promo__4nFON",
	"home_service_list": "Home_home_service_list__Pkd7_",
	"home_service_item_cnt": "Home_home_service_item_cnt__SyrQA"
};


/***/ }),

/***/ 8024:
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
;// CONCATENATED MODULE: ./api/client/axios.ts


// export const baseURL = process.env.REACT_APP_API_TEST
// export const baseURL = process.env.REACT_APP_API_URL
const baseURL = process.env.REACT_APP_API_PRO;
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
;// CONCATENATED MODULE: ./api/client/servicePromoApi.ts


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
/* harmony default export */ const client_servicePromoApi = (servicePromoApi);

;// CONCATENATED MODULE: external "@mui/material"
const material_namespaceObject = require("@mui/material");
// EXTERNAL MODULE: ./components/ServicePromoItem/ServicePromo.module.css
var ServicePromo_module = __webpack_require__(1288);
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

// EXTERNAL MODULE: ./src/constants/icon.js + 196 modules
var icon = __webpack_require__(8047);
;// CONCATENATED MODULE: ./src/utils/formatPrice.ts
function formatPrice(num) {
    return num === null || num === void 0 ? void 0 : num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
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
    var ref, ref1;
    const dateArr = dateParams === null || dateParams === void 0 ? void 0 : dateParams.split(" ");
    const date = (ref1 = (ref = dateArr[0]) === null || ref === void 0 ? void 0 : ref.split("-")) === null || ref1 === void 0 ? void 0 : ref1.reverse().join("/");
    return date;
};
const formatDateRevArr = (dateParams)=>{
    var ref;
    const dateArr = dateParams === null || dateParams === void 0 ? void 0 : dateParams.split(" ");
    const date = (ref = dateArr[0]) === null || ref === void 0 ? void 0 : ref.split("-");
    return date;
};
const formatHourRevArr = (dateParams)=>{
    var ref;
    const dateArr = dateParams === null || dateParams === void 0 ? void 0 : dateParams.split(" ");
    const date = (ref = dateArr[1]) === null || ref === void 0 ? void 0 : ref.split(":");
    return date;
};
const checkTimeExpired = (time_expired)=>{
    let dateExpired = false;
    if (!time_expired || (time_expired === null || time_expired === void 0 ? void 0 : time_expired.slice(0, 5)) < 0) return dateExpired = false;
    const now = dayjs().format("YYYY/MM/DD");
    const dateExNum = `${time_expired === null || time_expired === void 0 ? void 0 : time_expired.slice(0, 4)}${time_expired === null || time_expired === void 0 ? void 0 : time_expired.slice(5, 7)}${time_expired === null || time_expired === void 0 ? void 0 : time_expired.slice(8, 10)}`;
    const nowNum = `${now.slice(0, 4)}${now.slice(5, 7)}${now.slice(8, 10)}`;
    if (dateExNum < nowNum) {
        dateExpired = true;
    }
    return dateExpired;
};
const formatTime = (dateParams)=>{
    var ref;
    const dateArr = dateParams === null || dateParams === void 0 ? void 0 : dateParams.split(" ");
    const time = (ref = dateArr[1]) === null || ref === void 0 ? void 0 : ref.slice(0, 5);
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
;// CONCATENATED MODULE: external "react-lazy-load-image-component"
const external_react_lazy_load_image_component_namespaceObject = require("react-lazy-load-image-component");
;// CONCATENATED MODULE: ./components/ServicePromoItem/index.tsx
/* eslint-disable jsx-a11y/anchor-is-valid */ 









function ServicePromoItem(props) {
    const { service  } = props;
    const serviceSaleSpecial = formatSalePriceService(service.special_price, service === null || service === void 0 ? void 0 : service.special_price_momo);
    return /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
        href: `/${slugify(service.service_name)}?ser_id=${service.service_id}`,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
            className: (ServicePromo_module_default()).ser_pro_item,
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (ServicePromo_module_default()).ser_img_cnt,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_lazy_load_image_component_namespaceObject.LazyLoadImage, {
                            className: (ServicePromo_module_default()).ser_img,
                            alt: "",
                            src: (service === null || service === void 0 ? void 0 : service.image_url) ? `${service.image_url}` : `${service === null || service === void 0 ? void 0 : service.org_image}`,
                            width: "100%",
                            height: "100%"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (ServicePromo_module_default()).ser_promo,
                            children: [
                                service.discount_percent > 0 && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: (ServicePromo_module_default()).ser_promo__percent,
                                    children: [
                                        "Giảm ",
                                        Math.round(service === null || service === void 0 ? void 0 : service.discount_percent),
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
                                                src: icon/* default.star */.Z.star,
                                                alt: ""
                                            }),
                                            service.rating === 5 ? 5 : `4.${service === null || service === void 0 ? void 0 : service.rating}`
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
                            children: service === null || service === void 0 ? void 0 : service.service_name
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
                                            formatPrice(service === null || service === void 0 ? void 0 : service.price),
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
                                    formatPrice(service === null || service === void 0 ? void 0 : service.price),
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
                                        formatDistance(service === null || service === void 0 ? void 0 : service._geoDistance)
                                    ]
                                })
                            ]
                        }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {}),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (ServicePromo_module_default()).ser_org_address,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                    src: icon/* default.mapPinRed */.Z.mapPinRed,
                                    alt: ""
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                    className: (ServicePromo_module_default()).ser_org_address_p,
                                    children: [
                                        service === null || service === void 0 ? void 0 : service.org_district_name,
                                        ",",
                                        service === null || service === void 0 ? void 0 : service.org_province_name
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

// EXTERNAL MODULE: ./components/homeSectionHead/HomeSectionTitle.module.css
var HomeSectionTitle_module = __webpack_require__(8483);
var HomeSectionTitle_module_default = /*#__PURE__*/__webpack_require__.n(HomeSectionTitle_module);
;// CONCATENATED MODULE: ./components/homeSectionHead/index.tsx



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
var Home_module = __webpack_require__(7017);
var Home_module_default = /*#__PURE__*/__webpack_require__.n(Home_module);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./context/hooks/useStorage.ts
const useStorage = ()=>{
    const isBrowser = (()=>"undefined" !== "undefined")();
    const storageType = (type)=>`${type ?? "session"}Storage`;
    const getItem = (key, type)=>{
        const storageType = `${type ?? "session"}Storage`;
        return isBrowser ? window[storageType][key] : "";
    };
    const setItem = (key, value, type)=>{
        if (isBrowser) {
            window[storageType(type)].setItem(key, value);
            return true;
        }
        return false;
    };
    const removeItem = (key, type)=>{
        window[storageType(type)].removeItem(key);
    };
    const actionStorage = {
        getItem,
        setItem,
        removeItem
    };
    return actionStorage;
};
/* harmony default export */ const hooks_useStorage = (useStorage);

;// CONCATENATED MODULE: ./rootComponents/flatForm.ts
const FLAT_FORM_TYPE = {
    BEAUTYX: "BEAUTYX",
    MOMO: "MOMO",
    TIKI: "TIKI",
    MB: "MBBANK"
};

;// CONCATENATED MODULE: ./rootComponents/extraPlatForm/index.tsx





function ExtraFlatForm() {
    const router = (0,router_.useRouter)();
    const asPath = router.asPath;
    const flatForm = asPath.split("?")[0].slice(1, asPath.split("?")[0].length);
    //?email=toan@myspa.vn&telephone=0392645745&name=Nguyễn Ngọc Toàn&avatar=&authCode=ZVq7VgWLum0PJnDB_IoYH5TQDvk-9Kf7xqlhrwUXRvg.DFhW9eR9MBHs4ph0E7fF--DilhrB_MOGjexM0XccP00&customerId=9252438"
    //?email=toan@myspa.vn&telephone=0392645745&name=m&momo=true
    const params = router.query;
    const { getItem , setItem  } = hooks_useStorage();
    const FLAT_FORM = getItem("FLAT_FORM", "session");
    let paramsString = "";
    if (params) {
        paramsString = JSON.stringify(paramsString);
    }
    if (!FLAT_FORM) {
        switch(flatForm){
            case "":
                setItem("FLAT_FORM", FLAT_FORM_TYPE.BEAUTYX, "session");
                break;
            case FLAT_FORM_TYPE.MOMO:
                setItem("FLAT_FORM", FLAT_FORM_TYPE.MOMO, "session");
                break;
            case FLAT_FORM_TYPE.TIKI:
                setItem("FLAT_FORM", FLAT_FORM_TYPE.TIKI, "session");
                break;
            case FLAT_FORM_TYPE.MB:
                setItem("FLAT_FORM", FLAT_FORM_TYPE.MB, "session");
                setItem("_loginToken", paramsString, "session");
                break;
            default:
                setItem("FLAT_FORM", FLAT_FORM_TYPE.BEAUTYX, "session");
        }
    }
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {});
}
/* harmony default export */ const extraPlatForm = (ExtraFlatForm);

;// CONCATENATED MODULE: ./public/locales/vi.js
/* eslint-disable import/no-anonymous-default-export */ /* harmony default export */ const vi = ({
    "Thanks": {
        "1": "Cảm ơn"
    },
    "Why": {
        "1": "V\xec đ\xe3 xem video"
    },
    "Header": {
        "1": "Trở th\xe0nh đối t\xe1c",
        "seller_center": "K\xeanh người b\xe1n",
        "my_acc": "T\xe0i khoản của t\xf4i",
        "my_order": "Lịch sử đơn h\xe0ng",
        "my_codes": "Danh s\xe1ch m\xe3 ưu đ\xe3i",
        "settings": "C\xe0i đặt",
        "support": "Hỗ trợ",
        "sign_out": "Đăng xuất",
        "back": "Trở lại",
        "noti": "Th\xf4ng b\xe1o",
        "mark_all_as_viewed": "Đ\xe1nh dấu tất cả l\xe0 đ\xe3 xem",
        "appointment_notice": "Th\xf4ng b\xe1o lịch hẹn",
        "hello": "Xin ch\xe0o",
        "today_you_have": "H\xf4m nay bạn c\xf3",
        "appointment": "lịch hẹn",
        "see_it_now": "Xem ngay nh\xe9",
        "see_calendar": "Xem lịch hẹn",
        "not_noti": "Bạn kh\xf4ng c\xf3 th\xf4ng b\xe1o n\xe0o!",
        "language": "Ng\xf4n ngữ"
    },
    "Bottom": {
        "appointment": "Lịch hẹn",
        "home": "Trang chủ",
        "account": "T\xe0i khoản",
        "search": "T\xecm kiếm"
    },
    "Banner": {
        "1": "Kh\xe1m ph\xe1 v\xe0 trải nghiệm \n thi\xean đường l\xe0m đẹp ngay gần bạn với \n Beautyx.vn"
    },
    "Home": {
        "home": "BeautyX - Đặt lịch l\xe0m đẹp online.",
        "Filter_form_input": "T\xean doanh nghiệp/Sản phẩm/Dịch vụ",
        "Filter_category": "Danh mục",
        "Filter_location": "Khu vực",
        "Filter_price": "Khoảng gi\xe1",
        "Filter_search_title": "T\xecm kiếm ngay",
        "Mini_map_title": "H\xe0ng ng\xe0n đối t\xe1c \n l\xe0 c\xe1c thương hiệu spa uy t\xedn trong v\xe0 ngo\xe0i nước",
        "Mini_map_title_1": "Dễ d\xe0ng xem x\xe9t v\xe0 chọn lựa \n sản phẩm, dịch vụ, địa điểm l\xe0m đẹp ưng \xfd",
        "Mini_map_item_1": "T\xecm kiếm ch\xednh x\xe1c nhu cầu của bạn với bộ lọc n\xe2ng cao theo danh mục, vị tr\xed v\xe0 khoảng gi\xe1 mong muốn",
        "Mini_map_item_2": "Cung cấp cho bạn th\xf4ng tin chi tiết của c\xe1c doanh nghiệp như: h\xecnh ảnh, địa chỉ, đ\xe1nh gi\xe1, thời gian l\xe0m việc,...",
        "Mini_map_item_3": "Thể hiện vị tr\xed doanh nghiệp tr\xean bản đồ, đồng thời chỉ đường cho bạn đến nơi l\xe0m đẹp bạn mong muốn",
        "Order_title": "Đặt mua sản phẩm, đặt hẹn dịch vụ \n v\xe0 thanh to\xe1n online ngay tr\xean nền tảng",
        "Order_step": "Bước",
        "Order_step_1": "T\xecm kiếm sản phẩm, dịch vụ",
        "Order_step_2": "Th\xeam sản phẩm, dich vụ v\xe0o giỏ h\xe0ng",
        "Order_step_3": "Thanh to\xe1n sản phẩm, dịch vụ",
        "Order_step_4": "Đặt hẹn ngay",
        "Ca_title": "Sắp xếp, theo d\xf5i v\xe0 nhắc nhở lịch hẹn",
        "Ca_title_1": "Sắp xếp c\xe1c lịch hẹn",
        "Ca_title_2": "Theo d\xf5i lịch hẹn theo ng\xe0y, tuần, th\xe1ng",
        "Ca_title_3": "Th\xf4ng b\xe1o nhắc hẹn khi đến lịch",
        "Ca_text_1": "Bạn sẽ kh\xf4ng phải lo việc tr\xf9ng lịch hẹn khi đặt hẹn tại qu\xe1 nhiều nơi. Hệ thống sẽ th\xf4ng b\xe1o ngay nếu bạn v\xf4 t\xecnh chọn nhầm v\xe0o khung giờ đ\xe3 c\xf3 hẹn",
        "Ca_text_2": "Xem lịch hẹn theo ng\xe0y, tuần, th\xe1ng sẽ gi\xfap bạn nắm r\xf5 được lịch hẹn v\xe0 sắp xếp thời gian hợp l\xfd. Cập nhật nhanh nhất c\xe1c trạng th\xe1i đặt hẹn (Đ\xe3 x\xe1c nhận, chưa x\xe1c nhận, ho\xe0n th\xe0nh v\xe0 hủy hẹn)",
        "Ca_text_3": "Hệ thống sẽ gửi th\xf4ng b\xe1o nhắc hẹn về điện thoại hoặc email để bạn kh\xf4ng bị bỏ lỡ bất kỳ buổi hẹn n\xe0o.",
        "Flat_form": "Ngo\xe0i ra, khi sử dụng Booking Flatform Myspa bạn c\xf2n c\xf3 thể",
        "Flat_form_item_1": "Lưu th\xf4ng tin doanh nghiệp bạn từng gh\xe9 đến v\xe0 th\xf4ng tin của bạn tại doanh nghiệp đ\xf3 bao gồm (T\xean, số điểm t\xedch được, số dư, hạng,...)",
        "Flat_form_item_2": "Xem lại danh s\xe1ch sản phẩm, dịch vụ bạn đ\xe3 sử dụng ngay tr\xean trang chủ. Sẽ rất tiện lợi nếu bạn muốn đặt một sản phẩm, dịch vụ n\xe0o đ\xf3 nhiều lần",
        "Flat_form_item_3": "Cập nhật nhanh nhất c\xe1c chương tr\xecnh ưu đ\xe3i tại những spa y\xeau th\xedch. Bạn sẽ kh\xf4ng lo bỏ lỡ bất kỳ ưu đ\xe3i n\xe0o. Thoải m\xe1i l\xe0m đẹp với chi ph\xed tiết kiệm nhất.",
        "Sign_tile": "Đăng k\xfd t\xe0i khoản tại Myspa Booking Flatform \n để c\xf3 trải nghiệm tốt nhất",
        "Sign_in": "Đăng nhập",
        "Sign_up": "Đăng k\xfd",
        "Sign_in_pl_user_name": "Email/ Số điện thoại",
        "Sign_in_pl_password": "Mật khẩu",
        "Sign_remember": "Ghi nhớ mật khẩu",
        "Sign_forgot": "Qu\xean mật khẩu",
        "Sign_or": "Hoặc đăng nhập với",
        "Sign_no_acc": "Bạn chưa c\xf3 t\xe0i khoản",
        "Sign_up_now": "Đăng k\xfd ngay",
        "Sign_val_password": "Vui l\xf2ng nhập mật khẩu",
        "Sign_val_user": "Vui l\xf2ng nhập email/số điện thoại",
        "Sign_val_length_pass": "Mật khẩu lơn hơn 6 k\xfd tự",
        "my_appointment": "Lịch hẹn của bạn",
        "mo": "T2",
        "Monday": "Thứ Hai",
        "tu": "T3",
        "Tuesday": "Thứ Ba",
        "we": "T4",
        "Wednesday": "Thứ Tư",
        "th": "T5",
        "Thursday": "Thứ Năm",
        "fr": "T6",
        "Friday": "Thứ S\xe1u",
        "sa": "T7",
        "Saturday": "Thứ Bảy",
        "su": "CN",
        "Sunday": "Chủ Nhật",
        "appointment_status": "Trạng th\xe1i đặt hẹn",
        "confirmed": "Đ\xe3 x\xe1c nhận",
        "unconfimred": "Chưa x\xe1c nhận",
        "complete": "Ho\xe0n th\xe0nh",
        "cancel": "Hủy",
        "favorite_list": "C\xe1c địa điểm l\xe0m đẹp y\xeau th\xedch",
        "pr_ser_purchased": "Sản phẩm/Dịch vụ đ\xe3 sử dụng",
        "sale_for_me": "Ưu đ\xe3i nổi bật d\xe0nh ri\xeang cho bạn",
        "appointment": "Lịch hẹn",
        "location": "Địa điểm",
        "trending": "Xu hướng",
        "cate": "Danh mục",
        "scan_qr": "Qu\xe9t m\xe3 QR"
    },
    "Search_result": {
        "text_result": "kết quả t\xecm kiếm",
        "text_home": "Trang chủ",
        "text_search": "T\xecm kiếm",
        "opening": "Đang mở cửa",
        "parking": "B\xe3i đỗ xe",
        "bed": "Giường",
        "room": "Ph\xf2ng",
        "capacity": "Sức chứa",
        "no_result_title": "Kh\xf4ng t\xecm thấy kết quả ph\xf9 hợp",
        "sorry": " Th\xe0nh thật xin lỗi, ch\xfang t\xf4i kh\xf4ng t\xecm thấy cơ sở l\xe0m đẹp ph\xf9 hợp với t\xf9y chọn của bạn. \nH\xe3y thử t\xecm kiếm t\xf9y chọn kh\xe1c nh\xe9!"
    },
    "Mer_de": {
        "address": "Địa chỉ",
        "time_work": "Thời gian l\xe0m việc",
        "weeks_day": "Thứ 2 - Thứ 7",
        "sunday": "Chủ nhật",
        "contact": "Li\xean hệ tư vấn",
        "flow": "Theo d\xf5i",
        "flowing": "Đang theo d\xf5i",
        "about": "Về ch\xfang t\xf4i",
        "services": "Dịch vụ",
        "services_name": "T\xean dịch vụ",
        "products": "Sản phẩm",
        "sale": "Ưu đ\xe3i",
        "view_more": "Xem th\xeam",
        "hide": "Ẩn bớt",
        "utilities": "Tiện \xedch",
        "staff": "Đội ngũ nh\xe2n sự",
        "specialized": "Chuy\xean m\xf4n",
        "experience": "Năm kinh nghiệm",
        "year": "Năm",
        "view_all_staff": "Xem tất cả nh\xe2n sự",
        "feedback": "Đ\xe1nh gi\xe1",
        "feedbacks": "Lượt đ\xe1nh gi\xe1",
        "view_all_feedback": "Xem tất cả đ\xe1nh gi\xe1",
        "list_branch": "Danh s\xe1ch chi nh\xe1nh",
        "search_by_location": "T\xecm chi nh\xe1nh theo khu vực gần bạn...",
        "direct": "Dẫn đường",
        "contact_2": "Li\xean hệ",
        "sort_by": "Sắp xếp theo",
        "expiration_soon": "Sắp hết hạn",
        "a_dramatic_decrease": "Giảm nhiều",
        "popular": "Phổ biến",
        "selling": "B\xe1n chạy",
        "decrease_price": "Gi\xe1 cao",
        "ascending_price": "Gi\xe1 thấp",
        "search_by_product": "T\xecm theo t\xean sản phẩm",
        "search_by_service": "T\xecm theo t\xean dịch vụ",
        "galleries": "H\xecnh ảnh",
        "business_hours": "Giờ mở cửa",
        "branch": "Chi nh\xe1nh"
    },
    "pr": {
        "merchant_detail": "Về doanh nghiệp",
        "open_time": "Thời gian mở cửa",
        "looking_for_more_information": "T\xecm hiểu th\xeam",
        "advise": "Tư vấn",
        "description": "M\xf4 tả",
        "recommend": "Gợi \xfd đi k\xe8m",
        "re_text": "H\xe3y chọn th\xeam những sản phẩm/dịch vụ kh\xe1c ph\xf9 hợp với bạn",
        "purchases": "Lượt mua",
        "category": "Ph\xe2n loại",
        "quantity": "Số lượng",
        "enter_sale_code": "Nhập m\xe3 giảm gi\xe1",
        "suggestions": "Dịch vụ gợi \xfd đi k\xe8m",
        "total": "Tổng cộng",
        "add_to_cart": "Th\xeam v\xe0o giỏ h\xe0ng",
        "added": "Đ\xe3 th\xeam",
        "to_cart": "v\xe0o giỏ h\xe0ng",
        "end_of_use": "Hết lần sử dụng",
        "service_used_evaluate": "Dịch vụ đ\xe3 sử dụng | Đ\xe1nh gi\xe1",
        "service_has_expired": "Dịch vụ đ\xe3 hết hạn",
        "expiration_date": "Ng\xe0y hết hạn",
        "unlimited": "Kh\xf4ng giới hạn",
        "map": "Bản đồ",
        "no_result": "Kh\xf4ng t\xecm th\xe1y kết quả cho"
    },
    "cart": {
        "into_money": "Th\xe0nh tiền",
        "cart": "GIỎ H\xc0NG",
        "warning": "Lưu \xfd",
        "warning_text": "Để thuận lơi cho kh\xe2u đặt hẹn, qu\xfd kh\xe1ch h\xe0ng chỉ được chọn thanh to\xe1n sản phẩm/dịch vụ trong c\xf9ng một doanh nghiệp",
        "company_name": "T\xean doanh nghiệp",
        "all": "Tất cả",
        "unit_price": "Đơn gi\xe1",
        "option": "Lựa chọn",
        "noti": "Th\xf4ng b\xe1o",
        "cart_null_text": "Kh\xf4ng c\xf3 Sản phẩm/Dịch vụ n\xe0o trong giỏ h\xe0ng",
        "shopping_now": "Mua sắm ngay",
        "do_you_want_to_remove": "Bạn c\xf3 muốn x\xf3a",
        "from_you_shopping_cart": "ra khỏi giỏ h\xe0ng kh\xf4ng",
        "total_payment": "Tổng tiền",
        "accept": "Đồng \xfd",
        "cancel": "Hủy",
        "delete_all": "X\xf3a tất cả",
        "payment_now": "Mua ngay",
        "must_sign_in": "Vui l\xf2ng đăng nhập trước khi thanh to\xe1n",
        "limit_item_discount": "Gi\xe1 dịch vụ đ\xe3 thay đổi v\xec bạn chọn nhiều hơn số lượng được \xe1p dụng m\xe3",
        "order": "Đơn h\xe0ng"
    },
    "pm": {
        "payment": "THANH TO\xc1N",
        "payment_2": "Thanh to\xe1n",
        "payment_info": "Th\xf4ng tin thanh to\xe1n",
        "full_name": "Họ v\xe0 t\xean",
        "phone_number": "Số điện thoại",
        "note": "Ghi ch\xfa cho doanh nghiệp",
        "please_enter": "Vui l\xf2ng nhập ",
        "phone_invalid": "Số điện thoại kh\xf4ng đ\xfang !",
        "save_info": "Lưu th\xf4ng tin",
        "save_success": "Lưu th\xf4ng tin th\xe0nh c\xf4ng",
        "payment_method": "Phương thức thanh to\xe1n",
        "choose_payment_method": "Chọn phương thức thanh to\xe1n",
        "discounts": "Giảm gi\xe1",
        "payment_total": "Tổng thanh to\xe1n",
        "enter_to_payment": "Nhấn 'Thanh to\xe1n' để ho\xe0n tất",
        "payment_success": "Thanh to\xe1n th\xe0nh c\xf4ng",
        "later": "Để sau",
        "booking_now": "Đặt hẹn ngay",
        "buyer": "Người mua",
        "phone": "Số điện thoại",
        "address": "Địa chỉ",
        "cart": "Giỏ h\xe0ng",
        "choose_pm": "Vui l\xf2ng chọn phương thức thanh to\xe1n",
        "total_money": "Tổng tiền",
        "pay": "Thanh to\xe1n",
        "total_payment": "Tổng thanh to\xe1n",
        "order_fail": "Tạo đơn h\xe0ng thất bại",
        "agree": "Đ\xe3 hiểu",
        "goto_home": "Về trang chủ",
        "sale": "Giảm gi\xe1",
        "cancelled": "Đ\xe3 hủy",
        "code_orders": "M\xe3 đơn h\xe0ng",
        "see_details": "Xem chi tiết",
        "product_service": "sản phẩm/dịch vụ",
        "service_list": "Danh s\xe1ch dịch vụ"
    },
    "url": {
        "home": "Trang-chu",
        "search": "/tim-kiem/",
        "urlTest": "thu-nghiem"
    },
    "booking": {
        "booking_info": "Th\xf4ng tin lịch hẹn",
        "choose_service": "Vui l\xf2ng lựa chọn dịch vụ muốn đặt hẹn",
        "choose_service_name": "Chọn t\xean dịch vụ",
        "date": "Ng\xe0y",
        "time": "Giờ",
        "branch": "Chi nh\xe1nh",
        "staff": "Nh\xe2n vi\xean thực hiện",
        "optional": "Kh\xf4ng bắt buộc",
        "search_staff": "T\xecm theo t\xean nh\xe2n vi\xean...",
        "accept": "X\xe1c nhận đặt hẹn",
        "success": "Đặt hẹn th\xe0nh c\xf4ng",
        "review": "Bạn c\xf3 thể xem lại sản phẩm/dịch vụ \n v\xe0 đặt hẹn",
        "here": "tại đ\xe2y"
    },
    "form": {
        "male": "Nam",
        "female": "Nữ",
        "other": "Kh\xe1c",
        "date_of_birth": "Ng\xe0y/th\xe1ng/năm sinh",
        "confirm_password": "Nhập lại mật khẩu",
        "i_agree": "T\xf4i đ\xe3 đọc v\xe0 đồng \xfd với",
        "myspa_s_terms": "Điều khoản & Dịch vụ của Myspa",
        "please_enter_full_name": "Vui l\xf2ng nhập họ v\xe0 t\xean",
        "please_enter_your_phone": "Vui l\xf2ng nhập số điện thoại",
        "please_choose_sex": "Vui l\xf2ng chọn giới t\xednh",
        "please_enter_dob": "Vui l\xf2ng nhập ng\xe0y th\xe1nh năm sinh",
        "dob_format": "Vui l\xf2ng nhập đ\xfang định dạng ng\xe0y/th\xe1ng/năm",
        "please_enter_email": "Vui l\xf2ng nhập email",
        "please_enter_your_address": "Vui l\xf2ng nhập địa chỉ",
        "please_enter_quantity": "Vui l\xf2ng nhập số lượng chi nh\xe1nh",
        "name_min": "T\xean lớn hơn 2 k\xfd tự",
        "email_format": "Vui l\xf2ng nhập đ\xfang định dạng Example@gmail.com",
        "password_min": "Mật khẩu lớn hơn 8 k\xfd tự",
        "password_max": "Mật khẩu tối đa 32 k\xed tự",
        "password_rule": "Mật khẩu phải c\xf3 \xedt nhất 8 k\xfd tự, 1 chữ hoa, 1 số v\xe0 1 k\xfd tự đặc biệt",
        "please_confirm_password": "Vui l\xf2ng x\xe1c nhận lại mật khẩu",
        "password_confirm_invalid": "Mật khẩu kh\xf4ng khớp",
        "now": "ngay",
        "is_not_registered": "chưa được đăng k\xfd",
        "register_success": "Đăng k\xfd t\xe0i khoản th\xe0nh c\xf4ng",
        "email_already": "Email n\xe0y đ\xe3 được đăng k\xfd",
        "phone_already": "Số điện thoại n\xe0y đ\xe3 được đăng k\xfd",
        "reset_password": "Đổi mật khẩu",
        "continue": "Tiếp tục",
        "send_your_code_text": "M\xe3 x\xe1c minh của bạn sẽ được gửi bằng tin nhắn đến",
        "verification_code": "M\xe3 x\xe1c thực",
        "please_wait": "Vui l\xf2ng chờ",
        "to_get_the_verification_code_back": "Để nhận lại m\xe3 x\xe1c thực",
        "resend_code": "Gửi lại m\xe3",
        "verification_invalid": "M\xe3 x\xe1c thực kh\xf4ng hợp lệ",
        "verification_code_of_6_characters": "M\xe3 x\xe1c thực gồm 6 k\xfd tự",
        "change_password_successfully": "Đổi mật khẩu th\xe0nh c\xf4ng",
        "sending": "Đang gửi..."
    },
    "partner": {
        "online_business": "Nền tảng kinh doanh online ng\xe0nh l\xe0m đẹp",
        "intro": "Booking Online hiện đang l\xe0 xu hướng kinh doanh trong thời đại số, khi người d\xf9ng d\xe0nh phần lớn thời gian h\xe0ng ng\xe0y để truy cập, t\xecm hiểu v\xe0 sử dụng c\xe1c dịch vụ tr\xean internet. Ng\xe0nh dịch vụ l\xe0m đẹp như spa, salon, clinic, thẩm mỹ viện cũng kh\xf4ng ngoại lệ,. \n Học c\xe1ch th\xedch nghi với thời đại chuyển đổi số 4.0 sẽ gi\xfap doanh nghiệp tiếp cận được lượng lớn kh\xe1ch h\xe0ng tiềm năng, tăng doanh thu, giảm chi ph\xed. Ngay từ b\xe2y giờ, h\xe3y trở th\xe0nh đối t\xe1c của Myspa để sở hữu những lợi \xedch sau:",
        "sell_products": "B\xe1n sản phẩm, dịch vụ ngay tr\xean nền tảng, chủ động tiếp cận kh\xe1ch h\xe0ng.",
        "customers": "Kh\xe1ch h\xe0ng tự đặt lịch liệu tr\xecnh, hạn chế việc sai s\xf3t th\xf4ng tin đặt hẹn.",
        "regional": "T\xednh năng t\xecm kiếm theo khu vực gi\xfap doanh nghiệp trở th\xe0nh lựa chọn ưu ti\xean khi kh\xe1ch h\xe0ng t\xecm kiếm địa điểm gần nh\xe0.",
        "support": "Hỗ trợ doanh nghiệp kết nối trực tiếp với kh\xe1ch h\xe0ng, tư vấn, chốt lịch hẹn.",
        "simplify": "Đơn giản h\xf3a việc cập nh\xe2t trạng th\xe1i lịch hẹn trước, trong v\xe0 sau khi kh\xe1ch h\xe0ng sử dụng dịch vụ th\xf4ng qua giao diện cho kh\xe1ch h\xe0ng.",
        "a_place": "L\xe0 nơi để doanh nghiệp đăng tải c\xe1c h\xecnh ảnh, th\xf4ng tin, đ\xe1nh gi\xe1, tăng khả năng quảng b\xe1 cho thương hiệu.",
        "create": "Ghi nhận đ\xe1nh gi\xe1 của kh\xe1ch h\xe0ng d\xe0nh cho sản phẩm, dịch vụ. Tăng uy t\xedn thương hiệu dễ d\xe0ng với những đ\xe1nh gi\xe1 tốt.",
        "create_a_beauty": "Tạo n\xean một cộng đồng l\xe0m đẹp, để doanh nghiệp v\xe0 kh\xe1ch h\xe0ng đều c\xf3 thể chia sẻ v\xe0 trao đổi những kinh nghiệm cho nhau.",
        "become_a_myspa": "Trở th\xe0nh đối t\xe1c Myspa để kinh doanh hiệu quả hơn trong giai đoạn chuyển đổi số.",
        "company_name": "T\xean doanh nghiệp",
        "branch_quantity": "Số lượng chi nh\xe1nh",
        "read": "T\xf4i đ\xe3 đọc v\xe0 đồng \xfd với"
    },
    "app": {
        "details": "Chi tiết",
        "my_services": "G\xf3i dịch vụ"
    },
    "acc": {
        "province": "Tỉnh / Th\xe0nh",
        "scores": "Điểm",
        "surplus": "Số dư",
        "rank": "Hạng",
        "my_profiles": "Th\xf4ng tin c\xe1 nh\xe2n",
        "update_acc": "Cập nhật đầy đủ th\xf4ng tin c\xe1 nh\xe2n gi\xfap t\xe0i khoản được bảo mật tốt hơn",
        "dob": "Ng\xe0y sinh",
        "sex": "Giới t\xednh",
        "order_address": "Địa chỉ giao h\xe0ng",
        "add_other_address": "Th\xeam địa điểm kh\xe1c",
        "default": "Mặc định",
        "change_pass": "Thay đổi mật khẩu",
        "save": "Lưu thay đổi",
        "set_as_default_address": "Đặt l\xe0m địa chỉ mặc định",
        "pain": "Đ\xe3 thanh to\xe1n",
        "all": "Tất cả",
        "date_created": "Ng\xe0y tạo",
        "history": "Lịch sử",
        "set_default_address": "Đặt l\xe0m địa chỉ mặc định"
    },
    "order": {
        "order_his": "Lịch sử đơn h\xe0ng",
        "pending": "Đang xử l\xfd",
        "complete": "Ho\xe0n th\xe0nh",
        "order_de": "Chi tiết đơn h\xe0ng",
        "time": "Thời gian",
        "view_org": "Xem doanh nghiệp",
        "watch_info": "Xem th\xf4ng tin",
        "book": "Đặt lịch",
        "appo_detail": "Chi tiết lịch hẹn"
    },
    "my_ser": {
        "business": "Doanh nghiệp",
        "all_business": "Tất cả doanh nghiệp",
        "choose_business": "Chọn doanh nghiệp",
        "choose_ser": "Chọn dich vụ bạn muốn đặt hẹn",
        "services_book": "Dịch vụ đ\xe3 đặt hẹn",
        "status": "Trạng th\xe1i",
        "count_unused": "Số lượng g\xf3i chưa d\xf9ng",
        "choose": "Chọn dịch vụ",
        "selected": "Đ\xe3 chọn",
        "service": "dịch vụ",
        "continue": "Tiếp tục",
        "close": "Đ\xf3ng",
        "services_selected": "Dahh s\xe1ch dịch vụ đ\xe3 chọn",
        "branch_select": "Chọn chi nh\xe1nh bạn muốn đặt hẹn",
        "time_select": "Chọn thời gian",
        "date_select": "Chọn ng\xe0y",
        "name_br": "T\xean chi nh\xe1nh",
        "app_info": "Th\xf4ng tin đặt hẹn",
        "pl_select_date": "Vui l\xf2ng chọn thời gian",
        "pl_select_br": "Vui l\xf2ng chọn chi nh\xe1nh",
        "bk_now": "Đặt hẹn ngay",
        "bk_success": "Đặt hẹn th\xe0nh c\xf4ng",
        "bk_fail": "Đặt hẹn thất bại",
        "rv_booked": "Bạn c\xf3 thể xem lại dịch vụ đ\xe3 đặt hẹn",
        "bk_fail_title": "C\xf3 lỗi xảy ra trong qu\xe1 tr\xecnh đặt hẹn",
        "code_err": "M\xe3 lỗi",
        "booking": "Đặt lịch",
        "booking_his": "Lịch sử"
    },
    "home_2": {
        "categories": "Danh mục",
        "clinic": "Ph\xf2ng kh\xe1m",
        "dentistry": "Nha Khoa",
        "beauty_salon": "Thẩm mỹ viện",
        "hot_beauty_deal": "Deal l\xe0m đẹp cực HOT",
        "hot_promotion": "Khuyến m\xe3i HOT",
        "places_near_you": "Gần bạn",
        "selling": "B\xe1n chạy",
        "name": "T\xean",
        "hot_deal_locations": "Địa điểm nhiều Deal HOT",
        "trusted_place": "Địa điểm đ\xe1ng tin cậy",
        "places_you_are_interested_in": "Địa điểm bạn quan t\xe2m",
        "beauty_places": "Địa điểm l\xe0m đẹp",
        "top_deal": "Top Deal Khủng",
        "top_selling_services": "Top Dịch Vụ B\xe1n Chạy",
        "favorite_places": "Địa điểm bạn đ\xe3 y\xeau th\xedch",
        "suggestions_for_you": "Gợi \xfd d\xe0nh cho bạn"
    },
    "se": {
        "search_results_for_keyword": "Kết quả t\xecm kiếm cho từ kh\xf3a",
        "filters": "Bộ lọc t\xecm kiếm",
        "price_range": "Khoảng gi\xe1",
        "form": "từ",
        "to": "đến",
        "invalid": "Kh\xf4ng hợp lệ",
        "apply": "\xc1p dụng khoảng gi\xe1",
        "search_title": "Bạn muốn t\xecm g\xec ?",
        "recent_search": "T\xecm kếm gần đ\xe2y",
        "search_recommend": "Gợi \xfd t\xecm kiếm",
        "view_the_results_for": "Xem kết quả cho",
        "no_results_found_for": "Kh\xf4ng t\xecm thấy kết quả cho",
        "try": "H\xe3y thử t\xecm kiếm",
        "off_service": "Dịch vụ n\xe0y chưa được k\xedch hoạt b\xe1n h\xe0ng Online",
        "booking_now": "Đặt hẹn ngay",
        "instructions_terms": "Hướng dẫn & Điều khoản",
        "guide": "Hướng dẫn sử dụng",
        "edit": "Chỉnh sửa",
        "distance": "C\xe1ch bạn"
    },
    "Contact": {
        "success": "Đ\xe3 nhận th\xf4ng tin"
    },
    "sell_center": {
        "next": "Tiếp tục",
        "enter_your_subdomain": "Nhập đia chỉ Subdomain"
    },
    "trending": {
        "trend": "Xu Hướng L\xe0m Đẹp",
        "watch_all": "Xem th\xeam"
    },
    "contact_form": {
        "contact_title": "Li\xean hệ tư vấn",
        "contact_desc": "Vui l\xf2ng cho ch\xfang t\xf4i biết th\xf4ng tin của bạn",
        "name": "Họ v\xe0 t\xean",
        "email": "Email",
        "phone": "Số điện thoại",
        "business_type": "Loại kinh doanh",
        "address": "Địa chỉ",
        "cancer": "Hủy",
        "confirm": "X\xe1c nhận",
        "vali_address": "Vui l\xf2ng nhập địa chỉ",
        "vali_business": "Vui l\xf2ng nhập loại kinh doanh",
        "vali_name_min": "T\xean lớn hơn 2 k\xfd tự",
        "vali_name_max": "T\xean nhỏ hơn 32 k\xfd tự",
        "vali_name": "Vui l\xf2ng nhập t\xean",
        "vali_err_name": "T\xean kh\xf4ng đ\xfang định dạng",
        "vali_email": "Vui l\xf2ng nhập Email",
        "vali_err_email": "Email kh\xf4ng đ\xfang định dạng Example@gmail.com",
        "vali_phone": "Vui l\xf2ng nhập số điện thoại",
        "vali_err_phone": "Số điện thoại kh\xf4ng đ\xfang định dạng",
        "vali_phone_min": "Số điện thoại phải lớn hơn 10 chữ số",
        "vali_phone_max": "Số điện thoại phải nhỏ hơn 11 chữ số"
    },
    "detail_item": {
        "discount": "Giảm gi\xe1",
        "evaluate": "Đ\xe1nh gi\xe1",
        "favourite": "Y\xeau th\xedch",
        "comment": "B\xecnh luận",
        "seemore_spa": "Xem spa",
        "follow": "Theo d\xf5i",
        "followed": "Đang theo d\xf5i",
        "quantity": "Số lượng",
        "booking_now": "Đặt hẹn ngay",
        "add_cart": "Th\xeam v\xe0o giỏ h\xe0ng",
        "desc": "M\xf4 tả",
        "merchant": "Doanh nghiệp",
        "tutorial_rules": "Hướng dẫn & Điều khoản",
        "utilities": "Tiện \xedch",
        "parking": "B\xe3i đỗ xe",
        "accept_card_payment": "Chấp nhận thanh to\xe1n thẻ",
        "step_1": "Bước 1: Lựa chọn v\xe0 thanh to\xe1n sản phẩm/dịch vụ",
        "step_2": 'Bước 2: Đặt hẹn ngay khi thanh to\xe1n hoặc đặt hẹn sau tại mục "Đặt hẹn"',
        "step_3": "Bước 3: Đến cơ sở, xuất tr\xecnh đơn h\xe0ng đ\xe3 thanh to\xe1n th\xe0nh c\xf4ng",
        "expiry_date": "(*) Thời hạn sử dụng: Sử dụng dịch vụ đ\xe3 mua trong 1 th\xe1ng kể từ ng\xe0y mua th\xe0nh c\xf4ng",
        "confirm": "X\xe1c nhận",
        "confirm_desc": "X\xe1c nhận ngay tức thời qua th\xf4ng b\xe1o khi bạn mua dịch vụ/đặt hẹn th\xe0nh c\xf4ng. Sau đ\xf3, Myspa sẽ li\xean hệ x\xe1c nhận với bạn một lần nữa để đảm bảo thời gian đặt lịch hẹn. Nếu bạn kh\xf4ng nhận được tin nhắn/ cuộc gọi n\xe0o từ Myspa, h\xe3y li\xean hệ với ch\xfang t\xf4i.",
        "cancellation_policy": "Ch\xednh s\xe1ch hủy",
        "policy_desc": "Kh\xf4ng ho\xe0n, huỷ hay thay đổi sau khi đ\xe3 mua dịch vụ",
        "similar_service": "Dịch vụ tương tự",
        "similar_product": "Sản phẩm tương tự",
        "close": "Đang đ\xf3ng cửa",
        "open": "Đang mở cửa",
        "updating": "Đang cập nhật",
        "minute": "ph\xfat",
        "not_evaluate": "Chưa c\xf3 đ\xe1nh gi\xe1 n\xe0o",
        "not_comment": "Chưa c\xf3 b\xecnh luận n\xe0o",
        "see": "Xem",
        "sold": "Đ\xe3 b\xe1n",
        "off": "Giảm",
        "write_a_comment": "Viết b\xecnh luận",
        "add": "Đ\xe3 th\xeam",
        "to_cart": "V\xe0o giỏ h\xe0ng",
        "user_manual": "Hướng dẫn sử dụng",
        "general_terms": "Điều khoản chung",
        "used": "Đ\xe3 sử dụng",
        "total": "Tổng",
        "not_sale": "Sản phẩm n\xe0y chưa được k\xedch hoạt b\xe1n h\xe0ng Online",
        "see_more": "Xem th\xeam"
    },
    "footer": {
        "customer_support": "Hỗ trợ kh\xe1ch h\xe0ng",
        "consultation_call_center": "Tổng đ\xe0i tư vấn",
        "customer_care_call_center": "Tổng đ\xe0i CSKH",
        "privacy_policy": "Ch\xednh s\xe1ch bảo mật",
        "return_and_refund": " Trả h\xe0ng v\xe0 ho\xe0n tiền",
        "protect_the_interests_of_customers": "Bảo vệ quyền lợi kh\xe1ch h\xe0ng",
        "myspa_company": "C\xf4ng ty MYSPA",
        "operating_regulations": "Quy định hoạt động",
        "general_rules": "Quy định chung",
        "commodity_trading_regulations": "Quy định giao dịch h\xe0ng h\xf3a",
        "payment_process": "Quy tr\xecnh thanh to\xe1n",
        "secure_transaction": "Đảm bảo an to\xe0n giao dịch",
        "responsibility": "Tr\xe1ch nhiệm",
        "terms_and_commitments": "Điều khoản v\xe0 cam kết",
        "payment_method": "Phương thức thanh to\xe1n",
        "beautyx_is_on": "BeautyX đ\xe3 c\xf3 mặt tr\xean",
        "contact_width_me": "Kết nối với ch\xfang t\xf4i",
        "download_app": "Tải ứng dụng tr\xean điện thoại",
        "address_company": "\xa9 2018 MYSPA JSC - C\xf4ng ty CP MYSPA - Lầu 4, Nam Giao building 261-263 Phan X\xedch Long, Phường 2, Quận Ph\xfa Nhuận, TP.HCM - GPĐKKD: 0314964245, cấp ng\xe0y: 03/04/2018, bởi Ph\xf2ng Đăng k\xfd kinh doanh – Sở kế hoạch v\xe0 Đầu tư TP.HCM",
        "policy": "Mọi h\xe0nh vi sao ch\xe9p đều l\xe0 phạm ph\xe1p nếu kh\xf4ng c\xf3 sự cho ph\xe9p bằng văn bản của ch\xfang t\xf4i"
    },
    "account_guide": {
        "ac_gui_step": "Bước",
        "ac_gui_tutorial": "Hướng dẫn sử dụng",
        "ac_gui_title1": "T\xecm kiếm / lựa chọn sản phẩm dịch vụ spa, salon y\xeau th\xedch",
        "ac_gui_title2": "Thanh to\xe1n sản phẩm dịch vụ",
        "ac_gui_title3": 'Đặt hẹn ngay khi thanh to\xe1n hoặc Đặt hẹn sau tại "G\xf3i dịch vụ"',
        "ac_gui_title4": "Đến cơ sở trải nghiệm v\xe0 đ\xe1nh gi\xe1 dịch vụ",
        "ac_gui_desc1": "Bộ lọc danh mục",
        "ac_gui_desc2": "Kiểm tra giỏ h\xe0ng",
        "ac_gui_desc3": 'Chọn button "Đặt hẹn ngay" để đặt hẹn sau khi thanh to\xe1n',
        "ac_gui_desc4": "Lưu trữ th\xf4ng tin v\xe0 nhắc hẹn khi đến lịch"
    }
});

;// CONCATENATED MODULE: ./public/locales/en.js
/* eslint-disable import/no-anonymous-default-export */ /* harmony default export */ const en = ({
    "Thanks": {
        "1": "Thank you"
    },
    "Why": {
        "1": "For watching this video"
    },
    "Header": {
        "1": "Become a partner",
        "seller_center": "Seller Center",
        "my_acc": "My account",
        "my_order": "My orders",
        "my_codes": "List of promo codes",
        "settings": "Settings",
        "support": "Support",
        "sign_out": "Sign out",
        "back": "Back",
        "noti": "Notifications",
        "mark_all_as_viewed": "Mark all as viewed",
        "appointment_notice": "Appointment notice",
        "hello": "Hello",
        "today_you_have": "Today you have",
        "appointment": "appointment",
        "see_it_now": "See it now",
        "see_calendar": "See the appointment",
        "not_noti": "You don't have any notifications",
        "language": "language"
    },
    "Bottom": {
        "appointment": "Appointment",
        "home": "Home",
        "account": "Account",
        "search": "Search"
    },
    "Banner": {
        "1": "Explore and experience \n Beauty paradise right near you \n Beautyx.vn"
    },
    "Home": {
        "home": "Home",
        "Filter_form_input": "Business name/Product/Service",
        "Filter_category": "Category",
        "Filter_location": "Location",
        "Filter_price": "Rate price",
        "Filter_search_title": "Search now",
        "Mini_map_title": "Thousands of partners \n are prestigious spa brands at home and abroad",
        "Mini_map_title_1": "Easily review and choose \n your favorite beauty products, services, and locations",
        "Mini_map_item_1": "Find exactly what you need with advanced filtering by desired category, location and price range",
        "Mini_map_item_2": "Provide you with detailed information of businesses such as: photos, addresses, reviews, working hours, ...",
        "Mini_map_item_3": "Show your business location on the map and give you directions to your desired beauty destination",
        "Order_title": "Order products, make service appointments \n and pay online right on the platform",
        "Order_step": "Step",
        "Order_step_1": "Search for products and services",
        "Order_step_2": "Add products and services to cart",
        "Order_step_3": "Payment for products and services",
        "Order_step_4": "Book an appointment now",
        "Ca_title": "Arrange, track and remind appointments",
        "Ca_title_1": "Arrange appointments",
        "Ca_title_2": "Keep track of appointments by day, week, month",
        "Ca_title_3": "Notification of appointment reminder when scheduled",
        "Ca_text_1": "You will not have to worry about the same appointment when booking at too many places. The system will notify you immediately if you accidentally choose the wrong time slot",
        "Ca_text_2": "Viewing the appointment schedule by day, week, month will help you understand the appointment schedule and arrange a reasonable time. Fastest update of booking statuses (Confirmed, unconfirmed, completed and canceled appointments)",
        "Ca_text_3": "The system will send appointment reminders to your phone or email so you don't miss any appointments.",
        "Flat_form": "In addition, when using Booking Flatform Myspa you can also",
        "Flat_form_item_1": "Save business information you have visited and your information at that business including (Name, number of points earned, balance, class, ...)",
        "Flat_form_item_2": "Review the list of products and services you have used right on the homepage. It is very convenient if you want to order a certain product or service many times",
        "Flat_form_item_3": "The fastest update of promotions at favorite spas. You won't worry about missing out on any offers. Comfortably beautify with the most economical cost.",
        "Sign_tile": "Register an account at Myspa Booking Flatform \n for the best experience",
        "Sign_in": "Sign in",
        "Sign_up": "Sign up",
        "Sign_in_pl_user_name": "Email/ Phone number",
        "Sign_in_pl_password": "Password",
        "Sign_remember": "Remember me",
        "Sign_forgot": "Forgot password",
        "Sign_or": "Or sign in with",
        "Sign_no_acc": "Do not have an account",
        "Sign_up_now": "Sign up now",
        "Sign_val_password": "Please enter a password",
        "Sign_val_user": "Please enter email/phone number",
        "Sign_val_length_pass": "Password is more than 6 characters",
        "my_appointment": "My appointment",
        "mo": "Mo",
        "Monday": "Monday",
        "tu": "Tu",
        "Tuesday": "Tuesday",
        "we": "We",
        "Wednesday": "Wednesday",
        "th": "Th",
        "Thursday": "Thursday",
        "fr": "Fr",
        "Friday": "Friday",
        "sa": "Sa",
        "Saturday": "Saturday",
        "su": "Su",
        "Sunday": "Sunday",
        "appointment_status": "Appointment status",
        "confirmed": "Confirmed",
        "unconfimred": "Unconfimred",
        "complete": "Complete",
        "cancel": "Cancel",
        "favorite_list": "Favorite beauty spots",
        "pr_ser_purchased": "Products/Services purchased",
        "sale_for_me": "Special offer just for you",
        "appointment": "My appointments",
        "location": "Location",
        "trending": "Trends",
        "cate": "Categories",
        "scan_qr": "Scan QR"
    },
    "Search_result": {
        "text_result": "search results",
        "text_home": "Home",
        "text_search": "Search",
        "opening": "Open now",
        "parking": "Parking",
        "bed": "Bed",
        "room": "Room",
        "capacity": "Capacity",
        "no_result_title": "No matching results were found",
        "sorry": "We're sorry, we couldn't find a beauty salon that matched your preferences. \nTry looking for another option!"
    },
    "Mer_de": {
        "address": "Address",
        "time_work": "Calendar",
        "weeks_day": "Monday - Saturday",
        "sunday": "Sunday",
        "contact": "Contact",
        "flow": "Flow",
        "flowing": "Flowing",
        "about": "About",
        "services": "Services",
        "services_name": "Service name",
        "products": "Products",
        "sale": "Sale",
        "view_more": "View more",
        "hide": "Hide",
        "utilities": "Utilities",
        "staff": "Staff",
        "specialized": "Specialized",
        "experience": "Experience",
        "year": "Year",
        "view_all_staff": "View all staff",
        "feedback": "Feedback",
        "feedbacks": "Feedbacks",
        "view_all_feedback": "View all feedback",
        "list_branch": "List of branches",
        "search_by_location": "Find branches by area near you...",
        "direct": "Direct",
        "contact_2": "Contact",
        "sort_by": "Sort by",
        "expiration_soon": "Expiration soon",
        "a_dramatic_decrease": "Dramatic decrease",
        "popular": "Popular",
        "selling": "Selling",
        "decrease_price": "Decrease price",
        "ascending_price": "Ascending price",
        "search_by_product": "Search by product name",
        "search_by_service": "Search by service name",
        "galleries": "Galleries",
        "business_hours": "Business hours",
        "branch": "Branch"
    },
    "pr": {
        "merchant_detail": "Merchant detail",
        "looking_for_more_information": "Looking for more information",
        "open_time": "Open time",
        "advise": "Advise",
        "description": "Description",
        "recommend": "Recommend",
        "re_text": "Please choose more products/services that are right for you",
        "purchases": "Purchases",
        "category": "Category",
        "quantity": "Quantity",
        "enter_sale_code": "Enter sale code",
        "suggestions": "Service comes with suggestions",
        "total": "Total",
        "add_to_cart": "Add to cart",
        "added": "Added",
        "to_cart": "to cart",
        "end_of_use": "End of use",
        "service_used_evaluate": "Service used | Evaluate",
        "service_has_expired": "Service has expired",
        "expiration_date": "Expiration date",
        "unlimited": "Unlimited",
        "map": "Map",
        "no_result": "No results found for"
    },
    "cart": {
        "into_money": "Into money",
        "cart": "CART",
        "warning": "Warning",
        "warning_text": "To facilitate the appointment booking process, customers only selected to pay for products/services in the same business",
        "company_name": "Company's name",
        "all": "All",
        "unit_price": "Unit price",
        "option": "Option",
        "noti": "Notification",
        "cart_null_text": "There are not products/services in the cart",
        "shopping_now": "Shopping now",
        "do_you_want_to_remove": "Do you want to remove",
        "from_you_shopping_cart": "from you shopping cart",
        "total_payment": "Total payment",
        "accept": "Accept",
        "cancel": "Cancel",
        "delete_all": "Delete all",
        "payment_now": "Payment now",
        "must_sign_in": "Please sign in before paying",
        "limit_item_discount": "The service price has changed because you choose more than the quantity to which the code is applied",
        "order": "Order"
    },
    "pm": {
        "payment": "PAYMENT",
        "payment_2": "Payment",
        "payment_info": "Payment information",
        "full_name": "Full name",
        "phone_number": "Phone number",
        "note": "Notes for business",
        "please_enter": "Please enter ",
        "phone_invalid": "Your phone number invalid !",
        "save_info": "Save information",
        "save_success": "Save information success",
        "payment_method": "Payment method",
        "choose_payment_method": "Choose payment method",
        "discounts": "Discount",
        "payment_total": "Payment total",
        "enter_to_payment": "Enter 'Payment' to finish",
        "payment_success": "Payment success",
        "later": "Later",
        "booking_now": "Booking now",
        "buyer": "Buyer",
        "phone": "Phone",
        "address": "Address",
        "cart": "Cart",
        "choose_pm": "Please select a payment method",
        "total_money": "Total money",
        "pay": "Pay",
        "total_payment": "Total payment",
        "order_fail": "order creation failed",
        "agree": "Agree",
        "goto_home": "Go to Homeoage",
        "sale": "Sale",
        "cancelled": "Cancelled",
        "code_orders": "Code orders",
        "see_details": "See details",
        "product_service": "Product/service",
        "service_list": "Service list"
    },
    "url": {
        "home": "home",
        "search": "/search/",
        "urlTest": "beta"
    },
    "booking": {
        "booking_info": "Booking information",
        "choose_service": "Please select the service",
        "choose_service_name": "Choose service",
        "date": "Date",
        "time": "Time",
        "branch": "Branch",
        "staff": "Implementation staff",
        "optional": "Optional",
        "search_staff": "Search by employee name...",
        "accept": "Accept",
        "success": "Appointment successful",
        "review": "You can review products/services \n and book an appointment",
        "here": "here"
    },
    "form": {
        "male": "Male",
        "female": "Female",
        "other": "Other",
        "date_of_birth": "Date of birth (Ex: dd/mm/yyy)",
        "confirm_password": "Confirm password",
        "i_agree": "I have read and agree to",
        "myspa_s_terms": "Myspa's Terms & Conditions",
        "please_enter_full_name": "Please enter full name",
        "please_enter_your_phone": "Please enter your phone number",
        "please_enter_your_address": "Please enter your address",
        "please_enter_quantity": "Please enter number of branches",
        "please_choose_sex": "Please choose sex",
        "please_enter_dob": "Please enter date of birth",
        "dob_format": "Date of birth must be format dd/mm/yyyy",
        "please_enter_email": "Please enter your email",
        "name_min": "Name greater than 2 characters",
        "email_format": "Your email must be format Example@gmail.com",
        "password_min": "Password more than 8 characters",
        "password_max": "Password up to 32 characters",
        "password_rule": "Password must have at least 8 characters, 1 uppercase letter, 1 number and 1 special character",
        "please_confirm_password": "Please enter confirm password",
        "password_confirm_invalid": "Confirm password invalid",
        "now": "now",
        "is_not_registered": "is not registered",
        "register_success": "Successful account registration",
        "email_already": "The email has already been taken.",
        "phone_already": "The telephone has already been taken.",
        "reset_password": "Reset password",
        "continue": "Continue",
        "send_your_code_text": "Your verification code will be sent by text message to",
        "verification_code": "Verification codes",
        "please_wait": "Please wait",
        "to_get_the_verification_code_back": "to get the verification code back",
        "resend_code": "Resend code",
        "please_enter_your_verification_code": "Please enter your verification code",
        "verification_invalid": "Verification code invalid",
        "verification_code_of_6_characters": "Verification code of 6 characters",
        "change_password_successfully": "Change password successfully",
        "sending": "Sending..."
    },
    "partner": {
        "online_business": "Online business platform for the beauty industry",
        "intro": "Booking Online is currently a business trend in the digital age, when users spend most of their daily time accessing, learning and using services on the internet. Beauty service industry such as spa, salon, clinic, beauty salon is no exception. \n Learning to adapt to the era of digital transformation 4.0 will help businesses reach a large number of potential customers, increase revenue, and reduce costs. From now on, become a partner of Myspa to own the following benefits:",
        "sell_products": "Sell products and services right on the platform, proactively approach customers.",
        "customers": "Customers set their own schedule, limiting information errors order.",
        "regional": "The regional search feature makes the business an option prioritize when customers search for places near home.",
        "support": "Supporting businesses to connect directly with customers, consulting, make an appointment.",
        "simplify": "Simplify appointment status updates before, during and after the customer uses the service through the customer interface row.",
        "a_place": "A place for businesses to post images, information, reviews price, increase the ability to promote the brand.",
        "create": "Record customer reviews for products and services. Boost your brand reputation easily with good reviews.",
        "create_a_beauty": "Create a beauty community, so that both businesses and customers can can share and exchange experiences with each other.",
        "become_a_myspa": "Become a Myspa partner to make your business more efficient during this period pass arguments.",
        "company_name": "Company's name",
        "branch_quantity": "Number of branches",
        "read": "I have read and agree to"
    },
    "app": {
        "details": "Details",
        "my_services": "My services"
    },
    "acc": {
        "scores": "Scores",
        "surplus": "Surplus",
        "province": "Province",
        "rank": "Rank",
        "my_profiles": "My profiles",
        "update_acc": "Fully update personal information to make the account better security",
        "dob": "Date of birth",
        "sex": "Sex",
        "order_address": "Orders address",
        "add_other_address": "Add other address",
        "default": "Default",
        "change_pass": "Change the password",
        "save": "Save",
        "set_default_address": "Set default address"
    },
    "order": {
        "order_his": "Orders history",
        "pending": "Pending",
        "complete": "Complete",
        "order_de": "Order details",
        "time": "Time",
        "view_org": "View business",
        "watch_info": "Watch information",
        "book": "Book",
        "appo_detail": "Appointment details"
    },
    "my_ser": {
        "business": "Business",
        "all_business": "All business",
        "choose_business": "Choose business",
        "choose_ser": "Choose services",
        "services_book": "Service with an appointment",
        "status": "Status",
        "count_unused": "Number of unused packs",
        "choose": "Choose",
        "selected": "Selected",
        "service": "service",
        "continue": "Continue",
        "close": "Close",
        "services_selected": "Selected service list",
        "branch_select": "Select the branch you want to make an appointment with",
        "time_select": "Select time",
        "date_select": "Select date",
        "name_br": "Name of branch",
        "app_info": "Appointment information",
        "pl_select_date": "Please select date & time",
        "pl_select_br": "Please select branch",
        "bk_now": "Booking now",
        "bk_success": "Booking success",
        "bk_fail": "Booking failed !",
        "rv_booked": "You can review your booked services",
        "bk_fail_title": "An error occurred during the booking process",
        "code_err": "Code error",
        "booking": "Booking",
        "booking_his": "History"
    },
    "home_2": {
        "categories": "Categories",
        "clinic": "Clinic",
        "dentistry": "dentistry",
        "beauty_salon": "Beauty Salon",
        "hot_beauty_deal": "HOT beauty Deal",
        "hot_promotion": "HOT Promotion",
        "places_near_you": "Places near you",
        "selling": "Selling",
        "name": "Name",
        "hot_deal_locations": "HOT Deal locations",
        "trusted_place": "Trusted place",
        "places_you_are_interested_in": "Places you are interested in",
        "beauty_places": "Beauty places",
        "top_deal": "Top Deal",
        "top_selling_services": "Top Selling Services",
        "favorite_places": "Favorite places",
        "suggestions_for_you": "Suggestions for you"
    },
    "se": {
        "search_results_for_keyword": "Search results for keyword",
        "filters": "Filters",
        "price_range": "Price range",
        "from": "from",
        "to": "to",
        "invalid": "invalid",
        "apply": "Apply",
        "search_title": "Search for a service, product,...",
        "recent_search": "Recent search",
        "search_recommend": "Search recommend",
        "view_the_results_for": "View the results for",
        "no_results_found_for": "No results found for",
        "try": "Try searching",
        "off_service": "This service has not been activated for online sales",
        "booking_now": "Booking now",
        "search_result": "Search result",
        "instructions_terms": "Instructions & Terms",
        "distance": "Distance",
        "guide": "Guides",
        "edit": "Edit"
    },
    "Contact": {
        "success": "submit success"
    },
    "sell_center": {
        "next": "Next",
        "enter_your_subdomain": "Enter your subdomain"
    },
    "trending": {
        "trend": "Reels",
        "watch_all": "See more"
    },
    "contact_form": {
        "contact_title": "Contact a consultant",
        "contact_desc": "Please let us know your information",
        "name": "Name",
        "email": "Email",
        "phone": "Phone number",
        "business_type": "Business type",
        "address": "Address",
        "cancer": "Cancer",
        "confirm": "Confirm",
        "vali_address": "Please enter your address",
        "vali_business": "Please enter business type",
        "vali_name_min": "Name is larger than 2 characters",
        "vali_name_max": "Name less than 32 characters",
        "vali_name": "Please enter your name",
        "vali_err_name": "Name invalidate",
        "vali_email": "Please enter your Email",
        "vali_err_email": "Email invalidate Example@gmail.com",
        "vali_phone": "Please enter your phone",
        "vali_err_phone": "Phone invalidate",
        "vali_phone_min": "Phone number must be more than 10 digits",
        "vali_phone_max": "Phone number must be less than 11 digits"
    },
    "detail_item": {
        "discount": "Discount",
        "evaluate": "Evaluate",
        "favourite": "Favourite",
        "comment": "Comment",
        "seemore_spa": "See More",
        "follow": "Follow",
        "followed": "Followed",
        "quantity": "Quantity",
        "booking_now": "Booking now",
        "add_cart": "Add cart",
        "desc": "Descript",
        "merchant": "Business",
        "tutorial_rules": "Tutorial & rules",
        "utilities": "Utilities",
        "parking": "Parking",
        "updating": "Updating",
        "accept_card_payment": "Accept card payment",
        "step_1": "Step 1: Select and pay for products/services",
        "step_2": 'Step 2: Book an appointment at the time of payment or book an appointment later at "Make an appointment"',
        "step_3": "Step 3: Go to the facility, present the order successfully paid",
        "expiry_date": "(*) Expiry date: Use the purchased service for 1 month from the date of successful purchase",
        "confirm": "Confirm",
        "confirm_desc": "Instant confirmation via notification when your service purchase/appointment is successful. After that, Myspa will contact you again to confirm the appointment time. If you do not receive any messages/calls from Myspa, please contact us.",
        "cancellation_policy": "Cancellation policy",
        "policy_desc": "There are no refunds, cancellations or changes after the service has been purchased",
        "similar_service": "Similar service",
        "similar_product": "Similar product",
        "open": "Open",
        "close": "Close",
        "minute": "minute",
        "not_evaluate": "There are no reviews yet",
        "not_comment": "There are no comment yet",
        "see": "See",
        "sold": "Sold",
        "off": "off",
        "write_a_comment": "Write a comment",
        "add": "Add",
        "to_cart": "To cart",
        "user_manual": "User manual",
        "general_terms": "General terms",
        "used": "Used",
        "total": "Total",
        "not_sale": "This product has not been activated for online sales",
        "see_more": "See more"
    },
    "footer": {
        "customer_support": "Customer support",
        "consultation_call_center": "Consultation call center",
        "customer_care_call_center": "Customer care call center",
        "privacy_policy": "Privacy policy",
        "return_and_refund": "Return and refund",
        "protect_the_interests_of_customers": "Protect the interests interests of customers",
        "myspa_company": "MYSPA company",
        "operating_regulations": "Operating regulations",
        "general_rules": "General rules",
        "commodity_trading_regulations": "Commodity trading regulations",
        "payment_process": " Payment process",
        "secure_transaction": "Secure transaction",
        "responsibility": "Responsibility",
        "terms_and_commitments": "Terns and commitments",
        "payment_method": "Payment method",
        "beautyx_is_on": "BeautyX is on",
        "contact_width_me": "Contact width me",
        "download_app": "Download the app on your phone",
        "address_company": "\xa9 2018 MYSPA JSC - MYSPA Joint Stock Company - 4th floor, Nam Giao building 261-263 Phan Xich Long, Ward 2, Phu Nhuan District, HCMC - Business license: 0314964245, issued date: 03/04/2018, by Phong Dang business registration – Ho Chi Minh City Department of Planning and Investment",
        "policy": "Any copying is illegal without our written permission"
    },
    "account_guide": {
        "ac_gui_step": "Step",
        "ac_gui_tutorial": "User manual",
        "ac_gui_title1": "Search/select your favorite spa and salon products and services",
        "ac_gui_title2": "Payment for products and services",
        "ac_gui_title3": 'Book an appointment at checkout or Book an appointment later at "Service Package"',
        "ac_gui_title4": "Visit the facility to experience and evaluate the service",
        "ac_gui_desc1": "Category filter",
        "ac_gui_desc2": "Check cart",
        "ac_gui_desc3": 'Select the button "Make an appointment now" to book an appointment after payment',
        "ac_gui_desc4": "Store information and remind appointments when scheduled"
    }
});

;// CONCATENATED MODULE: ./context/hooks/useTrans.ts



// import useStorage from './useStorage';
const useTrans = ()=>{
    // const { getItem } = useStorage();
    const { locale  } = (0,router_.useRouter)();
    // const localeStorage = getItem('lang', "local");
    // const lang = localeStorage ? localeStorage : locale
    // console.log(lang)
    const trans = locale === "vi" ? vi : en;
    return trans;
};
/* harmony default export */ const hooks_useTrans = (useTrans);

// EXTERNAL MODULE: ./components/layout/index.ts + 66 modules
var layout = __webpack_require__(6444);
// EXTERNAL MODULE: ./components/home/home.module.css
var home_module = __webpack_require__(8638);
var home_module_default = /*#__PURE__*/__webpack_require__.n(home_module);
;// CONCATENATED MODULE: ./components/home/HomeProvinces.tsx







function Province(props) {
    const { province  } = props;
    const trans = hooks_useTrans();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (home_module_default()).province,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(homeSectionHead, {
                title: trans.home_2.places_you_are_interested_in
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (home_module_default()).provinceList,
                children: province.slice(0, 6).map((item, number)=>{
                    /*#__PURE__*/ return (0,jsx_runtime_.jsxs)("div", {
                        className: (home_module_default()).provinceItem,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(external_react_lazy_load_image_component_namespaceObject.LazyLoadImage, {
                                src: `${item.media[1].original_url}`,
                                alt: ""
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: (home_module_default()).provinceContent,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (home_module_default()).provinceTitle,
                                        children: item === null || item === void 0 ? void 0 : item.name
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (home_module_default()).provinceTotal,
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                            children: [
                                                formatRoundOrgCount(item.organizations_count + item.branches_count),
                                                " ",
                                                trans.home_2.beauty_places
                                            ]
                                        })
                                    })
                                ]
                            })
                        ]
                    });
                })
            })
        ]
    });
};

;// CONCATENATED MODULE: ./api/client/provinceApi.ts

class Provinces {
    getAll = ()=>{
        const url = `/provinces`;
        const params = {
            type: "PROVINCE",
            sort: "-organizations_count|branches_count",
            include: "media"
        };
        return axios.get(url, {
            params
        });
    };
    //get list district by province code
    getDistricts = (province_code)=>{
        const url = `provinces/${province_code}/districts`;
        return axios.get(url);
    };
    //get list ward by district code 
    getWards = (district_code)=>{
        const url = `districts/${district_code}/wards`;
        if (district_code) {
            return axios.get(url);
        }
    };
}
const provincesApi = new Provinces();
/* harmony default export */ const provinceApi = (provincesApi);

;// CONCATENATED MODULE: ./pages/index.tsx














const Home = (props)=>{
    const { services , province  } = props;
    const { setItem  } = hooks_useStorage();
    const router = (0,router_.useRouter)();
    const changeLang = (lang)=>{
        setItem("lang", lang, "local");
        router.push("/", "/", {
            locale: lang
        });
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(extraPlatForm, {}),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                style: {
                    backgroundColor: "var(--bg-gray)"
                },
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(material_namespaceObject.Container, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(HomePromo, {
                            services: services
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(Province, {
                            province: province
                        })
                    ]
                })
            })
        ]
    });
};
Home.Layout = layout/* HeaderLayout */.Y;
/* harmony default export */ const pages = (Home);
const HomePromo = (props)=>{
    const trans = hooks_useTrans();
    const { services  } = props;
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: (Home_module_default()).home_section_promo,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(homeSectionHead, {
                    title: trans.home_2.top_deal
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                    className: (Home_module_default()).home_service_list,
                    children: services === null || services === void 0 ? void 0 : services.map((i, index)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                            children: /*#__PURE__*/ jsx_runtime_.jsx(components_ServicePromoItem, {
                                service: i
                            })
                        }, index))
                })
            ]
        })
    });
};
const getStaticProps = async (context)=>{
    const res = await client_servicePromoApi.getServicesPromo({
        page: 1
    });
    const hits = await res.data.data.hits;
    const resProvinces = await provinceApi.getAll();
    const provinces = await resProvinces.data.context.data;
    console.log("province", resProvinces);
    return {
        props: {
            services: hits,
            province: provinces
        }
    };
};


/***/ }),

/***/ 7986:
/***/ ((module) => {

"use strict";
module.exports = require("@mui/system");

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

/***/ 3539:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/detect-domain-locale.js");

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

/***/ 3431:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-locale.js");

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

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

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
var __webpack_exports__ = __webpack_require__.X(0, [952,61,444], () => (__webpack_exec__(8024)));
module.exports = __webpack_exports__;

})();