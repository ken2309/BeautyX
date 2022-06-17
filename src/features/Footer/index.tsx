import React from "react";
import "./footer.css";
import { Container } from "@mui/material";
import { useHistory } from "react-router-dom";
import slugify from "../../utils/formatUrlString";
import scrollTop from "../../utils/scrollTop";
import img, { social } from "../../constants/img";

function Footer() {
    const url_map = `https://maps.google.com/?q=10.79319953408399,106.69011243982503`;
    const data_footer = [
        {
            id: 1,
            title: "Hỗ trợ khách hàng",
            items: [
                {
                    id: 11,
                    title: "Tổng đài tư vấn : 0899310908",
                    type: "NUMBER",
                    url: "0899310908",
                },
                {
                    id: 12,
                    title: "Tổng đài CSKH : 0899855223",
                    type: "NUMBER",
                    url: "0899855223",
                },
                {
                    id: 13,
                    title: "sales@myspa.vn",
                    type: "EMAIL",
                    url: "sales@myspa.vn",
                },
                {
                    id: 14,
                    title: "support@myspa.vn",
                    type: "EMAIL",
                    url: "support@myspa.vn",
                },
                { id: 15, title: "Chính sách bảo mật", type: "URL", url: "/" },
                {
                    id: 16,
                    title: "Trả hàng và hoàn tiền",
                    type: "URL",
                    url: "/",
                },
                {
                    id: 17,
                    title: "Bảo vệ quyền lợi khách hàng",
                    type: "URL",
                    url: "/",
                },
            ],
        },
        {
            id: 2,
            title: "Công ty MYSPA",
            items: [
                { id: 20, title: "Quy định hoạt động", type: "URL", url: "/" },
                { id: 21, title: "Quy định chung", type: "URL", url: "/" },
                {
                    id: 22,
                    title: "Quy định giao dịch hàng hóa",
                    type: "URL",
                    url: "/",
                },
                {
                    id: 23,
                    title: "Quy trình thanh toán",
                    type: "URL",
                    url: "/",
                },
                {
                    id: 24,
                    title: "Đảm bảo an toàn giao dịch",
                    type: "URL",
                    url: "/",
                },
                {
                    id: 26,
                    title: "Trách nhiệm và trách nhiệm",
                    type: "URL",
                    url: "/",
                },
                {
                    id: 27,
                    title: "Điều khoản và cam kết",
                    type: "URL",
                    url: "/",
                },
            ],
        },
    ];
    const social_list: any = [
        {
            id: 1,
            img: social.facebook,
            type: "SOCIAL",
            url: "https://www.facebook.com/MyspaVietnam/",
        },
        {
            id: 2,
            img: social.instagram,
            type: "SOCIAL",
            url: "https://www.instagram.com/myspa.vn_phanmemquanlyspa/",
        },
        {
            id: 3,
            img: social.tiktok,
            type: "SOCIAL",
            url: "https://www.tiktok.com/@beautyx.vn",
        },
        {
            id: 4,
            img: social.youtube,
            type: "SOCIAL",
            url: "https://www.youtube.com/channel/UCAWXbDX56x8OhJyA1cjIFRA",
        },
    ];
    const downList = [
        {
            id: 1,
            type: "DOWN",
            img: img.playStore,
            url: "https://play.google.com/store/apps/details?id=com.myspa.beautyx",
        },
        {
            id: 2,
            type: "DOWN",
            img: img.appStore,
            url: "https://apps.apple.com/vn/app/beautyx/id1614767784?l=vi",
        },
    ];
    const history = useHistory();
    const gotoPolicy = (item: any) => {
        scrollTop();
        switch (item.type) {
            case "NUMBER":
                return window.open(`tel:${item.url}`, "_seft");
            case "EMAIL":
                return window.open(`mailto:${item.url}`);
            case "URL":
                return history.push({
                    pathname: `/chinh-sach/${slugify(item.title)}`,
                    state: item,
                });
            case "SOCIAL":
                return window.open(
                    `${item.url}`,
                    "_blank",
                    "noopener,noreferrer"
                );
            case "DOWN":
                return window.open(
                    `${item.url}`,
                    "_blank",
                    "noopener,noreferrer"
                );
            default:
                break;
        }
    };
    return (
        <div className="footer">
            <Container>
                <div className="footer-cnt">
                    <div className="footer-left">
                        {data_footer.map((item, index) => (
                            <div key={index} className="wrap">
                                <div className="footer-cnt__item">
                                    <div className="footer-cnt__item-title">
                                        {item.title}
                                    </div>
                                    <ul>
                                        {item.items.map((a: any, i: number) => (
                                            <li
                                                onClick={() => gotoPolicy(a)}
                                                key={i}
                                            >
                                                {a.title}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="footer-right">
                        <div className="wrap">
                            <div className="footer-cnt__item-title">
                                Kết nối với chúng tôi
                            </div>
                            <div className="social-list">
                                {social_list.map((item: any, index: number) => (
                                    <div
                                        key={index}
                                        onClick={() => gotoPolicy(item)}
                                        className="social-item"
                                    >
                                        <div className="social-item__img">
                                            <img src={item.img} alt="" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="wrap">
                            <div className="footer-cnt__item-title">
                                Tải ứng dụng trên điện thoại
                            </div>
                            <div className="down-app">
                                <div className="down-app__qr">
                                    <img src={img.qrCode} alt="" />
                                </div>
                                <div className="down-app__wrap">
                                    {downList.map(
                                        (item: any, index: number) => (
                                            <div
                                                key={index}
                                                className="down-app__btn"
                                            >
                                                <img
                                                    onClick={() =>
                                                        gotoPolicy(item)
                                                    }
                                                    src={item.img}
                                                    alt=""
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="address"
                    onClick={() =>
                        window.open(
                            `${url_map}`,
                            "_blank",
                            "noopener,noreferrer"
                        )
                    }
                >
                    Công ty CP MYSPA - Lầu 3, 27K Trần Nhật Duật, Phường Tân
                    Định, Quận 1, TP.HCM - GPĐKKD: 0314964245, cấp
                    ngày:03/04/2018, bởi Phòng Đăng ký kinh doanh – Sở kế hoạch
                    và Đầu tư TP.HCM
                </div>
            </Container>
        </div>
    );
}

export default Footer;
