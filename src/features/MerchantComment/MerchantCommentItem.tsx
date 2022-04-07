import React from "react";
import icon from "../../constants/icon";
import { IComment } from '../../interface/comments';
import formatDate from '../../utils/formatDate'

interface IProps {
  comment: IComment
}

export default function MerchantCommentItem(props: IProps) {
  const { comment } = props;
  return (
    <div>
      <div className="comment-item">
        <div className="comment-user">
          <div className="comment-user__avatar">
            {comment.user.fullname?.slice(0, 1)}
          </div>
          <div className="comment-user__info">
            <span className="comment-user__name">{comment.user.fullname}</span>
          </div>
        </div>
        <div className="comment-option">
          <div className="comment-option__like">
            <img src={icon.Favorite} alt="" />
            <span>0</span>
          </div>
          <span className="create">{formatDate(comment.created_at)}</span>
        </div>
      </div>
      <div className="comment-star__all">
        <img src={icon.star} alt="" />
        <img src={icon.star} alt="" />
        <img src={icon.star} alt="" />
        <img src={icon.star} alt="" />
        <img src={icon.star} alt="" />
      </div>
      <div className="comment-evalutes">
        {/* <h3>Spectacular</h3> */}
        <p>
          {comment.body}
        </p>
      </div>
    </div>
  );
}
