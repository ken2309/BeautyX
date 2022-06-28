import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import icon from "../../constants/icon";
import { onToggleSearchCnt } from "../../redux/search/searchSlice";
import { handleSubiz } from "../../utils/customChat";
import "./style.css";

export default function AssistantBtn() {
    const dispatch = useDispatch();
    const { open } = useSelector((state: any) => state.SEARCH);
    const history = useHistory();
    const handleOpenSearch = () => {
        const action = open ? false : true;
        dispatch(onToggleSearchCnt(action));
    };
    const handleGoToHome = () => {
        history.push("/homepage");
    };
    return (
        <div className="assistantBtn">
            <div id="assistantBtn-wrap">
                <div
                    onClick={() => handleOpenSearch()}
                    className="btn1 buttons"
                >
                    <div className="btn-img">
                        <img src={icon.search} alt="" />
                    </div>
                </div>

                <div onClick={() => handleSubiz()} className="btn2 buttons">
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
