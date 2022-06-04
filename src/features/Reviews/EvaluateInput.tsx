import React from "react";
import icon from "../../constants/icon";
interface IProps {
    handleOnchange: any;
    comment: any;
    handleKeyDown: any;
    user: any;
    handlePostComment: any;
}
export default function EvaluateInput(props: IProps) {
    const { handleOnchange, comment, handleKeyDown, user, handlePostComment } =
        props;
    return (
        <div className="evaluate-input">
            <div className="evaluate-input__ava">
                <img
                    src={user?.avatar ? user.avatar : icon.userNotSign}
                    alt=""
                />
            </div>
            <div className="evaluate-input__wrap">
                <input
                    onChange={handleOnchange}
                    onKeyDown={handleKeyDown}
                    placeholder="Viết bình luận"
                    type="text"
                    name="comment"
                    id="comment"
                    value={comment.text}
                />
                <div className="input-btn">
                    <img src={icon.addImg} alt="" />
                    <img
                        onClick={() => {
                            handlePostComment();
                        }}
                        src={icon.sendComment}
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}
