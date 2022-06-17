import React from 'react';
import { useHistory } from "react-router-dom";
import mediaApi from "../../api/mediaApi";
import icon from "../../constants/icon";
interface IProps {
    handleOnchange: any;
    comment: any;
    setComment: (comment: any) => void,
    handleKeyDown: any;
    user: any;
    handlePostComment: any;
    InputRef?: any;
    changeStyle?: any
}


function EvaluateInput(props: IProps) {
    const {
        handleOnchange,
        comment,
        handleKeyDown,
        user,
        handlePostComment,
        setComment,
        changeStyle
    } = props;
    const history = useHistory();
    //handle post media
    const onChangeMedia = (e: any) => {
        const media = e.target.files[0];
        if (user && media) {
            handlePostMedia(media);
        } else if (!user) {
            history.push("/sign-in?1");
        }
    };
    const handlePostMedia = async (media: any) => {
        let formData = new FormData();
        formData.append("file", media);
        console.log(media);
        try {
            const res = await mediaApi.postMedia(formData);
            setComment({
                ...comment,
                image_url: res.data.context.original_url,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const onRemoveImgTemp = () => {
        setComment({ ...comment, image_url: null });
    };
    console.log(comment);
    return (
        <>
            <div className={changeStyle ? "evaluate-input evaluate-input__change" : "evaluate-input"}>
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
                        name={comment.text}
                        id="comment"
                        value={comment.text}
                    />
                    <div className="input-btn">
                        <div
                            style={{ width: "20px", marginLeft: "6px" }}
                            className="in-cmt"
                        >
                            <label htmlFor="file">
                                <img src={icon.addImg} alt="" />
                            </label>
                            <input
                                hidden
                                id="file"
                                type="file"
                                name="file"
                                accept="image/png, image/jpeg"
                                onChange={onChangeMedia}
                            />
                        </div>
                        <img
                            onClick={() => {
                                handlePostComment();
                            }}
                            style={{ width: "20px" }}
                            src={icon.sendComment}
                            alt=""
                        />
                    </div>
                </div>
            </div>
            {comment.image_url && (
                <div className="evaluate-input__upload">
                    <img
                        src={comment.image_url}
                        className="evaluate-upload__img"
                        alt=""
                    />
                    <button className="btn-close" onClick={onRemoveImgTemp}>
                        <img src={icon.closeCircle} alt="" />
                    </button>
                </div>
            )}
        </>
    );
}
export default React.memo(EvaluateInput);