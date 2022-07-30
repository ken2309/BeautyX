import React, { useContext, useState } from "react";
import Rating from "@mui/material/Rating";
import icon from "../../constants/icon";
import { IComment, ICommentChild } from "../../interface/comments";
import FullImage from "../OpenFullImage";
import { AppContext } from "../../context/AppProvider";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { postAsyncReplyOrgComments } from '../../redux/org/orgCommentsSlice'
import { useHistory } from "react-router-dom";
import { postAsyncReplyServiceComments } from "../../redux/org_services/serviceSlice";
import { postAsyncReplyProductComments } from "../../redux/org_products/productSlice";

interface IProps {
    comment: IComment;
    user: any;
    org_id: number,
    parent_type: string
}

export default function CommentItem(props: IProps) {
    const { comment, org_id, parent_type } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const [cmtRep, setCmtRep] = useState('');
    const [open, setOpen] = useState(false);
    const { USER } = useSelector((state: any) => state.USER)
    const { t } = useContext(AppContext);
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
    const onChangeReply = (e: any) => {
        setCmtRep(e.target.value);
    }
    const handlePostReplyComment = () => {
        if (USER) {
            if (cmtRep.length > 0) {
                const values = {
                    type: "REPLY_COMMENT",
                    id: comment.id,
                    org_id: org_id,
                    body: cmtRep,
                }
                setCmtRep('')
                switch (parent_type) {
                    case "ORGANIZATION":
                        return dispatch(postAsyncReplyOrgComments({
                            values: values,
                            user: USER
                        }));
                    case "SERVICE":
                        return dispatch(postAsyncReplyServiceComments({
                            values: values,
                            user: USER
                        }))
                    case "PRODUCT":
                        return dispatch(postAsyncReplyProductComments({
                            values: values,
                            user: USER
                        }))
                }
            }
        } else {
            history.push("/sign-in?1")
        }
    }
    const handleKeyDown = (event: any) => {
        if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
            handlePostReplyComment();
        }
    };
    return (
        <>
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
                {body.used && (
                    <div className="flex-row evaluate-comment__tick">
                        <span>{t("detail_item.used")}</span>
                        <img src={icon.checkFlowGreen} alt="" />
                    </div>
                )}
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
            </div>
            <div>
                <Accordion>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <div className="evaluate-comment__bot">
                            <div className="evaluate-comment__bot-title">
                                <span>
                                    {comment.children.length > 0 && `${comment.children.length}  `}
                                    Phản hồi
                                </span>
                                <span>{comment.created_at}</span>
                            </div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="evaluate-comment__child">
                            <ul className="evaluate-comment__child-list">
                                {
                                    comment.children.map((item: ICommentChild, index: number) => (
                                        <div key={index} className="evaluate-comment__child-item">
                                            <div className="flex-row evaluate-comment__child-info">
                                                <img src={item.user?.avatar} alt="" />
                                                <span className="name">
                                                    {item.user?.fullname}
                                                </span>
                                            </div>
                                            <span className="text">
                                                {item.body}
                                            </span>
                                        </div>
                                    ))
                                }
                                <div className="flex-row-sp evaluate-comment__child-reply">
                                    <img src={USER?.avatar || icon.userNotSign} alt="" className="avatar-reply" />
                                    <input
                                        value={cmtRep}
                                        onKeyDown={handleKeyDown}
                                        onChange={onChangeReply}
                                        type="text" placeholder={`Trả lời ${comment?.user?.fullname}...`}
                                    />
                                    <button
                                        onClick={handlePostReplyComment}
                                    >
                                        <img src={icon.sendComment} alt="" />
                                    </button>
                                </div>
                            </ul>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            <FullImage open={open} setOpen={setOpen} comment={comment} />
        </>
    );
}
