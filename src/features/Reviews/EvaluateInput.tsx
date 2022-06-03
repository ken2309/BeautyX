import React from "react";
import { useSelector } from "react-redux";
import icon from "../../constants/icon";

export default function EvaluateInput() {
    const USER = useSelector((state: any) => state.USER.USER);
    return (
        <div className="evaluate-input">
            <div className="evaluate-input__ava">
                <img src={USER.avatar} alt="" />
            </div>
            <div className="evaluate-input__wrap">
                <input
                    placeholder="Viết bình luận"
                    type="text"
                    name="comment"
                    id="comment"
                />
                <div className="input-btn">
                    <img src={icon.addImg} alt="" />
                    <img src={icon.sendComment} alt="" />
                </div>
            </div>
        </div>
    );
}
