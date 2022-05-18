/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import icon from "../../../constants/icon";
import DetailCommentItem from "./DetailCommentItem";
import SectionTitle from "../../SectionTitle";
import ButtonCus from "../../../components/ButtonCus/index";
import { AppContext } from "../../../context/AppProvider";
import { IComment } from "../../../interface/comments";
import slugify from "../../../utils/formatUrlString";
import scrollTop from "../../../utils/scrollTop";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../../../redux/status";
import { clearPrevState, fetchAsyncOrgComments } from "../../../redux/org/orgCommentsSlice";


function DetailComment(props: any) {
  const history = useHistory();
  const { styleCmt } = props;
  const { t } = useContext(AppContext);
  const dispatch = useDispatch();
  const ORG_COMMENTS = useSelector((state: any) => state.ORG_COMMENTS);
  const ORG = useSelector((state: any) => state.ORG);
  const { comments, totalItem } = ORG_COMMENTS;
  const callOrgComments = () => {
    if (
      ORG.status === STATUS.SUCCESS
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
  }, [ORG.status])
  function handleSeeAllFeedback() {
    scrollTop();
    history.push({
      pathname: `/merchant-comment/${slugify(ORG.org?.name)}`,
      search: `${ORG.org?.id}`
    });
  }
  return (
    <div style={{ width: styleCmt?.width }} className="mer-detail__content-cmt">
      <div className="flex-row-sp mer-detail-cmt__head">
        <span className="flex-row-sp">
          <SectionTitle title={t("Mer_de.feedback")} />
          <h1 className="flex-row mer-detail-cmt__head-star">
            4.5/5
            <img src={icon.star} alt="" />
          </h1>
        </span>
        <div className="mer-detail-cmt__head-total">
          <span>{totalItem}</span> {t("Mer_de.feedbacks")}
        </div>
      </div>
      <ul className="mer-detail-cmt__box">
        {
          comments.slice(0, 7).map((item: IComment, index: number) => (
            <DetailCommentItem
              key={index}
              comment={item}
            />
          ))
        }
      </ul>
      <ButtonCus
        text={t("Mer_de.view_all_feedback")}
        imgIcon={icon.next}
        color="var(--purple)"
        border="solid 1px var(--purple)"
        borderRadius="18px"
        onClick={() => {
          handleSeeAllFeedback();
        }}
      />
    </div>
  );
}

export default DetailComment;
