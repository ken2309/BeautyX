import React, { useState } from "react";
import { IComment } from "../../interface/comments";
import "./review.css";
import CommentItem from "./CommentItem";
import EvaluateInput from "./EvaluateInput";
import TotalStartEvaluate from "./TotalStartEvaluate";
import { useDispatch, useSelector } from "react-redux";
import { postAsyncOrgComments } from "../../redux/org/orgCommentsSlice";
import SignInUp from "../poupSignInUp";
interface IProps {
    comments: IComment[];
    totalItem: number;
    commentable_type: string;
    id: number;
}

function Review(props: IProps) {
    const { comments, totalItem, commentable_type, id } = props;
    const USER = useSelector((state: any) => state.USER);
    const user = USER.USER;
    const dispatch = useDispatch();
    const [popUpLogin, setPopUpLogin] = useState(false);
    const [comment, setComment] = useState({ text: " " });

    const handleOnchange = (e: any) => {
        setComment({
            ...comment,
            text: e.target.value,
        });
    };

    const values = {
        page: 1,
        type: commentable_type,
        org_id: id,
        body: JSON.stringify(comment),
    };
    const handlePostComment = () => {
        dispatch(
            postAsyncOrgComments({
                values: values,
                user: user,
            })
        );
    };

    const handleKeyDown = (event: any) => {
        if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
            if (comment.text.length > 0 && user) {
                handlePostComment();
                setComment({
                    text: "",
                    // image_url: "",
                });
            } else {
                setPopUpLogin(true);
            }
        }
    };

    return (
        <>
            <SignInUp
                openSignIn={popUpLogin}
                setOpenSignIn={setPopUpLogin}
                activeTabSign={1}
            />
            <div className="org-evaluate__cnt">
                <TotalStartEvaluate />
                <EvaluateInput
                    handleOnchange={handleOnchange}
                    comment={comment}
                    handleKeyDown={handleKeyDown}
                    handlePostComment={handlePostComment}
                    user={user}
                />
                <span className="total-comment">Tổng {totalItem} đánh giá</span>
                {comments.map((item: IComment, index: number) => (
                    <CommentItem key={index} comment={item} user={user} />
                ))}
            </div>
        </>
    );
}

export default Review;
