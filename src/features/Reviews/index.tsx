import React, { useEffect, useState } from "react";
import { IComment } from "../../interface/comments";
import "./review.css";
import CommentItem from "./CommentItem";
import EvaluateInput from "./EvaluateInput";
import TotalStartEvaluate from "./TotalStartEvaluate";
import { useDispatch, useSelector } from "react-redux";
import { postAsyncOrgComments } from "../../redux/org/orgCommentsSlice";
import SignInUp from "../poupSignInUp";
import mediaApi from "../../api/mediaApi";
interface IProps {
    comments: IComment[]|undefined;
    totalItem: number|undefined;
    id: number|undefined;
    focus?:Boolean
}

function Review(props: IProps) {
    const { comments, totalItem, id  } = props;
    const USER = useSelector((state: any) => state.USER);
    const user = USER.USER;
    const dispatch = useDispatch();
    const [popUpLogin, setPopUpLogin] = useState(false);
    const [comment, setComment] = useState<any>({
        text: "",
        image_url: null,
        used: true,
        star: 5,
    });

    const handleOnchange = (e: any) => {
        setComment({
            ...comment,
            text: e.target.value,
        });
    };

    const values = {
        page: 1,
        org_id: id,
        body: JSON.stringify(comment),
    };

    const handlePostComment = () => {
        if (comment.text.length > 0 && user) {
            dispatch(
                postAsyncOrgComments({
                    values: values,
                    user: user,
                })
            );
            setComment({ text: "", image_url: null });
        } else if (!user) {
            console.log("comments not found");
            setPopUpLogin(true);
        }
    };

    const handleKeyDown = (event: any) => {
        if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
            handlePostComment();
        }
    };

    //handle post media
    const onChangeMedia = (e: any) => {
        const media = e.target.files[0];
        if (user && media) {
            handlePostMedia(media);
        } else if (!user) {
            console.log("comments not found");
            setPopUpLogin(true);
        }
    };
    const handlePostMedia = async (media: any) => {
        let formData = new FormData();
        formData.append("file", media);
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
                    onChangeMedia={onChangeMedia}
                    onRemoveImgTemp={onRemoveImgTemp}
                />
                <span className="total-comment">Tổng {totalItem} đánh giá</span>
                {comments?.map((item: IComment, index: number) => (
                    <CommentItem key={index} comment={item} user={user} />
                ))}
            </div>
        </>
    );
}

export default Review;
