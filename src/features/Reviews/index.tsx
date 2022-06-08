import React, { useState } from "react";
import { IComment } from "../../interface/comments";
import "./review.css";
import CommentItem from "./CommentItem";
import EvaluateInput from "./EvaluateInput";
import TotalStartEvaluate from "./TotalStartEvaluate";
import { useDispatch, useSelector } from "react-redux";
import { postAsyncOrgComments } from "../../redux/org/orgCommentsSlice";
import mediaApi from "../../api/mediaApi";
import { postAsyncComment } from "../../redux/org_services/serviceSlice";
import { postAsyncProductComment } from '../../redux/org_products/productSlice';
import { postCommentCombo } from '../../redux/org_combos/comboSlice';
import { pickBy, identity } from "lodash";
import { useHistory } from "react-router-dom";
interface IProps {
    comments: IComment[] | undefined;
    totalItem: number | undefined;
    commentable_type: string;
    id: number | undefined;
    detail_id?: number;
    refReview?: any;
}

function Review(props: IProps) {
    const { comments, totalItem, commentable_type, id, detail_id } =
        props;
    const USER = useSelector((state: any) => state.USER);
    const user = USER.USER;
    const dispatch = useDispatch();
    const history = useHistory();
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

    const valuesStr = {
        page: 1,
        org_id: id,
        type: commentable_type,
        body: JSON.stringify(comment),
        id: detail_id,
    };
    const values = pickBy(valuesStr, identity);

    const handlePostComment = () => {
        if (comment.text.length > 0 && user) {
            switch (commentable_type) {
                case "ORGANIZATION":
                    return dispatch(
                        postAsyncOrgComments({
                            values: values,
                            user: user,
                        })
                    );
                case "SERVICE":
                    return dispatch(
                        postAsyncComment({
                            values: values,
                            user: user,
                        })
                    );
                case "PRODUCT":
                    return dispatch(
                        postAsyncProductComment({
                            values: values,
                            user: user,
                        })
                    );
                case "TREATMENT_COMBO":
                    return dispatch(postCommentCombo({
                        values: values,
                        user: user
                    }))
            }
            setComment({ text: "", image_url: null });
        } else if (!user) {
            history.push('/sign-in?1')
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
            history.push('/sign-in?1')
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
