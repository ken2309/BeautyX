import icon from "../../constants/icon";
interface IProps {
    handleOnchange: any;
    comment: any;
    handleKeyDown: any;
    user: any;
    handlePostComment: any;
    onChangeMedia: any;
    onRemoveImgTemp: any;
    InputRef?: any
}
export default function EvaluateInput(props: IProps) {
    const {
        handleOnchange,
        comment,
        handleKeyDown,
        user,
        handlePostComment,
        onChangeMedia,
        onRemoveImgTemp,
    } = props;
    return (
        <>
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
                        <div style={{ marginLeft: "6px" }} className="in-cmt">
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
                            src={icon.sendComment}
                            alt=""
                        />
                    </div>
                </div>
            </div>
            {comment.image_url && (
                <div className="evaluate-input__upload">
                    <img
                        className="evaluate-upload__img"
                        src={comment.image_url}
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
