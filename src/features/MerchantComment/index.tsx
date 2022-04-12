import { Container } from "@mui/material";
import React, { useEffect, useState, KeyboardEvent, useContext } from "react";
//import ButtonCus from "../../components/ButtonCus";
import icon from "../../constants/icon";
import Bottom from "../../featuresMobile/Bottom";
import Footer from "../Footer";
import Head from "../Head";
import HeadTitle from "../HeadTitle";
import "./merchantComment.css";
import MerchantCommentItem from "./MerchantCommentItem";
import CommentItemTemp from "./CommentItemTemp";
import { useLocation } from 'react-router-dom';
import { IComment } from '../../interface/comments';
import commentsApi from '../../api/commentsApi'
import { AppContext } from "../../context/AppProvider";
import SignInUp from '../poupSignInUp/index';

interface IData {
  comments: IComment[],
  page: number,
  totalItem: number,
  loadPage: boolean
}
export default function MerchantComment() {
  const location: any = useLocation();
  const { profile } = useContext(AppContext)
  const org_id = location.search.slice(1, location.search.length);
  const [cmt, setCmt] = useState('');
  const [cmtTemp, setCmtTemp] = useState<any>([]);
  const [data, setData] = useState<IData>({
    comments: [],
    page: 1,
    totalItem: 1,
    loadPage: false
  })
  const [open, setOpen] = useState(false)
  async function handleGetCommentsOrg() {
    try {
      const res = await commentsApi.getCommentsOrg({
        org_id: org_id,
        page: data.page
      })
      setData({
        ...data,
        totalItem: res.data.context.total,
        comments: [...data.comments, ...res.data.context.data],
        loadPage: false
      })
    } catch (error) {
      setData({
        ...data,
        loadPage: false
      })
      console.log(error)
    }
  }
  useEffect(() => {
    handleGetCommentsOrg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.page])
  const onPage = () => {
    setData({
      ...data,
      page: data.page + 1,
      loadPage: true
    })
  }
  async function handlePostComment() {
    try {
      await commentsApi.postCommentOrg({
        org_id: org_id,
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
    <div>
      <SignInUp
        openSignIn={open}
        setOpenSignIn={setOpen}
        activeTabSign={1}
      />
      <HeadTitle title={"Tất cả đánh giá"} />
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
                    onClick={onPage}
                  >
                    {data.loadPage === true ? 'Đang tải...' : 'Xem thêm đánh giá'}
                  </button>
                </div>
            }
          </div>
        </div>
      </Container>

      <Footer />
      <Bottom />
    </div>
  );
}
