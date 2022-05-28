import { Container } from "@mui/material";
import React, { useEffect, useState, KeyboardEvent } from "react";
import icon from "../../constants/icon";
import Footer from "../Footer";
import Head from "../Head";
import HeadTitle from "../HeadTitle";
import "./merchantComment.css";
import MerchantCommentItem from "./MerchantCommentItem";
import { useLocation } from 'react-router-dom';
import { IComment } from '../../interface/comments';
import SignInUp from '../poupSignInUp/index';
import mediaApi from "../../api/mediaApi";
import ButtonLoading from "../../components/ButtonLoading";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncOrgComments,
  postAsyncOrgComments,
  clearPrevState,
} from '../../redux/org/orgCommentsSlice'
import { STATUS } from '../../redux/status'
import { formatOrgParam } from "../../utils/formatParams";

export default function MerchantComment() {
  const location: any = useLocation();
  const sub_domain = formatOrgParam(location.pathname);
  const dispatch = useDispatch();
  const USER = useSelector((state: any) => state.USER.USER)
  const ORG = useSelector((state: any) => state.ORG)
  const ORG_COMMENTS = useSelector((state: any) => state.ORG_COMMENTS);
  const { comments, page, totalItem, status } = ORG_COMMENTS;
  const org_id = location.search.slice(1, location.search.length);
  const [cmt, setCmt] = useState({
    text: '',
    image_url: ''
  });
  const [open, setOpen] = useState(false)
  const callOrgComments = () => {
    if (sub_domain !== ORG.org?.subdomain
      && ORG.status === STATUS.SUCCESS
      && status !== STATUS.SUCCESS
    ) {
      const values = {
        org_id: ORG.org?.id,
        page: 1
      }
      dispatch(clearPrevState())
      dispatch(fetchAsyncOrgComments(values))
    }
  }
  useEffect(() => {
    callOrgComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ORG.org?.status, sub_domain])
  const onPage = () => {
    const values = {
      org_id,
      page: page + 1
    }
    dispatch(fetchAsyncOrgComments(values))
  }
  //handle post image
  const handlePostImageMedia = async (form: any) => {
    let formData = new FormData();
    formData.append('file', form);
    try {
      const res = await mediaApi.postMedia(formData);
      setCmt({
        ...cmt,
        image_url: res.data.context.original_url
      })
    } catch (error) {
      console.log(error)
    }
  }
  const onChangeMedia = (e: any) => {
    const media = e.target.files[0];
    if (USER) {
      handlePostImageMedia(media)
    } else {
      setOpen(true)
    }
  }
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
      if (USER) {
        const values = {
          org_id: org_id,
          body: JSON.stringify(cmt),
          user: USER
        }
        dispatch(postAsyncOrgComments(values))
        setCmt({
          text: '', image_url: ''
        })
      } else {
        setOpen(true)
      }
    }
  };
  const onRemoveImageTemp = () => {
    setCmt({
      ...cmt,
      image_url: ''
    })
  }

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
              <span className="evaluate">{totalItem} đánh giá</span>
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
            <div className="flex-row-sp sign-form__box">
              <input
                autoComplete="off"
                value={cmt.text}
                onChange={(e) => setCmt({ ...cmt, text: e.target.value })}
                onKeyDown={handleKeyDown}
                placeholder="Nhập bình luận ..."
              />
              <div title="Thêm hình" className="merchantComment-img">
                <label htmlFor="file">
                  <img src={icon.Camera_purple} alt="" />
                </label>
              </div>
              <input
                hidden
                id="file"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
                onChange={onChangeMedia}
              />
              <button className="submit-merchantComment" >
                <img src={icon.sendWhite} alt="" />
              </button>
            </div>
            {
              cmt.image_url?.length > 0 &&
              <div className="input-image">
                <img className="input-image__temp" src={cmt.image_url} alt="" />
                <button
                  onClick={onRemoveImageTemp}
                >
                  <img src={icon.closeCircle} alt="" />
                </button>
              </div>
            }
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
              {comments.map((item: IComment, index: number) => (
                <MerchantCommentItem
                  key={index}
                  comment={item}
                />
              ))}
            </div>
            {
              comments.length < totalItem &&
              <div className="comment-bot">
                <ButtonLoading
                  title="Xem thêm đánh giá"
                  onClick={onPage}
                  loading={status === STATUS.LOADING ? true : false}
                />
              </div>
            }
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
