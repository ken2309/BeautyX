import React, { useEffect, useState } from "react";
import icon from "../../constants/icon";
import { IComment } from '../../interface/comments';
import formatDate from '../../utils/formatDate'

interface IProps {
  comment: IComment
}

export default function MerchantCommentItem(props: IProps) {
  const { comment } = props;
  //const cmt = JSON.parse(`${comment.body}`);
  //console.log(typeof comment.body)
  const [body, setBody] = useState({
    text: '',
    image_url: ''
  })
  useEffect(() => {
    try {
      const cmt = JSON.parse(`${comment.body}`)
      setBody({
        text: cmt.text,
        image_url: cmt.image_url
      })
    } catch (error) {
      setBody({
        text: comment.body,
        image_url: ''
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
          {body.text}
        </p>
        {
          body.image_url?.length > 0 &&
          <img
            className="comment-evalutes__img"
            src={body.image_url} alt=""
          />
        }
      </div>
    </div>
  );
}
