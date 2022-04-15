import React, { useState, useEffect } from 'react';
import icon from '../../../constants/icon';
import formatDate from '../../../utils/formatDate';
import { IComment } from '../../../interface/comments'

interface IProps {
      comment: IComment
}

function DetailCommentItem(props: IProps) {
      const { comment } = props;
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
            <li className="mer-detail-cmt__box-li">
                  <div className="mer-detail-cmt__box-item">
                        <div className="flex-row-sp cmt-head">
                              <div className="flex-row-sp cmt-head__user">
                                    {/* <img src={img.Avatar} alt="" /> */}
                                    <div className="cmt-head__user-avatar">
                                          {comment?.user?.fullname?.slice(0, 1)}
                                    </div>
                                    <span>
                                          <p>{comment?.user?.fullname}</p>
                                          <ul>
                                                <li>
                                                      <img src={icon.star} alt="" />
                                                </li>
                                                <li>
                                                      <img src={icon.star} alt="" />
                                                </li>
                                                <li>
                                                      <img src={icon.star} alt="" />
                                                </li>
                                                <li>
                                                      <img src={icon.star} alt="" />
                                                </li>
                                          </ul>
                                    </span>
                              </div>
                              <h3 className="date">{formatDate(comment.created_at)}</h3>
                        </div>
                        <div className="cmt-text">
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
            </li>
      );
}

export default DetailCommentItem;