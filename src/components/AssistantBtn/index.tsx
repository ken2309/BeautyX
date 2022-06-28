import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import icon from "../../constants/icon";
import { onToggleSearchCnt } from "../../redux/search/searchSlice";
import { handleSubiz } from "../../utils/customChat";
import useFullScreen from "../../utils/useFullScreen";
import "./style.css";

export default function AssistantBtn() {
    const dispatch = useDispatch();
    const { open } = useSelector((state: any) => state.SEARCH);
    const [overLay, setOverLay] = useState(false);
    const is_mb = useFullScreen();
    const history = useHistory();

    const handleOpenSearch = () => {
        const action = open ? false : true;
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
            if (overLay === true) {
                refOverLay.current.classList.add("active");
                refAssisBtn.current.classList.add("assistantBtn-wrap-hover");
            } else {
                refOverLay.current.classList.remove("active");
                refAssisBtn.current.classList.remove("assistantBtn-wrap-hover");
            }
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

    return (
        <div
            ref={refOverLay}
            onClick={() => handleClickOverlay()}
            className="assistantBtn"
        >
            <div
                ref={refAssisBtn}
                onMouseEnter={() => handleHover()}
                onMouseLeave={() => handleHoverLeave()}
                className="assistantBtn-wrap"
            >
                <div
                    onClick={() => handleOpenSearch()}
                    className="btn1 buttons"
                >
                    <div className="btn-img">
                        <img src={icon.search} alt="" />
                    </div>
                </div>

                <div onClick={() => handleOpenSubiz()} className="btn2 buttons">
                    <div className="btn-img">
                        <img
                            style={{ width: "16px" }}
                            src={icon.chatWhite}
                            alt=""
                        />
                    </div>
                </div>

                <div onClick={handleGoToHome} className="btn3 buttons">
                    <div className="btn-img">
                        <img
                            style={{ width: "16px" }}
                            src={icon.homeWhite}
                            alt=""
                        />
                    </div>
                </div>

                <div id="floating-button">
                    <img alt="" className="plus" src={icon.xWhite}></img>

                    <img alt="" className="edit" src={icon.xWhite}></img>
                </div>
            </div>
        </div>
    );
}
