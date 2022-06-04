import React from "react";
import { IComment } from "../../interface/comments";
import "./review.css";
import CommentItem from "./CommentItem";
import EvaluateInput from "./EvaluateInput";
import TotalStartEvaluate from "./TotalStartEvaluate";
interface IProps {
    comments: IComment[];
    totalItem: number;
}

function Review(props: IProps) {
    const { comments, totalItem } = props;
    return (
        <div className="org-evaluate__cnt">
            <TotalStartEvaluate />
            <EvaluateInput />
            <span className="total-comment">Tổng {totalItem} đánh giá</span>
            {comments.map((item: IComment, index: number) => (
                <CommentItem key={index} comment={item} />
            ))}
        </div>
    );
}

export default Review;
