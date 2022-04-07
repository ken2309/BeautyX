import React, { useEffect, useState, KeyboardEvent, useContext } from 'react';
import Head from '../Head';
import { useLocation } from 'react-router-dom'
import { IComment } from '../../interface/comments';
import commentsApi from '../../api/commentsApi';
import '../MerchantComment/merchantComment.css'
import icon from '../../constants/icon';
import { Container } from '@mui/material';
import MerchantCommentItem from '../MerchantComment/MerchantCommentItem';
import { AppContext } from '../../context/AppProvider';
import SignInUp from '../poupSignInUp';
import CommentItemTemp from '../MerchantComment/CommentItemTemp';

interface IData {
    comments: IComment[],
    page: number,
    totalItem: number
}

function CommentsDetail() {
    const location: any = useLocation();
    const { profile } = useContext(AppContext);
    const search = location.search.slice(1, location.search.length);
    const params = {
        comment_type: search.split(',')[0],
        org_id: search.split(',')[1],
        id: search.split(',')[2]
    }
    const [data, setData] = useState<IData>({
        comments: [],
        page: 1,
        totalItem: 1
    })
    const [cmt, setCmt] = useState('');
    const [cmtTemp, setCmtTemp] = useState<any>([]);
    const [open, setOpen] = useState(false)
    const handleGetComments = async () => {
        try {
            const res = await commentsApi.getComments({
                type: params.comment_type,
                id: params.id,
                org_id: params.org_id,
                page: data.page
            })
            setData({
                ...data,
                comments: res.data.context.data,
                totalItem: res.data.context.total
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        handleGetComments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.page])
    const handlePostComment = async () => {
        try {
            await commentsApi.postComment({
                type: params.comment_type,
                id: params.id,
                org_id: params.org_id,
                body: cmt
            })
            setCmtTemp([...cmtTemp, cmt].reverse())
        } catch (error) {
            console.log(error)
        }
    }
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
            if (profile) {
                handlePostComment();
                setCmt('')
            } else {
                setOpen(true)
            }
        }
    };
    return (
        <>
            <SignInUp
                openSignIn={open}
                setOpenSignIn={setOpen}
                activeTabSign={1}
            />
            <Head />
            <Container>
                <div className="merchantComment">
                    <div className="merchantComment-left">
                        <div className="merchantComment-left__vote">
                            <span className="vote-star">5.0</span>
                            <div className="all-star">
                                <img src={icon.star} alt="" />
                                <img src={icon.star} alt="" />
                                <img src={icon.star} alt="" />
                                <img src={icon.star} alt="" />
                                <img src={icon.star} alt="" />
                            </div>
                            <span className="evaluate">189 đánh giá</span>
                        </div>
                        <div className="merchantComment-left__evaluates">
                            <div className="merchantComment-left__item">
                                <span>Xuất sắc</span>
                                <div className="line"></div>
                                <div className="total">175</div>
                            </div>
                            <div className="merchantComment-left__item">
                                <span>Rất tốt</span>
                                <div className="line"></div>
                                <div className="total">11</div>
                            </div>
                            <div className="merchantComment-left__item">
                                <span>Trung bình</span>
                                <div className="line"></div>
                                <div className="total">1</div>
                            </div>
                            <div className="merchantComment-left__item">
                                <span>Tồi</span>
                                <div className="line"></div>
                                <div className="total">1</div>
                            </div>
                            <div className="merchantComment-left__item">
                                <span>Tồi tệ</span>
                                <div className="line"></div>
                                <div className="total">1</div>
                            </div>
                        </div>
                    </div>
                    <div className="merchantComment-right">
                        <div className="sign-form__box">
                            <input
                                autoComplete="off"
                                value={cmt}
                                onChange={(e) => setCmt(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Nhập bình luận ..."
                            />
                        </div>
                        {/* <div className="merchantComment-right__btn">
              <ButtonCus
                text="Bộ lọc"
                border="1px solid var(--purple)"
                color="var(--purple)"
                fontSize="14px"
                lineHeight="20px"
                borderRadius="20px"
                padding="6px 22px"
              />
              <ButtonCus
                text="Tất cả"
                border="1px solid var(--purple)"
                color="var(--purple)"
                fontSize="14px"
                lineHeight="20px"
                borderRadius="20px"
                padding="6px 22px"
              />
              <ButtonCus
                // onClick={popupSignInClick}
                text="Gần nhất"
                border="1px solid var(--purple)"
                color="var(--purple)"
                fontSize="14px"
                lineHeight="20px"
                borderRadius="20px"
                padding="6px 22px"
              />
            </div> */}
                        <div className="merchantComment-right__comment">
                            {
                                cmtTemp.map((item: string, index: number) => (
                                    <CommentItemTemp
                                        key={index}
                                        body={item}
                                    />
                                ))
                            }
                            {data.comments.map((item: IComment, index: number) => (
                                <MerchantCommentItem
                                    key={index}
                                    comment={item}
                                />
                            ))}
                        </div>
                        {
                            data.comments.length === data.totalItem ?
                                <></>
                                :
                                <div className="comment-bot">
                                    <button
                                    //onClick={onPage}
                                    >
                                        {/* {data.loadPage === true ? 'Đang tải...' : 'Xem thêm đánh giá'} */}
                                        Xem thêm
                                    </button>
                                </div>
                        }
                    </div>
                </div>
            </Container>
        </>
    );
}

export default CommentsDetail;