/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import "./bottom.css";
import { ICON } from "../../constants/icon2";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
import scrollTop from "../../utils/scrollTop";
import { useLocation } from "react-router-dom";


function Bottom(props: any) {
    
    const { t } = useContext(AppContext);
    const location = useLocation();
    const pathname = location.pathname;
    const Btns = [
        {
            id: 1,
            title: t("Home.location"),
            icon: ICON.home,
            iconAct: ICON.homeAct,
            path: "/homepage",
        },
        {
            id: 2,
            title: t("Home.trending"),
            icon: ICON.trend,
            iconAct: ICON.trendAct,
            path: "/beautyx-videos",
        },
        {
            id: 3,
            title: t("Home.cate"),
            icon: ICON.cate,
            iconAct: ICON.cateAct,
            path: "/-danh-muc",
        },
        {
            id: 4,
            title: t("Bottom.appointment"),
            icon: ICON.calendar,
            iconAct: ICON.calendarAct,
            path: "/lich-hen",
        },
        {
            id: 5,
            title: t("Bottom.account"),
            icon: ICON.user,
            iconAct: ICON.userAct,
            path: "/tai-khoan/thong-tin-ca-nhan",
        },
    ];
    const history = useHistory();
    const chooseBtn = (item: any) => {
        scrollTop();
        history.push(`${item.path}`);
    };
    return (
        <div className="bt">
            <div className="flex-row-sp bt-cnt">
                {Btns.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => chooseBtn(item)}
                        className="flex-column bt-cnt__item"
                    >
                        <img
                            src={
                                item.path === pathname
                                    ? item.iconAct
                                    : item.icon
                            }
                            alt=""
                        />
                        {/* {
                                item.is_badge === true ?
                                    <span className="bt-cnt__item-badge">
                                        {item.count}
                                    </span>
                                    :
                                    <></>
                            } */}
                        <span
                            style={
                                item.path === pathname
                                    ? {
                                        color: "var(--purple)",
                                        fontWeight: "700",
                                    }
                                    : {}
                            }
                            className="bt-cnt__item-title"
                        >
                            {item.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Bottom;
