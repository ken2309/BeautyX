import React, { useState } from "react";
import { IComment } from "../../interface/comments";
import "./review.css";
import CommentItem from "./CommentItem";
import EvaluateInput from "./EvaluateInput";
import TotalStartEvaluate from "./TotalStartEvaluate";
import { useDispatch, useSelector } from "react-redux";


import { postAsyncComment } from "../../redux/org_services/serviceSlice";
import { postAsyncProductComment } from "../../redux/org_products/productSlice";
import { postCommentCombo } from "../../redux/org_combos/comboSlice";
import { pickBy, identity } from "lodash";
import { useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { postAsyncOrgComments } from "../../redux/org/orgCommentsSlice";

interface IProps {
    comments?: any;
    totalItem?: number;
    page?: number;
    commentable_type: string;
    id: number | undefined;
    detail_id?: number;
    refReview?: any;
    changeStyle?: any;
    openSeeMoreCmt?: any;
}

function Review(props: IProps) {
    const {
        comments,
        totalItem,
        commentable_type,
        id,
        detail_id,
        changeStyle,
        openSeeMoreCmt,
        page,
    } = props;
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
    // const [data, setData] = useState<any>({
    //     comments: [...comments],
    //     page: page,
    //     totalItem: totalItem,
    // });
    // const onViewMore = () => {
    //     if (
    //         data.comments.length < data.totalItem &&
    //         data.comments.length >= 8
    //     ) {
    //         setData({
    //             ...data,
    //             page: data.page + 1,
    //         });
    //     }
    // };

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
            setComment({
                ...comment,
                text: "",
                image_url: null,
            });
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
                    return dispatch(
                        postCommentCombo({
                            values: values,
                            user: user,
                        })
                    );
            }
        } else if (!user) {
            history.push("/sign-in?1");
        }
    };

    const handleKeyDown = (event: any) => {
        if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
            handlePostComment();
        }
    };
    console.log('render times ==>', id);
    return (
        <>
            <div className="org-evaluate__cnt">
                <div className="org-evaluate__title">
                    <p>Đánh giá</p>
                </div>
                <TotalStartEvaluate
                    totalItem={totalItem}
                    openSeeMoreCmt={openSeeMoreCmt}
                />
                <EvaluateInput
                    handleOnchange={handleOnchange}
                    comment={comment}
                    handleKeyDown={handleKeyDown}
                    handlePostComment={handlePostComment}
                    user={user}
                    setComment={setComment}
                    changeStyle={changeStyle}
                />
                {totalItem && totalItem > 0 ? (
                    <div className="total-comment__wrap">
                        <span className="total-comment">
                            Tổng {totalItem} đánh giá
                        </span>
                    </div>
                ) : (
                    <span className="total-comment">Chưa có bình luận nào</span>
                )}
                {/* {data.comments.length > 0 ? (
                    <InfiniteScroll
                        dataLength={data?.comments.length}
                        hasMore={true}
                        next={onViewMore}
                        height={"80vh"}
                        loader={<div></div>}
                    > */}
                <div className="evaluate__list">
                    {comments?.map((item: IComment, index: number) => (
                        <CommentItem key={index} comment={item} user={user} />
                    ))}
                </div>
                {/* </InfiniteScroll>
                ) : (
                    <></> */}
                {/* )} */}
            </div>
        </>
    );
}

export default Review;
