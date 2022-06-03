import React, { useContext, useEffect, useState } from "react";
import { IOrganization } from "../../interface/organization";
import { IComment } from "../../interface/comments";
import commentsApi from "../../api/commentsApi";
import { AppContext } from "../../context/AppProvider";
import icon from "../../constants/icon";
import SectionTitle from "../SectionTitle";
import ButtonCus from "../../components/ButtonCus";
import DetailCommentItem from "../MerchantDetail/components/DetailCommentItem";
import { useHistory } from "react-router-dom";
import slugify from "../../utils/formatUrlString";

interface IProps {
    org: IOrganization;
    id: number | string;
    comment_type: string;
    detail: any;
}
interface IData {
    comments: IComment[];
    totalItem: number;
}

function Comments(props: IProps) {
    const { t } = useContext(AppContext);
    const history = useHistory();
    const { org, id, comment_type, detail } = props;
    const [data, setData] = useState<IData>({
        comments: [],
        totalItem: 1,
    });
    const handleGetComments = async () => {
        try {
            const res = await commentsApi.getComments({
                page: 1,
                type: comment_type,
                id: id,
                org_id: org?.id,
            });
            setData({
                comments: res.data.context.data,
                totalItem: res.data.context.total,
            });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleGetComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    const handleSeeAllFeedback = () => {
        const name =
            detail.product_name ||
            detail.service_name ||
            detail.name ||
            detail.description ||
            detail.title;
        history.push({
            pathname: `/danh-gia/${slugify(name)}`,
            search: `${comment_type},${org.id},${id}`,
        });
    };
    return (
        <div style={{ width: "100%" }} className="mer-detail__content-cmt">
            <div className="flex-row-sp mer-detail-cmt__head">
                <span className="flex-row-sp">
                    <SectionTitle title={t("Mer_de.feedback")} />
                    <h1 className="flex-row mer-detail-cmt__head-star">
                        4.5/5
                        <img src={icon.star} alt="" />
                    </h1>
                </span>
                <div className="mer-detail-cmt__head-total">
                    <span>{data.totalItem}</span> {t("Mer_de.feedbacks")}
                </div>
            </div>
            <ul className="mer-detail-cmt__box">
                {data.comments
                    .slice(0, 7)
                    .map((item: IComment, index: number) => (
                        <DetailCommentItem key={index} comment={item} />
                    ))}
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

export default Comments;
