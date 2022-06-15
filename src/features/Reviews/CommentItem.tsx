import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import icon from "../../constants/icon";
import { IComment } from "../../interface/comments";
import FullImage from "../OpenFullImage";
interface IProps {
    comment: IComment;
    user: any;
}
export default function CommentItem(props: IProps) {
    const { comment, user } = props;
    const [open, setOpen] = useState(false);
    let body;
    try {
        const cmt = JSON.parse(`${comment.body}`);
        body = {
            text: cmt?.text,
            image_url: cmt?.image_url,
            star: cmt?.star,
            used: cmt?.used,
        };
    } catch (error) {
        body = {
            text: comment.body,
        };
    }
    return (
        <div className="evaluate-comment">
            <div className="evaluate-comment__top">
                <div className="evaluate-comment__user">
                    <div className="comment-user__ava">
                        <img
                            src={
                                comment.user?.avatar
                                    ? comment.user?.avatar
                                    : icon.userNotSign
                            }
                            alt=""
                        />
                    </div>
                    <div className="comment-user__info">
                        <span className="comment-user__info">
                            {comment.user?.fullname}
                        </span>
                        <div className="commnet-user__rating">
                            <Rating
                                readOnly
                                name="simple-controlled"
                                value={body.star}
                                // onChange={(event, newValue) => {
                                //     setValue(newValue);
                                // }}
                            />
                        </div>
                    </div>
                </div>
                <div className="evaluate-comment__tick">
                    <img src={icon.tickBlue} alt="" />
                </div>
            </div>

            <div className="evaluate-comment__body">
                {/* <span>Phân loại: Name of Service/Product</span> */}
                <span>{body.text}</span>
                {body.image_url ? (
                    <>
                        <div className="comment-img">
                            <img
                                onClick={() => setOpen(true)}
                                src={body.image_url}
                                alt=""
                            />
                        </div>
                    </>
                ) : null}
                <span>{comment.created_at}</span>
            </div>
            <FullImage open={open} setOpen={setOpen} comment={comment} />
        </div>
    );
}
