import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import icon from "../../constants/icon";
import Search from "../../features/Search";
import { onToggleSearchCnt } from "../../redux/search/searchSlice";
import { handleSubiz } from "../../utils/customChat";
import useFullScreen from "../../utils/useFullScreen";
import img from "../../constants/img";
import "./style.css";
// ==== api tracking ====
import tracking from "../../api/trackApi";
// end
export default function AssistantBtn() {
    const dispatch = useDispatch();
    const location: any = useLocation();
    const viewDisable = ["/trang-thai-don-hang/","/chat"]

    let disable = false;
    if (viewDisable.includes(location.pathname)) {
        disable = true;
    }
    const { open } = useSelector((state: any) => state.SEARCH);
    const [overLay, setOverLay] = useState(false);
    const is_mb = useFullScreen();
    const history = useHistory();

    const handleOpenSearch = () => {
        const action = open ? false : true;
        tracking.SEARCH_CLICK();
        dispatch(onToggleSearchCnt(action));
    };
    const handleGoToHome = () => {
        history.push("/homepage");
    };
    const handleOpenSubiz = () => {
        handleSubiz();
    };

    const refOverLay: any = useRef();
    const refAssisBtn: any = useRef();
    const handleClickOverlay = () => {
        if (is_mb === true) {
            setOverLay(!overLay);
        }
    };

    const handleHover = () => {
        if (is_mb === false) {
            refAssisBtn.current.classList.add("assistantBtn-wrap-hover");
        }
    };
    const handleHoverLeave = () => {
        if (is_mb === false) {
            refAssisBtn.current.classList.remove("assistantBtn-wrap-hover");
        }
    };

    useEffect(() => {
        if (is_mb === true) {
            if (overLay === true) {
                refOverLay.current.classList.add("active");
                refAssisBtn.current.classList.add("assistantBtn-wrap-hover");
                document.body.style.overflow = "hidden";
            } else {
                refOverLay.current.classList.remove("active");
                refAssisBtn.current.classList.remove("assistantBtn-wrap-hover");
                document.body.style.overflow = "unset";
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [overLay]);
    const checkoutPageSearch = location.pathname === "/ket-qua-tim-kiem/";
    return (
        disable === true ?
            <></>
            :
            <>
                <div
                    ref={refOverLay}
                    onTouchStart={() => handleClickOverlay()}
                    className="assistantBtn"
                >
                    <div
                        onMouseEnter={() => handleHover()}
                        onMouseLeave={() => handleHoverLeave()}
                        ref={refAssisBtn}
                        className="assistantBtn-wrap"
                    >
                        {location.pathname ===
                            "/ket-qua-tim-kiem/" ? null : is_mb === true ? (
                                <div
                                    onTouchStart={() => handleOpenSearch()}
                                    className="btn2 buttons"
                                >
                                    <div className="btn-img">
                                        <img src={icon.search} alt="" />
                                    </div>
                                </div>
                            ) : (
                            <div
                                onClick={() => handleOpenSearch()}
                                className="btn2 buttons"
                            >
                                <div className="btn-img">
                                    <img src={icon.search} alt="" />
                                </div>
                            </div>
                        )}

                        {is_mb === true ? (
                            <div
                                onTouchStart={() => handleOpenSubiz()}
                                className="btn1 buttons"
                            >
                                <div className="btn-img">
                                    <img
                                        style={{ width: "16px" }}
                                        src={icon.chatWhite}
                                        alt=""
                                    />
                                </div>
                            </div>
                        ) : (
                            <div
                                onClick={() => handleOpenSubiz()}
                                className="btn1 buttons"
                            >
                                <div className="btn-img">
                                    <img
                                        style={{ width: "16px" }}
                                        src={icon.chatWhite}
                                        alt=""
                                    />
                                </div>
                            </div>
                        )}

                        {is_mb === true ? (
                            <div
                                style={
                                    checkoutPageSearch ? { bottom: "192px" } : {}
                                }
                                onTouchStart={handleGoToHome}
                                className="btn3 buttons"
                            >
                                <div className="btn-img">
                                    <img
                                        style={{ width: "16px" }}
                                        src={icon.homeWhite}
                                        alt=""
                                    />
                                </div>
                            </div>
                        ) : (
                            <div onClick={handleGoToHome} className="btn3 buttons">
                                <div className="btn-img">
                                    <img
                                        style={{ width: "16px" }}
                                        src={icon.homeWhite}
                                        alt=""
                                    />
                                </div>
                            </div>
                        )}
                        <div id="floating-button">
                            <div className="plus">
                                <img src={img.beautyx} alt="" />{" "}
                            </div>
                            <img alt="" className="edit" src={icon.xWhite}></img>
                        </div>
                    </div>
                </div>
                <Search />
            </>
    );
}
